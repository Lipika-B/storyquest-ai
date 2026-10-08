import { ParentSetup, StoryLevel, SceneVisualDetails, LearningPlan, QuestionType } from '../types/quest';

interface CompanionDetails {
  name: string;
  role: string;
  sound: string;
  avatarEmoji: string;
}

export function getCompanionDetails(type?: string): CompanionDetails {
  switch (type) {
    case 'robot':
      return {
        name: 'Bolt the Robot',
        role: 'a cheerful mechanical helper with glowing dials',
        sound: 'BEEP-BOOP!',
        avatarEmoji: '🤖'
      };
    case 'animal':
      return {
        name: 'Momo the Monkey',
        role: 'a playful, curious jungle buddy',
        sound: 'Ooh-ooh-aah!',
        avatarEmoji: '🐒'
      };
    case 'child':
      return {
        name: 'Sammy the Explorer',
        role: 'a brave fellow kid with an adventure map',
        sound: 'Aha!',
        avatarEmoji: '👧'
      };
    case 'magical':
      return {
        name: 'Lumi the Star-Sprite',
        role: 'a glowing winged sprite with sparkling stardust',
        sound: 'Tinkle-sparkle!',
        avatarEmoji: '✨'
      };
    case 'monster':
      return {
        name: 'Grumble the Fuzzy Monster',
        role: 'a giant gentle monster who loves tidy parks',
        sound: 'Rumble-hum!',
        avatarEmoji: '👾'
      };
    default:
      return {
        name: 'Pip the Companion',
        role: 'a loyal and clever adventure buddy',
        sound: 'Let’s go!',
        avatarEmoji: '🌟'
      };
  }
}

export function getWorldDetails(world?: string): { settingName: string; icon: string; description: string } {
  switch (world) {
    case 'space':
      return { settingName: 'Cosmic Orbit Station', icon: '🚀', description: 'twinkling starfields and floating gadgets' };
    case 'forest':
      return { settingName: 'Wonder Woods', icon: '🌲', description: 'mossy treehouses and sunlit canopies' };
    case 'city':
      return { settingName: 'Everyday City', icon: '🏙️', description: 'bustling crosswalks and park fountains' };
    case 'kitchen':
      return { settingName: "KIKI's Discovery Kitchen", icon: '🍳', description: 'baking pans and measuring spoons' };
    case 'ocean':
      return { settingName: 'Coral Bay Reef', icon: '🐠', description: 'sunlit tidal pools and colorful sea caves' };
    case 'school':
      return { settingName: 'Sunny Valley Academy', icon: '🏫', description: 'colorful science lab and library nooks' };
    case 'cyber':
      return { settingName: 'Cyber Quest Grid', icon: '💻', description: 'glowing data streams and playful digital portals' };
    case 'fantasy':
      return { settingName: 'Enchanted Kingdom', icon: '🏰', description: 'sparkling towers and gentle mythical friends' };
    case 'village':
      return { settingName: 'Sunflower Hamlet', icon: '🏡', description: 'cobblestone paths and community gardens' };
    case 'sky':
      return { settingName: 'Sunbeam Airfield', icon: '✈️', description: 'soaring cloud gliders and open skies' };
    default:
      return { settingName: 'Wonderland Realm', icon: '🗺️', description: 'a vibrant world of hands-on discovery' };
  }
}

/**
 * AI LEARNING PLAN GENERATOR
 * The AI determines pedagogical objectives, key concepts, vocabulary, and likely misconceptions
 * BEFORE generating any narrative elements.
 */
