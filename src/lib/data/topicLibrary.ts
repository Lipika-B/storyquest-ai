export interface TopicPreset {
  id: string;
  topic: string;
  learningGoal: string;
  defaultStruggle?: string;
  suggestedAge: number;
  world: string;
  companion: string;
  interest: string;
  learningStyle: string;
}

export interface TopicCategory {
  id: string;
  name: string;
  emoji: string;
  worldName: string;
  description: string;
  topics: TopicPreset[];
}

export const TOPIC_LIBRARY: TopicCategory[] = [
  {
    id: 'math',
    name: 'Mathematics',
    emoji: '🚀',
    worldName: 'Space Station & Number Orbit',
    description: 'Turn abstract numbers into tactile, physical rocket missions and puzzle games.',
    topics: [
      {
        id: 'math-mult-7',
        topic: 'Multiplication (The 7 Times Table)',
        learningGoal: 'Understand that 7 × 6 means 7 equal groups of 6, and build from 7 × 5 = 35.',
        defaultStruggle: 'Understands multiplication as equal groups, but confuses 7 × 6 and 7 × 7.',
        suggestedAge: 9,
        world: 'space',
        companion: 'robot',
        interest: 'rockets and space fuel',
        learningStyle: 'adventure'
      },
      {
        id: 'math-fractions',
        topic: 'Comparing Fractions (1/3 vs 1/4)',
        learningGoal: 'Understand that the denominator is the number of slices: dividing a whole into more slices makes each slice smaller.',
        defaultStruggle: 'Thinks 1/4 is bigger than 1/3 because 4 is greater than 3.',
        suggestedAge: 11,
        world: 'kitchen',
        companion: 'child',
        interest: 'pizza baking and shield gems',
        learningStyle: 'mystery'
      },
      {
        id: 'math-addition-groups',
        topic: 'Addition & Regrouping',
        learningGoal: 'Understand that when you collect 10 ones, they bundle together into 1 ten.',
        defaultStruggle: 'Forgets to carry the ten when adding double-digit numbers.',
        suggestedAge: 7,
        world: 'forest',
        companion: 'animal',
        interest: 'collecting acorns and berries',
        learningStyle: 'discovery'
      },
      {
        id: 'math-time',
        topic: 'Telling Time on an Analog Clock',
        learningGoal: 'Understand that the short hand points to the hour while the long hand counts minutes by 5s.',
        defaultStruggle: 'Confuses the hour hand with the minute hand.',
        suggestedAge: 8,
        world: 'village',
        companion: 'magical',
        interest: 'clock towers and train departures',
        learningStyle: 'adventure'
      }
    ]
  },
  {
    id: 'science',
    name: 'Science & Nature',
    emoji: '🌳',
    worldName: 'Wonder Woods & Science Lab',
    description: 'Explore the mysteries of living things, light, weather, and the cosmos.',
    topics: [
      {
        id: 'sci-photosynthesis',
        topic: 'Why Plants Need Sunlight',
        learningGoal: 'Understand that green leaves act like tiny solar kitchens using sunlight, air, and water to make food.',
        defaultStruggle: 'Thinks plants eat garden dirt like cereal.',
        suggestedAge: 6,
        world: 'forest',
        companion: 'animal',
        interest: 'little sprouts and garden creatures',
        learningStyle: 'discovery'
      },
      {
        id: 'sci-water-cycle',
        topic: 'The Water Cycle',
        learningGoal: 'Understand that heat evaporates water into clouds, which cool down and fall as rain.',
        defaultStruggle: 'Thinks rainwater comes from giant tanks in the clouds.',
        suggestedAge: 8,
        world: 'ocean',
        companion: 'magical',
        interest: 'rain clouds and ocean currents',
        learningStyle: 'adventure'
      },
      {
        id: 'sci-gravity',
        topic: 'Gravity and Falling Objects',
        learningGoal: 'Understand that Earth pulls everything toward its center with an invisible downward tug.',
        defaultStruggle: 'Thinks heavy things fall faster than light things when air resistance is absent.',
        suggestedAge: 10,
        world: 'space',
        companion: 'robot',
        interest: 'astronauts and floating objects',
        learningStyle: 'mystery'
      },
      {
        id: 'sci-human-body',
        topic: 'How the Heart Pumps Blood',
        learningGoal: 'Understand that the heart is a muscular pump sending oxygen-rich blood through vessels to every muscle.',
        defaultStruggle: 'Thinks blood only moves when you shake your body.',
        suggestedAge: 9,
        world: 'school',
        companion: 'child',
        interest: 'running sports and health engines',
        learningStyle: 'discovery'
      }
    ]
  },
  {
    id: 'civic',
    name: 'Civic Sense & Community',
    emoji: '🏙️',
    worldName: 'Everyday City & Friendly Village',
    description: 'Crucial life habits: cleanliness, fairness, public responsibility, and empathy.',
    topics: [
      {
        id: 'civic-clean-places',
        topic: 'Keeping Public Places Clean',
        learningGoal: 'Understand that streets, parks, and buses belong to all of us, so littering ruins the space for everyone.',
        defaultStruggle: 'Drops wrappers on the ground assuming "someone else will sweep it up".',
        suggestedAge: 8,
        world: 'city',
        companion: 'monster',
        interest: 'park playgrounds and neighborhood animals',
        learningStyle: 'rescue'
      },
      {
        id: 'civic-queues-turns',
        topic: 'Waiting in Queues & Taking Turns',
        learningGoal: 'Understand that lines keep things fair and safe so the first person who arrived is served first.',
        defaultStruggle: 'Gets impatient and tries to push past others at the slide or counter.',
        suggestedAge: 6,
        world: 'school',
        companion: 'animal',
        interest: 'amusement park rides and bakery treats',
        learningStyle: 'real-life'
      },
      {
        id: 'civic-saving-water',
        topic: 'Saving Water at Home',
        learningGoal: 'Understand that fresh drinking water is precious and takes energy to reach our taps.',
        defaultStruggle: 'Leaves the tap running while brushing teeth.',
        suggestedAge: 7,
        world: 'everyday',
        companion: 'child',
        interest: 'bathroom bubbles and thirsty plants',
        learningStyle: 'discovery'
      },
      {
        id: 'civic-waste-segregation',
        topic: 'Waste Segregation (Wet & Dry Waste)',
        learningGoal: 'Understand that vegetable peels turn into rich soil compost while plastic must be recycled separately.',
        defaultStruggle: 'Mixes food scraps with plastic bottles in the same bin.',
        suggestedAge: 9,
        world: 'village',
        companion: 'robot',
        interest: 'gardening and recycling workshops',
        learningStyle: 'adventure'
      }
    ]
  },
  {
    id: 'self-care',
    name: 'Self-Care & Life Skills',
    emoji: '🧼',
    worldName: 'Healthy Habitats & Home Station',
    description: 'Empower children with independence, hygiene, and safe boundary awareness.',
    topics: [
      {
        id: 'care-handwashing',
        topic: '20-Second Soap Hand Washing',
        learningGoal: 'Understand that soap attaches to invisible germs and washes them down the drain like tiny slippery bubbles.',
        defaultStruggle: 'Only rinses hands with plain water for 2 seconds without using soap.',
        suggestedAge: 6,
        world: 'school',
        companion: 'animal',
        interest: 'bubble potions and playground fun',
        learningStyle: 'adventure'
      },
      {
        id: 'care-sleep-routine',
        topic: 'Why We Need Good Sleep',
        learningGoal: 'Understand that during deep sleep, the brain organizes memories and the body repairs muscles for tomorrow.',
        defaultStruggle: 'Wants to stay up late looking at screens and resists bedtime.',
        suggestedAge: 7,
        world: 'everyday',
        companion: 'magical',
        interest: 'night sky dreams and morning energy',
        learningStyle: 'mystery'
      },
      {
        id: 'care-lost-emergency',
        topic: 'What to Do If You Get Lost',
        learningGoal: 'Understand the "Stay Put & Find a Helper in Uniform" rule when separated from parents in public.',
        defaultStruggle: 'Panics and runs randomly through crowds looking for parents.',
        suggestedAge: 8,
        world: 'city',
        companion: 'child',
        interest: 'festivals, train stations, and shopping malls',
        learningStyle: 'rescue'
      }
    ]
  },
  {
    id: 'emotional',
    name: 'Emotional & Social Learning',
    emoji: '💛',
    worldName: 'Feelings Forest & Friendship Grove',
    description: 'Navigating big feelings, handling disappointment, building empathy, and resolving conflict.',
    topics: [
      {
        id: 'emo-disappointment',
        topic: 'Handling Disappointment',
        learningGoal: 'Understand that feeling sad when things don’t go our way is normal, and taking three deep breaths helps reset.',
        defaultStruggle: 'Reacts with big meltdowns or throwing things when a game is canceled.',
        suggestedAge: 7,
        world: 'forest',
        companion: 'monster',
        interest: 'building towers and rainy day board games',
        learningStyle: 'real-life'
      },
      {
        id: 'emo-saying-sorry',
        topic: 'Saying Sorry & Meaning It',
        learningGoal: 'Understand that a real apology has three parts: saying sorry, asking how to fix it, and changing the behavior.',
        defaultStruggle: 'Says a fast, grumpy "sorry" without understanding why a friend is hurt.',
        suggestedAge: 8,
        world: 'school',
        companion: 'animal',
        interest: 'art projects and sharing colored pencils',
        learningStyle: 'adventure'
      },
      {
        id: 'emo-losing-game',
        topic: 'Being a Good Sport When Losing',
        learningGoal: 'Understand that playing a game is about practicing and having fun together, not just winning.',
        defaultStruggle: 'Quits halfway or accuses friends of cheating when losing.',
        suggestedAge: 9,
        world: 'village',
        companion: 'child',
        interest: 'soccer matches and board games',
        learningStyle: 'real-life'
      }
    ]
  },
  {
    id: 'digital',
    name: 'Digital Safety',
    emoji: '🔐',
    worldName: 'Cyber City & Firewall Gate',
    description: 'Safe online habits, protecting private identity, and digital kindness.',
    topics: [
      {
        id: 'dig-privacy',
        topic: 'Online Privacy & Personal Info',
        learningGoal: 'Understand never to share full name, home address, or school with strangers in online games.',
        defaultStruggle: 'Types personal details in gaming chat boxes to make friends.',
        suggestedAge: 10,
        world: 'cyber',
        companion: 'robot',
        interest: 'video games and robot avatar builders',
        learningStyle: 'rescue'
      },
      {
        id: 'dig-screen-balance',
        topic: 'Screen-Time Balance',
        learningGoal: 'Understand that eyes and brains need breaks from screens to run around, stretch, and rest.',
        defaultStruggle: 'Loses track of hours on tablets and gets irritable when asked to stop.',
        suggestedAge: 9,
        world: 'city',
        companion: 'robot',
        interest: 'digital gadget inventors and outdoor treehouses',
        learningStyle: 'discovery'
      }
    ]
  },
  {
    id: 'everyday',
    name: 'Everyday Life & Kitchen Math',
    emoji: '🍳',
    worldName: 'KIKI’s Kitchen & Town Market',
    description: 'Practical daily intelligence: shopping, recipes, timetables, and budgeting.',
    topics: [
      {
        id: 'every-needs-wants',
        topic: 'Needs vs. Wants',
        learningGoal: 'Understand that needs (food, water, warm clothes) come first, while wants (extra toys, treats) come after.',
        defaultStruggle: 'Demands expensive toy sets at the grocery checkout thinking money is unlimited.',
        suggestedAge: 9,
        world: 'kitchen',
        companion: 'child',
        interest: 'market stalls and piggy banks',
        learningStyle: 'real-life'
      },
      {
        id: 'every-measuring-cooking',
        topic: 'Measuring Ingredients in the Kitchen',
        learningGoal: 'Understand why exact cup and spoon measurements matter when baking so the recipe works.',
        defaultStruggle: 'Pours random heaps of ingredients expecting a cake to turn out fine.',
        suggestedAge: 8,
        world: 'kitchen',
        companion: 'animal',
        interest: 'baking chocolate muffins and tea parties',
        learningStyle: 'discovery'
      }
    ]
  },
  {
    id: 'curiosity',
    name: '“Why Does This Happen?”',
    emoji: '🌈',
    worldName: 'Question Cloud & Mystery Valley',
    description: 'Curiosity-sparked explorations explaining daily phenomena through magical science.',
    topics: [
      {
        id: 'cur-sky-blue',
        topic: 'Why is the Sky Blue?',
        learningGoal: 'Understand that sunlight is made of all colors, but tiny air molecules scatter the short blue light everywhere.',
        defaultStruggle: 'Thinks the sky is blue because it reflects ocean water.',
        suggestedAge: 9,
        world: 'ocean',
        companion: 'magical',
        interest: 'rainbow prisms and cloud gliders',
        learningStyle: 'mystery'
      },
      {
        id: 'cur-shadows',
        topic: 'Why Do Shadows Happen?',
        learningGoal: 'Understand that light travels in straight beams, and when a solid object blocks it, a dark silhouette appears behind.',
        defaultStruggle: 'Thinks shadows are separate creatures that follow you around.',
        suggestedAge: 6,
        world: 'forest',
        companion: 'animal',
        interest: 'flashlights and funny shadow puppets',
        learningStyle: 'discovery'
      },
      {
        id: 'cur-popcorn',
        topic: 'Why Does Popcorn Pop?',
        learningGoal: 'Understand that a tiny drop of water inside the hard kernel turns to steam, builds pressure, and pops inside-out!',
        defaultStruggle: 'Thinks popcorn seeds are magic beans that inflate like balloons.',
        suggestedAge: 7,
        world: 'kitchen',
        companion: 'robot',
        interest: 'cooking snacks and movie night adventures',
        learningStyle: 'discovery'
      }
    ]
  }
];
