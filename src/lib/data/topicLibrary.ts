export interface TopicPreset {
  id: string;
  topic: string;
  category: 'mathematics' | 'science' | 'everyday';
  learningGoal: string;
  defaultStruggle?: string;
  suggestedAge: number;
  world: string;
  companion: string;
  interest: string;
  learningStyle: string;
  subtopic?: string;
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
  // ==========================================
  // 1. MATHEMATICS (School Learning Core)
  // ==========================================
  {
    id: 'math',
    name: 'Mathematics',
    emoji: '📐',
    worldName: 'Space Station & Number Orbit',
    description: 'Transform school mathematics into hands-on space missions, kitchen challenges, and puzzle quests.',
    topics: [
      {
        id: 'math-mult-7',
        topic: 'Multiplication & Division (7 × 6 Equal Groups)',
        category: 'mathematics',
        subtopic: 'Multiplication & Division',
        learningGoal: 'Understand that 7 × 6 means 7 equal groups of 6, and build from 5 × 6 = 30 + 12 = 42.',
        defaultStruggle: 'Understands multiplication as equal groups, but confuses 7 × 6 with 7 × 7 or counts one-by-one from zero.',
        suggestedAge: 9,
        world: 'space',
        companion: 'robot',
        interest: 'rockets and crystal fuel trays',
        learningStyle: 'adventure'
      },
      {
        id: 'math-fractions',
        topic: 'Fractions (Comparing 1/3 vs 1/4 Slices)',
        category: 'mathematics',
        subtopic: 'Fractions',
        learningGoal: 'Understand that the denominator represents total equal parts: dividing a whole into more slices makes each slice smaller.',
        defaultStruggle: 'Thinks 1/4 is bigger than 1/3 because 4 is greater than 3.',
        suggestedAge: 11,
        world: 'kitchen',
        companion: 'child',
        interest: 'pizza baking and bakery counters',
        learningStyle: 'mystery'
      },
      {
        id: 'math-arithmetic-regrouping',
        topic: 'Arithmetic (Addition & Regrouping Base-10)',
        category: 'mathematics',
        subtopic: 'Arithmetic',
        learningGoal: 'Understand place value: when 10 ones are gathered together, they bundle into exactly 1 ten.',
        defaultStruggle: 'Writes double-digit sums in a single column without carrying the bundled ten.',
        suggestedAge: 7,
        world: 'forest',
        companion: 'animal',
        interest: 'collecting golden acorns in baskets',
        learningStyle: 'discovery'
      },
      {
        id: 'math-decimals',
        topic: 'Decimals (Tenths & Hundredths in Market Coins)',
        category: 'mathematics',
        subtopic: 'Decimals',
        learningGoal: 'Understand that decimals represent parts between whole numbers (e.g. 0.5 is half, 0.25 is one quarter).',
        defaultStruggle: 'Thinks 0.45 is greater than 0.5 because 45 is larger than 5.',
        suggestedAge: 10,
        world: 'city',
        companion: 'robot',
        interest: 'digital currency and market counters',
        learningStyle: 'mystery'
      },
      {
        id: 'math-percentages',
        topic: 'Percentages (% as Parts per Hundred)',
        category: 'mathematics',
        subtopic: 'Percentages',
        learningGoal: 'Understand that percent means "per 100", so 50% means 50 out of 100 equal pieces (half).',
        defaultStruggle: 'Confuses percentage with a fixed quantity rather than a ratio out of 100.',
        suggestedAge: 11,
        world: 'space',
        companion: 'robot',
        interest: 'battery charge meters and shield power',
        learningStyle: 'adventure'
      },
      {
        id: 'math-ratios',
        topic: 'Ratios & Proportions (Color Mixing & Recipes)',
        category: 'mathematics',
        subtopic: 'Ratios',
        learningGoal: 'Understand that a 2:1 ratio means 2 parts of one item for every 1 part of another.',
        defaultStruggle: 'Adds the same fixed number instead of multiplying both parts to scale.',
        suggestedAge: 11,
        world: 'kitchen',
        companion: 'child',
        interest: 'alchemy potions and smoothie blending',
        learningStyle: 'discovery'
      },
      {
        id: 'math-geometry-angles',
        topic: 'Geometry (Angles & Perimeter in Architecture)',
        category: 'mathematics',
        subtopic: 'Geometry',
        learningGoal: 'Understand that an angle measures turning, with right angles making crisp 90-degree square corners.',
        defaultStruggle: 'Thinks the length of an angle’s arms changes the degree of the angle.',
        suggestedAge: 10,
        world: 'city',
        companion: 'child',
        interest: 'building bridges and skyscraper blueprints',
        learningStyle: 'adventure'
      },
      {
        id: 'math-measurement',
        topic: 'Measurement (Perimeter vs Area of a Garden)',
        category: 'mathematics',
        subtopic: 'Measurement',
        learningGoal: 'Understand that perimeter is the distance around the outer boundary, while area is the space covering inside.',
        defaultStruggle: 'Confuses outer boundary walking with inside square coverage.',
        suggestedAge: 8,
        world: 'village',
        companion: 'animal',
        interest: 'fencing a garden patch for rabbits',
        learningStyle: 'discovery'
      },
      {
        id: 'math-data-graphs',
        topic: 'Data & Graphs (Reading Bar Charts & Trends)',
        category: 'mathematics',
        subtopic: 'Data and graphs',
        learningGoal: 'Understand how bar heights correspond to numerical values on an axis to compare quantities at a glance.',
        defaultStruggle: 'Looks only at bar colors without checking the axis scale numbers.',
        suggestedAge: 9,
        world: 'school',
        companion: 'robot',
        interest: 'weather stations and tracking bird sightings',
        learningStyle: 'mystery'
      },
      {
        id: 'math-problem-solving',
        topic: 'Problem Solving (Working Backwards & Logic Clues)',
        category: 'mathematics',
        subtopic: 'Problem solving',
        learningGoal: 'Break down complex multi-step problems by reversing operations from the final clue.',
        defaultStruggle: 'Jumps straight to guessing without tracing operations backwards.',
        suggestedAge: 10,
        world: 'cyber',
        companion: 'magical',
        interest: 'escape room vaults and treasure maps',
        learningStyle: 'mystery'
      }
    ]
  },

  // ==========================================
  // 2. SCIENCE (School Learning Core)
  // ==========================================
  {
    id: 'science',
    name: 'Science & Nature',
    emoji: '🔬',
    worldName: 'Wonder Woods & Discovery Lab',
    description: 'Explore the human body, physical forces, chemical reactions, ecosystems, and planetary science.',
    topics: [
      {
        id: 'sci-digestion',
        topic: 'Digestion (Mechanical & Chemical Breakdown)',
        category: 'science',
        subtopic: 'Human body & digestion',
        learningGoal: 'Understand that digestion breaks food into microscopic nutrients through mechanical and chemical processes, absorbed in the small intestine.',
        defaultStruggle: 'Thinks the stomach absorbs all nutrients and that digestion and absorption are the exact same thing.',
        suggestedAge: 11,
        world: 'forest',
        companion: 'animal',
        interest: 'energy for sports and healthy nutrition',
        learningStyle: 'discovery'
      },
      {
        id: 'sci-shadows',
        topic: 'Light and Shadows (Straight Light Rays Blocked)',
        category: 'science',
        subtopic: 'Light and shadows',
        learningGoal: 'Understand that light travels in straight lines and when blocked by an opaque solid object, a dark shadow forms behind it.',
        defaultStruggle: 'Thinks shadows are living creatures that crawl, or that clear glass casts a dark shadow.',
        suggestedAge: 6,
        world: 'forest',
        companion: 'animal',
        interest: 'flashlights and silly shadow puppets',
        learningStyle: 'discovery'
      },
      {
        id: 'sci-photosynthesis',
        topic: 'Photosynthesis (Leaves as Solar Kitchens)',
        category: 'science',
        subtopic: 'Plants & photosynthesis',
        learningGoal: 'Understand that chloroplasts use sunlight, water, and carbon dioxide to synthesize glucose (sugar) and release oxygen.',
        defaultStruggle: 'Thinks plants eat soil and dirt like cereal instead of producing their own food.',
        suggestedAge: 11,
        world: 'forest',
        companion: 'animal',
        interest: 'treehouses, garden greenhouses, and botany',
        learningStyle: 'discovery'
      },
      {
        id: 'sci-force-motion',
        topic: 'Force and Motion (Inertia, Friction & Net Force)',
        category: 'science',
        subtopic: 'Force and motion',
        learningGoal: 'Understand that unbalanced forces cause acceleration, while friction opposes motion, and objects in motion stay in motion without net force.',
        defaultStruggle: 'Believes continuous pushing force is required just to maintain constant speed in frictionless motion.',
        suggestedAge: 12,
        world: 'space',
        companion: 'robot',
        interest: 'rollercoasters, hovercrafts, and skateboards',
        learningStyle: 'adventure'
      },
      {
        id: 'sci-airplanes-lift',
        topic: 'How Do Airplanes Fly? (Airfoils & Aerodynamic Lift)',
        category: 'science',
        subtopic: 'Physics of flight',
        learningGoal: 'Understand that curved wings (airfoils) cause air to rush faster over the top, generating an upward pressure difference called Lift.',
        defaultStruggle: 'Thinks engines push the airplane straight up into the sky like a rocket.',
        suggestedAge: 10,
        world: 'sky',
        companion: 'child',
        interest: 'cloud gliders, paper airplanes, and jet engines',
        learningStyle: 'adventure'
      },
      {
        id: 'sci-human-body-heart',
        topic: 'Human Body (How the Heart Pumps Blood)',
        category: 'science',
        subtopic: 'Human body',
        learningGoal: 'Understand that the heart is a muscular pump sending oxygen-rich blood through arteries to power body cells.',
        defaultStruggle: 'Thinks blood only moves when you shake your body or run.',
        suggestedAge: 9,
        world: 'school',
        companion: 'child',
        interest: 'heartbeat monitors, sprint races, and exercise',
        learningStyle: 'discovery'
      },
      {
        id: 'sci-states-of-matter',
        topic: 'States of Matter (Solids, Liquids & Gas Molecules)',
        category: 'science',
        subtopic: 'States of matter',
        learningGoal: 'Understand that heating adds energy to molecules, causing rigid solids to melt into flowing liquids and evaporate into gas.',
        defaultStruggle: 'Thinks evaporating steam disappears into non-existence.',
        suggestedAge: 8,
        world: 'kitchen',
        companion: 'robot',
        interest: 'ice sculptures, boiling kettles, and dry ice',
        learningStyle: 'discovery'
      },
      {
        id: 'sci-electricity',
        topic: 'Electricity (Closed Circuits & Battery Power)',
        category: 'science',
        subtopic: 'Electricity',
        learningGoal: 'Understand that electric current only flows when there is an unbroken complete circuit loop from battery to bulb.',
        defaultStruggle: 'Thinks a single wire touching a bulb will light it without a return path.',
        suggestedAge: 10,
        world: 'cyber',
        companion: 'robot',
        interest: 'circuit boards, glowing LEDs, and robots',
        learningStyle: 'mystery'
      },
      {
        id: 'sci-ecosystems',
        topic: 'Ecosystems (Food Webs & Ecological Balance)',
        category: 'science',
        subtopic: 'Ecosystems',
        learningGoal: 'Understand how energy flows from the sun to producers (plants) to herbivores and predators, maintaining natural balance.',
        defaultStruggle: 'Thinks removing one predator has no impact on other animals in the food chain.',
        suggestedAge: 9,
        world: 'forest',
        companion: 'animal',
        interest: 'wildlife tracking, coral reefs, and nature parks',
        learningStyle: 'discovery'
      },
      {
        id: 'sci-space-gravity',
        topic: 'Space & Gravity (Planetary Orbits & Weight)',
        category: 'science',
        subtopic: 'Space',
        learningGoal: 'Understand that gravity is an invisible mutual attraction pulling objects toward mass centers, keeping planets in orbit.',
        defaultStruggle: 'Thinks gravity disappears in space because of lack of air rather than orbital freefall.',
        suggestedAge: 10,
        world: 'space',
        companion: 'robot',
        interest: 'astronaut spacewalks, lunar rovers, and telescopes',
        learningStyle: 'adventure'
      }
    ]
  },

  // ==========================================
  // 3. EVERYDAY LEARNING & LIFE SKILLS
  // ==========================================
  {
    id: 'everyday',
    name: 'Everyday Learning',
    emoji: '🏙️',
    worldName: 'Everyday City & Life Hub',
    description: 'Practical intelligence: civic sense, digital safety, hygiene habits, emotional resilience, and smart decision making.',
    topics: [
      {
        id: 'civic-clean-places',
        topic: 'Civic Sense (Keeping Public Places Clean)',
        category: 'everyday',
        subtopic: 'Civic sense',
        learningGoal: 'Understand that streets, parks, and buses belong to the whole community, so littering degrades shared living spaces for everyone.',
        defaultStruggle: 'Drops wrappers on the ground assuming "someone else gets paid to sweep it up".',
        suggestedAge: 8,
        world: 'city',
        companion: 'monster',
        interest: 'park playgrounds and neighborhood animals',
        learningStyle: 'rescue'
      },
      {
        id: 'dig-privacy',
        topic: 'Digital Safety (Online Privacy & Passwords)',
        category: 'everyday',
        subtopic: 'Digital safety',
        learningGoal: 'Understand never to share real names, home address, school, or passwords with online strangers or gaming chatboxes.',
        defaultStruggle: 'Shares personal secrets in gaming lobbies in exchange for virtual coins.',
        suggestedAge: 10,
        world: 'cyber',
        companion: 'robot',
        interest: 'multiplayer video games and avatar builders',
        learningStyle: 'rescue'
      },
      {
        id: 'care-handwashing',
        topic: 'Self-Care & Hygiene (20-Second Soap Hand Washing)',
        category: 'everyday',
        subtopic: 'Hygiene',
        learningGoal: 'Understand that soap molecules attach to invisible germs and grease, lifting them away into bubbly foam to be rinsed down the drain.',
        defaultStruggle: 'Rinses hands with plain water for 2 seconds without using bubbly soap.',
        suggestedAge: 6,
        world: 'school',
        companion: 'animal',
        interest: 'bubble potions and playground mud games',
        learningStyle: 'adventure'
      },
      {
        id: 'every-needs-wants',
        topic: 'Everyday Decisions (Needs vs. Wants & Budgeting)',
        category: 'everyday',
        subtopic: 'Everyday decision making',
        learningGoal: 'Understand that essential survival needs (healthy food, clean water, shelter) must come before discretionary wants (extra toys, treats).',
        defaultStruggle: 'Demands expensive luxury toys at the grocery checkout thinking money is infinite.',
        suggestedAge: 9,
        world: 'city',
        companion: 'child',
        interest: 'market stalls, piggy banks, and shopping carts',
        learningStyle: 'real-life'
      },
      {
        id: 'body-hiccups',
        topic: 'Body Reflexes (Why We Hiccup & Calming the Diaphragm)',
        category: 'everyday',
        subtopic: 'Body reflex',
        learningGoal: 'Understand that hiccups occur when the diaphragm breathing muscle spasms, snapping vocal cords shut, and slow breathing resets the reflex.',
        defaultStruggle: 'Thinks hiccups are caused by swallowing air rocks or last forever without physical cause.',
        suggestedAge: 8,
        world: 'school',
        companion: 'animal',
        interest: 'funny body sounds and breathing exercises',
        learningStyle: 'discovery'
      },
      {
        id: 'emo-disappointment',
        topic: 'Emotions & Social Learning (Handling Disappointment)',
        category: 'everyday',
        subtopic: 'Emotions & social learning',
        learningGoal: 'Understand that disappointment is a natural feeling when plans change, and pausing for three calming breaths helps reset perspective.',
        defaultStruggle: 'Reacts with big meltdowns or tears when games get rained out.',
        suggestedAge: 7,
        world: 'forest',
        companion: 'monster',
        interest: 'block towers and rainy day board games',
        learningStyle: 'real-life'
      }
    ]
  }
];
