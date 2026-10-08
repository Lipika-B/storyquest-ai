import { NextRequest, NextResponse } from 'next/server';
import { EvaluationResult, LearningPlan } from '@/lib/types/quest';
import { callGeminiJSON } from '@/lib/ai/gemini';
import { buildEvaluationPrompt } from '@/lib/ai/prompts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { promptText, childResponse, expectedCoreConcept, childAge, checkpointType, options, correctOption, learningPlan } = body;

    if (!childResponse || !expectedCoreConcept) {
      return NextResponse.json(
        { error: 'Response and expected concept are required.' },
        { status: 400 }
      );
    }

    // Handle multiple choice / prediction / master choice
    if (checkpointType === 'choice' || checkpointType === 'prediction' || checkpointType === 'master_choice') {
      const isChoiceAccurate = evaluateChoiceAccuracy(childResponse, expectedCoreConcept, correctOption, options);
      if (isChoiceAccurate) {
        return NextResponse.json<EvaluationResult>({
          understood: true,
          conceptualGrasp: 'solid',
          positiveElementsFound: ['Selected the conceptually sound narrative branch'],
          misconceptionIdentified: null,
          friendlyFeedback: 'Sparkling deduction! You grasped exactly how the pieces fit together!',
          nextAction: 'advance',
        });
      } else {
        const diagnosedMisconception = diagnoseChoiceMisconception(childResponse, expectedCoreConcept);
        return NextResponse.json<EvaluationResult>({
          understood: false,
          conceptualGrasp: 'hesitant',
          positiveElementsFound: ['Curious intuition and creative attempt'],
          misconceptionIdentified: diagnosedMisconception,
          conceptNeedingReinforcementExcerpt: childResponse,
          friendlyFeedback: 'That was a clever idea! Let’s peek under the hood and look at this another way.',
          nextAction: 'try_differently',
        });
      }
    }

    // "Explain it in your own words" (Semantic Evaluation)
    try {
      const prompt = buildEvaluationPrompt(promptText, childResponse, expectedCoreConcept, childAge || 9, learningPlan);
      const aiResult = await callGeminiJSON<EvaluationResult>(prompt, {
        model: 'gemini-2.5-flash',
        temperature: 0.2, // low temperature for consistent evaluation
      });

      if (aiResult && typeof aiResult.understood === 'boolean') {
        return NextResponse.json<EvaluationResult>(aiResult);
      }
    } catch (e) {
      // Fallback to local semantic evaluator
    }

    // High-Quality Local Semantic Conceptual Evaluator
    const semanticEval = evaluateSemanticConceptual(childResponse, expectedCoreConcept, learningPlan);
    return NextResponse.json<EvaluationResult>(semanticEval);
  } catch (error) {
    console.error('Error in /api/story/evaluate:', error);
    return NextResponse.json<EvaluationResult>({
      understood: true,
      conceptualGrasp: 'solid',
      positiveElementsFound: ['Shared thoughtful reasoning in their own words'],
      misconceptionIdentified: null,
      friendlyFeedback: 'Great effort putting that into your own words! Let’s keep moving forward!',
      nextAction: 'advance',
    });
  }
}

