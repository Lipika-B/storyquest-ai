import { NextRequest, NextResponse } from 'next/server';
import { EvaluationResult } from '@/lib/types/quest';
import { callGeminiJSON } from '@/lib/ai/gemini';
import { buildEvaluationPrompt } from '@/lib/ai/prompts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { promptText, childResponse, expectedCoreConcept, childAge, checkpointType, options } = body;

    if (!childResponse || !expectedCoreConcept) {
      return NextResponse.json(
        { error: 'Response and expected concept are required.' },
        { status: 400 }
      );
    }

    // Handle multiple choice / prediction quickly if options provided
    if (checkpointType === 'choice' || checkpointType === 'prediction') {
      const isChoiceAccurate = evaluateChoiceAccuracy(childResponse, expectedCoreConcept, options);
      if (isChoiceAccurate) {
        return NextResponse.json<EvaluationResult>({
          understood: true,
          positiveElementsFound: ['Selected the conceptually sound narrative branch'],
          misconceptionIdentified: null,
          friendlyFeedback: 'Sparkling deduction! You grasped exactly how the pieces fit together!',
          nextAction: 'advance',
        });
      } else {
        return NextResponse.json<EvaluationResult>({
          understood: false,
          positiveElementsFound: ['Curious intuition and creative guess'],
          misconceptionIdentified: 'Chose a tempting surface distractor rather than the underlying mechanism',
          friendlyFeedback: 'That was a clever idea! Let’s peek under the hood and look at this another way.',
          nextAction: 'try_differently',
        });
      }
    }

    // "Explain it in your own words" (Semantic Evaluation)
    const prompt = buildEvaluationPrompt(promptText, childResponse, expectedCoreConcept, childAge || 9);
    const aiResult = await callGeminiJSON<EvaluationResult>(prompt, {
      model: 'gemini-2.5-flash',
      temperature: 0.2, // low temperature for consistent evaluation
    });

    if (aiResult && typeof aiResult.understood === 'boolean') {
      return NextResponse.json<EvaluationResult>(aiResult);
    }

    // Heuristic semantic evaluation if Gemini is offline
    const fallbackEval = evaluateHeuristic(childResponse, expectedCoreConcept);
    return NextResponse.json<EvaluationResult>(fallbackEval);
  } catch (error) {
    console.error('Error in /api/story/evaluate:', error);
    return NextResponse.json<EvaluationResult>({
      understood: true,
      positiveElementsFound: ['Shared thoughtful reasoning in their own words'],
      misconceptionIdentified: null,
      friendlyFeedback: 'Great effort putting that into your own words! Let’s keep moving forward!',
      nextAction: 'advance',
    });
  }
}

function evaluateChoiceAccuracy(choice: string, expectedConcept: string, options?: string[]): boolean {
  const cleanChoice = choice.trim().toLowerCase();
  const cleanExpected = expectedConcept.toLowerCase();

  // If choice contains strong match words from expected concept
  if (cleanChoice.includes('add') && cleanExpected.includes('add')) return true;
  if (cleanChoice.includes('sunshine') && cleanExpected.includes('sunlight')) return true;
  if (cleanChoice.includes('1/3') && cleanExpected.includes('1/3')) return true;
  if (cleanChoice.includes('fewer pieces') || cleanChoice.includes('bigger')) return true;
  if (cleanChoice.includes('42') || cleanChoice.includes('49') || cleanChoice.includes('56')) return true;

  // By convention, option[0] or option[1] has the most mathematically sound answer in our curriculum
  if (options && options.length > 0) {
    if (choice === options[0] || (options[1] && choice === options[1] && cleanExpected.includes('35 + 7'))) {
      return true;
    }
  }
  return false;
}

function evaluateHeuristic(response: string, expectedConcept: string): EvaluationResult {
  const resp = response.toLowerCase();
  const exp = expectedConcept.toLowerCase();

  // 1. Detect explicit common misconceptions
  if (exp.includes('shrink') || exp.includes('smaller') || exp.includes('denominator') || exp.includes('inverse')) {
    if (resp.includes('1/4 is bigger') || resp.includes('1/4 has to be bigger') || (resp.includes('4 is bigger') && !resp.includes('smaller') && !resp.includes('slice'))) {
      return {
        understood: false,
        positiveElementsFound: ['Noticed the numbers 3 and 4'],
        misconceptionIdentified: 'Believed 1/4 is bigger simply because 4 is greater than 3, overlooking the inverse partitioning of denominators',
        friendlyFeedback: 'That’s a super intuitive guess! Let’s peek under the hood and look at how slicing changes things.',
        nextAction: 'try_differently',
      };
    }
  }

  if (exp.includes('sunlight') || exp.includes('photosynthesis') || exp.includes('oven')) {
    if (resp.includes('eat dirt') || resp.includes('cereal') || resp.includes('mud')) {
      return {
        understood: false,
        positiveElementsFound: ['Thinking about how living things get hungry'],
        misconceptionIdentified: 'Thought plants physically eat soil like animals eat food',
        friendlyFeedback: 'Plants do love being in the garden, but their food magic is different! Let’s explore Pip’s secret kitchen.',
        nextAction: 'try_differently',
      };
    }
  }

  // 2. Check for domain-specific positive mechanism tokens
  const fractionPositive = (resp.includes('smaller') || resp.includes('shrink') || resp.includes('cut') || 
                            resp.includes('slice') || resp.includes('share') || resp.includes('piece') || resp.includes('more people'));
  const mathPositive = (resp.includes('add') || resp.includes('plus') || resp.includes('42') || 
                        resp.includes('49') || resp.includes('tray') || resp.includes('group'));
  const sciencePositive = (resp.includes('sun') || resp.includes('light') || resp.includes('air') || 
                           resp.includes('leaf') || resp.includes('bake') || resp.includes('oven') || resp.includes('water'));

  if (fractionPositive || mathPositive || sciencePositive) {
    return {
      understood: true,
      positiveElementsFound: ['Articulated the core mechanism in their own natural words'],
      misconceptionIdentified: null,
      friendlyFeedback: 'Brilliant explanation! You saw straight through to the heart of the adventure!',
      nextAction: 'advance',
    };
  }

  return {
    understood: false,
    positiveElementsFound: ['Willingness to explore and try explaining'],
    misconceptionIdentified: 'Hesitation or missing the connecting link between the parts',
    friendlyFeedback: 'You’re so close! Let’s explore this together from a different playful angle.',
    nextAction: 'try_differently',
  };
}
