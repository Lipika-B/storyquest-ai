import { NextRequest, NextResponse } from 'next/server';
import { AdaptiveScaffolding, ParentSetup } from '@/lib/types/quest';
import { callGeminiJSON } from '@/lib/ai/gemini';
import { buildScaffoldingPrompt } from '@/lib/ai/prompts';
import { CURRICULUM_PRESETS } from '@/lib/ai/mockData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, childResponse, expectedConcept, misconception, setup, checkpointId } = body;

    // Check if preset has an authored alternate scaffolding first for instant reliability
    if (checkpointId) {
      for (const preset of CURRICULUM_PRESETS) {
        if (preset.scaffolding[checkpointId]) {
          return NextResponse.json<AdaptiveScaffolding>(preset.scaffolding[checkpointId]);
        }
      }
    }

    // Call Gemini to craft dynamic alternate scaffolding
    const prompt = buildScaffoldingPrompt(
      question || 'Explain the concept',
      childResponse || '',
      expectedConcept || '',
      misconception || null,
      setup as ParentSetup
    );

    const aiResult = await callGeminiJSON<AdaptiveScaffolding>(prompt, {
      model: 'gemini-2.5-flash',
      temperature: 0.5,
    });

    if (aiResult && aiResult.alternateAnalogy && aiResult.followUpPrompt) {
      return NextResponse.json<AdaptiveScaffolding>(aiResult);
    }

    // Reliable fallback scaffolding
    const fallbackScaffolding: AdaptiveScaffolding = {
      encouragingNote: 'You took a fantastic step! Let’s picture this in our hands like building blocks.',
      characterGuidance: '“Wait! Come look over here at this picture with me!”',
      alternateAnalogy: `Instead of thinking about numbers or definitions, imagine you are holding this in your own hands. If you have equal piles or pieces, adding or sharing just changes how much each person gets!`,
      realWorldConnection: `Just like sharing your favorite snack with friends or packing toys into boxes.`,
      followUpPrompt: `Let’s test the secret together: which idea feels right?`,
      options: [
        `The pieces work together in equal amounts to build the whole`,
        `It changes completely every time`,
      ],
      expectedConcept: expectedConcept || 'Equal parts making a whole',
    };

    return NextResponse.json<AdaptiveScaffolding>(fallbackScaffolding);
  } catch (error) {
    console.error('Error in /api/story/adapt:', error);
    return NextResponse.json<AdaptiveScaffolding>({
      encouragingNote: 'Let’s look at this secret shortcut together!',
      characterGuidance: '“Let’s try a playful hands-on clue!”',
      alternateAnalogy: 'Think of this like climbing stairs: take one step at a time!',
      realWorldConnection: 'Every step gets you closer to the top.',
      followUpPrompt: 'Which step gets us to the next milestone?',
      options: ['Taking one steady step forward', 'Jumping all the way back to zero'],
      expectedConcept: 'Steady progress by equal steps',
    });
  }
}
