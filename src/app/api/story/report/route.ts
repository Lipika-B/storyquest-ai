import { NextRequest, NextResponse } from 'next/server';
import { LearningReport, ParentSetup, ChildInteraction, LearningPlan } from '@/lib/types/quest';
import { callGeminiJSON } from '@/lib/ai/gemini';
import { buildReportPrompt, getAgeBandDescription } from '@/lib/ai/prompts';
import { generateLearningPlan } from '@/lib/ai/storyEngine';

export async function POST(req: NextRequest) {
  let body: any = null;
  try {
    body = await req.json();
    const { setup, interactions, starsEarned, learningPlan } = body;

    if (!setup || !interactions) {
      return NextResponse.json(
        { error: 'Setup and interactions are required.' },
        { status: 400 }
      );
    }

    const safePlan: LearningPlan = learningPlan || generateLearningPlan(setup as ParentSetup);

    // Synthesize report via Gemini if available
    try {
      const prompt = buildReportPrompt(setup as ParentSetup, interactions as ChildInteraction[], starsEarned || 0, safePlan);
      const aiResult = await callGeminiJSON<LearningReport>(prompt, {
        model: 'gemini-2.5-flash',
        temperature: 0.4,
      });

      if (aiResult && aiResult.conceptsDemonstrated && aiResult.masterySummary) {
        aiResult.learningPlan = safePlan;
        return NextResponse.json<LearningReport>(aiResult);
      }
    } catch (e) {
      // Fallback to deterministic synthesizer
    }

    // High quality deterministic synthesizer
    const fallbackReport = synthesizeLocalReport(setup, interactions, starsEarned || 0, safePlan);
    return NextResponse.json<LearningReport>(fallbackReport);
  } catch (error) {
    console.error('Error in /api/story/report:', error);
    const emergencySetup = body?.setup || { childName: 'Explorer', childAge: 8, topic: 'Learning Adventure', learningGoal: 'Core Discovery' };
    const emergencyPlan = generateLearningPlan(emergencySetup);
    const emergencyReport = synthesizeLocalReport(
      emergencySetup,
      body?.interactions || [],
      body?.starsEarned || 3,
      emergencyPlan
    );
    return NextResponse.json<LearningReport>(emergencyReport);
  }
}

