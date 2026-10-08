import { NextRequest, NextResponse } from 'next/server';
import { AdaptiveScaffolding, ParentSetup } from '@/lib/types/quest';
import { callGeminiJSON } from '@/lib/ai/gemini';
import { buildScaffoldingPrompt } from '@/lib/ai/prompts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, childResponse, expectedConcept, misconception, setup } = body;

    const safeSetup: ParentSetup = setup || {
      childName: 'Explorer',
      childAge: 8,
      topic: 'Learning Concept',
      learningGoal: expectedConcept || 'Understand the pattern',
      interest: 'puzzles and games',
      storyWorld: 'forest',
      companionType: 'animal'
    };

    // Attempt Gemini call
    const prompt = buildScaffoldingPrompt(
      question || 'Explain the concept',
      childResponse || '',
      expectedConcept || safeSetup.learningGoal,
      misconception || null,
      safeSetup
    );

    const aiResult = await callGeminiJSON<AdaptiveScaffolding>(prompt, {
      model: 'gemini-2.5-flash',
      temperature: 0.5,
    });

    if (aiResult && aiResult.alternateAnalogy && aiResult.followUpPrompt) {
      return NextResponse.json<AdaptiveScaffolding>(aiResult);
    }

    // Dynamic contextual fallback scaffolding:
    const interest = safeSetup.interest || 'everyday items';
    const fallbackScaffolding: AdaptiveScaffolding = {
      encouragingNote: `KIKI says: "That was a clever guess! Let's look at this secret shortcut another way."`,
      kikiExpression: 'explaining',
      kikiDialogue: `“Wait! Don't worry about getting it on the first try. Let's imagine our ${interest} sitting right in front of us!”`,
      alternateAnalogy: `Instead of trying to remember all the pieces at once, picture ${safeSetup.learningGoal}. When you look at equal groups or steps, adding one more piece makes the whole picture clear!`,
      realWorldConnection: `Just like arranging ${interest} in neat rows or sharing snacks with friends!`,
      followUpPrompt: `Let’s test the secret: How does this connect to our goal?`,
      options: [
        `The pieces work together in equal amounts: ${safeSetup.learningGoal}`,
        `We have to restart and count every single item from one again`
      ],
      expectedConcept: expectedConcept || safeSetup.learningGoal,
    };

    return NextResponse.json<AdaptiveScaffolding>(fallbackScaffolding);
  } catch (error) {
    console.error('Error in /api/story/adapt:', error);
    return NextResponse.json<AdaptiveScaffolding>({
      encouragingNote: `KIKI says: "Let's explore this with an easier clue!"`,
      kikiExpression: 'explaining',
      kikiDialogue: `“Let's take it one step at a time together!”`,
      alternateAnalogy: `Think of this like climbing a staircase: each step lifts you by the exact same height!`,
      realWorldConnection: `One step at a time always gets us to the top.`,
      followUpPrompt: `Which step gets us to our goal?`,
      options: ['Taking one steady step forward together', 'Jumping all the way back to zero'],
      expectedConcept: 'Steady progress by equal steps',
    });
  }
}