export function generateLearningPlan(setup: ParentSetup): LearningPlan {
  const age = setup.childAge || 9;
  const topicLower = setup.topic.toLowerCase();
  const goal = setup.learningGoal || setup.topic;

  // Determine Subject Category
  let category: LearningPlan['subjectCategory'] = 'custom';
  if (
    topicLower.includes('multipl') || 
    topicLower.includes('fraction') || 
    topicLower.includes('addition') || 
    topicLower.includes('decimal') || 
    topicLower.includes('percent') || 
    topicLower.includes('ratio') || 
    topicLower.includes('geometry') || 
    topicLower.includes('graph') ||
    topicLower.includes('math')
  ) {
    category = 'mathematics';
  } else if (
    topicLower.includes('digest') || 
    topicLower.includes('shadow') || 
    topicLower.includes('photo') || 
    topicLower.includes('plant') || 
    topicLower.includes('force') || 
    topicLower.includes('motion') || 
    topicLower.includes('airplane') || 
    topicLower.includes('fly') || 
    topicLower.includes('heart') || 
    topicLower.includes('body') ||
    topicLower.includes('science') ||
    topicLower.includes('matter') ||
    topicLower.includes('electric') ||
    topicLower.includes('ecosystem') ||
    topicLower.includes('space')
  ) {
    category = 'science';
  } else if (
    topicLower.includes('clean') || 
    topicLower.includes('privacy') || 
    topicLower.includes('wash') || 
    topicLower.includes('soap') || 
    topicLower.includes('need') || 
    topicLower.includes('want') || 
    topicLower.includes('hiccup') ||
    topicLower.includes('emotion')
  ) {
    category = 'everyday';
  }

  const ageBand = age <= 7 ? 'early' : age <= 10 ? 'middle' : 'upper';
  const difficulty: LearningPlan['appropriateDifficulty'] = 
    age <= 7 ? 'introductory' : age <= 10 ? 'intermediate' : 'advanced';

  // Specific domain intelligence plans
  if (topicLower.includes('digest') || topicLower.includes('stomach')) {
    if (age <= 7) {
      return {
        topic: setup.topic,
        subjectCategory: 'science',
        targetAge: age,
        ageBand,
        appropriateDifficulty: difficulty,
        learningObjectives: [
          'Understand that food goes on a journey inside the body after chewing.',
          'Identify that teeth mash food into soft bites so it slides down safely.',
          'Discover that the tummy gently mixes food into tiny energy bits.',
          'Connect eating healthy food to having bouncy running energy.'
        ],
        keyConcepts: ['Chewing', 'Tummy mixing', 'Energy for muscles'],
        prerequisiteKnowledge: ['Knowing that eating food gives us energy to play'],
        ageAppropriateVocabulary: ['chew', 'tummy', 'slide', 'tiny bits', 'energy', 'healthy'],
        likelyMisconceptions: ['Food stays in whole big chunks forever', 'Food goes straight to your feet instantly'],
        realWorldConnection: 'Feeling your tummy rumble and feeling energized after a healthy banana snack.',
        assessmentCriteria: ['Explains chewing softens food', 'Identifies tummy helps break food down', 'Recognizes blood brings energy']
      };
    } else if (age <= 10) {
      return {
        topic: setup.topic,
        subjectCategory: 'science',
        targetAge: age,
        ageBand,
        appropriateDifficulty: difficulty,
        learningObjectives: [
          'Trace the path of food: mouth, esophagus, stomach, and bloodstream.',
          'Understand how saliva and teeth start breakdown before swallowing.',
          'Explain the stomach’s role in mixing digestive juices with food.',
          'Recognize how blood carries microscopic nutrients to organs and muscles.'
        ],
        keyConcepts: ['Mechanical chewing', 'Esophagus pathway', 'Digestive juices', 'Nutrient transport'],
        prerequisiteKnowledge: ['Basic body parts and healthy food groups'],
        ageAppropriateVocabulary: ['saliva', 'esophagus', 'stomach', 'digestive juices', 'nutrients', 'bloodstream'],
        likelyMisconceptions: ['The stomach absorbs all food directly', 'Digestion only happens in the stomach'],
        realWorldConnection: 'Why athletes eat carbohydrates and bananas before running a race.',
        assessmentCriteria: ['Traces pathway correctly', 'Explains purpose of digestive juices', 'Articulates nutrient transport via blood']
      };
    } else {
      return {
        topic: setup.topic,
        subjectCategory: 'science',
        targetAge: age,
        ageBand,
        appropriateDifficulty: difficulty,
        learningObjectives: [
          'Differentiate between mechanical mastication and chemical enzymatic breakdown.',
          'Understand the peristaltic journey through the esophagus into the gastric environment.',
          'Distinguish between stomach churning/acid digestion and small intestine nutrient absorption.',
          'Analyze how microscopic villi transport glucose and amino acids into capillaries for cellular ATP generation.'
        ],
        keyConcepts: ['Mechanical vs. chemical digestion', 'Gastric acid & enzymes', 'Small intestine absorption', 'Cellular respiration transport'],
        prerequisiteKnowledge: ['Cellular energy concepts and circulatory system basics'],
        ageAppropriateVocabulary: ['mastication', 'enzymes', 'peristalsis', 'gastric chyme', 'small intestine', 'absorption', 'capillaries'],
        likelyMisconceptions: ['The stomach absorbs all nutrients into the blood', 'Digestion and absorption are the identical process'],
        realWorldConnection: 'Metabolic fuel partitioning and clinical hydration during high-endurance athletics.',
        assessmentCriteria: ['Differentiates stomach churning from small intestine absorption', 'Explains chemical enzymatic action', 'Predicts consequences if absorption is impaired']
      };
    }
  }

  if (topicLower.includes('fraction') || topicLower.includes('half') || topicLower.includes('quarter') || topicLower.includes('1/3') || topicLower.includes('1/4')) {
    if (age <= 7) {
      return {
        topic: setup.topic,
        subjectCategory: 'mathematics',
        targetAge: age,
        ageBand,
        appropriateDifficulty: difficulty,
        learningObjectives: [
          'Understand that sharing equally makes fair parts.',
          'Discover that cutting a whole pizza in the middle makes 2 equal halves.',
          'Recognize that sharing with more friends means each person gets a smaller piece.'
        ],
        keyConcepts: ['Equal sharing', 'Half (1/2)', 'Fair slices'],
        prerequisiteKnowledge: ['Counting to 10 and sharing toys with friends'],
        ageAppropriateVocabulary: ['half', 'equal', 'slice', 'fair', 'whole'],
        likelyMisconceptions: ['Pieces can be different sizes and still be halves'],
        realWorldConnection: 'Splitting an apple or a cookie evenly with a best friend.',
        assessmentCriteria: ['Identifies half means 2 equal parts', 'Recognizes more pieces makes each piece smaller']
      };
    } else if (age <= 10) {
      return {
        topic: setup.topic,
        subjectCategory: 'mathematics',
        targetAge: age,
        ageBand,
        appropriateDifficulty: difficulty,
        learningObjectives: [
          'Understand fractions as equal parts of a whole unit (1/2, 1/3, 1/4).',
          'Explain that the bottom number (denominator) tells how many equal parts the whole is cut into.',
          'Demonstrate why 1/4 is smaller than 1/3: dividing by more parts yields smaller individual shares.'
        ],
        keyConcepts: ['Numerator and denominator', 'Inverse partitioning', 'Equal whole comparison'],
        prerequisiteKnowledge: ['Basic division and equal sharing'],
        ageAppropriateVocabulary: ['fraction', 'numerator', 'denominator', 'unit fraction', 'equal slices'],
        likelyMisconceptions: ['1/4 is larger than 1/3 because the number 4 is greater than 3'],
        realWorldConnection: 'Cutting birthday cakes and dividing craft supplies into equal sets.',
        assessmentCriteria: ['Correctly identifies denominator meaning', 'Compares 1/3 and 1/4 using inverse reasoning']
      };
    } else {
      return {
        topic: setup.topic,
        subjectCategory: 'mathematics',
        targetAge: age,
        ageBand,
        appropriateDifficulty: difficulty,
        learningObjectives: [
          'Formalize unit fractions as division of a continuous whole ($1/n = 1 \\div n$).',
          'Analyze the strictly inverse monotonic relationship between denominator magnitude and unit fraction value.',
          'Synthesize equivalent fractional proportions and benchmark comparisons (e.g. comparing $1/3$ to $1/4$ via common denominators $4/12$ vs $3/12$).',
          'Apply fractional partitioning to proportional scaling in real-world scenarios.'
        ],
        keyConcepts: ['Inverse denominator relation', 'Common denominators', 'Continuous vs discrete fractional partitioning', 'Proportional scaling'],
        prerequisiteKnowledge: ['Factors, multiples, and basic ratio concepts'],
        ageAppropriateVocabulary: ['denominator', 'numerator', 'partitioning', 'inverse relationship', 'equivalent fraction', 'ratio'],
        likelyMisconceptions: ['Interpreting the denominator as an independent whole number rather than a divisor of unity'],
        realWorldConnection: 'Precision engineering tolerances, culinary scaling ratios, and financial equity distributions.',
        assessmentCriteria: ['Articulates inverse relationship mathematically', 'Proves $1/3 > 1/4$ via common denominators or division', 'Applies fractions to multi-step scaling challenges']
      };
    }
  }

  if (topicLower.includes('multipl') || topicLower.includes('7 x 6') || topicLower.includes('7x6') || topicLower.includes('table')) {
    return {
      topic: setup.topic,
      subjectCategory: 'mathematics',
      targetAge: age,
      ageBand,
      appropriateDifficulty: difficulty,
      learningObjectives: [
        'Understand multiplication as repeated composite units and equal groups.',
        'Use friendly benchmark facts (e.g., $5 \\times 6 = 30$) to deduce $7 \\times 6 = 30 + 12 = 42$.',
        'Recognize the distributive property of multiplication intuitively across trays and arrays.',
        'Explain the strategy in their own words rather than reciting rote memorization.'
      ],
      keyConcepts: ['Equal groups', 'Benchmark anchoring', 'Distributive decomposition ($5 \\times 6 + 2 \\times 6$)', 'Array model'],
      prerequisiteKnowledge: ['Skip counting by 5s and 6s, addition with regrouping'],
      ageAppropriateVocabulary: age <= 8 ? ['groups', 'trays', 'crystals', 'add', 'times'] : ['multiplication', 'equal groups', 'benchmark fact', 'decomposition', 'array'],
      likelyMisconceptions: ['Counting all items one-by-one from zero', 'Multiplication facts are disconnected random numbers'],
      realWorldConnection: 'Arranging booster rockets, egg cartons, and multiplayer tournament brackets.',
      assessmentCriteria: ['Identifies 7 groups of 6', 'Calculates 42 from $30 + 12$', 'Generalizes to 8 groups of 6 = 48']
    };
  }

  if (topicLower.includes('shadow') || topicLower.includes('light')) {
    if (age <= 7) {
      return {
        topic: setup.topic,
        subjectCategory: 'science',
        targetAge: age,
        ageBand,
        appropriateDifficulty: difficulty,
        learningObjectives: [
          'Discover that light comes from bright sources like the sun or a flashlight.',
          'Understand that our solid bodies block light, creating a dark shape called a shadow.',
          'Notice how shadows change position when you move relative to the light.'
        ],
        keyConcepts: ['Light source', 'Blocking light', 'Shadow shape'],
        prerequisiteKnowledge: ['Playing in sunshine and turning on flashlights'],
        ageAppropriateVocabulary: ['flashlight', 'sun', 'block', 'shadow', 'dark shape'],
        likelyMisconceptions: ['Shadows are separate creatures that follow you', 'Shadows only exist in total darkness'],
        realWorldConnection: 'Making funny hand shadow puppets with a bedtime flashlight.',
        assessmentCriteria: ['Explains solid object blocks light', 'Recognizes light must be behind the object']
      };
    } else {
      return {
        topic: setup.topic,
        subjectCategory: 'science',
        targetAge: age,
        ageBand,
        appropriateDifficulty: difficulty,
        learningObjectives: [
          'Understand that light travels in straight rectilinear rays.',
          'Explain how opaque, translucent, and transparent materials interact differently with light beams.',
          'Analyze how the angle and elevation of the light source alters shadow length and projection.',
          'Predict shadow formation when multiple light sources or reflective surfaces are present.'
        ],
        keyConcepts: ['Rectilinear light propagation', 'Opaque vs transparent', 'Angle of incidence and shadow length', 'Umbra/silhouette'],
        prerequisiteKnowledge: ['Straight line geometry and basic optics'],
        ageAppropriateVocabulary: ['light rays', 'opaque', 'transparent', 'silhouette', 'angle of incidence', 'projection'],
        likelyMisconceptions: ['Clear glass creates dark shadows', 'Light bends freely around solid objects without mirrors'],
        realWorldConnection: 'Sundials measuring solar time, architectural solar shading, and theatrical lighting.',
        assessmentCriteria: ['Identifies straight light beams', 'Explains why opaque objects block light and clear glass does not', 'Connects light angle to shadow length']
      };
    }
  }

  if (topicLower.includes('photo') || topicLower.includes('plant')) {
    return {
      topic: setup.topic,
      subjectCategory: 'science',
      targetAge: age,
      ageBand,
      appropriateDifficulty: difficulty,
      learningObjectives: [
        'Understand that plants produce their own food (autotrophs) using sunlight, water, and air.',
        age >= 11 
          ? 'Explain how chloroplasts and chlorophyll transform $CO_2$ and $H_2O$ into glucose and $O_2$.' 
          : 'Understand that green leaves act like tiny kitchens using sunbeams to make plant sugar.',
        'Contrast plant autotrophic nutrition with animal food ingestion.',
        'Explain why plants are the fundamental energy foundation of earthly ecosystems.'
      ],
      keyConcepts: ['Sunlight energy capture', 'Chloroplasts/green kitchens', 'Water + Carbon Dioxide -> Glucose + Oxygen', 'Autotrophic nutrition'],
      prerequisiteKnowledge: ['Plants have roots and leaves, animals need food'],
      ageAppropriateVocabulary: age <= 8 
        ? ['sunlight', 'leaf', 'plant kitchen', 'water', 'sugar energy', 'fresh air'] 
        : ['photosynthesis', 'chloroplast', 'chlorophyll', 'carbon dioxide', 'glucose', 'oxygen'],
      likelyMisconceptions: ['Plants eat soil and dirt like cereal', 'Plants only need water and can grow in pitch darkness'],
      realWorldConnection: 'Why indoor houseplants lean toward sunny windows and greenhouse farming.',
      assessmentCriteria: ['Explains leaves use sunlight to make food', 'Refutes the misconception that plants eat dirt', 'Identifies oxygen release']
    };
  }

  if (topicLower.includes('force') || topicLower.includes('motion') || topicLower.includes('gravity') || topicLower.includes('push')) {
    return {
      topic: setup.topic,
      subjectCategory: 'science',
      targetAge: age,
      ageBand,
      appropriateDifficulty: difficulty,
      learningObjectives: [
        'Understand that forces are pushes and pulls that change an object’s velocity or direction.',
        'Explore how friction opposes motion and converts kinetic energy into thermal energy.',
        age >= 11 
          ? 'Apply Newton’s 1st Law (Inertia): an object remains in uniform motion unless acted upon by a net external force.' 
          : 'Discover that objects keep sliding until friction or a wall stops them.',
        'Differentiate between balanced (constant speed/rest) and unbalanced (accelerating) forces.'
      ],
      keyConcepts: ['Net force', 'Friction & resistance', 'Inertia & Newton’s laws', 'Acceleration vs constant velocity'],
      prerequisiteKnowledge: ['Pushes and pulls, measuring speed'],
      ageAppropriateVocabulary: age <= 8 
        ? ['push', 'pull', 'slide', 'rough surface', 'stop', 'speed up'] 
        : ['net force', 'friction', 'inertia', 'acceleration', 'unbalanced force', 'velocity'],
      likelyMisconceptions: ['A continuous forward push is needed to keep an object moving in frictionless space', 'Heavier objects always fall faster in a vacuum'],
      realWorldConnection: 'Ice skates gliding effortlessly on smooth ice versus stopping abruptly on pavement.',
      assessmentCriteria: ['Explains friction opposes motion', 'Identifies net force causes changes in speed', 'Applies inertia to frictionless environments']
    };
  }

  if (topicLower.includes('airplane') || topicLower.includes('fly') || topicLower.includes('lift') || topicLower.includes('aviation')) {
    return {
      topic: setup.topic,
      subjectCategory: 'science',
      targetAge: age,
      ageBand,
      appropriateDifficulty: difficulty,
      learningObjectives: [
        'Understand that curved airplane wings (airfoils) deflect moving air.',
        'Discover how rushing air over the curved upper surface creates lower pressure, generating upward LIFT.',
        'Differentiate between Thrust (forward engine push) and Lift (upward aerodynamic force).',
        'Explain why an airplane must maintain forward speed to stay airborne.'
      ],
      keyConcepts: ['Airfoil shape', 'Pressure differential', 'Lift vs Gravity', 'Thrust vs Drag'],
      prerequisiteKnowledge: ['Air is a physical fluid with pressure and weight'],
      ageAppropriateVocabulary: age <= 8 
        ? ['curved wing', 'fast air', 'upward push', 'lift', 'forward speed'] 
        : ['airfoil', 'aerodynamic lift', 'pressure differential', 'thrust', 'drag', 'gravity'],
      likelyMisconceptions: ['Engines push the plane straight up like rocket fireworks', 'Wings float like balloons without forward speed'],
      realWorldConnection: 'Sticking your hand out of a moving car window and tilting it upward to feel the wind lift your hand.',
      assessmentCriteria: ['Identifies curved wing shape (airfoil)', 'Explains fast air creates upward lift', 'Concludes forward speed is essential']
    };
  }

  // Default Universal Learning Plan for ANY custom topic
  return {
    topic: setup.topic,
    subjectCategory: category,
    targetAge: age,
    ageBand,
    appropriateDifficulty: difficulty,
    learningObjectives: [
      `Understand the foundational physical or social mechanism of ${setup.topic}.`,
      `Identify the cause-and-effect relationship underpinning ${goal}.`,
      `Differentiate the true mechanism from surface intuition and common misconceptions.`,
      `Apply the principle of ${setup.topic} to solve a real-world scenario.`
    ],
    keyConcepts: [setup.topic, goal, 'Underlying mechanism', 'Real-world application'],
    prerequisiteKnowledge: ['Curiosity and active engagement with everyday surroundings'],
    ageAppropriateVocabulary: age <= 7 
      ? ['discover', 'rule', 'clue', 'together', 'working'] 
      : age <= 10 
        ? ['mechanism', 'cause and effect', 'pattern', 'test', 'explain'] 
        : ['system', 'variable', 'process', 'evidence', 'principle'],
    likelyMisconceptions: [setup.struggle || `Assuming ${setup.topic} happens completely at random without physical rules`],
    realWorldConnection: `Recognizing ${setup.topic} in everyday daily activities and surrounding technology.`,
    assessmentCriteria: [
      `Articulates the core principle of ${goal}`,
      `Explains why the mechanism produces the observed outcome`,
      `Demonstrates transfer of ${setup.topic} to a novel dilemma`
    ]
  };
}