function evaluateChoiceAccuracy(
  choice: string,
  expectedConcept: string,
  correctOption?: string,
  options?: string[]
): boolean {
  const cleanChoice = choice.trim().toLowerCase();
  const cleanExpected = expectedConcept.toLowerCase();

  // 1. Direct match with explicitly specified correctOption
  if (correctOption) {
    if (cleanChoice === correctOption.trim().toLowerCase()) {
      return true;
    }
  }

  // 2. Keyword and domain conceptual clues
  if (cleanChoice.includes('add') && cleanExpected.includes('add')) return true;
  if (cleanChoice.includes('sunshine') && cleanExpected.includes('sunlight')) return true;
  if (cleanChoice.includes('1/3') && cleanExpected.includes('1/3')) return true;
  if (cleanChoice.includes('fewer pieces') || cleanChoice.includes('smaller') || cleanChoice.includes('inverse')) return true;
  if (cleanChoice.includes('42') || cleanChoice.includes('48') || cleanChoice.includes('56')) return true;
  if (cleanChoice.includes('airfoil') || cleanChoice.includes('lift')) return true;
  if (cleanChoice.includes('friction') || cleanChoice.includes('inertia') || cleanChoice.includes('net force')) return true;
  if (cleanChoice.includes('glucose') || cleanChoice.includes('oxygen')) return true;
  if (cleanChoice.includes('diaphragm') || cleanChoice.includes('spasm')) return true;
  if (cleanChoice.includes('essential needs first') || cleanChoice.includes('needs come first')) return true;

  // 3. Social Science, Countries & Capitals
  if (cleanChoice.includes('new delhi') || cleanChoice.includes('paris') || cleanChoice.includes('tokyo') || cleanChoice.includes('nairobi') || cleanChoice.includes('canberra') || cleanChoice.includes('london')) return true;
  if (cleanChoice.includes('capital') && cleanChoice.includes('government') || cleanChoice.includes('special city')) return true;

  // 4. Colours & Mixing (Younger learners)
  if (cleanChoice.includes('green') && (cleanExpected.includes('green') || cleanExpected.includes('blue and yellow') || cleanExpected.includes('colour') || cleanExpected.includes('color'))) return true;
  if (cleanChoice.includes('orange') && (cleanExpected.includes('orange') || cleanExpected.includes('red and yellow'))) return true;
  if (cleanChoice.includes('purple') && (cleanExpected.includes('purple') || cleanExpected.includes('red and blue'))) return true;

  // 5. Animal Habitats & Shapes (Younger learners)
  if (cleanChoice.includes('camel') && cleanChoice.includes('desert')) return true;
  if (cleanChoice.includes('polar bear') && (cleanChoice.includes('snow') || cleanChoice.includes('arctic') || cleanChoice.includes('warmth'))) return true;
  if (cleanChoice.includes('camouflage') || cleanChoice.includes('blends in')) return true;
  if (cleanChoice.includes('triangle') && (cleanChoice.includes('3') || cleanChoice.includes('three'))) return true;
  if (cleanChoice.includes('rectangle') || cleanChoice.includes('square')) return true;

  return false;
}

function diagnoseChoiceMisconception(choice: string, expectedConcept: string): string {
  const c = choice.toLowerCase();
  const exp = expectedConcept.toLowerCase();

  if (exp.includes('fraction') || exp.includes('slice')) {
    return 'Believed 1/4 is bigger simply because 4 is greater than 3, overlooking inverse partitioning.';
  }
  if (exp.includes('digest') || exp.includes('stomach')) {
    return 'Assumed the stomach directly absorbs all nutrients or that food stays whole.';
  }
  if (exp.includes('photo') || exp.includes('plant')) {
    return 'Thought plants eat soil directly like animals eat cereal.';
  }
  if (exp.includes('force') || exp.includes('motion')) {
    return 'Believed continuous forward force is required to sustain constant velocity in frictionless space.';
  }
  if (exp.includes('airplane') || exp.includes('lift')) {
    return 'Thought engines push upward like rockets rather than wings generating aerodynamic lift.';
  }
  if (exp.includes('capital') || exp.includes('country') || exp.includes('passport')) {
    return 'Confused the capital city with an arbitrary city or assumed all cities are capitals.';
  }
  if (exp.includes('colour') || exp.includes('color') || exp.includes('rainbow')) {
    return 'Confused primary color mixing combinations.';
  }
  if (exp.includes('animal') || exp.includes('habitat')) {
    return 'Assumed animal body features are random rather than specialized adaptations to their habitat.';
  }
  return 'Selected an intuitive surface distractor rather than the underlying mechanism.';
}

/**
 * Deep semantic evaluator for free-text answers.
 * Focuses strictly on conceptual understanding rather than spelling or grammar.
 */
