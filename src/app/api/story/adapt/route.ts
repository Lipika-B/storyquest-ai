import { NextRequest, NextResponse } from 'next/server';
import { AdaptiveScaffolding, ParentSetup, LearningPlan } from '@/lib/types/quest';
import { callGeminiJSON } from '@/lib/ai/gemini';
import { buildScaffoldingPrompt } from '@/lib/ai/prompts';
import { distributeOptions } from '@/lib/utils/quiz';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, childResponse, expectedConcept, misconception, setup, learningPlan } = body;

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
    try {
      const prompt = buildScaffoldingPrompt(
        question || 'Explain the concept',
        childResponse || '',
        expectedConcept || safeSetup.learningGoal,
        misconception || null,
        safeSetup,
        learningPlan
      );

      const aiResult = await callGeminiJSON<AdaptiveScaffolding>(prompt, {
        model: 'gemini-2.5-flash',
        temperature: 0.5,
      });

      if (aiResult && aiResult.alternateAnalogy && aiResult.followUpPrompt && Array.isArray(aiResult.options)) {
        return NextResponse.json<AdaptiveScaffolding>(aiResult);
      }
    } catch (e) {
      // Fallback to local adaptive synthesizer
    }

    // Dynamic contextual fallback scaffolding targeting specific diagnosed misconception
    const scaffoldedResult = synthesizeLocalScaffolding(safeSetup, question, childResponse, expectedConcept, misconception, learningPlan);
    return NextResponse.json<AdaptiveScaffolding>(scaffoldedResult);
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
      targetedMisconception: 'Initial hesitation'
    });
  }
}

