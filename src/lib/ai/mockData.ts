import { ParentSetup, StoryChapter, AdaptiveScaffolding, LearningReport, EvaluationResult } from '../types/quest';

export interface CurriculumPreset {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  setup: ParentSetup;
  chapters: StoryChapter[];
  scaffolding: Record<string, AdaptiveScaffolding>;
  demoReport: LearningReport;
}

export const CURRICULUM_PRESETS: CurriculumPreset[] = [
  {
    id: 'multiplication-7',
    badge: 'Ages 8-10 • Math',
    title: 'The Great Space Bakery & The 7-Crate Mystery',
    subtitle: 'Understands multiplication, but struggles with the 7 times table',
    setup: {
      childName: 'Alex',
      childAge: 9,
      topic: 'The 7 Times Table and Multiples',
      specificNeed: 'Understands multiplication as equal groups, but gets stuck on 7x6 and 7x7',
      setting: 'space',
      characterStyle: 'robot',
      learningStyle: 'adventure',
      realWorldContext: 'baking cosmic fuel pies'
    },
    chapters: [
      {
        chapterNumber: 1,
        title: 'The Blinking Oven of Station 7',
        badgeEmoji: '🤖',
        keyConceptHighlight: 'Multiplication means equal groups: 7 packs containing identical amounts.',
        storyText: [
          'High above the rings of Saturn, Bolt the Baker-Bot was in a cosmic frenzy! The Space Explorer Fleet was landing in twenty minutes, and every shuttle engine ran on warm Star-Cakes.',
          '“BEEP-BOOP! Catastrophe!” Bolt clanked, waving a metallic rolling pin. “The recipe manual says each cargo tray holds exactly 7 Star-Cakes. Commander Vega just ordered 5 full trays for the scout team!”',
          'Bolt quickly counted: “5 trays with 7 cakes each... that’s 7 + 7 + 7 + 7 + 7 = 35 cakes! Easy as stardust.” But then the red emergency beacon flashed. Commander Vega radioed in: “Change of plans, Bolt! We need 6 trays, not 5!” Bolt froze. His gears whirred in smoke: “Wait... what is 7 times 6? Do I have to recount all 42 from scratch?!”'
        ],
        checkpoint: {
          id: 'c1-mult7',
          type: 'choice',
          prompt: 'How can Bolt find 7 × 6 without counting from one all over again?',
          characterSpeaker: 'Bolt the Robot',
          characterDialogue: '“My battery is draining! Since I already know 5 trays hold 35 Star-Cakes, what should I do to find 6 trays?”',
          options: [
            'Start over and count from 1 to 42 on mechanical fingers',
            'Take 35 and add just 1 more tray of 7 (35 + 7 = 42)',
            'Multiply 35 by 6',
            'Guess 36 because 6 is one more than 5'
          ],
          expectedCoreConcept: 'Building on known benchmark (5x7=35) by adding one more group of 7',
          scaffoldingHint: 'Think about how many cakes are in just ONE new tray!'
        }
      },
      {
        chapterNumber: 2,
        title: 'The Secret of the Stepping Stones',
        badgeEmoji: '🥧',
        keyConceptHighlight: 'Using friendly benchmarks: 7x6 is just 5 groups of 7 plus 1 more group of 7.',
        storyText: [
          '“CLANK-TASTIC!” Bolt whistled in joy. Adding 7 to 35 was so much faster than recounting from one! 35 + 7 = 42 gleaming Star-Cakes clicked neatly into the trays.',
          'Just as the engines purred, a giant silver cruiser zoomed into the docking bay. It was the Flagship! Captain Orion stepped out: “Baker-Bot, our long-range booster needs 7 full trays of 7 Star-Cakes!”',
          'Bolt looked at his trays. He had 6 trays (42 cakes). Now he needed 7 trays! He whispered to you: “Friend, my logic chip is glowing. Can you explain to me how 7 × 7 works using what we already baked?”'
        ],
        checkpoint: {
          id: 'c2-mult7',
          type: 'own_words',
          prompt: 'In your own words, explain how Bolt can figure out 7 × 7 using the 42 cakes he already has in 6 trays!',
          characterSpeaker: 'Bolt the Robot',
          characterDialogue: '“Teach my robot circuits! Why don’t I need to start from zero? Explain it to me in your own words!”',
          expectedCoreConcept: 'Since 6 trays of 7 is 42, 7 trays of 7 is just 42 plus one more group of 7 (42 + 7 = 49).',
          scaffoldingHint: 'Explain how adding one more tray of 7 gives the answer!'
        }
      },
      {
        chapterNumber: 3,
        title: 'The Fleet Takes Flight!',
        badgeEmoji: '🚀',
        keyConceptHighlight: 'Mastering the pattern: 7x5=35, 7x6=42, 7x7=49 makes you unstoppable.',
        storyText: [
          'Bolt listened with wide glowing optical sensors. “Of course! 6 trays had 42 cakes. One more tray of 7 means 42 + 7 = 49 cakes!”',
          'With a triumphant beep, Bolt slid the 49th golden cake into the flagship power chamber. The cruiser’s engines lit up in brilliant turquoise light. Captain Orion gave a crisp salute: “Top marks, Chief Baker! The fleet is energized!”',
          'Bolt danced a happy robot jig. “We cracked the 7s together! Whenever I get stuck on 7 times 6 or 7 times 7, I just step up from my friendly 5s tray!”'
        ],
        checkpoint: {
          id: 'c3-mult7',
          type: 'prediction',
          prompt: 'What happens next if Captain Orion returns tomorrow and asks for 8 trays?',
          characterSpeaker: 'Bolt the Robot',
          characterDialogue: '“Now that we know 7 × 7 = 49, what will happen to find 7 × 8?”',
          options: [
            'We take 49 and add one more group of 7 (49 + 7 = 56)',
            'The number goes down because 8 is bigger',
            'We must restart from 7 x 1 again',
            'Bolt will have an error code'
          ],
          expectedCoreConcept: 'Repeated addition of equal groups continues: 49 + 7 = 56',
          scaffoldingHint: 'Just keep adding one more group of 7!'
        }
      }
    ],
    scaffolding: {
      'c1-mult7': {
        encouragingNote: 'You are on the right track! Let’s think about this like stacking lunch boxes.',
        characterGuidance: '“Beep! Let’s look at the trays on my metal table!”',
        alternateAnalogy: 'Imagine 5 trays are already sitting on the counter with 35 cakes total. You don’t throw them away! You just slide in ONE more tray that has 7 cakes on it.',
        realWorldConnection: 'When you buy 5 packs of 7 stickers, and then your friend hands you 1 more pack of 7, how many stickers did you add?',
        followUpPrompt: 'If you have 35 cakes and add 1 more tray with 7 cakes, what is 35 + 7?',
        options: ['42 cakes', '36 cakes', '50 cakes'],
        expectedConcept: '35 + 7 = 42'
      },
      'c2-mult7': {
        encouragingNote: 'Super effort! Let’s look at the secret shortcut together.',
        characterGuidance: '“Bolt’s antennas are wiggling! Let’s break it down simply.”',
        alternateAnalogy: 'Think of counting by 7s like jumping on stepping stones across a river: 35 (stone 5), splash jump +7 gets you to 42 (stone 6). What stone do you land on if you jump +7 one more time?',
        realWorldConnection: 'Like days of the week: every week has 7 days. 6 weeks is 42 days. One more week is 42 + 7 days!',
        followUpPrompt: 'Bolt already has 42 cakes in 6 trays. How many cakes are in 1 extra tray, and what is 42 + 7?',
        options: ['49 cakes (42 + 7)', '45 cakes', '60 cakes'],
        expectedConcept: '42 + 7 = 49'
      }
    },
    demoReport: {
      id: 'rep-mult7',
      topic: 'The 7 Times Table and Multiples',
      specificNeed: 'Understands multiplication as equal groups, but gets stuck on 7x6 and 7x7',
      childName: 'Alex',
      childAge: 9,
      ageBandLabel: 'Curious Adventurer (Ages 8-10)',
      estimatedMastery: 'Strong Understanding',
      masterySummary: 'Alex demonstrated a solid intuitive grasp of using "friendly benchmarks" (5x7=35) to bridge into trickier combinations like 7x6 (42) and 7x7 (49) rather than relying on rote memorization.',
      conceptsDemonstrated: [
        {
          concept: 'Multiplication as equal groups',
          evidenceQuote: '“Because 5 trays had 35, and adding one more tray with 7 makes 42 without starting over.”',
          observation: 'Recognized that 7x6 is one additional group of 7 beyond 5x7.'
        },
        {
          concept: 'Benchmark progression (35 ➔ 42 ➔ 49)',
          evidenceQuote: '“42 plus 7 is 49 because each tray always holds seven.”',
          observation: 'Applied the pattern forward to derive 7x7 independently.'
        }
      ],
      conceptsNeedingReinforcement: [
        {
          concept: 'Automaticity under speed',
          diagnosedHurdle: 'Tends to hesitate when jumping backwards (e.g. finding 7x6 from 7x10=70).',
          recommendation: 'Practice "two-way anchors" using both 5x7 (35) going up and 10x7 (70) stepping down.'
        }
      ],
      cognitiveObservations: [
        'Engaged deeply with the robot character dialogue and visual tray metaphor.',
        'Explained the concept clearly in conversational terms rather than reciting math jargon.',
        'Showed confidence once the physical anchor (cookie trays) was introduced.'
      ],
      suggestedNextActivities: [
        {
          title: 'The Egg Carton Multiplier (Kitchen Math)',
          type: 'hands_on_game',
          description: 'Take an empty egg carton or muffin tin with 6 or 7 cups. Place 7 small dried beans or beads into each cup. Practice pulling one cup away or adding one cup.',
          whyItHelps: 'Physically seeing the group of 7 being added builds muscle memory.'
        },
        {
          title: 'Calendar Jumping Game',
          type: 'discussion',
          description: 'Look at a paper calendar month. Pick the 7th, 14th, 21st, 28th, and have your child predict what day comes in 7 more days.',
          whyItHelps: 'Connects the 7 times table directly to real-world weekly cycles.'
        }
      ],
      totalStars: 3,
      createdAt: new Date().toISOString()
    }
  },
  {
    id: 'photosynthesis-early',
    badge: 'Ages 5-7 • Science',
    title: 'Pip the Little Leaf’s Sunny Kitchen',
    subtitle: 'Thinks plants eat soil like humans eat breakfast',
    setup: {
      childName: 'Lily',
      childAge: 6,
      topic: 'How Plants Make Food (Photosynthesis)',
      specificNeed: 'Thinks plants eat dirt like cereal; needs to understand leaves catch sunlight and air',
      setting: 'forest',
      characterStyle: 'animal',
      learningStyle: 'adventure',
      realWorldContext: 'cooking and drinking water'
    },
    chapters: [
      {
        chapterNumber: 1,
        title: 'Pip’s Hungry Morning',
        badgeEmoji: '🌱',
        keyConceptHighlight: 'Plants don’t eat dirt! Roots drink water, and leaves catch sunshine.',
        storyText: [
          'Under the great oak tree, Pip the Tiny Green Sprout poked his two little leaves up through the moss. His tummy let out a gentle squeak.',
          'Barnaby the bushy-tailed squirrel bounded over with an acorn. “Good morning, Pip! Are you hungry? Here, take a big bite of this crunchy brown dirt!”',
          'Pip wiggled his stem and giggled. “Silly Barnaby! Plants don’t have mouths to chew dirt! My roots drink clean water from underground, but my real breakfast comes from high in the sky!”'
        ],
        checkpoint: {
          id: 'c1-photo',
          type: 'choice',
          prompt: 'What does Pip’s little green leaf reach up to catch to make food?',
          characterSpeaker: 'Barnaby the Squirrel',
          characterDialogue: '“Wait! If you don’t eat dirt, what are your little green hands reaching up for?”',
          options: [
            'Warm golden sunshine and fresh morning air',
            'Slices of pizza falling from trees',
            'Dirt sandwiches',
            'Nothing, plants never need food'
          ],
          expectedCoreConcept: 'Leaves absorb sunlight and air to make food',
          scaffoldingHint: 'Think about what shines warm and bright above the forest!'
        }
      },
      {
        chapterNumber: 2,
        title: 'The Green Kitchen Magic',
        badgeEmoji: '☀️',
        keyConceptHighlight: 'Leaves act like tiny solar kitchens mixing sunlight, air, and water.',
        storyText: [
          '“Ooh!” chattered Barnaby, tucking his acorn into his cheek. “Sunshine and air?! How can sunshine turn into yummy food inside a leaf?”',
          'Pip unfurled his tiny green leaf toward the bright morning light. Inside the leaf, thousands of tiny green helpers called chloroplasts were buzzing with energy.',
          '“My leaf is a tiny solar kitchen!” Pip beamed. “Watch! When the sun warms me up, I take a sip of water from my roots and a breath of forest air. Can you explain to Barnaby how my leaf bakes its own sweet plant snack?”'
        ],
        checkpoint: {
          id: 'c2-photo',
          type: 'own_words',
          prompt: 'In your own words, tell Barnaby how Pip makes food without a spoon or a bowl!',
          characterSpeaker: 'Barnaby the Squirrel',
          characterDialogue: '“I’m just a squirrel with a bushy tail! Explain it in your own words so I understand!”',
          expectedCoreConcept: 'The green leaf uses sunlight like an oven to mix water and air into sweet food for the plant.',
          scaffoldingHint: 'Tell Barnaby what 3 things Pip uses: sun, water, and air!'
        }
      },
      {
        chapterNumber: 3,
        title: 'The Sweetest Flower Blooms',
        badgeEmoji: '🌸',
        keyConceptHighlight: 'Plants give us fresh oxygen while making their food.',
        storyText: [
          'Barnaby clapped his fluffy paws together. “So the sun is the chef’s fire, water is the juice, and air is the secret spice!”',
          'Suddenly, Pip’s stem stood tall and proud. A tiny pink flower bud popped open at the tip, releasing a sweet honey scent into the forest breeze.',
          '“And look what I made for you, Barnaby!” Pip whispered. “While I was making my sweet plant food, my leaves puffed out fresh clean air for you to breathe!” Barnaby took a deep, happy breath. “Thank you, little green chef!”'
        ],
        checkpoint: {
          id: 'c3-photo',
          type: 'prediction',
          prompt: 'What would happen to Pip if we covered him with a dark box where no sunlight could reach him?',
          characterSpeaker: 'Barnaby the Squirrel',
          characterDialogue: '“If Pip had water but was trapped in total darkness, could he still make his lunch?”',
          options: [
            'No, because without sunlight his little kitchen has no energy to cook!',
            'Yes, because he can just eat the cardboard box',
            'He would grow ten times faster',
            'He would turn into a mushroom'
          ],
          expectedCoreConcept: 'Sunlight is essential energy for photosynthesis',
          scaffoldingHint: 'Can an oven bake cookies if the heat is turned off?'
        }
      }
    ],
    scaffolding: {
      'c1-photo': {
        encouragingNote: 'You’re doing great! Let’s think about what happens on a sunny day.',
        characterGuidance: '“Barnaby is tilting his head! Let’s show him what leaves do.”',
        alternateAnalogy: 'Think of Pip’s leaves like little solar panels on the roof of a house. When you put solar panels in the sun, they catch light to make power!',
        realWorldConnection: 'Have you ever felt warm sunshine on your skin? Pip’s leaf feels that warmth and uses it like a little battery!',
        followUpPrompt: 'Does Pip get his power from chewing dirt, or from catching bright sunshine?',
        options: ['Catching bright sunshine and air', 'Chewing dirt with teeth'],
        expectedConcept: 'Sunlight provides energy'
      },
      'c2-photo': {
        encouragingNote: 'Wonderful try! Let’s make a recipe together.',
        characterGuidance: '“Pip wiggles his green stem happily!”',
        alternateAnalogy: 'Imagine baking a cake: you need water, flour (from air), and an oven (sunshine) to bake it! If you forget the sunshine, the cake can’t bake.',
        realWorldConnection: 'When a plant gets water and sits in the sun on your windowsill, what happens to its leaves?',
        followUpPrompt: 'What does Pip need to mix together to make plant food?',
        options: ['Sunshine, water, and air', 'Cereal, milk, and spoon', 'Rocks and mud'],
        expectedConcept: 'Sunshine + water + air'
      }
    },
    demoReport: {
      id: 'rep-photo',
      topic: 'How Plants Make Food (Photosynthesis)',
      specificNeed: 'Thinks plants eat dirt like cereal; needs to understand leaves catch sunlight and air',
      childName: 'Lily',
      childAge: 6,
      ageBandLabel: 'Early Explorer (Ages 5-7)',
      estimatedMastery: 'Mastered Concept',
      masterySummary: 'Lily successfully replaced the common misconception that plants "eat soil" with the scientific understanding that leaves absorb sunlight, water, and air to make their own food.',
      conceptsDemonstrated: [
        {
          concept: 'Sunlight as food-making energy',
          evidenceQuote: '“His leaves open up like little hands to catch the warm sun and drink water from the bottom.”',
          observation: 'Accurately articulated the role of leaves and roots without confusing dirt with food.'
        },
        {
          concept: 'Need for light energy',
          evidenceQuote: '“If it’s dark he can’t cook his lunch because the sun oven is off.”',
          observation: 'Understood that without sunlight, plants cannot sustain themselves.'
        }
      ],
      conceptsNeedingReinforcement: [
        {
          concept: 'The role of soil (nutrients vs food)',
          diagnosedHurdle: 'Understands soil isn’t food, but may wonder why soil is needed at all.',
          recommendation: 'Introduce soil minerals as "vitamins in a glass of water" rather than fuel.'
        }
      ],
      cognitiveObservations: [
        'Responded enthusiastically to the personified plant character (Pip).',
        'Used vivid sensory language ("warm sun", "sun oven") demonstrating age-appropriate conceptual grounding.',
        'Listened intently to the read-aloud story cues.'
      ],
      suggestedNextActivities: [
        {
          title: 'The Celery Water Straw Experiment',
          type: 'home_experiment',
          description: 'Place a stalk of celery with leaves into a glass of water with red food coloring. Check it together after 4 hours to see the red water traveling up to the leaves.',
          whyItHelps: 'Visually proves that roots and stems act like drinking straws.'
        },
        {
          title: 'Sprout in a Bag (Window Garden)',
          type: 'home_experiment',
          description: 'Dampen a paper towel, put a dry bean seed inside a clear ziplock bag, and tape it to a sunny window. Watch the sprout seek the sun.',
          whyItHelps: 'Lets the child witness the leaf opening to sunlight every morning.'
        }
      ],
      totalStars: 3,
      createdAt: new Date().toISOString()
    }
  },
  {
    id: 'fractions-upper',
    badge: 'Ages 11-13 • Math',
    title: 'The Quantum Shield Generator: 1/3 vs 1/4',
    subtitle: 'Thinks 1/4 is bigger than 1/3 because 4 is greater than 3',
    setup: {
      childName: 'Devon',
      childAge: 12,
      topic: 'Comparing Fractions & Denominators',
      specificNeed: 'Struggles with inverse denominator size: thinks 1/4 is greater than 1/3 because 4 > 3',
      setting: 'space',
      characterStyle: 'child',
      learningStyle: 'mystery',
      realWorldContext: 'quantum shield generators and pizza slices'
    },
    chapters: [
      {
        chapterNumber: 1,
        title: 'The Breach at Sector Delta',
        badgeEmoji: '🛡️',
        keyConceptHighlight: 'The denominator represents how many equal pieces a whole is divided into.',
        storyText: [
          'Alarm sirens blared through the bridge of the orbital defense station. Asteroid shower incoming! Cadet Devon sprinted to the energy defense console.',
          'Chief Engineer Kael shouted over the din: “Devon! We have one full standard battery cell remaining. We need to divert maximum power to the magnetic deflector. You have two capacitor modes: Mode Alpha channels 1/3 of the battery, while Mode Beta channels 1/4 of the battery!”',
          'Devon paused. “Wait... 4 is bigger than 3, so Mode Beta with 1/4 must channel more power, right?” Chief Kael shook his head urgently: “Check your fraction mechanics, Cadet! What does the denominator actually do to the whole battery?!”'
        ],
        checkpoint: {
          id: 'c1-frac',
          type: 'choice',
          prompt: 'Which fraction of the battery actually provides the larger amount of energy?',
          characterSpeaker: 'Chief Engineer Kael',
          characterDialogue: '“Look at the denominator! If you cut the exact same battery into 3 pieces versus 4 pieces, which pieces are larger?”',
          options: [
            '1/3 is larger because cutting into fewer pieces makes each piece bigger',
            '1/4 is larger because 4 is bigger than 3',
            'They are equal because both have 1 on top',
            'It is impossible to tell without knowing the color'
          ],
          expectedCoreConcept: 'As denominator increases, each unit fraction becomes smaller because the whole is split into more parts.',
          scaffoldingHint: 'If you share a pizza between 3 people vs 4 people, who gets the bigger slice?'
        }
      },
      {
        chapterNumber: 2,
        title: 'The Division Paradox',
        badgeEmoji: '⚡',
        keyConceptHighlight: 'Understanding inverse proportion: larger denominator = smaller unit slice.',
        storyText: [
          'Devon flipped the switch to Mode Alpha (1/3). The magnetic deflector hummed with deep resonance, vaporizing the first incoming boulder into harmless dust.',
          '“Good save!” Chief Kael grinned. “Now, look at the apprentice console across from us. Junior Cadet Liam is about to calibrate the backup deflector and says he wants 1/6 of a power cell because ‘6 is huge!’”',
          'Chief Kael turned to Devon: “Cadet, explain it to Liam in your own words so he never makes this dangerous mistake during battle again!”'
        ],
        checkpoint: {
          id: 'c2-frac',
          type: 'own_words',
          prompt: 'Explain to Cadet Liam why 1/3 is bigger than 1/4 (and way bigger than 1/6), even though the number at the bottom is smaller!',
          characterSpeaker: 'Chief Engineer Kael',
          characterDialogue: '“Give Liam the technical breakdown in your own words! Why does a bigger bottom number mean a smaller piece?”',
          expectedCoreConcept: 'The bottom number (denominator) tells you how many slices you had to cut the whole into. Dividing by more pieces shrinks the size of each piece.',
          scaffoldingHint: 'Compare dividing a battery into 3 slices versus 6 slices!'
        }
      },
      {
        chapterNumber: 3,
        title: 'Full Shield Equilibrium',
        badgeEmoji: '🌌',
        keyConceptHighlight: 'Equivalence and ordering: 1/2 > 1/3 > 1/4 > 1/8.',
        storyText: [
          'Cadet Liam’s eyes lit up in comprehension. “Whoa! The bottom number isn’t how many items I HAVE—it’s how many times the whole was sliced up! So more slices equals smaller portions!”',
          'Liam adjusted his dial to combine 1/3 + 1/3 + 1/3 to form a 100% complete resonant shield. The remaining asteroid belt safely skipped off the emerald forcefield like pebbles on water.',
          'Chief Kael nodded with deep respect: “Outstanding deduction, Cadet Devon. You didn’t just guess the formula—you understood the mathematical mechanism of division.”'
        ],
        checkpoint: {
          id: 'c3-frac',
          type: 'prediction',
          prompt: 'If an emergency requires splitting an energy crystal between 8 backup shields (1/8 each) vs 4 shields (1/4 each), how does the size of 1/8 compare to 1/4?',
          characterSpeaker: 'Chief Engineer Kael',
          characterDialogue: '“Quick tactical check! How does 1/8 compare to 1/4?”',
          options: [
            '1/8 is exactly half the size of 1/4 because 8 pieces divides each fourth in two',
            '1/8 is twice as big as 1/4 because 8 is 2 x 4',
            '1/8 and 1/4 are unrelated',
            '1/8 creates more total power than the whole crystal'
          ],
          expectedCoreConcept: '1/8 is half of 1/4 because denominator doubled',
          scaffoldingHint: 'Think about cutting a quarter slice in half again!'
        }
      }
    ],
    scaffolding: {
      'c1-frac': {
        encouragingNote: 'Great intuitive question! Let’s think about sharing a favorite food.',
        characterGuidance: '“Chief Kael points to the visual holograph on the screen!”',
        alternateAnalogy: 'Imagine you order one giant pizza. In Scenario A, you share it with 3 friends (3 pieces). In Scenario B, 10 people show up (10 pieces). When 10 people share, your slice is tiny! The bigger the denominator, the smaller your share.',
        realWorldConnection: 'Think about time: 1/2 of an hour is 30 minutes, but 1/4 of an hour is only 15 minutes. 4 is bigger than 2, but 15 minutes is smaller than 30!',
        followUpPrompt: 'If you cut a cake into 3 slices, is each slice bigger or smaller than if you cut it into 4 slices?',
        options: ['Bigger when cut into 3 slices (1/3 > 1/4)', 'Smaller when cut into 3 slices'],
        expectedConcept: '1/3 is bigger than 1/4'
      },
      'c2-frac': {
        encouragingNote: 'You have the right intuition! Let’s put the concept into words.',
        characterGuidance: '“Kael nods encouragingly!”',
        alternateAnalogy: 'The denominator is a divider. It’s the number of people sharing the treasure. More people sharing = smaller cut for everyone.',
        realWorldConnection: 'Sharing $12 with 3 people gives $4 each (1/3). Sharing $12 with 4 people gives $3 each (1/4).',
        followUpPrompt: 'Does the bottom number tell you how many pieces you get, or how many pieces the whole was cut into?',
        options: ['How many pieces the whole was cut into (more cuts = smaller pieces)', 'How many pieces you get to keep'],
        expectedConcept: 'Denominator represents total partitions'
      }
    },
    demoReport: {
      id: 'rep-frac',
      topic: 'Comparing Fractions & Denominators',
      specificNeed: 'Struggles with inverse denominator size: thinks 1/4 is greater than 1/3 because 4 > 3',
      childName: 'Devon',
      childAge: 12,
      ageBandLabel: 'Master Sleuth (Ages 11-13)',
      estimatedMastery: 'Mastered Concept',
      masterySummary: 'Devon demonstrated strong conceptual understanding that denominators represent the total number of partitions of a whole, correctly explaining why unit fractions decrease in value as the denominator increases.',
      conceptsDemonstrated: [
        {
          concept: 'Inverse denominator relationship',
          evidenceQuote: '“Because the bottom number means you cut the whole into more pieces, so each piece ends up smaller.”',
          observation: 'Clearly explained partitioning and inverse relationship without relying on mechanical tricks.'
        },
        {
          concept: 'Fractional comparison & scaling (1/8 vs 1/4)',
          evidenceQuote: '“1/8 is smaller than 1/4 because you halved the fourths into eight parts.”',
          observation: 'Applied deductive logic to predict higher denominator behavior.'
        }
      ],
      conceptsNeedingReinforcement: [
        {
          concept: 'Comparing fractions with unlike numerators',
          diagnosedHurdle: 'Currently confident with unit fractions (1/n); next step is comparing fractions like 2/3 vs 3/5.',
          recommendation: 'Introduce common denominator modeling using rectangular grids.'
        }
      ],
      cognitiveObservations: [
        'Engaged with the sci-fi engineering problem context.',
        'Demonstrated strong verbal reasoning when asked to explain the concept to a peer.',
        'Successfully transitioned from initial misconception to deep explanatory confidence.'
      ],
      suggestedNextActivities: [
        {
          title: 'The Paper Strip Fraction Kit',
          type: 'hands_on_game',
          description: 'Cut 4 strips of equal-length colored paper. Fold strip 1 into halves (1/2), strip 2 into thirds (1/3), strip 3 into fourths (1/4), strip 4 into eighths (1/8). Lay them side-by-side.',
          whyItHelps: 'Irrefutable visual and tactile proof of slice sizes.'
        },
        {
          title: 'Fraction Ruler Challenge',
          type: 'discussion',
          description: 'Examine a standard physical ruler marked with 1/2, 1/4, 1/8, and 1/16 inch marks. Have your child find why 1/8 mark is shorter than the 1/4 mark.',
          whyItHelps: 'Bridges conceptual understanding directly into everyday measurement tools.'
        }
      ],
      totalStars: 3,
      createdAt: new Date().toISOString()
    }
  }
];
