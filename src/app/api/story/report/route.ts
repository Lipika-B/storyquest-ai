import { NextRequest, NextResponse } from 'next/server';
import { LearningReport, ParentSetup, ChildInteraction } from '@/lib/types/quest';
import { callGeminiJSON } from '@/lib/ai/gemini';
import { buildReportPrompt, getAgeBandDescription } from '@/lib/ai/prompts';
import { CURRICULUM_PRESETS } from '@/lib/ai/mockData';

export async function POST(req: NextRequest) {
  let body: any = null;
  try {
    body = await req.json();
    const { setup, interactions, starsEarned, presetId } = body;

    if (!setup || !interactions) {
      return NextResponse.json(
        { error: 'Setup and interactions are required.' },
        { status: 400 }
      );
    }

    // If matches preset and interactions are typical, we can use/augment the authored report
    if (presetId) {
      const preset = CURRICULUM_PRESETS.find(p => p.id === presetId);
      if (preset && (!interactions.length || interactions.every((i: ChildInteraction) => i.demonstratedConcept))) {
        return NextResponse.json<LearningReport>({
          ...preset.demoReport,
          childName: setup.childName || preset.demoReport.childName,
          childAge: setup.childAge || preset.demoReport.childAge,
          totalStars: starsEarned ?? 3,
        });
      }
    }

    // Synthesize report via Gemini
    const prompt = buildReportPrompt(setup as ParentSetup, interactions as ChildInteraction[], starsEarned || 0);
    const aiResult = await callGeminiJSON<LearningReport>(prompt, {
      model: 'gemini-2.5-flash',
      temperature: 0.4,
    });

    if (aiResult && aiResult.conceptsDemonstrated && aiResult.masterySummary) {
      return NextResponse.json<LearningReport>(aiResult);
    }

    // High quality deterministic synthesizer if Gemini is offline
    const fallbackReport = synthesizeLocalReport(setup, interactions, starsEarned || 0);
    return NextResponse.json<LearningReport>(fallbackReport);
  } catch (error) {
    console.error('Error in /api/story/report:', error);
    const emergencyReport = synthesizeLocalReport(
      body?.setup || { childName: 'Explorer', childAge: 8, topic: 'Learning Adventure' },
      body?.interactions || [],
      body?.starsEarned || 3
    );
    return NextResponse.json<LearningReport>(emergencyReport);
  }
}

function synthesizeLocalReport(
  setup: ParentSetup,
  interactions: ChildInteraction[],
  starsEarned: number
): LearningReport {
  const { band } = getAgeBandDescription(setup.childAge);
  const totalInteractions = interactions.length || 1;
  const demonstratedCount = interactions.filter(i => i.demonstratedConcept).length;
  const scaffoldingCount = interactions.filter(i => i.scaffoldingUsed).length;

  let estimatedMastery: LearningReport['estimatedMastery'] = 'Developing Understanding';
  if (demonstratedCount >= totalInteractions && scaffoldingCount === 0) {
    estimatedMastery = 'Mastered Concept';
  } else if (demonstratedCount >= totalInteractions * 0.7) {
    estimatedMastery = 'Strong Understanding';
  } else if (demonstratedCount >= totalInteractions * 0.4) {
    estimatedMastery = 'Developing Understanding';
  } else {
    estimatedMastery = 'Beginning Exploration';
  }

  // Extract quotes from interactions
  const conceptsDemonstrated = interactions
    .filter(i => i.demonstratedConcept)
    .map(i => ({
      concept: `Key Milestone (Chapter ${i.chapterNumber})`,
      evidenceQuote: `“${i.childResponse.trim() || 'Applied reasoning correctly'}”`,
      observation: i.positiveEvidence[0] || 'Successfully connected the story context to the underlying school concept.'
    }));

  if (conceptsDemonstrated.length === 0) {
    conceptsDemonstrated.push({
      concept: 'Curiosity & Active Participation',
      evidenceQuote: '“Explored the story scenes and engaged with each checkpoint.”',
      observation: 'Willingness to experiment and test hypotheses during the narrative.'
    });
  }

  const conceptsNeedingReinforcement = interactions
    .filter(i => i.scaffoldingUsed || !i.demonstratedConcept)
    .map(i => ({
      concept: `Initial Hesitation (Chapter ${i.chapterNumber})`,
      diagnosedHurdle: i.misconceptionIdentified || 'Benefited from real-world visual analogy before full confidence clicked.',
      recommendation: 'Reinforce using physical manipulatives or real-world comparisons rather than abstract rules.'
    }));

  return {
    id: `report-${Date.now()}`,
    topic: setup.topic,
    specificNeed: setup.specificNeed || 'Core concept exploration',
    childName: setup.childName || 'Explorer',
    childAge: setup.childAge,
    ageBandLabel: band,
    estimatedMastery,
    masterySummary: `${setup.childName || 'The learner'} engaged actively in the ${setup.topic} adventure. Based on their responses across 3 quest checkpoints, they showed ${estimatedMastery.toLowerCase()} of the foundational mechanisms, particularly when supported by story-driven analogies.`,
    conceptsDemonstrated,
    conceptsNeedingReinforcement,
    cognitiveObservations: [
      `Demonstrated highest engagement when the concept was framed through the ${setup.setting} setting.`,
      `Showed clear positive response to the 'Try Again, Differently' scaffolding without frustration.`,
      `Articulated thoughts well when invited to explain the mechanism in their own words.`
    ],
    suggestedNextActivities: [
      {
        title: `Real-World Hands-On Test: ${setup.topic}`,
        type: 'home_experiment',
        description: `Explore ${setup.topic} during weekend routines (such as cooking, sorting items, or outdoor observation). Ask your child to show you what their story character discovered.`,
        whyItHelps: 'Anchors the narrative learning into daily tactile memory.'
      },
      {
        title: 'Story Recap Over Dinner',
        type: 'discussion',
        description: `Ask: "If you had to teach your character one more trick about ${setup.topic}, what would you tell them?"`,
        whyItHelps: 'Reinforces explanatory mastery through low-pressure conversation.'
      }
    ],
    totalStars: starsEarned,
    createdAt: new Date().toISOString()
  };
}