function synthesizeLocalScaffolding(
  setup: ParentSetup,
  question: string,
  childResponse: string,
  expectedConcept: string,
  misconception?: string | null,
  plan?: LearningPlan
): AdaptiveScaffolding {
  const misc = (misconception || '').toLowerCase();
  const exp = (expectedConcept || setup.learningGoal || '').toLowerCase();
  const interest = setup.interest || 'everyday items';

  function wrap(
    base: Omit<AdaptiveScaffolding, 'options' | 'correctOption'>,
    rawOptions: string[]
  ): AdaptiveScaffolding {
    const distributed = distributeOptions(rawOptions);
    return {
      ...base,
      options: distributed.options,
      correctOption: distributed.correctOption,
    };
  }

  // 1. Digestion: Confused stomach with small intestine absorption
  if (misc.includes('absorb') || misc.includes('stomach') || exp.includes('digest')) {
    return wrap({
      encouragingNote: `KIKI says: "You discovered the secret of nutrients! Now let's see which organ drinks them up!"`,
      kikiExpression: 'explaining',
      kikiDialogue: `“Think of the stomach like a kitchen blender, and the small intestine like a thirsty sponge!”`,
      alternateAnalogy: `The stomach mashes your food into smooth soup, but it doesn't soak it up. Next, the soup enters the small intestine, whose sponge-like villi absorb the tiny nutrients directly into the blood!`,
      realWorldConnection: `Just like blending a fruit smoothie in a blender, then using a straw or sponge to drink it!`,
      followUpPrompt: `Which organ works like the blender that mashes food, and which works like the sponge that absorbs nutrients into the blood?`,
      expectedConcept: 'The small intestine absorbs nutrients, while the stomach mechanically churns food',
      targetedMisconception: misconception || 'Confused stomach churning with intestinal absorption'
    }, [
      'The stomach blenders food into soup, while the small intestine absorbs nutrients into the blood',
      'The stomach absorbs all nutrients while the intestines sleep'
    ]);
  }

  // 2. Fractions: Confused 1/4 with being bigger than 1/3
  if (misc.includes('1/4') || misc.includes('denominator') || exp.includes('fraction')) {
    return wrap({
      encouragingNote: `KIKI says: "That was an intuitive guess! Now let's look at what happens when more friends share!"`,
      kikiExpression: 'explaining',
      kikiDialogue: `“Imagine sharing a fresh pizza with friends! If more people share, do you get a bigger slice or a smaller slice?”`,
      alternateAnalogy: `If only 2 friends share a pizza (1/2), each gets a huge half! If 4 friends share (1/4), the pizza has to be cut into 4 smaller slices. More cuts divide the whole into smaller pieces!`,
      realWorldConnection: `Sharing a birthday cake with 4 friends gives you a smaller slice than sharing with only 2 friends!`,
      followUpPrompt: `Who gets the bigger slice of pizza: someone sharing among 3 friends (1/3) or someone sharing among 4 friends (1/4)?`,
      expectedConcept: 'Dividing into more parts decreases the size of each part (1/3 > 1/4)',
      targetedMisconception: misconception || 'Assuming larger denominator means larger fraction'
    }, [
      '1/3 is bigger because cutting into 3 pieces leaves bigger slices than cutting into 4 pieces (1/3 > 1/4)',
      '1/4 is bigger because the number 4 is larger'
    ]);
  }

  // 3. Photosynthesis: Thought plants eat soil/dirt
  if (misc.includes('dirt') || misc.includes('soil') || exp.includes('photo')) {
    return wrap({
      encouragingNote: `KIKI says: "You noticed plants live in the garden! But their kitchen magic is in the leaves!"`,
      kikiExpression: 'explaining',
      kikiDialogue: `“Garden soil holds the roots in place, but leaves act like tiny solar ovens!”`,
      alternateAnalogy: `A flower pot holds dirt to keep roots steady, but leaves use sunlight like tiny solar panels to mix water and air into sweet plant sugar!`,
      realWorldConnection: `Just like a solar oven uses sun rays to bake snacks!`,
      followUpPrompt: `Where do green leaves get the energy to brew their plant food?`,
      expectedConcept: 'Leaves use sunlight, water, and air to make food',
      targetedMisconception: misconception || 'Thought plants eat soil like animals eat food'
    }, [
      'Sunlight energy captured by green leaves (photosynthesis)',
      'Eating dirt with a fork like breakfast cereal'
    ]);
  }

  // 4. Force & Motion: Inertia & Friction
  if (misc.includes('continuous') || misc.includes('friction') || exp.includes('force')) {
    return wrap({
      encouragingNote: `KIKI says: "Great intuition! Let's imagine gliding on ultra-smooth ice!"`,
      kikiExpression: 'explaining',
      kikiDialogue: `“On rough grass, friction grabs the wheels. But what happens on smooth ice?”`,
      alternateAnalogy: `When you glide on ice, you keep coasting effortlessly without pushing! In deep space with zero friction or air resistance, an object will coast forward forever at the exact same speed until a reverse push stops it!`,
      realWorldConnection: `Ice hockey pucks sliding across slick ice compared to stopping on rough pavement.`,
      followUpPrompt: `In deep space with zero friction, does a gliding probe need its engine on just to keep moving forward?`,
      expectedConcept: 'Objects maintain uniform motion unless acted upon by net force (Inertia)',
      targetedMisconception: misconception || 'Believed continuous force is required to sustain speed'
    }, [
      'No, inertia keeps it moving at constant speed without burning any fuel',
      'Yes, it falls out of the sky the moment engines turn off'
    ]);
  }

  // 5. Airplanes: Lift & Airfoil
  if (misc.includes('engine') || misc.includes('rocket') || exp.includes('lift') || exp.includes('airplane')) {
    return wrap({
      encouragingNote: `KIKI says: "Let's test moving air with a fun paper trick!"`,
      kikiExpression: 'explaining',
      kikiDialogue: `“Hold a strip of paper under your lip and blow fast air over the curved top!”`,
      alternateAnalogy: `When you blow fast air over the curved top of the paper, the paper floats UP! Fast air over the curved wing lowers air pressure above, and the higher pressure underneath pushes the wing up into the sky!`,
      realWorldConnection: `Sticking your hand out of a moving car window and tilting it upward to feel the wind lift your palm.`,
      followUpPrompt: `What creates the upward push (Lift) that keeps an airplane flying in the sky?`,
      expectedConcept: 'Fast air over curved wings generates upward Lift',
      targetedMisconception: misconception || 'Thought engines push upward rather than wings creating lift'
    }, [
      'Rushing air over curved wings creating lower pressure above and an upward push from below',
      'Engines pointing downward to push the plane up like a rocket'
    ]);
  }

  // 6. Countries & Capitals (World Passport)
  if (misc.includes('capital') || exp.includes('capital') || exp.includes('country') || exp.includes('passport')) {
    return wrap({
      encouragingNote: `KIKI stamps your passport! "Every country has one special headquarters city where leaders meet!"`,
      kikiExpression: 'explaining',
      kikiDialogue: `“Think of a country like a big school, and the capital city is the principal’s main office!”`,
      alternateAnalogy: `While a country has lots of wonderful towns and cities, the capital is the main governing center where leaders work and where national decisions are made! For example, New Delhi is the capital of India, Paris is the capital of France, and Tokyo is the capital of Japan!`,
      realWorldConnection: `Just like every school has one main head office where the principal works!`,
      followUpPrompt: `What is a capital city?`,
      expectedConcept: 'The capital is the main governing headquarters city of a country',
      targetedMisconception: misconception || 'Confused capital city with arbitrary town'
    }, [
      'The special headquarters city where government leaders make laws and represent the nation',
      'Any random town where someone had a picnic yesterday'
    ]);
  }

  // 7. Colours & Rainbow Mixing
  if (misc.includes('colour') || misc.includes('color') || exp.includes('colour') || exp.includes('color') || exp.includes('rainbow')) {
    return wrap({
      encouragingNote: `KIKI says: "Grab your paintbrush! Let’s mix primary paints together!"`,
      kikiExpression: 'explaining',
      kikiDialogue: `“Blue is cool like water, and Yellow is warm like sunshine. When they hold hands, what magic appears?”`,
      alternateAnalogy: `Red, Yellow, and Blue are pure primary colors that can't be made by mixing. But when you mix two primaries together: Blue + Yellow turns into fresh Green! Red + Yellow turns into warm Orange! Red + Blue turns into deep Purple!`,
      realWorldConnection: `Watching yellow sunlight hit blue ocean water to make sparkling green waves!`,
      followUpPrompt: `Which two primary colors mix together to create vibrant green?`,
      expectedConcept: 'Mixing Blue and Yellow creates Green',
      targetedMisconception: misconception || 'Confused primary color mixing'
    }, [
      'Blue and Yellow mix together to make Green',
      'Red and Black mix together to make Green'
    ]);
  }

  // 8. Animal Habitats & Adaptations
  if (misc.includes('animal') || misc.includes('habitat') || exp.includes('animal') || exp.includes('habitat')) {
    return wrap({
      encouragingNote: `KIKI says: "Look at the animals' amazing coats and paws!"`,
      kikiExpression: 'explaining',
      kikiDialogue: `“Animals have special body superpowers perfectly built for where they live!”`,
      alternateAnalogy: `Camels have wide padded feet so they don’t sink into desert sand, and humps to store fat for energy. Polar bears have thick fat and warm white fur to stay toasty and camouflage in arctic snow! Their bodies adapt to their home!`,
      realWorldConnection: `Putting on a warm snow jacket in winter and light sandals at the beach!`,
      followUpPrompt: `Why do animals have special physical features like thick fur or camel humps?`,
      expectedConcept: 'Animal bodies have adaptations suited to survive in their specific habitat',
      targetedMisconception: misconception || 'Assumed animal bodies are random'
    }, [
      'Their special features help them survive and thrive in their unique habitat',
      'Animals choose their fur colors at the clothes store'
    ]);
  }

  // Default Universal Adaptive Scaffolding
  return wrap({
    encouragingNote: `KIKI says: "That was a clever try! Let's look at this secret shortcut another way."`,
    kikiExpression: 'explaining',
    kikiDialogue: `“Wait! Don't worry about getting it on the first try. Let's imagine our ${interest} sitting right in front of us!”`,
    alternateAnalogy: `Instead of trying to remember all the pieces at once, picture ${setup.learningGoal}. When you look at how the parts connect step by step, the core pattern becomes crystal clear!`,
    realWorldConnection: `Just like solving a puzzle piece by piece with friends!`,
    followUpPrompt: `Let’s test the secret rule: Which choice explains how this works?`,
    expectedConcept: expectedConcept || setup.learningGoal,
    targetedMisconception: misconception || 'Needs an alternate tangible analogy'
  }, [
    `The core rule: ${setup.learningGoal}`,
    `It changes completely randomly every second`
  ]);
}