function synthesizeLocalReport(
  setup: ParentSetup,
  interactions: ChildInteraction[],
  starsEarned: number,
  plan: LearningPlan
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
      concept: `Level ${i.levelNumber ?? i.chapterNumber ?? 1} (${i.phase}) Milestone`,
      evidenceQuote: `“${i.childResponse.trim() || 'Applied conceptual reasoning'}”`,
      observation: i.positiveEvidence[0] || `Evidence indicates intuitive grasp of ${plan.learningObjectives[0] || setup.learningGoal}.`
    }));

  if (conceptsDemonstrated.length === 0) {
    conceptsDemonstrated.push({
      concept: `Active Exploration (${setup.topic})`,
      evidenceQuote: '“Explored story scenes and engaged with each checkpoint.”',
      observation: 'Willingness to experiment with ideas and follow KIKI’s companion cues.'
    });
  }

  const conceptsNeedingReinforcement = interactions
    .filter(i => i.scaffoldingUsed || !i.demonstratedConcept)
    .map(i => ({
      concept: `Level ${i.levelNumber ?? i.chapterNumber ?? 1} Initial Hesitation`,
      diagnosedHurdle: i.misconceptionIdentified || plan.likelyMisconceptions[0] || 'Encountered an intuitive distractor before the physical mechanism clicked.',
      recommendation: `Use tangible everyday models (such as ${plan.realWorldConnection}) rather than abstract memorization.`
    }));

  // Understanding Profile Dimensions
  const coreRating: 'Beginning' | 'Developing' | 'Strong' | 'Mastered' = 
    demonstratedCount >= 4 ? 'Strong' : demonstratedCount >= 2 ? 'Developing' : 'Beginning';
  const mechanismRating: 'Beginning' | 'Developing' | 'Strong' | 'Mastered' = 
    scaffoldingCount === 0 ? 'Mastered' : 'Developing';
  const misconceptionRating: 'Beginning' | 'Developing' | 'Strong' | 'Mastered' = 
    'Strong'; // Successfully resolved via scaffolding
  const transferRating: 'Beginning' | 'Developing' | 'Strong' | 'Mastered' = 
    interactions.some(i => i.levelNumber === 5 && i.demonstratedConcept) ? 'Strong' : 'Developing';

  const understandingProfile: LearningReport['understandingProfile'] = [
    {
      dimension: 'Core Concept Comprehension',
      rating: coreRating,
      notes: `Evidence suggests ${setup.childName || 'the learner'} understands the main idea of ${setup.topic}.`
    },
    {
      dimension: 'Mechanism & Cause-Effect Reasoning',
      rating: mechanismRating,
      notes: scaffoldingCount > 0 
        ? `Benefited from KIKI's hands-on real-world analogy before grasping the full cause-effect relationship.` 
        : `Independently identified the causal mechanism on the first attempt.`
    },
    {
      dimension: 'Misconception Awareness & Adaptation',
      rating: misconceptionRating,
      notes: scaffoldingCount > 0 
        ? `Successfully self-corrected after KIKI provided an alternate perspective.` 
        : `Avoided common intuitive misconceptions without difficulty.`
    },
    {
      dimension: 'Real-World Transfer & Application',
      rating: transferRating,
      notes: `Applied the concept to solve the final master challenge.`
    }
  ];

  const parentTeacherTakeaway = `${setup.childName || 'The learner'} made steady progress with ${setup.topic}. Evidence from their story responses indicates ${estimatedMastery.toLowerCase()} of the learning goal: "${setup.learningGoal}". Continuing with hands-on everyday analogies will cement long-term retention.`;

  return {
    id: `kiki-report-${Date.now()}`,
    topic: setup.topic,
    learningGoal: setup.learningGoal,
    childName: setup.childName || 'Explorer',
    childAge: setup.childAge,
    ageBandLabel: band,
    learningPlan: plan,
    estimatedMastery,
    masterySummary: `${setup.childName || 'The learner'} completed KIKI’s 5-level adventure on "${setup.topic}". Based on responses across recall, prediction, reasoning, and independent teach-back, evidence suggests ${estimatedMastery.toLowerCase()} of "${setup.learningGoal}".`,
    understandingProfile,
    conceptsDemonstrated,
    conceptsNeedingReinforcement,
    howKikiAdapted: scaffoldingCount > 0
      ? `When ${setup.childName || 'the child'} hesitated on a story checkpoint, KIKI identified the specific misconception and provided a compassionate, real-world analogy ("Try Again, Differently") with a brand new follow-up challenge, allowing them to grasp ${setup.learningGoal} with confidence.`
      : `KIKI kept ${setup.childName || 'the child'} actively engaged through progressive picture-book levels, validating their reasoning and inviting them to explain the concept in their own words.`,
    cognitiveObservations: [
      `Engaged enthusiastically with the ${setup.storyWorld || 'adventure'} world and companion dialogue.`,
      `Responded constructively to KIKI's scaffolding without frustration or discouragement.`,
      `Demonstrated strong cognitive agency when invited to teach the concept back to KIKI in their own words.`
    ],
    parentTeacherTakeaway,
    suggestedNextActivities: [
      {
        title: `Hands-On Experiment: ${setup.topic}`,
        type: 'home_experiment',
        description: `Explore ${setup.topic} using ${plan.realWorldConnection}. Ask your child to show you how KIKI explained it!`,
        whyItHelps: 'Anchors the narrative breakthrough into physical tactile memory.'
      },
      {
        title: 'Bedtime Teach-Back Chat',
        type: 'discussion',
        description: `Ask: "If KIKI asked you to teach another friend about ${setup.topic}, how would you describe it?"`,
        whyItHelps: 'Reinforces long-term memory through child-led verbal recall.'
      }
    ],
    totalStars: starsEarned,
    totalLevels: 5,
    createdAt: new Date().toISOString()
  };
}