interface TopicTemplate {
  keywords: string[];
  theme: SceneVisualDetails['theme'];
  gradient: string;
  defaultCompanion: string;
  levelVisuals: string[][];
  l1Prompt: string;
  l1Speech: (child: string, companion: string, age: number) => { kiki: string; companion: string; narration: string[] };
  l2Prompt: (age: number) => string;
  l2Speech: (companion: string, age: number) => { kiki: string; companion: string; narration: string[]; options: string[] };
  l3Prompt: (age: number) => string;
  l3Speech: (companion: string, age: number) => { kiki: string; companion: string; narration: string[]; options: string[] };
  l4Prompt: (age: number) => string;
  l4Speech: (companion: string, age: number) => { kiki: string; companion: string; narration: string[] };
  l5Prompt: (age: number) => string;
  l5Speech: (companion: string, age: number) => { kiki: string; companion: string; narration: string[]; options: string[] };
}

// 12 Deep Specialized Topic Blueprints with Age-Adapted Pedagogy
const TOPIC_BLUEPRINTS: TopicTemplate[] = [
  // 1. DIGESTION
  {
    keywords: ['digest', 'digestion', 'stomach', 'esophagus', 'nutrient', 'digestive', 'how we digest', 'tummy enzyme', 'food journey', 'intestine'],
    theme: 'body',
    gradient: 'from-amber-100 via-orange-100 to-amber-50',
    defaultCompanion: 'animal',
    levelVisuals: [
      ['🐒', '🍌', '🌳', '✨'],
      ['👄', '🦷', '🍌', '⬇️'],
      ['🫧', '🥣', '🧪', '⚡'],
      ['💡', '✨', '🍎', '❤️'],
      ['🏃‍♂️', '⚡', '🏆', '🌟']
    ],
    l1Prompt: 'Let’s follow the food’s journey! 🍌',
    l1Speech: (child, comp, age) => {
      if (age >= 11) {
        return {
          kiki: `“Welcome to the biological lab! Digestion is a series of mechanical and chemical processes that break food into smaller substances that the body can absorb and use.”`,
          companion: `“I just ate a banana! How does my digestive tract convert solid macromolecules into cellular energy?”`,
          narration: [
            `${child} and ${comp} examine the metabolic transformation of nutrients.`,
            `KIKI projects an anatomical hologram: "Every meal undergoes physical breakdown and chemical enzymatic action before absorption!"`
          ]
        };
      }
      return {
        kiki: `“Yum! ${comp} is eating a sweet banana! Your tummy helps break your food into tiny pieces your body can use!”`,
        companion: `“Chomp chomp! My tummy is happy, but where does my running power come from?”`,
        narration: [
          `${comp} sits under a shady tree enjoying a delicious banana snack.`,
          `KIKI hops over with a magnifying glass: "Every bite of food is about to go on a big body journey!"`
        ]
      };
    },
    l2Prompt: (age) => age >= 11 ? 'What dual mechanical and chemical actions occur in the oral cavity first?' : 'What happens first when food enters our mouth?',
    l2Speech: (comp, age) => {
      if (age >= 11) {
        return {
          kiki: `“In the mouth, mechanical mastication pairs with salivary amylase enzymes to initiate carbohydrate breakdown!”`,
          companion: `“Why can’t I just swallow a whole unchewed banana chunk?”`,
          narration: [
            `Mastication crushes food into a pliable bolus, dramatically increasing surface area for enzymatic reactions.`,
            `Peristalsis then propels the bolus smoothly down the esophagus into the stomach!`
          ],
          options: [
            'Teeth mechanically grind food while salivary enzymes begin chemical breakdown into a bolus',
            'Food passes into the lungs to be evaporated by air',
            'Teeth turn food into solid diamonds'
          ]
        };
      }
      return {
        kiki: `“Watch closely! What do our teeth and saliva do to the food first?”`,
        companion: `“I chew with my teeth! Why can’t I just swallow a whole banana in one giant gulp?”`,
        narration: [
          `Inside the mouth, teeth chew food into soft, tiny pieces so it can slide down safely.`,
          `Then it travels down a smooth slide called the esophagus straight into the tummy!`
        ],
        options: [
          'Teeth chew and mash the food into tiny soft pieces',
          'The food turns into pure ice',
          'Food teleports directly into our toes'
        ]
      };
    },
    l3Prompt: (age) => age >= 11 ? 'How do gastric churning and small intestine villi divide the work of digestion vs absorption?' : 'How does the stomach break down the food even smaller?',
    l3Speech: (comp, age) => {
      if (age >= 11) {
        return {
          kiki: `“Crucial distinction: The stomach churns food with hydrochloric acid into chyme, but the small intestine is where villi absorb nutrients into capillaries!”`,
          companion: `“So the stomach isn’t where nutrients enter the blood—the small intestine absorbs them!”`,
          narration: [
            `The stomach acts as a biological blender and sterilizer, breaking proteins down with pepsin and acid.`,
            `The resulting chyme enters the small intestine, whose microscopic villi absorb glucose, fatty acids, and amino acids directly into the bloodstream.`
          ],
          options: [
            'The stomach churns food into chyme, but the small intestine absorbs nutrients into the blood',
            'The stomach absorbs all nutrients while the intestines do nothing',
            'Nutrients are destroyed by stomach acid and never reach the blood'
          ]
        };
      }
      return {
        kiki: `“Welcome to the stomach! It works like a gentle blender with digestive juices!”`,
        companion: `“My tummy is churning and mixing! What is it doing to my food?”`,
        narration: [
          `The stomach gently mixes the chewed food with special digestive juices.`,
          `This breaks the food into microscopic nutrients and vitamins that give us power!`
        ],
        options: [
          'It mixes food with digestive juices to break it into tiny nutrients',
          'It keeps the food as hard whole chunks forever',
          'It throws the food away outside the body'
        ]
      };
    },
    l4Prompt: (age) => age >= 11 ? 'In your own words, explain to KIKI: How do mechanical digestion, chemical breakdown, and absorption work as a system?' : 'In your own words, tell KIKI: What happens to food after we eat it?',
    l4Speech: (comp, age) => ({
      kiki: age >= 11 
        ? `“Explain the sequence: How do chewing, stomach churning, and small intestine absorption deliver fuel to our body cells?”`
        : `“Can you tell me in your own words: What journey does food take inside our body?”`,
      companion: `“Teach me so I understand where my running energy comes from!”`,
      narration: [
        `KIKI sits down with a sparkling notebook, excited to hear your explanation!`,
        age >= 11 ? `Distinguish between breaking down food and absorbing nutrients into blood.` : `Think about chewing, the tummy, and how our body gets energy.`
      ]
    }),
    l5Prompt: (age) => age >= 11 ? 'If a condition impaired absorption in the small intestine, why would fatigue occur even if food was chewed and churned in the stomach?' : 'Where do the tiny nutrients travel after digestion to make us run fast?',
    l5Speech: (comp, age) => {
      if (age >= 11) {
        return {
          kiki: `“Master reasoning dilemma! If the small intestine cannot absorb nutrients, what happens to cellular respiration?”`,
          companion: `“Without intestinal absorption, broken-down nutrients never reach capillaries or mitochondria for ATP synthesis!”`,
          narration: [
            `You connected organ-level physiology to cellular energy!`,
            `KIKI awards you the Master Biomedical Physiologist Badge!`
          ],
          options: [
            'Nutrients cannot enter capillaries to fuel cells because absorption occurs primarily in the small intestine, not the stomach',
            'The stomach absorbs all nutrients anyway so there is no fatigue',
            'Food turns directly into air in the lungs'
          ]
        };
      }
      return {
        kiki: `“Master puzzle! Once food is broken into tiny nutrients, how does it reach our legs and arms?”`,
        companion: `“I feel super energized! How did that banana reach my running muscles?”`,
        narration: [
          `The nutrients enter our bloodstream, and our heart pumps them to every muscle and brain cell!`,
          `${comp} does a high jump with boundless energy!`
        ],
        options: [
          'Blood carries the nutrients to our muscles and brain so we can run and think',
          'The nutrients stay locked in the mouth forever',
          'Nutrients turn into heavy rocks'
        ]
      };
    }
  },

  // 2. MULTIPLICATION / EQUAL GROUPS (7 x 6)
  {
    keywords: ['multipl', '7 x 6', '7x6', 'table', 'equal groups', 'times table'],
    theme: 'space',
    gradient: 'from-slate-950 via-indigo-950 to-slate-900',
    defaultCompanion: 'robot',
    levelVisuals: [
      ['🚀', '🤖', '📦', '⭐'],
      ['📦', '📦', '📦', '🔋'],
      ['⚡', '🔋', '➕', '7️⃣'],
      ['💬', '🤖', '✨', '💡'],
      ['🚀', '🌌', '🏆', '⭐']
    ],
    l1Prompt: 'Let’s inspect the rocket fuel trays! 🚀',
    l1Speech: (child, comp, age) => ({
      kiki: `“BEEP! Commander ${child}! ${comp} has 7 rocket boosters to load. Each tray needs exactly 6 fuel crystals!”`,
      companion: `“CLANK! My logic sensors are buzzing! How many crystals do we need for 7 trays of 6?”`,
      narration: [
        `At Orbital Station Alpha, the starship engines are preparing for launch.`,
        `Instead of guessing or counting crystals one by one from zero, KIKI points to the tray racks!`
      ]
    }),
    l2Prompt: () => 'How can we use equal groups instead of counting one by one?',
    l2Speech: (comp) => ({
      kiki: `“Look at the trays! Multiplication means equal groups of the exact same size.”`,
      companion: `“Each tray holds 6 crystals. If I have 5 trays, that is 5 × 6 = 30 crystals!”`,
      narration: [
        `${comp} stacks 5 trays neatly: 6 + 6 + 6 + 6 + 6 = 30 crystals.`,
        `Now we only need to add the remaining trays to find 7 × 6!`
      ],
      options: [
        'Multiplication means equal groups: 7 trays with 6 crystals each',
        'Every tray has a totally different random number',
        'We must restart and count all 42 crystals on our fingers'
      ]
    }),
    l3Prompt: () => 'How do we reach 7 groups of 6 from 5 groups (30)?',
    l3Speech: (comp) => ({
      kiki: `“We already have 5 groups of 6 (30). What happens when we add 2 more groups of 6?”`,
      companion: `“30 plus 6 is 36 (6 trays)... and 36 plus 6 is 42 (7 trays)!”`,
      narration: [
        `Golden fuel crystals click into the slots with a satisfying chime!`,
        `30 + 12 = 42 gleaming crystals light up the power matrix!`
      ],
      options: [
        'Add 2 more trays of 6: 30 + 6 + 6 = 42 crystals',
        'Subtract 6 crystals from 30',
        'Guess 31 because 7 is bigger than 5'
      ]
    }),
    l4Prompt: () => 'In your own words, explain to KIKI: How does 7 × 6 work using equal groups?',
    l4Speech: (comp) => ({
      kiki: `“Can you teach my robot circuits in your own words? Why is 7 × 6 = 42?”`,
      companion: `“Tell me in your own words so my memory chip remembers forever!”`,
      narration: [
        `KIKI listens eagerly as you explain the secret of equal groups and friendly benchmarks.`,
        `Spelling and math symbols don't matter—just share your thinking!`
      ]
    }),
    l5Prompt: () => 'If Captain Orion arrives with 8 trays tomorrow, what is 8 × 6?',
    l5Speech: (comp) => ({
      kiki: `“Master launch puzzle! Now that we know 7 trays is 42, what is 8 trays of 6?”`,
      companion: `“One more tray of 6 means 42 + 6 = 48! The whole fleet takes flight!”`,
      narration: [
        `The rocket boosters roar with turquoise plasma light, soaring through the stars!`,
        `${comp} dances a triumphant robot jig!`
      ],
      options: [
        'Add one more group of 6: 42 + 6 = 48 crystals',
        'The number becomes smaller',
        'We must start over from 1 again'
      ]
    })
  },

  // 3. FRACTIONS (Equal Parts of a Whole / Denominator Magnitude)
  {
    keywords: ['fraction', 'half', 'quarter', 'slice', 'denominator', '1/2', '1/3', '1/4', 'equal parts'],
    theme: 'kitchen',
    gradient: 'from-amber-100 via-orange-50 to-amber-50',
    defaultCompanion: 'child',
    levelVisuals: [
      ['🍕', '👧', '🔪', '✨'],
      ['🍕', '2️⃣', '🤝', '✂️'],
      ['🍕', '4️⃣', '📉', '🔍'],
      ['💬', '👧', '💡', '✨'],
      ['🏆', '🎂', '🌟', '🎉']
    ],
    l1Prompt: 'Let’s check the bakery pizza! 🍕',
    l1Speech: (child, comp, age) => ({
      kiki: age >= 11 
        ? `“Welcome to Sunflower Bakery! A fraction represents division of a continuous unit ($1/n$). What does the denominator tell us?”`
        : `“Mmm! Fresh pizza! But ${comp} and KIKI need to share it fairly. What does a fraction mean?”`,
      companion: `“If we don’t cut equal pieces, someone gets a tiny slice and someone gets a giant slice!”`,
      narration: [
        `At Sunflower Bakery, a warm round pizza rests on the counter.`,
        `A fraction is a way to describe equal pieces of one whole thing!`
      ]
    }),
    l2Prompt: () => 'When we cut one whole pizza into 2 equal pieces, what is each piece called?',
    l2Speech: (comp) => ({
      kiki: `“Slice right down the middle! What do we call each equal part?”`,
      companion: `“One piece for me, and one piece for KIKI! That’s one out of two pieces!”`,
      narration: [
        `The pizza cutter rolls through the center, creating two identical slices.`,
        `Each slice is exactly one-half (1/2) of the whole pizza!`
      ],
      options: [
        'One-half (1/2) because it is 1 equal piece out of 2 total pieces',
        'Two wholes (2/1)',
        'Zero pieces'
      ]
    }),
    l3Prompt: (age) => age >= 11 ? 'Why is a 1/4 slice smaller than a 1/3 slice even though 4 is greater than 3?' : 'If we cut the same pizza into 4 slices (1/4), is each slice bigger or smaller than 1/2?',
    l3Speech: (comp, age) => {
      if (age >= 11) {
        return {
          kiki: `“Crucial mathematical principle: The denominator is a divisor. As the denominator increases, the unit fraction size DECREASES!”`,
          companion: `“4 is a bigger integer, but dividing the same whole into 4 pieces means each piece is smaller than dividing into 3 pieces!”`,
          narration: [
            `More partitions mean each individual share must shrink.`,
            `Comparing with common denominators: $1/3 = 4/12$, while $1/4 = 3/12$. Therefore $1/3 > 1/4$!`
          ],
          options: [
            '1/4 is smaller than 1/3 because dividing into more pieces decreases the size of each share (inverse denominator relationship)',
            '1/4 is bigger because 4 is greater than 3',
            'Fractions have nothing to do with division'
          ]
        };
      }
      return {
        kiki: `“Look closely! When we cut the same pizza into MORE slices, what happens to each slice?”`,
        companion: `“4 is a bigger number than 2... but look at the slices in my hands!”`,
        narration: [
          `More people sharing means the pizza has to be divided into smaller portions!`,
          `A 1/4 slice is smaller than a 1/2 slice because the whole was cut into 4 parts.`
        ],
        options: [
          'Each slice gets smaller because more cuts divide the whole into smaller pieces',
          'Each slice magically gets huge',
          'The pizza disappears into thin air'
        ]
      };
    },
    l4Prompt: (age) => age >= 11 ? 'In your own words, explain to KIKI: Why does an increasing denominator make a fraction smaller?' : 'In your own words, explain to KIKI: What does a fraction like 1/2 or 1/4 mean?',
    l4Speech: (comp, age) => ({
      kiki: age >= 11
        ? `“Explain the inverse relationship: Why is 1/100 tiny even though 100 is a very large number?”`
        : `“Can you tell me in your own words: What does the bottom number (denominator) tell us about the pizza?”`,
      companion: `“Teach me so I never confuse slice sizes again!”`,
      narration: [
        `KIKI watches with a smile as you explain how equal pieces work.`,
        `Describe sharing and slice sizes in your own words!`
      ]
    }),
    l5Prompt: () => 'If we share an emergency cake among 8 friends (1/8 each), how does 1/8 compare to 1/4?',
    l5Speech: (comp) => ({
      kiki: `“Master bakery puzzle! Who gets the bigger slice: someone with 1/4 or someone with 1/8?”`,
      companion: `“1/4 is bigger because 8 friends sharing means each slice is half the size of 1/4!”`,
      narration: [
        `Every guest gets their fair, delicious share with zero crumbs wasted!`,
        `KIKI hands you the Master Fraction Baker star!`
      ],
      options: [
        '1/4 is bigger because cutting into 8 pieces makes each piece smaller (1/8 < 1/4)',
        '1/8 is bigger because 8 is larger than 4',
        'Both slices are the size of a mountain'
      ]
    })
  },

  // 4. AIRPLANES & FLIGHT (Aviation / Lift)
  {
    keywords: ['airplane', 'plane', 'fly', 'flight', 'wing', 'lift', 'sky', 'aviation'],
    theme: 'sky',
    gradient: 'from-sky-200 via-sky-100 to-amber-50',
    defaultCompanion: 'child',
    levelVisuals: [
      ['✈️', '👧', '☁️', '💨'],
      ['🪽', '💨', '⬆️', '📐'],
      ['🌬️', '🚀', '⬆️', '⚡'],
      ['💬', '👧', '✨', '☁️'],
      ['✈️', '🌈', '🏆', '🌟']
    ],
    l1Prompt: 'Let’s inspect the airplane wings! ✈️',
    l1Speech: (child, comp, age) => ({
      kiki: age >= 11
        ? `“Welcome to Aeronautics! How does a 400-ton metal jet generate aerodynamic lift to overcome gravitational weight?”`
        : `“Look at that giant metal airplane! How does a heavy metal plane stay up in the sky without falling?”`,
      companion: `“Airplanes are so heavy! What force pushes them upward?”`,
      narration: [
        `At Sunbeam Airfield, a silver airplane rests on the tarmac.`,
        `KIKI points to the specially curved wings: the secret is how wings interact with rushing air!`
      ]
    }),
    l2Prompt: () => 'What special curved shape do airplane wings have?',
    l2Speech: (comp) => ({
      kiki: `“Look at the side of the wing! The top is curved like a gentle hill, while the bottom is flatter.”`,
      companion: `“Why isn’t the wing just a flat wooden plank?”`,
      narration: [
        `The curved top shape is called an airfoil.`,
        `As the plane rushes forward, air splits and flows over and under the wing!`
      ],
      options: [
        'The wing is curved on top and flatter on the bottom (airfoil) so air flows differently',
        'The wing is round like a bowling ball',
        'Wings are made of solid rock with no air flow'
      ]
    }),
    l3Prompt: (age) => age >= 11 ? 'How does the airfoil geometry create a pressure differential that produces LIFT?' : 'How does fast air over the wing create an upward push called LIFT?',
    l3Speech: (comp, age) => {
      if (age >= 11) {
        return {
          kiki: `“According to Bernoulli’s principle and Newton’s 3rd law: air flows faster over the cambered upper surface, producing lower static pressure, while higher pressure beneath pushes UPWARD!”`,
          companion: `“That upward net pressure force is LIFT! When Lift exceeds Weight, the aircraft ascends!”`,
          narration: [
            `Forward engines supply Thrust to overcome aerodynamic Drag.`,
            `The rushing airflow generates Lift across the airfoils, lifting the heavy aircraft into flight!`
          ],
          options: [
            'Faster airflow over the curved top generates lower pressure above and higher pressure below, creating upward Lift',
            'Giant magnets in the clouds pull the plane upward',
            'Engines blow downward air like rocket flares'
          ]
        };
      }
      return {
        kiki: `“Fast air over the curved top creates lower pressure, while air underneath pushes UP!”`,
        companion: `“That upward push is called LIFT! It pushes against gravity and lifts the whole plane!”`,
        narration: [
          `Engines push the plane forward (Thrust), and the rushing air over the wings generates Lift!`,
          `When Lift becomes stronger than the plane's weight, the wheels leave the ground!`
        ],
        options: [
          'Air rushing over the curved wing creates an upward push called Lift',
          'Giant magnets in the clouds pull the plane up',
          'The plane bounces on rubber trampolines'
        ]
      };
    },
    l4Prompt: () => 'In your own words, explain to KIKI: How do airplane wings create lift to fly?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: Why do curved wings and moving air make a plane fly?”`,
      companion: `“Teach me so I can pilot our cloud glider!”`,
      narration: [
        `KIKI listens with twinkling eyes as you explain lift, speed, and wings.`,
        `Describe how the air moves and pushes the plane up!`
      ]
    }),
    l5Prompt: () => 'What happens if an airplane slows down too much while trying to fly?',
    l5Speech: (comp) => ({
      kiki: `“Master pilot puzzle! If there is no forward speed, what happens to the lift on the wings?”`,
      companion: `“Without forward speed, air stops rushing over the wings and lift disappears!”`,
      narration: [
        `The pilot powers the engines forward, and the airplane soars gracefully through a rainbow!`,
        `KIKI awards you the Master Aviator Wings!`
      ],
      options: [
        'Without forward speed, there is no air rushing over the wings to create lift',
        'The plane turns into a submarine',
        'The plane floats higher forever with no speed'
      ]
    })
  },

  // 5. SHADOWS & LIGHT
  {
    keywords: ['shadow', 'light', 'sun', 'silhouette', 'beam'],
    theme: 'forest',
    gradient: 'from-amber-100 via-sky-100 to-slate-100',
    defaultCompanion: 'animal',
    levelVisuals: [
      ['🔦', '🦊', '👤', '🌲'],
      ['☀️', '🧍', '⬛', '📐'],
      ['🌅', '🚶', '📏', '📐'],
      ['💬', '🦊', '💡', '✨'],
      ['🎭', '🎪', '🏆', '⭐']
    ],
    l1Prompt: 'Let’s investigate the dark shape on the ground! 👤',
    l1Speech: (child, comp, age) => ({
      kiki: age <= 7
        ? `“Look behind you! A dark copycat shape is jumping when you jump! Where did it come from?”`
        : `“Look at that sharp silhouette stretching on the ground! How does light create a shadow?”`,
      companion: `“Whenever I raise my paw, the dark shape raises its paw too! What is a shadow?”`,
      narration: [
        `In the sunny meadow, a dark silhouette stretches across the green grass.`,
        `KIKI points to the bright sun shining right behind ${comp}!`
      ]
    }),
    l2Prompt: () => 'How does a shadow form when light shines on something solid?',
    l2Speech: (comp) => ({
      kiki: `“Light travels in straight beams! What happens when a beam of light hits your solid body?”`,
      companion: `“Light can’t pass through my body, so it leaves a dark spot on the ground!”`,
      narration: [
        `Light cannot bend around solid objects like bodies, trees, or toys.`,
        `The area where light is blocked becomes a dark patch called a shadow!`
      ],
      options: [
        'A shadow forms when a solid object blocks straight beams of light',
        'Shadows are living creatures that crawl out of the ground',
        'Shadows only happen when it is completely pitch black'
      ]
    }),
    l3Prompt: () => 'What happens to your shadow when the sun is low in the morning versus high at noon?',
    l3Speech: (comp) => ({
      kiki: `“At noon, the sun is right above your head. What happens to your shadow?”`,
      companion: `“At noon my shadow is super short! But at sunset, it stretches super long!”`,
      narration: [
        `When the light source is low, the blocked light casts a long stretched shadow.`,
        `When the light is right overhead, the shadow is tiny and right beneath your feet!`
      ],
      options: [
        'When the light angle is low, the shadow stretches long; when high overhead, it is short',
        'Shadows never change size at all',
        'Shadows only change colors to bright red'
      ]
    }),
    l4Prompt: () => 'In your own words, explain to KIKI: Why do shadows happen?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: Why does blocking a light beam make a shadow on the floor?”`,
      companion: `“Teach me so we can put on our shadow puppet show!”`,
      narration: [
        `KIKI sits down with a puppet theater, excited to hear your explanation!`,
        `Explain how light beams, objects, and darkness work together.`
      ]
    }),
    l5Prompt: () => 'If you shine a flashlight on clear glass versus a solid wooden book, which makes a dark shadow?',
    l5Speech: (comp) => ({
      kiki: `“Master shadow check! Does clear see-through glass make a dark shadow like a wooden book?”`,
      companion: `“Light passes straight through clear glass, so only solid opaque things block the light!”`,
      narration: [
        `You create a brilliant soaring eagle shadow puppet on the tent wall!`,
        `KIKI and the forest animals clap and cheer!`
      ],
      options: [
        'The wooden book makes a dark shadow because it blocks light, while glass lets light through',
        'Clear glass makes the darkest shadow',
        'Neither makes any shadow at all'
      ]
    })
  },

  // 6. PHOTOSYNTHESIS (Leaves as Solar Kitchens)
  {
    keywords: ['photo', 'photosynthesis', 'chloroplast', 'chlorophyll', 'plant food', 'leaf', 'autotroph'],
    theme: 'forest',
    gradient: 'from-emerald-100 via-teal-50 to-amber-50',
    defaultCompanion: 'animal',
    levelVisuals: [
      ['🌱', '☀️', '💧', '✨'],
      ['🍃', '🔬', '🫧', '☀️'],
      ['🧪', '🍬', '💨', '⚡'],
      ['💬', '🦊', '💡', '🍃'],
      ['🌳', '🍎', '🏆', '🌟']
    ],
    l1Prompt: 'Let’s investigate how plants eat! 🌱',
    l1Speech: (child, comp, age) => ({
      kiki: age >= 11
        ? `“Welcome to the Botanical Biosphere! Plants are autotrophs that synthesize their own chemical energy through photosynthesis.”`
        : `“Look at that tiny green sprout! It doesn't have a mouth or fork, but it is growing huge! How do plants eat?”`,
      companion: `“Do plants eat garden mud like breakfast cereal, or do they make their own food?”`,
      narration: [
        `${child} and ${comp} examine green leaves glistening in morning sunlight.`,
        `KIKI smiles: "Plants don't eat soil—they capture solar rays to brew sweet food!"`
      ]
    }),
    l2Prompt: () => 'What ingredients do green leaves use to produce food?',
    l2Speech: (comp, age) => ({
      kiki: age >= 11
        ? `“Inside plant leaf cells, chloroplasts trap solar photons to combine water ($H_2O$) from roots and carbon dioxide ($CO_2$) from air!”`
        : `“Green leaves act like tiny solar kitchens! What ingredients do they collect?”`,
      companion: `“Sunlight from above, water from the soil, and carbon dioxide air through tiny leaf pores!”`,
      narration: [
        `Leaves contain green pigment called chlorophyll that captures sunbeams like tiny solar panels.`,
        `Plants drink water from roots and absorb air through tiny leaf pores!`
      ],
      options: [
        'Sunlight, water, and carbon dioxide from the air',
        'Chocolate milk and breakfast cereal',
        'Rocks, dirt, and plastic spoons'
      ]
    }),
    l3Prompt: () => 'What two vital substances do plants produce during photosynthesis?',
    l3Speech: (comp, age) => ({
      kiki: age >= 11
        ? `“The chemical reaction transforms $CO_2$ and $H_2O$ into glucose (sugar energy) and releases pure oxygen gas ($O_2$)!”`
        : `“The solar kitchen brews sweet sugar food to grow, and releases fresh oxygen for us to breathe!”`,
      companion: `“So plants feed themselves AND clean the air for animals and humans!”`,
      narration: [
        `Glucose fuels the plant’s stems, roots, and flowers.`,
        `The oxygen released by green plants is the very air that keeps animals and humans alive!`
      ],
      options: [
        'Glucose (sugar food for the plant) and oxygen (fresh air for breathing)',
        'Salt water and toxic smoke',
        'Solid ice cubes and gold coins'
      ]
    }),
    l4Prompt: () => 'In your own words, explain to KIKI: How do green leaves make food from sunlight?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: Why don't plants need to eat dirt like animals eat food?”`,
      companion: `“Teach me so I can nurture our solar garden!”`,
      narration: [
        `KIKI listens closely with her botanical notebook.`,
        `Explain how sunlight, water, and air work together in green leaves!`
      ]
    }),
    l5Prompt: () => 'What would happen to animal life if green plants stopped photosynthesizing?',
    l5Speech: (comp) => ({
      kiki: `“Master ecological dilemma! Why is photosynthesis essential for all living creatures on Earth?”`,
      companion: `“Plants form the base of every food chain and supply the oxygen all creatures breathe!”`,
      narration: [
        `Golden sunlight illuminates the towering canopy of Wonder Woods!`,
        `KIKI awards you the Master Plant Biologist Medallion!`
      ],
      options: [
        'Animals would run out of oxygen to breathe and food to eat because plants are the primary producers',
        'Animals would instantly learn to eat rocks instead',
        'Nothing would change at all'
      ]
    })
  },

  // 7. FORCE AND MOTION (Inertia, Net Force & Friction)
  {
    keywords: ['force', 'motion', 'friction', 'inertia', 'newton', 'push', 'pull', 'speed', 'accelerat'],
    theme: 'space',
    gradient: 'from-slate-900 via-sky-950 to-slate-950',
    defaultCompanion: 'robot',
    levelVisuals: [
      ['🛒', '🤖', '➡️', '💨'],
      ['🛹', '⚡', '🛑', '📐'],
      ['🚀', '🌌', '⚖️', '⭐'],
      ['💬', '🤖', '💡', '⚡'],
      ['🏆', '🌌', '🌟', '🎉']
    ],
    l1Prompt: 'Let’s investigate why objects move! 🚀',
    l1Speech: (child, comp, age) => ({
      kiki: age >= 11
        ? `“Welcome to Classical Mechanics! What determines whether a body remains at rest or accelerates through space?”`
        : `“Look at this cart! When we push it, it rolls. But why does it slow down on carpet?”`,
      companion: `“BEEP! Does an object need a continuous push just to keep moving, or does friction stop it?”`,
      narration: [
        `${child} and ${comp} test carts on smooth ice and rough carpet.`,
        `KIKI points to Newton’s laws: forces change motion!`
      ]
    }),
    l2Prompt: () => 'What is the invisible contact force that slows down rolling carts on rough surfaces?',
    l2Speech: (comp) => ({
      kiki: `“When two surfaces rub against each other, microscopic bumps grip and resist motion!”`,
      companion: `“That resistive force is called FRICTION! It opposes motion and converts kinetic energy into heat!”`,
      narration: [
        `On rough carpet, high friction brings the wheels to a quick halt.`,
        `On ultra-smooth ice, friction is low, allowing objects to glide long distances!`
      ],
      options: [
        'Friction: a force that opposes motion when surfaces rub together',
        'Gravity pushing sideways',
        'The cart gets tired and goes to sleep'
      ]
    }),
    l3Prompt: (age) => age >= 11 ? 'According to Newton’s 1st Law (Inertia), what happens to an object gliding through deep frictionless space?' : 'What would happen if an object glided in deep space with zero friction?',
    l3Speech: (comp, age) => ({
      kiki: age >= 11
        ? `“Inertia dictates that an object in motion stays in motion at constant velocity unless acted upon by a net external force!”`
        : `“Without friction or air to slow it down, an object in space will keep coasting forever at the same speed!”`,
      companion: `“No engine needed to maintain speed—only an external force can change its direction or velocity!”`,
      narration: [
        `In deep orbital vacuum, a space probe glides for billions of miles without burning any fuel!`,
        `Only when reverse thrusters fire (an unbalanced force) does the probe slow down.`
      ],
      options: [
        'It keeps moving at the exact same constant speed forever until an external force acts on it (Inertia)',
        'It stops instantly after 5 seconds because all motion dies without fuel',
        'It falls straight down to Earth'
      ]
    }),
    l4Prompt: () => 'In your own words, explain to KIKI: How do force, friction, and inertia work together?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: Why does a rolling ball stop on grass, but a spaceship glides forever in space?”`,
      companion: `“Teach me so my physics core can calibrate!”`,
      narration: [
        `KIKI listens eagerly as you explain net forces and friction.`,
        `Share what you discovered about pushes, friction, and inertia!`
      ]
    }),
    l5Prompt: () => 'If two balanced equal forces push a box in opposite directions, what happens to the box’s motion?',
    l5Speech: (comp) => ({
      kiki: `“Master physics challenge! If two forces cancel each other out (Net Force = 0), what happens?”`,
      companion: `“Balanced forces mean zero acceleration! The box stays in equilibrium!”`,
      narration: [
        `The starship engines hum in perfect equilibrium!`,
        `KIKI awards you the Master Newtonian Physicist Medal!`
      ],
      options: [
        'The box does not accelerate because the opposing forces cancel out (Net Force = 0)',
        'The box explodes into confetti',
        'The box accelerates at light speed'
      ]
    })
  },

  // 8. CIVIC SENSE: KEEPING PUBLIC PLACES CLEAN
  {
    keywords: ['clean', 'litter', 'trash', 'garbage', 'park', 'public', 'waste', 'civic'],
    theme: 'city',
    gradient: 'from-emerald-100 via-sky-100 to-amber-50',
    defaultCompanion: 'monster',
    levelVisuals: [
      ['🧺', '🥤', '🗑️', '🌳'],
      ['🚮', '🤝', '🚯', '✨'],
      ['🏞️', '🦆', '🌺', '🧼'],
      ['💬', '👾', '💡', '🌳'],
      ['🏙️', '🌟', '🏆', '🎉']
    ],
    l1Prompt: 'Let’s look at the park after the picnic! 🧺',
    l1Speech: (child, comp) => ({
      kiki: `“Oh no! Someone finished their picnic and left plastic wrappers on the green grass!”`,
      companion: `“The wind is blowing the wrappers toward the duck pond! What should we do?”`,
      narration: [
        `At Sunbeam Park, flowers are blooming, but scattered trash is making the grass messy.`,
        `KIKI and ${comp} notice that no one is cleaning it up.`
      ]
    }),
    l2Prompt: () => 'Who does a public park belong to, and who is responsible for keeping it clean?',
    l2Speech: (comp) => ({
      kiki: `“A public park doesn’t belong to one stranger—it belongs to ALL of us in the community!”`,
      companion: `“If we all drop trash and wait for someone else, the park gets ruined for everyone!”`,
      narration: [
        `When everyone takes care of shared spaces, parks stay beautiful and safe for everyone to play.`,
        `${comp} picks up the wrapper and walks toward the colorful bin.`
      ],
      options: [
        'Public spaces belong to all of us, so we must each throw our trash in the bin',
        'We should drop wrappers on the ground because "someone else will clean it"',
        'We should kick trash into the bushes'
      ]
    }),
    l3Prompt: () => 'Why does littering hurt community animals and flowers?',
    l3Speech: (comp) => ({
      kiki: `“Plastic wrappers don't disappear in soil. What happens if ducks or dogs chew on plastic?”`,
      companion: `“Animals can get sick, and plastic chokes the flower roots!”`,
      narration: [
        `Keeping public spaces clean protects birds, community pets, and baby plants.`,
        `Putting trash in the bin keeps our neighborhood safe and welcoming.`
      ],
      options: [
        'Plastic trash harms animals and pollutes the soil and water',
        'Animals love eating plastic wrappers',
        'Plastic dissolves instantly into fresh air'
      ]
    }),
    l4Prompt: () => 'In your own words, explain to KIKI: Why should we keep public parks clean even if no one is watching?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: Why is it important to put trash in the bin even when nobody is looking?”`,
      companion: `“Teach me so our whole town can become a green model community!”`,
      narration: [
        `KIKI listens proudly as you share your thoughts on fairness, respect, and community responsibility.`,
        `Tell KIKI why caring for shared spaces matters to you.`
      ]
    }),
    l5Prompt: () => 'If you finish an ice cream snack and there is no trash can nearby, what is the right civic choice?',
    l5Speech: (comp) => ({
      kiki: `“Master civic challenge! You have an empty wrapper, but the nearest bin is far away. What do you do?”`,
      companion: `“Hold onto the wrapper in your pocket or bag until you find a proper trash bin!”`,
      narration: [
        `Sunbeam Park sparkles clean and bright! Ducks splash happily in the clear pond!`,
        `KIKI awards you the Community Champion Medal!`
      ],
      options: [
        'Keep the wrapper in your pocket or bag until you find a trash bin',
        'Toss it on the ground when nobody is looking',
        'Bury it under the slide'
      ]
    })
  },

  // 9. DIGITAL SAFETY: ONLINE PRIVACY & PASSWORDS
  {
    keywords: ['privacy', 'password', 'online', 'internet', 'cyber', 'game', 'chat', 'safety'],
    theme: 'cyber',
    gradient: 'from-slate-950 via-purple-950 to-slate-900',
    defaultCompanion: 'robot',
    levelVisuals: [
      ['💻', '🤖', '❓', '💬'],
      ['🔐', '🛡️', '🔑', '🚫'],
      ['🏠', '📍', '⛔', '🛡️'],
      ['💬', '🤖', '✨', '💡'],
      ['🏆', '🛡️', '🌟', '🎉']
    ],
    l1Prompt: 'Let’s investigate the suspicious message! 💻',
    l1Speech: (child, comp) => ({
      kiki: `“BEEP! While playing an online game, a stranger avatar sends a message: 'Tell me your real password and home address for free coins!'”`,
      companion: `“Wait! Free coins sounds tempting, but should I ever share my real secret info?”`,
      narration: [
        `At Cyber Terminal 9, a glowing prompt flashes on the game screen.`,
        `KIKI raises a warning shield: real passwords and personal details must ALWAYS stay private!`
      ]
    }),
    l2Prompt: () => 'Who is allowed to know your secret online passwords?',
    l2Speech: (comp) => ({
      kiki: `“Passwords are like house keys or toothbrushes: you NEVER share them with strangers or friends!”`,
      companion: `“Only my parents or trusted adults can help me with my password!”`,
      narration: [
        `A strong password protects your account, your photos, and your games.`,
        `Sharing passwords with strangers allows them to lock you out or pretend to be you!`
      ],
      options: [
        'Only you and your trusted parents/guardians should ever know your password',
        'Anyone in an online game who promises free virtual coins',
        'Every stranger on the internet'
      ]
    }),
    l3Prompt: () => 'What personal information should you NEVER share with online strangers?',
    l3Speech: (comp) => ({
      kiki: `“What counts as private personal information that must stay safe?”`,
      companion: `“My full real name, where I live, my school, and my phone number!”`,
      narration: [
        `Keep your private identity safe by using a fun nickname or avatar.`,
        `Never tell strangers where you go to school or where your house is located!`
      ],
      options: [
        'Your full real name, home address, school name, and phone number',
        'Your favorite color of cartoon crayon',
        'Whether you like chocolate or vanilla ice cream'
      ]
    }),
    l4Prompt: () => 'In your own words, explain to KIKI: Why shouldn’t we share passwords or personal info online?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: Why is it dangerous to share private info or passwords with online strangers?”`,
      companion: `“Teach me so our digital treehouse stays safe forever!”`,
      narration: [
        `KIKI listens closely as you explain the digital safety shield.`,
        `Tell KIKI why keeping secrets private protects your family and games!`
      ]
    }),
    l5Prompt: () => 'If someone online makes you feel uncomfortable or asks to meet in real life, what is the #1 rule?',
    l5Speech: (comp) => ({
      kiki: `“Master safety puzzle! What should you do right away if someone online asks weird questions?”`,
      companion: `“Tell a trusted parent or adult immediately! Never keep uncomfortable online secrets!”`,
      narration: [
        `The Firewall Shield glows bright emerald, locking out suspicious requests!`,
        `KIKI awards you the Master Cyber Defender Badge!`
      ],
      options: [
        'Stop, step away from the screen, and tell a trusted adult immediately',
        'Agree to meet them alone in a park',
        'Send them photos of your house keys'
      ]
    })
  },

  // 10. HAND WASHING & HYGIENE
  {
    keywords: ['hand', 'wash', 'soap', 'germ', 'hygiene', 'clean', 'brush', 'teeth'],
    theme: 'school',
    gradient: 'from-sky-100 via-teal-50 to-amber-50',
    defaultCompanion: 'animal',
    levelVisuals: [
      ['🖐️', '🦠', '🧼', '💧'],
      ['🧼', '🫧', '2️⃣0️⃣', '⏱️'],
      ['🚿', '🌊', '⬇️', '✨'],
      ['💬', '🦊', '💡', '🧼'],
      ['🌟', '🧼', '🏆', '🎉']
    ],
    l1Prompt: 'Let’s check our hands after the playground! 🖐️',
    l1Speech: (child, comp) => ({
      kiki: `“We just finished building mud towers and petting playground puppies! Our hands look okay, but are they really clean?”`,
      companion: `“I can’t see anything with my eyes! Why do we need to wash with soap before eating lunch?”`,
      narration: [
        `At the playground wash station, cool water drips from the faucet.`,
        `KIKI brings out a magic magnifying glass showing tiny, invisible hitchhiking germs!`
      ]
    }),
    l2Prompt: () => 'How does soap destroy invisible germs on our skin?',
    l2Speech: (comp) => ({
      kiki: `“Water alone just slides off sticky germs. But soap is a superhero!”`,
      companion: `“Soap bubbles attach to the germs like tiny magnets and pull them off our skin!”`,
      narration: [
        `Soap molecules have special tails that latch onto grease and germs.`,
        `When you scrub into a rich lather, the soap surrounds the germs so water can rinse them away!`
      ],
      options: [
        'Soap attaches to germs and lifts them off your skin into slippery bubbles',
        'Soap is just perfume that makes germs smell like flowers',
        'Soap makes germs grow five times bigger'
      ]
    }),
    l3Prompt: () => 'How long should we scrub our hands with soap to remove all germs?',
    l3Speech: (comp) => ({
      kiki: `“Sing the Happy Birthday song twice! How many seconds should we scrub between fingers and under nails?”`,
      companion: `“At least 20 seconds! Rinsing for only 2 seconds leaves all the germs behind!”`,
      narration: [
        `Scrub between your fingers, on the backs of your hands, and around your thumbs!`,
        `Twenty seconds of bubbly scrubbing gives the soap enough time to detach every single germ.`
      ],
      options: [
        'Scrub with bubbly soap for at least 20 seconds',
        'Touch water for half a second and wipe on your pants',
        'Never wash hands ever'
      ]
    }),
    l4Prompt: () => 'In your own words, explain to KIKI: Why do we need soap and not just plain water to wash our hands?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: Why is soap so much better at cleaning germs than plain water?”`,
      companion: `“Teach me so I can wash my paws properly before snack time!”`,
      narration: [
        `KIKI watches the bubbles pop as you explain how soap captures sticky germs.`,
        `Explain how soap and water work as a team!`
      ]
    }),
    l5Prompt: () => 'When are the two most important times to wash your hands with soap?',
    l5Speech: (comp) => ({
      kiki: `“Master health check! When is it most critical to wash your hands with bubbly soap?”`,
      companion: `“Before eating food and after using the bathroom or coming home from outside!”`,
      narration: [
        `Fresh, clean water rinses every bubble down the drain!`,
        `KIKI awards you the Sparkling Health Champion Star!`
      ],
      options: [
        'Before eating food and after using the bathroom or playing outside',
        'Only once a year on your birthday',
        'Only when covered in visible bright purple paint'
      ]
    })
  },

  // 11. NEEDS VS. WANTS / EVERYDAY FINANCIAL CHOICES
  {
    keywords: ['need', 'want', 'budget', 'spending', 'grocery', 'coin', 'money'],
    theme: 'city',
    gradient: 'from-amber-100 via-emerald-50 to-sky-50',
    defaultCompanion: 'child',
    levelVisuals: [
      ['🍎', '🎮', '🛒', '💡'],
      ['💧', '🧸', '🏠', '❓'],
      ['🧺', '💰', '⚖️', '✨'],
      ['💬', '📝', '🌟', '❤️'],
      ['🏆', '🛒', '🎉', '🌟']
    ],
    l1Prompt: 'Let’s sort what we need first! 🛒',
    l1Speech: (child, comp) => ({
      kiki: `“Welcome to the Town Market with ${comp}! Look at our shopping basket—which items do our bodies truly need to survive?”`,
      companion: `“I see juicy red apples and shiny toy racecars! How do we tell a true need from a fun want?”`,
      narration: [
        `${child} and ${comp} arrive at the bustling Town Market with a shopping list.`,
        `KIKI points to the checkout counter: today we uncover the secret difference between Needs and Wants!`
      ]
    }),
    l2Prompt: () => 'Which of these is a NEED we must have to stay healthy and safe?',
    l2Speech: (comp) => ({
      kiki: `“Needs keep us alive, healthy, and warm! Wants are fun extras that make life playful. Which one comes first?”`,
      companion: `“If we only have enough coins for one thing right now, what must we pick?”`,
      narration: [
        `KIKI holds up fresh bread and water on one side, and a toy robot on the other.`,
        `Our health and safety come first every single time!`
      ],
      options: [
        'Fresh water, healthy food, and warm clothes to stay alive and safe',
        'A third video game console and shiny glitter stickers',
        'Candy bars for breakfast, lunch, and dinner'
      ]
    }),
    l3Prompt: () => 'How can we solve the market basket dilemma?',
    l3Speech: (comp) => ({
      kiki: `“${comp} wants a shiny bouncy ball, but the basket needs ingredients for dinner! How do we decide?”`,
      companion: `“I really want the toy, but our family needs dinner tonight! What should our rule be?”`,
      narration: [
        `The market cashier smiles and waits for our decision.`,
        `Smart explorers always take care of true needs before spending on wants!`
      ],
      options: [
        'Fill the basket with dinner essentials first, and save remaining coins for treats later',
        'Buy ten toys and go home with an empty dinner plate',
        'Hide the groceries under the counter'
      ]
    }),
    l4Prompt: () => 'In your own words, teach KIKI the difference between a Need and a Want!',
    l4Speech: (comp) => ({
      kiki: `“Tell me in your own words: How do you explain a Need versus a Want to a friend?”`,
      companion: `“Explain our shopping rule so ${comp} never forgets at the grocery checkout!”`,
      narration: [
        `KIKI takes out a pocket market ledger to write down your wisdom.`,
        `Share what you discovered about needs and wants in your own words!`
      ]
    }),
    l5Prompt: () => 'When you receive allowance or gift coins, what is the smartest rule to remember?',
    l5Speech: (comp) => ({
      kiki: `“Hooray! You’re officially a Master Market Explorer!”`,
      companion: `“Now I always know: Needs come first, and Wants are lovely bonuses!”`,
      narration: [
        `Confetti rains down over the Town Market stalls!`,
        `${comp} and our explorer mastered the golden rule of Needs vs. Wants!`
      ],
      options: [
        'Take care of essential needs first, then save or spend thoughtfully on wants',
        'Spend all coins on the first toy you see in three seconds',
        'Never eat food again so you can buy more plastic toys'
      ]
    })
  },

  // 12. HICCUPS / BODY MUSCLE REFLEX
  {
    keywords: ['hiccup', 'diaphragm', 'spasm'],
    theme: 'body',
    gradient: 'from-teal-100 via-sky-50 to-amber-50',
    defaultCompanion: 'animal',
    levelVisuals: [
      ['😮', '🫁', '💨', '⚡'],
      ['🥤', '🫧', '💨', '❓'],
      ['🧘‍♂️', '💧', '🫁', '✨'],
      ['💬', '📝', '💡', '❤️'],
      ['🏆', '🌟', '🫁', '🎉']
    ],
    l1Prompt: 'Let’s discover why hiccups happen! *HIC!* 😮',
    l1Speech: (child, comp) => ({
      kiki: `“*HIC!* Whoa! ${comp} just got the hiccups! Why does our body make that sudden jumpy squeak?”`,
      companion: `“*Hic!* It feels like my breathing muscle is playing hopscotch! What’s happening inside?”`,
      narration: [
        `${child} and ${comp} hear a funny little *HIC!* sound echo across the room.`,
        `KIKI points to the breathing muscle under our lungs: the diaphragm!`
      ]
    }),
    l2Prompt: () => 'Which muscle is jumping when we get a hiccup?',
    l2Speech: (comp) => ({
      kiki: `“Right under our lungs sits a flat superhero muscle called the diaphragm. When it gets tickled or startled, it spasms!”`,
      companion: `“Why does it make the 'HIC' sound when it twitches?”`,
      narration: [
        `KIKI demonstrates how the diaphragm pulls air in and snaps the vocal cords shut!`,
        `The snap shut makes the famous *HIC!* sound!`
      ],
      options: [
        'The diaphragm muscle underneath our lungs spasms and snaps our vocal cords shut',
        'Tiny birds are chirping inside our elbows',
        'Our teeth are clicking against our shoes'
      ]
    }),
    l3Prompt: () => 'How can we help our diaphragm relax and stop hiccuping?',
    l3Speech: (comp) => ({
      kiki: `“To reset a startled diaphragm, we need to reset our breathing rhythm! Which method works?”`,
      companion: `“Should I spin in circles or take slow, calm breaths?”`,
      narration: [
        `KIKI guides ${comp} in resetting the breathing rhythm.`,
        `Calm, steady breathing or sipping water relaxes the muscle!`
      ],
      options: [
        'Take slow deep breaths or sip cool water steadily to calm the muscle reflex',
        'Yell loudly at a tree for three hours',
        'Hold your breath until you turn into a purple grape'
      ]
    }),
    l4Prompt: () => 'In your own words, teach KIKI why we get hiccups!',
    l4Speech: (comp) => ({
      kiki: `“Explain to KIKI: What causes a hiccup and how does our diaphragm do it?”`,
      companion: `“Tell KIKI so we can share the secret with everyone who gets a funny *hic*!”`,
      narration: [
        `KIKI listens carefully to your explanation.`,
        `Don’t worry about medical terms—just tell KIKI how the breathing muscle jumps!`
      ]
    }),
    l5Prompt: () => 'Next time you or a friend gets hiccups, what will you tell them?',
    l5Speech: (comp) => ({
      kiki: `“Hooray! The diaphragm is calm and happy again!”`,
      companion: `“No more hiccups! I know the science of my breathing superhero muscle!”`,
      narration: [
        `Bright sparkles swirl as ${comp} breathes easily and comfortably!`,
        `Our brave explorer is a certified Body Science Explorer!`
      ],
      options: [
        'It is just our diaphragm muscle having a quick spasm, and calm breathing helps it reset',
        'It means aliens are sending secret radio signals through our nose',
        'Hiccups last forever and never stop'
      ]
    })
  }
];

