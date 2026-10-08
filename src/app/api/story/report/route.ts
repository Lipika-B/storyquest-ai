import { NextRequest, NextResponse } from 'next/server';
import { LearningReport, ParentSetup, ChildInteraction } from '@/lib/types/quest';
import { callGeminiJSON } from '@/lib/ai/gemini';
import { buildReportPrompt, getAgeBandDescription } from '@/lib/ai/prompts';

export async function POST(req: NextRequest) {
  let body: any = null;
  try {
    body = await req.json();
    const { setup, interactions, starsEarned } = body;

    if (!setup || !interactions) {
      return NextResponse.json(
        { error: 'Setup and interactions are required.' },
        { status: 400 }
      );
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
      body?.setup || { childName: 'Explorer', childAge: 8, topic: 'Learning Adventure', learningGoal: 'Core Discovery' },
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
      concept: `Level ${i.levelNumber ?? i.chapterNumber ?? 1} Milestone (${setup.topic})`,
      evidenceQuote: `“${i.childResponse.trim() || 'Applied reasoning correctly'}”`,
      observation: i.positiveEvidence[0] || `Demonstrated intuitive grasp of ${setup.learningGoal}.`
    }));

  if (conceptsDemonstrated.length === 0) {
    conceptsDemonstrated.push({
      concept: `Active Exploration (${setup.topic})`,
      evidenceQuote: '“Explored the story scenes and engaged with each checkpoint.”',
      observation: 'Willingness to experiment with ideas and follow KIKI’s companion cues.'
    });
  }

  const conceptsNeedingReinforcement = interactions
    .filter(i => i.scaffoldingUsed || !i.demonstratedConcept)
    .map(i => ({
      concept: `Initial Hesitation in Level ${i.levelNumber ?? i.chapterNumber ?? 1}`,
      diagnosedHurdle: i.misconceptionIdentified || setup.struggle || 'Benefited from an alternate hands-on analogy before full confidence clicked.',
      recommendation: `Use tangible everyday objects connected to ${setup.interest || 'daily routines'} rather than abstract drill sheets.`
    }));

  return {
    id: `kiki-report-${Date.now()}`,
    topic: setup.topic,
    learningGoal: setup.learningGoal,
    childName: setup.childName || 'Explorer',
    childAge: setup.childAge,
    ageBandLabel: band,
    estimatedMastery,
    masterySummary: `${setup.childName || 'The learner'} completed KIKI’s ${setup.topic} adventure. Based on their responses across 5 adventure levels, they demonstrated ${estimatedMastery.toLowerCase()} of the learning goal: "${setup.learningGoal}".`,
    conceptsDemonstrated,
    conceptsNeedingReinforcement,
    howKikiAdapted: scaffoldingCount > 0
      ? `When ${setup.childName || 'the child'} hesitated on a story checkpoint, KIKI guided them with an encouraging, real-world analogy ("Try Again, Differently") rather than saying 'wrong', allowing them to grasp ${setup.learningGoal} with confidence.`
      : `KIKI kept ${setup.childName || 'the child'} actively engaged through progressive story levels, reinforcing core concepts through interactive dialogue and positive celebration.`,
    totalStars: starsEarned,
    totalLevels: 5,
    cognitiveObservations: [
      `Engaged enthusiastically with the ${setup.storyWorld || 'adventure'} story world and companion dialogue.`,
      `Responded positively to KIKI’s 'Try Again, Differently' scaffolding without frustration.`,
      `Demonstrated highest engagement when invited to explain the discovery in their own words.`
    ],
    suggestedNextActivities: [
      {
        title: `Hands-On Activity: ${setup.topic}`,
        type: 'hands_on_game',
        description: `Explore ${setup.topic} using real-world items (like ${setup.interest || 'kitchen snacks, blocks, or toys'}). Ask your child to show you what KIKI discovered today!`,
        whyItHelps: 'Anchors the narrative breakthrough into physical muscle memory.'
      },
      {
        title: 'Story Bedtime Chat',
        type: 'discussion',
        description: `Ask: "If KIKI asked you to teach another friend about ${setup.topic}, how would you explain it?"`,
        whyItHelps: 'Builds lasting retention through child-led verbal recall.'
      }
    ],
    createdAt: new Date().toISOString()
  };
}