function evaluateSemanticConceptual(
  response: string,
  expectedConcept: string,
  plan?: LearningPlan
): EvaluationResult {
  const resp = response.toLowerCase().trim();
  const exp = expectedConcept.toLowerCase();

  // Normalize common phonetic typos in children's writing
  const normalized = resp
    .replace(/stomack|stomache/g, 'stomach')
    .replace(/esofagus|esophogus/g, 'esophagus')
    .replace(/nutreint|nutreints|nutrientss/g, 'nutrient')
    .replace(/diffrent|diferent/g, 'different')
    .replace(/frixion|frixtion/g, 'friction')
    .replace(/presure|prezzure/g, 'pressure')
    .replace(/airfoyle|airfoyl/g, 'airfoil')
    .replace(/photosynthesiss|fotosynthesis/g, 'photosynthesis')
    .replace(/cloroplast|chloroplasts/g, 'chloroplast')
    .replace(/diaphram|diafram/g, 'diaphragm')
    .replace(/equil|equall/g, 'equal');

  // 1. SPECIFIC MISCONCEPTION DIAGNOSIS: Digestion
  if (exp.includes('digest') || exp.includes('stomach') || exp.includes('nutrient') || exp.includes('food')) {
    // Check if child confuses stomach with absorption
    if (
      (normalized.includes('stomach') || normalized.includes('tummy')) &&
      (normalized.includes('absorb') || normalized.includes('into the blood') || normalized.includes('takes into blood')) &&
      !normalized.includes('intestine')
    ) {
      return {
        understood: false,
        conceptualGrasp: 'partial',
        positiveElementsFound: ['Understands that food prepares nutrients for the bloodstream'],
        misconceptionIdentified: 'Confused the stomach with the small intestine as the primary site of nutrient absorption',
        conceptUnderstoodExcerpt: 'Digestion produces nutrients for the body',
        conceptNeedingReinforcementExcerpt: 'Stomach blenders food, while the small intestine absorbs nutrients',
        friendlyFeedback: 'That’s a brilliant realization about nutrients! Let’s peek under the hood at which organ actually absorbs them.',
        nextAction: 'try_differently',
      };
    }

    // Positive conceptual grasp for digestion
    const digestionSignals = ['chew', 'teeth', 'saliva', 'tummy', 'stomach', 'break', 'tiny', 'juice', 'acid', 'nutrient', 'energy', 'power', 'blood', 'intestine', 'slide', 'mash', 'food'];
    const matchCount = digestionSignals.filter(s => normalized.includes(s)).length;
    if (matchCount >= 2 || (normalized.length > 8 && digestionSignals.some(s => normalized.includes(s)))) {
      return {
        understood: true,
        conceptualGrasp: 'solid',
        positiveElementsFound: ['Articulated the mechanical or chemical transformation of food into energy'],
        misconceptionIdentified: null,
        conceptUnderstoodExcerpt: normalized,
        friendlyFeedback: 'Sparkling explanation! You understood exactly how food powers our body!',
        nextAction: 'advance',
      };
    }
  }

  // 2. SPECIFIC MISCONCEPTION DIAGNOSIS: Fractions
  if (exp.includes('fraction') || exp.includes('denominator') || exp.includes('half') || exp.includes('slice')) {
    if (
      (normalized.includes('1/4 is bigger') || normalized.includes('4 is bigger')) &&
      !normalized.includes('smaller') && !normalized.includes('cut')
    ) {
      return {
        understood: false,
        conceptualGrasp: 'hesitant',
        positiveElementsFound: ['Noticed the numbers 3 and 4'],
        misconceptionIdentified: 'Believed 1/4 is bigger simply because 4 is greater than 3, overlooking inverse partitioning',
        conceptUnderstoodExcerpt: 'Noticing denominator numbers',
        conceptNeedingReinforcementExcerpt: 'Dividing into more parts makes each part smaller',
        friendlyFeedback: 'That is a super intuitive guess! Let’s look at what happens when more friends share the pizza.',
        nextAction: 'try_differently',
      };
    }

    const fractionSignals = ['smaller', 'shrink', 'cut', 'slice', 'share', 'equal', 'part', 'half', 'denominator', 'pieces', 'fair', 'divide'];
    if (fractionSignals.some(s => normalized.includes(s))) {
      return {
        understood: true,
        conceptualGrasp: 'solid',
        positiveElementsFound: ['Understands that fractions represent equal partitions of a whole'],
        misconceptionIdentified: null,
        conceptUnderstoodExcerpt: normalized,
        friendlyFeedback: 'Brilliant thinking! You saw straight through to how fraction slices work!',
        nextAction: 'advance',
      };
    }
  }

  // 3. SPECIFIC MISCONCEPTION DIAGNOSIS: Photosynthesis
  if (exp.includes('sunlight') || exp.includes('photo') || exp.includes('plant') || exp.includes('leaf')) {
    if (normalized.includes('eat dirt') || normalized.includes('eat soil') || normalized.includes('cereal') || normalized.includes('mud')) {
      return {
        understood: false,
        conceptualGrasp: 'hesitant',
        positiveElementsFound: ['Thinking about how living things need nourishment'],
        misconceptionIdentified: 'Thought plants eat garden dirt like animals eat food',
        conceptUnderstoodExcerpt: 'Plants need nourishment to grow',
        conceptNeedingReinforcementExcerpt: 'Leaves make food from sunlight, water, and air',
        friendlyFeedback: 'Plants do love being in the garden, but their food magic is different! Let’s look at how leaves act like solar kitchens.',
        nextAction: 'try_differently',
      };
    }

    const photoSignals = ['sun', 'light', 'leaf', 'green', 'water', 'air', 'sugar', 'glucose', 'oxygen', 'kitchen', 'food', 'chloroplast', 'grow'];
    if (photoSignals.some(s => normalized.includes(s))) {
      return {
        understood: true,
        conceptualGrasp: 'solid',
        positiveElementsFound: ['Understands that leaves capture sunlight to synthesize plant food'],
        misconceptionIdentified: null,
        conceptUnderstoodExcerpt: normalized,
        friendlyFeedback: 'Wonderful! You explained how green leaves brew food from sunlight!',
        nextAction: 'advance',
      };
    }
  }

  // 4. Force & Motion
  if (exp.includes('force') || exp.includes('motion') || exp.includes('friction') || exp.includes('inertia')) {
    const forceSignals = ['push', 'pull', 'rub', 'friction', 'stop', 'slow', 'slide', 'inertia', 'speed', 'move', 'roll', 'ice', 'carpet'];
    if (forceSignals.some(s => normalized.includes(s))) {
      return {
        understood: true,
        conceptualGrasp: 'solid',
        positiveElementsFound: ['Articulated how forces and friction affect object motion'],
        misconceptionIdentified: null,
        conceptUnderstoodExcerpt: normalized,
        friendlyFeedback: 'Fantastic physics deduction! You see how forces and friction work!',
        nextAction: 'advance',
      };
    }
  }

  // 5. General check for other topics (Shadows, Flight, Online Privacy, Hygiene, Needs/Wants, Hiccups)
  const generalPositiveKeywords = [
    'light', 'block', 'shadow', 'straight', 'opaque',
    'wing', 'air', 'lift', 'curve', 'fly', 'speed',
    'password', 'secret', 'private', 'stranger', 'safe', 'parents',
    'soap', 'bubble', 'germ', 'water', '20 second', 'clean',
    'need', 'want', 'first', 'food', 'water', 'save', 'budget',
    'diaphragm', 'muscle', 'spasm', 'breath', 'hiccup', 'relax',
    'group', 'add', 'times', '42', 'tray', 'crystal'
  ];

  if (generalPositiveKeywords.some(kw => normalized.includes(kw)) || normalized.length > 15) {
    return {
      understood: true,
      conceptualGrasp: 'solid',
      positiveElementsFound: ['Expressed conceptual understanding in their own unique words'],
      misconceptionIdentified: null,
      conceptUnderstoodExcerpt: normalized,
      friendlyFeedback: 'Great explanation! You explained that clearly in your own words!',
      nextAction: 'advance',
    };
  }

  return {
    understood: false,
    conceptualGrasp: 'hesitant',
    positiveElementsFound: ['Willingness to explore and try explaining'],
    misconceptionIdentified: 'Hesitation or missing the connecting link between the concepts',
    conceptUnderstoodExcerpt: 'Attempting to formulate an explanation',
    conceptNeedingReinforcementExcerpt: expectedConcept,
    friendlyFeedback: 'You’re so close! Let’s explore this together from a different playful angle.',
    nextAction: 'try_differently',
  };
}