/**
 * Dynamically synthesizes a customized 5-level adventure for ANY topic,
 * ensuring the selected topic is the absolute source of truth.
 * Incorporates the AI Learning Plan and respects child age adaptation.
 */
export function generateParametricStory(setup: ParentSetup, existingPlan?: LearningPlan): StoryLevel[] {
  const plan = existingPlan || generateLearningPlan(setup);
  const companion = getCompanionDetails(setup.companionType);
  const child = setup.childName || 'Explorer';
  const age = setup.childAge || 9;
  const topicLower = setup.topic.toLowerCase();
  const goalLower = setup.learningGoal.toLowerCase();

  // 1. Strict Priority Matching: Match against topic title first
  let matchingBlueprint = TOPIC_BLUEPRINTS.find(b => 
    b.keywords.some(kw => {
      const regex = new RegExp(`\\b${kw}`, 'i');
      return regex.test(topicLower);
    })
  );

  // 2. Secondary check against learning goal ONLY if topic doesn't conflict
  if (!matchingBlueprint) {
    matchingBlueprint = TOPIC_BLUEPRINTS.find(b => {
      // Guard: Never match digestion or body blueprints if topic is about finance, civic, or plants
      if (b.theme === 'body' && (
        topicLower.includes('need') || 
        topicLower.includes('want') || 
        topicLower.includes('money') || 
        topicLower.includes('budget') || 
        topicLower.includes('plant') || 
        topicLower.includes('sunlight')
      )) {
        return false;
      }
      return b.keywords.some(kw => {
        const regex = new RegExp(`\\b${kw}`, 'i');
        return regex.test(goalLower);
      });
    });
  }

  if (matchingBlueprint) {
    const b = matchingBlueprint;
    const l1 = b.l1Speech(child, companion.name, age);
    const l2 = b.l2Speech(companion.name, age);
    const l3 = b.l3Speech(companion.name, age);
    const l4 = b.l4Speech(companion.name, age);
    const l5 = b.l5Speech(companion.name, age);

    return [
      {
        levelNumber: 1,
        phase: 'discover',
        phaseLabel: '1. Discover',
        title: `The Mystery of ${setup.topic}`,
        sceneVisual: {
          theme: b.theme,
          backdropGradient: b.gradient,
          visualItems: b.levelVisuals[0],
          characterAction: `${companion.name} and KIKI examining the scene`
        },
        sceneEmoji: b.levelVisuals[0][0] || '🌟',
        kikiExpression: 'curious',
        kikiDialogue: l1.kiki,
        characterSpeaker: companion.name,
        characterDialogue: l1.companion,
        shortNarration: l1.narration,
        keyDiscoveryHook: `Mission Goal: ${setup.learningGoal}`,
        interactionType: 'discover_tap',
        questionType: 'recall',
        prompt: b.l1Prompt,
        expectedCoreConcept: setup.learningGoal,
        scaffoldingHint: `Look at what KIKI and ${companion.name} are discovering!`,
        targetObjective: plan.learningObjectives[0] || setup.learningGoal,
        ageDepthExplanation: `Adapted for Age ${age}: Focuses on introductory curiosity and sensory cues.`
      },
      {
        levelNumber: 2,
        phase: 'explore',
        phaseLabel: '2. Explore',
        title: `Exploring the Clues`,
        sceneVisual: {
          theme: b.theme,
          backdropGradient: b.gradient,
          visualItems: b.levelVisuals[1],
          characterAction: `Testing the first clue together`
        },
        sceneEmoji: b.levelVisuals[1][0] || '🔎',
        kikiExpression: 'thinking',
        kikiDialogue: l2.kiki,
        characterSpeaker: companion.name,
        characterDialogue: l2.companion,
        shortNarration: l2.narration,
        keyDiscoveryHook: `Key Clue: ${setup.learningGoal}`,
        interactionType: 'choice',
        questionType: 'prediction',
        prompt: b.l2Prompt(age),
        options: l2.options,
        expectedCoreConcept: setup.learningGoal,
        scaffoldingHint: `Think about how the pieces fit together!`,
        targetObjective: plan.learningObjectives[1] || setup.learningGoal,
        ageDepthExplanation: `Adapted for Age ${age}: Tests cause and effect observation.`
      },
      {
        levelNumber: 3,
        phase: 'solve',
        phaseLabel: '3. Solve',
        title: `The Breakthrough Dilemma`,
        sceneVisual: {
          theme: b.theme,
          backdropGradient: b.gradient,
          visualItems: b.levelVisuals[2],
          characterAction: `Working through the central puzzle`
        },
        sceneEmoji: b.levelVisuals[2][0] || '🧩',
        kikiExpression: 'explaining',
        kikiDialogue: l3.kiki,
        characterSpeaker: companion.name,
        characterDialogue: l3.companion,
        shortNarration: l3.narration,
        keyDiscoveryHook: `Solving: ${setup.struggle || setup.learningGoal}`,
        interactionType: 'choice',
        questionType: 'why_reasoning',
        prompt: b.l3Prompt(age),
        options: l3.options,
        expectedCoreConcept: setup.learningGoal,
        scaffoldingHint: `Remember our core discovery!`,
        targetObjective: plan.learningObjectives[2] || setup.learningGoal,
        ageDepthExplanation: `Adapted for Age ${age}: Targets key misconception hurdle.`
      },
      {
        levelNumber: 4,
        phase: 'teach',
        phaseLabel: '4. Teach KIKI',
        title: `Explain It in Your Own Words`,
        sceneVisual: {
          theme: b.theme,
          backdropGradient: b.gradient,
          visualItems: b.levelVisuals[3],
          characterAction: `KIKI listening eagerly with notepad`
        },
        sceneEmoji: '💬',
        kikiExpression: 'happy',
        kikiDialogue: l4.kiki,
        characterSpeaker: companion.name,
        characterDialogue: l4.companion,
        shortNarration: l4.narration,
        keyDiscoveryHook: `Explain the discovery: ${setup.learningGoal}`,
        interactionType: 'own_words',
        questionType: 'teach_back',
        prompt: b.l4Prompt(age),
        expectedCoreConcept: setup.learningGoal,
        scaffoldingHint: `Spelling and grammar don’t matter—just share your thoughts!`,
        targetObjective: plan.learningObjectives[3] || setup.learningGoal,
        ageDepthExplanation: `Teach-Back Moment: AI evaluates semantic understanding independently.`
      },
      {
        levelNumber: 5,
        phase: 'master',
        phaseLabel: '5. Master',
        title: `Master Quest Triumph!`,
        sceneVisual: {
          theme: b.theme,
          backdropGradient: b.gradient,
          visualItems: b.levelVisuals[4],
          characterAction: `Celebration and final triumph`
        },
        sceneEmoji: '🏆',
        kikiExpression: 'cheering',
        kikiDialogue: l5.kiki,
        characterSpeaker: companion.name,
        characterDialogue: l5.companion,
        shortNarration: l5.narration,
        keyDiscoveryHook: `Concept Mastered: ${setup.topic}`,
        interactionType: 'master_choice',
        questionType: 'real_life_transfer',
        prompt: b.l5Prompt(age),
        options: l5.options,
        expectedCoreConcept: setup.learningGoal,
        scaffoldingHint: `You are the master of this discovery!`,
        targetObjective: plan.learningObjectives[4] || plan.learningObjectives[0],
        ageDepthExplanation: `Adapted for Age ${age}: Tests real-world transfer to novel dilemma.`
      }
    ];
  }

  // GENERAL DYNAMIC ENGINE FOR ANY ARBITRARY CUSTOM TOPIC
  const settingName = setup.storyWorld ? `${setup.storyWorld} Outpost` : 'Adventure Station';
  const interest = setup.interest || 'everyday objects';

  const agePrefix = age <= 7 
    ? '“Let’s look at this secret together!”' 
    : age <= 10 
      ? '“Let’s investigate how cause and effect work here!”' 
      : '“Let’s analyze the underlying scientific mechanism!”';

  return [
    {
      levelNumber: 1,
      phase: 'discover',
      phaseLabel: '1. Discover',
      title: `The Mystery of ${setup.topic}`,
      sceneVisual: {
        theme: 'everyday',
        backdropGradient: 'from-amber-100 via-sky-100 to-amber-50',
        visualItems: ['🌟', '🔍', '❓', '✨'],
        characterAction: `${companion.name} and KIKI discovering ${setup.topic}`
      },
      sceneEmoji: '🌟',
      kikiExpression: 'curious',
      kikiDialogue: `“Hi ${child}! Look at this puzzle about ${setup.topic}! ${agePrefix}”`,
      characterSpeaker: companion.name,
      characterDialogue: `“${companion.sound} I was wondering: how can we achieve our goal: ${setup.learningGoal}?”`,
      shortNarration: [
        `${child} and ${companion.name} arrive at ${settingName} ready for an adventure.`,
        `KIKI points to a curious discovery: our mission today is to master ${setup.topic}!`
      ],
      keyDiscoveryHook: `Mission Focus: ${setup.learningGoal}`,
      interactionType: 'discover_tap',
      questionType: 'recall',
      prompt: `Let’s investigate ${setup.topic} together! 🚀`,
      expectedCoreConcept: setup.learningGoal,
      scaffoldingHint: `Look at what KIKI and ${companion.name} are discovering!`,
      targetObjective: plan.learningObjectives[0] || setup.learningGoal,
      ageDepthExplanation: `Introductory hook tailored for Age ${age}.`
    },
    {
      levelNumber: 2,
      phase: 'explore',
      phaseLabel: '2. Explore',
      title: `Testing the Mechanism`,
      sceneVisual: {
        theme: 'everyday',
        backdropGradient: 'from-sky-100 via-teal-50 to-amber-50',
        visualItems: ['🔎', '⚙️', '💡', '📐'],
        characterAction: `Testing how ${setup.topic} connects to ${interest}`
      },
      sceneEmoji: '🔎',
      kikiExpression: 'thinking',
      kikiDialogue: `“Look closely at our ${interest}! Which clue explains ${setup.topic}?”`,
      characterSpeaker: companion.name,
      characterDialogue: `“Let’s test our understanding! Which rule makes the most sense?”`,
      shortNarration: [
        `KIKI tests the first clue using ${interest}.`,
        `Every piece starts connecting back to our goal: ${setup.learningGoal}!`
      ],
      keyDiscoveryHook: `Core Principle: ${setup.learningGoal}`,
      interactionType: 'choice',
      questionType: 'prediction',
      prompt: `Which idea explains how ${setup.topic} works?`,
      options: [
        `The core rule: ${setup.learningGoal}`,
        `It changes completely randomly every second`,
        `We should guess without checking how it works`
      ],
      expectedCoreConcept: setup.learningGoal,
      scaffoldingHint: `Think about our learning goal: ${setup.learningGoal}!`,
      targetObjective: plan.learningObjectives[1] || setup.learningGoal,
      ageDepthExplanation: `Cause and effect prediction tailored for Age ${age}.`
    },
    {
      levelNumber: 3,
      phase: 'solve',
      phaseLabel: '3. Solve',
      title: `Overcoming the Puzzle`,
      sceneVisual: {
        theme: 'everyday',
        backdropGradient: 'from-amber-100 via-orange-100 to-amber-50',
        visualItems: ['🧩', '⚡', '🗝️', '✨'],
        characterAction: `Cracking the tricky hurdle of ${setup.topic}`
      },
      sceneEmoji: '🧩',
      kikiExpression: 'explaining',
      kikiDialogue: `“We reached the tricky part! How do we solve this challenge?”`,
      characterSpeaker: companion.name,
      characterDialogue: `“Instead of getting stuck on ${setup.struggle || 'confusion'}, let's use the secret rule!”`,
      shortNarration: [
        `The characters face a tricky obstacle with ${setup.topic}.`,
        `By focusing on ${setup.learningGoal}, the solution becomes crystal clear!`
      ],
      keyDiscoveryHook: `Solving: ${setup.learningGoal}`,
      interactionType: 'choice',
      questionType: 'why_reasoning',
      prompt: `How can ${child} solve the dilemma about ${setup.topic}?`,
      options: [
        `Apply the true mechanism: ${setup.learningGoal}`,
        `Assume ${setup.struggle || 'an incorrect guess'} without testing`,
        `Walk away from the puzzle entirely`
      ],
      expectedCoreConcept: setup.learningGoal,
      scaffoldingHint: `Focus on the mechanism: ${setup.learningGoal}!`,
      targetObjective: plan.learningObjectives[2] || setup.learningGoal,
      ageDepthExplanation: `Reasoning challenge addressing likely misconception.`
    },
    {
      levelNumber: 4,
      phase: 'teach',
      phaseLabel: '4. Teach KIKI',
      title: `Explain It in Your Own Words`,
      sceneVisual: {
        theme: 'everyday',
        backdropGradient: 'from-amber-50 via-sky-50 to-amber-50',
        visualItems: ['💬', '📝', '💡', '✨'],
        characterAction: `KIKI listening to ${child}’s explanation`
      },
      sceneEmoji: '💬',
      kikiExpression: 'happy',
      kikiDialogue: `“Can you tell me in your own words: How does ${setup.topic} work?”`,
      characterSpeaker: companion.name,
      characterDialogue: `“Explain it in your own words so our team remembers forever!”`,
      shortNarration: [
        `KIKI sits down with a golden notebook, ready to listen to your ideas.`,
        `Spelling and punctuation don't matter at all—just tell KIKI how you figured it out!`
      ],
      keyDiscoveryHook: `Teach KIKI: ${setup.learningGoal}`,
      interactionType: 'own_words',
      questionType: 'teach_back',
      prompt: `In your own words, explain to KIKI what you discovered about ${setup.topic}!`,
      expectedCoreConcept: setup.learningGoal,
      scaffoldingHint: `Talk about how ${setup.learningGoal} works!`,
      targetObjective: plan.learningObjectives[3] || setup.learningGoal,
      ageDepthExplanation: `Independent teach-back evaluation for child reasoning.`
    },
    {
      levelNumber: 5,
      phase: 'master',
      phaseLabel: '5. Master',
      title: `Master Quest Triumph!`,
      sceneVisual: {
        theme: 'everyday',
        backdropGradient: 'from-amber-200 via-sky-200 to-amber-100',
        visualItems: ['🏆', '🌟', '🎉', '👑'],
        characterAction: `Grand celebration and master quest victory`
      },
      sceneEmoji: '🏆',
      kikiExpression: 'cheering',
      kikiDialogue: `“HOORAY! You solved the mystery of ${setup.topic}!”`,
      characterSpeaker: companion.name,
      characterDialogue: `“${companion.sound} Mission accomplished! ${child} is a true master of ${setup.topic}!”`,
      shortNarration: [
        `Sparks of golden stardust float across ${settingName}!`,
        `Thanks to ${child}, our entire adventure is a triumphant success!`
      ],
      keyDiscoveryHook: `Mastered: ${setup.topic}`,
      interactionType: 'master_choice',
      questionType: 'real_life_transfer',
      prompt: `Now that you understand ${setup.topic}, what will happen next time you see this in the real world?`,
      options: [
        `The same rule stays true everywhere because ${setup.learningGoal}`,
        `It changes into something totally different tomorrow`,
        `We must start over from zero every time`
      ],
      expectedCoreConcept: `Consistent application of ${setup.learningGoal}`,
      scaffoldingHint: `The truth of ${setup.topic} stays true everywhere!`,
      targetObjective: plan.learningObjectives[0] || setup.learningGoal,
      ageDepthExplanation: `Real-life transfer and mastery verification.`
    }
  ];
}
