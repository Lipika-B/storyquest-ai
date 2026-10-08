import { ParentSetup, StoryLevel, StoryWorld, SceneVisualDetails } from '../types/quest';

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
    default:
      return { settingName: 'Wonderland Realm', icon: '🗺️', description: 'a vibrant world of hands-on discovery' };
  }
}

interface TopicTemplate {
  keywords: string[];
  theme: SceneVisualDetails['theme'];
  gradient: string;
  defaultCompanion: string;
  levelVisuals: string[][];
  l1Prompt: string;
  l1Speech: (child: string, companion: string) => { kiki: string; companion: string; narration: string[] };
  l2Prompt: string;
  l2Speech: (companion: string) => { kiki: string; companion: string; narration: string[]; options: string[] };
  l3Prompt: string;
  l3Speech: (companion: string) => { kiki: string; companion: string; narration: string[]; options: string[] };
  l4Prompt: string;
  l4Speech: (companion: string) => { kiki: string; companion: string; narration: string[] };
  l5Prompt: string;
  l5Speech: (companion: string) => { kiki: string; companion: string; narration: string[]; options: string[] };
}

// Specialized topic blueprints ensuring 100% accurate pedagogical narratives for key domains
const TOPIC_BLUEPRINTS: TopicTemplate[] = [
  // 1. DIGESTION
  {
    keywords: ['digest', 'food', 'stomach', 'eat', 'tummy', 'belly', 'chew'],
    theme: 'body',
    gradient: 'from-amber-100 via-orange-100 to-amber-50',
    defaultCompanion: 'animal',
    levelVisuals: [
      ['🐒', '🍌', '🌳', '✨'], // L1: Monkey eating banana under tree
      ['👄', '🦷', '🍌', '⬇️'], // L2: Chewing and swallowing
      ['🫧', '🥣', '🧪', '⚡'], // L3: Stomach breaking food into nutrients
      ['💡', '✨', '🍎', '❤️'], // L4: Blood carrying energy to muscles
      ['🏃‍♂️', '⚡', '🏆', '🌟']  // L5: Running with renewed energy!
    ],
    l1Prompt: 'Let’s follow the banana’s journey! 🍌',
    l1Speech: (child, comp) => ({
      kiki: `“Yum! ${comp} is eating a sweet banana! But where does the banana go after we swallow it?”`,
      companion: `“Chomp chomp! My tummy is happy, but I wonder where the energy comes from!”`,
      narration: [
        `${comp} sits under a shady tree enjoying a delicious banana snack.`,
        `KIKI hops over with a magnifying glass: "Every bite of food is about to go on a big body journey!"`
      ]
    }),
    l2Prompt: 'What happens first when food enters our mouth?',
    l2Speech: (comp) => ({
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
    }),
    l3Prompt: 'How does the stomach break down the food even smaller?',
    l3Speech: (comp) => ({
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
    }),
    l4Prompt: 'In your own words, tell KIKI: What happens to food after we eat it?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: What journey does food take inside our body?”`,
      companion: `“Teach me so I understand where my running energy comes from!”`,
      narration: [
        `KIKI sits down with a sparkling notebook, excited to hear your explanation!`,
        `Think about chewing, the tummy, and how our body gets energy.`
      ]
    }),
    l5Prompt: 'Where do the tiny nutrients travel after digestion to make us run fast?',
    l5Speech: (comp) => ({
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
    })
  },

  // 2. MULTIPLICATION / EQUAL GROUPS (7 x 6)
  {
    keywords: ['multipl', '7 x 6', '7x6', 'table', 'equal groups', 'times table'],
    theme: 'space',
    gradient: 'from-slate-950 via-indigo-950 to-slate-900',
    defaultCompanion: 'robot',
    levelVisuals: [
      ['🚀', '🤖', '📦', '⭐'], // L1: Rocket launch pad with empty trays
      ['📦', '📦', '📦', '🔋'], // L2: 5 trays holding 35 crystals
      ['⚡', '🔋', '➕', '7️⃣'], // L3: Adding the 6th tray of 7
      ['💬', '🤖', '✨', '💡'], // L4: Explaining 7 equal groups to Kiki
      ['🚀', '🌌', '🏆', '⭐']  // L5: Rockets taking flight with 42 crystals
    ],
    l1Prompt: 'Let’s inspect the rocket fuel trays! 🚀',
    l1Speech: (child, comp) => ({
      kiki: `“BEEP! Commander ${child}! ${comp} has 7 rocket boosters to load. Each tray needs exactly 6 fuel crystals!”`,
      companion: `“CLANK! My logic sensors are buzzing! How many crystals do we need for 7 trays of 6?”`,
      narration: [
        `At Orbital Station Alpha, the starship engines are preparing for launch.`,
        `Instead of guessing or counting crystals one by one from zero, KIKI points to the tray racks!`
      ]
    }),
    l2Prompt: 'How can we use equal groups instead of counting one by one?',
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
    l3Prompt: 'How do we reach 7 groups of 6 from 5 groups (30)?',
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
    l4Prompt: 'In your own words, explain to KIKI: How does 7 × 6 work using equal groups?',
    l4Speech: (comp) => ({
      kiki: `“Can you teach my robot circuits in your own words? Why is 7 × 6 = 42?”`,
      companion: `“Tell me in your own words so my memory chip remembers forever!”`,
      narration: [
        `KIKI listens eagerly as you explain the secret of equal groups and friendly benchmarks.`,
        `Spelling and math symbols don't matter—just share your thinking!`
      ]
    }),
    l5Prompt: 'If Captain Orion arrives with 8 trays tomorrow, what is 8 × 6?',
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

  // 3. FRACTIONS (Equal Parts of a Whole / Pizza Sharing)
  {
    keywords: ['fraction', 'half', 'quarter', 'slice', 'denominator', '1/2', '1/3', '1/4', 'equal parts'],
    theme: 'kitchen',
    gradient: 'from-amber-100 via-orange-50 to-amber-50',
    defaultCompanion: 'child',
    levelVisuals: [
      ['🍕', '👧', '🔪', '✨'], // L1: Whole pizza on bakery board
      ['🍕', '2️⃣', '🤝', '✂️'], // L2: Cut into 2 equal halves (1/2)
      ['🍕', '4️⃣', '📉', '🔍'], // L3: Cut into 4 slices (1/4 vs 1/2)
      ['💬', '👧', '💡', '✨'], // L4: Explaining fraction denominator to Kiki
      ['🏆', '🎂', '🌟', '🎉']  // L5: Perfectly shared celebration cake!
    ],
    l1Prompt: 'Let’s check the bakery pizza! 🍕',
    l1Speech: (child, comp) => ({
      kiki: `“Mmm! Fresh pizza! But ${comp} and KIKI need to share it fairly. What does a fraction mean?”`,
      companion: `“If we don’t cut equal pieces, someone gets a tiny slice and someone gets a giant slice!”`,
      narration: [
        `At Sunflower Bakery, a warm round pizza rests on the counter.`,
        `A fraction is a way to describe equal pieces of one whole thing!`
      ]
    }),
    l2Prompt: 'When we cut one whole pizza into 2 equal pieces, what is each piece called?',
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
    l3Prompt: 'If we cut the same pizza into 4 slices (1/4), is each slice bigger or smaller than 1/2?',
    l3Speech: (comp) => ({
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
    }),
    l4Prompt: 'In your own words, explain to KIKI: What does a fraction like 1/2 or 1/4 mean?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: What does the bottom number (denominator) tell us about the pizza?”`,
      companion: `“Teach me so I never confuse slice sizes again!”`,
      narration: [
        `KIKI watches with a smile as you explain how equal pieces work.`,
        `Just describe sharing and slice sizes in your own words!`
      ]
    }),
    l5Prompt: 'If we share an emergency cake among 8 friends (1/8 each), how does 1/8 compare to 1/4?',
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
      ['✈️', '👧', '☁️', '💨'], // L1: Plane on runway
      ['🪽', '💨', '⬆️', '📐'], // L2: Curved wing shape (airfoil)
      ['🌬️', '🚀', '⬆️', '⚡'], // L3: Fast air above, slow air below creating LIFT
      ['💬', '👧', '✨', '☁️'], // L4: Explaining lift to Kiki
      ['✈️', '🌈', '🏆', '🌟']  // L5: Gliding gracefully through the clouds
    ],
    l1Prompt: 'Let’s inspect the airplane wings! ✈️',
    l1Speech: (child, comp) => ({
      kiki: `“Look at that giant metal airplane! How does a heavy metal plane stay up in the sky without falling?”`,
      companion: `“Airplanes are so heavy! There are no strings holding them up. What is lifting them?”`,
      narration: [
        `At Sunbeam Airfield, a silver airplane rests on the tarmac.`,
        `KIKI points to the specially curved wings: the secret is how wings push through the air!`
      ]
    }),
    l2Prompt: 'What special curved shape do airplane wings have?',
    l2Speech: (comp) => ({
      kiki: `“Look at the side of the wing! The top is curved like a gentle hill, while the bottom is flat.”`,
      companion: `“Why isn’t the wing just a flat wooden plank?”`,
      narration: [
        `The curved top shape is called an airfoil.`,
        `As the plane rushes forward, air splits and flows over and under the wing!`
      ],
      options: [
        'The wing is curved on top and flatter on the bottom so air flows differently',
        'The wing is round like a bowling ball',
        'Wings are made of solid rock with no air flow'
      ]
    }),
    l3Prompt: 'How does fast air over the wing create an upward push called LIFT?',
    l3Speech: (comp) => ({
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
    }),
    l4Prompt: 'In your own words, explain to KIKI: How do airplane wings create lift to fly?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: Why do curved wings and moving air make a plane fly?”`,
      companion: `“Teach me so I can pilot our cloud glider!”`,
      narration: [
        `KIKI listens with twinkling eyes as you explain lift, speed, and wings.`,
        `Describe how the air moves and pushes the plane up!`
      ]
    }),
    l5Prompt: 'What happens if an airplane slows down too much while trying to fly?',
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
      ['🔦', '🦊', '👤', '🌲'], // L1: Flashlight and funny shadow
      ['☀️', '🧍', '⬛', '📐'], // L2: Straight light beams blocked by body
      ['🌅', '🚶', '📏', '📐'], // L3: Sun moving changing shadow length
      ['💬', '🦊', '💡', '✨'], // L4: Explaining shadows to Kiki
      ['🎭', '🎪', '🏆', '⭐']  // L5: Master shadow puppet theater!
    ],
    l1Prompt: 'Let’s investigate the mysterious dark shape on the ground! 👤',
    l1Speech: (child, comp) => ({
      kiki: `“Look behind you! A dark shape is copying every jump you make! Is it a friendly copycat?”`,
      companion: `“Whenever I raise my paw, the dark shape raises its paw too! What is a shadow?”`,
      narration: [
        `In the sunny meadow, a dark silhouette stretches across the green grass.`,
        `KIKI points to the bright sun shining right behind ${comp}!`
      ]
    }),
    l2Prompt: 'How does a shadow form when light shines on something solid?',
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
    l3Prompt: 'What happens to your shadow when the sun is low in the morning versus high at noon?',
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
    l4Prompt: 'In your own words, explain to KIKI: Why do shadows happen?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: Why does blocking a light beam make a shadow on the floor?”`,
      companion: `“Teach me so we can put on our shadow puppet show!”`,
      narration: [
        `KIKI sits down with a puppet theater, excited to hear your explanation!`,
        `Explain how light beams, objects, and darkness work together.`
      ]
    }),
    l5Prompt: 'If you shine a flashlight on clear glass versus a solid wooden book, which makes a dark shadow?',
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

  // 6. CIVIC SENSE: KEEPING PUBLIC PLACES CLEAN
  {
    keywords: ['clean', 'litter', 'trash', 'garbage', 'park', 'public', 'waste', 'civic'],
    theme: 'city',
    gradient: 'from-emerald-100 via-sky-100 to-amber-50',
    defaultCompanion: 'monster',
    levelVisuals: [
      ['🧺', '🥤', '🗑️', '🌳'], // L1: Picnic in park with dropped wrapper
      ['🚮', '🤝', '🚯', '✨'], // L2: Picking it up and putting in bin
      ['🏞️', '🦆', '🌺', '🧼'], // L3: Clean park where animals and kids play
      ['💬', '👾', '💡', '🌳'], // L4: Explaining why public places belong to everyone
      ['🏙️', '🌟', '🏆', '🎉']  // L5: Clean neighborhood badge
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
    l2Prompt: 'Who does a public park belong to, and who is responsible for keeping it clean?',
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
    l3Prompt: 'Why does littering hurt community animals and flowers?',
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
    l4Prompt: 'In your own words, explain to KIKI: Why should we keep public parks clean even if no one is watching?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: Why is it important to put trash in the bin even when nobody is looking?”`,
      companion: `“Teach me so our whole town can become a green model community!”`,
      narration: [
        `KIKI listens proudly as you share your thoughts on fairness, respect, and community responsibility.`,
        `Tell KIKI why caring for shared spaces matters to you.`
      ]
    }),
    l5Prompt: 'If you finish an ice cream snack and there is no trash can nearby, what is the right civic choice?',
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

  // 7. DIGITAL SAFETY: ONLINE PRIVACY & PASSWORDS
  {
    keywords: ['privacy', 'password', 'online', 'internet', 'cyber', 'game', 'chat', 'safety'],
    theme: 'cyber',
    gradient: 'from-slate-950 via-purple-950 to-slate-900',
    defaultCompanion: 'robot',
    levelVisuals: [
      ['💻', '🤖', '❓', '💬'], // L1: Mysterious chat message in game
      ['🔐', '🛡️', '🔑', '🚫'], // L2: Strong secret password lock
      ['🏠', '📍', '⛔', '🛡️'], // L3: Protecting real name, home address, school
      ['💬', '🤖', '✨', '💡'], // L4: Explaining digital safety to Kiki
      ['🏆', '🛡️', '🌟', '🎉']  // L5: Cyber Safety Shield unlocked!
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
    l2Prompt: 'Who is allowed to know your secret online passwords?',
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
    l3Prompt: 'What personal information should you NEVER share with online strangers?',
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
    l4Prompt: 'In your own words, explain to KIKI: Why shouldn’t we share passwords or personal info online?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: Why is it dangerous to share private info or passwords with online strangers?”`,
      companion: `“Teach me so our digital treehouse stays safe forever!”`,
      narration: [
        `KIKI listens closely as you explain the digital safety shield.`,
        `Tell KIKI why keeping secrets private protects your family and games!`
      ]
    }),
    l5Prompt: 'If someone online makes you feel uncomfortable or asks to meet in real life, what is the #1 rule?',
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

  // 8. HAND WASHING & HYGIENE
  {
    keywords: ['hand', 'wash', 'soap', 'germ', 'hygiene', 'clean', 'brush', 'teeth'],
    theme: 'school',
    gradient: 'from-sky-100 via-teal-50 to-amber-50',
    defaultCompanion: 'animal',
    levelVisuals: [
      ['🖐️', '🦠', '🧼', '💧'], // L1: Hands after playground with invisible germs
      ['🧼', '🫧', '2️⃣0️⃣', '⏱️'], // L2: Lathering soap bubbles for 20 seconds
      ['🚿', '🌊', '⬇️', '✨'], // L3: Rinsing germs down the drain
      ['💬', '🦊', '💡', '🧼'], // L4: Explaining soap magic to Kiki
      ['🌟', '🧼', '🏆', '🎉']  // L5: Sparkling clean health badge!
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
    l2Prompt: 'How does soap destroy invisible germs on our skin?',
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
    l3Prompt: 'How long should we scrub our hands with soap to remove all germs?',
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
    l4Prompt: 'In your own words, explain to KIKI: Why do we need soap and not just plain water to wash our hands?',
    l4Speech: (comp) => ({
      kiki: `“Can you tell me in your own words: Why is soap so much better at cleaning germs than plain water?”`,
      companion: `“Teach me so I can wash my paws properly before snack time!”`,
      narration: [
        `KIKI watches the bubbles pop as you explain how soap captures sticky germs.`,
        `Explain how soap and water work as a team!`
      ]
    }),
    l5Prompt: 'When are the two most important times to wash your hands with soap?',
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
  }
];

/**
 * Dynamically synthesizes a customized 5-level adventure for ANY topic,
 * ensuring the selected topic is the absolute source of truth.
 */
export function generateParametricStory(setup: ParentSetup): StoryLevel[] {
  const companion = getCompanionDetails(setup.companionType);
  const child = setup.childName || 'Explorer';
  const topicLower = setup.topic.toLowerCase();
  const goalLower = setup.learningGoal.toLowerCase();

  // Find if a domain blueprint matches this topic
  const matchingBlueprint = TOPIC_BLUEPRINTS.find(b => 
    b.keywords.some(kw => topicLower.includes(kw) || goalLower.includes(kw))
  );

  if (matchingBlueprint) {
    const b = matchingBlueprint;
    const l1 = b.l1Speech(child, companion.name);
    const l2 = b.l2Speech(companion.name);
    const l3 = b.l3Speech(companion.name);
    const l4 = b.l4Speech(companion.name);
    const l5 = b.l5Speech(companion.name);

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
        prompt: b.l1Prompt,
        expectedCoreConcept: setup.learningGoal,
        scaffoldingHint: `Look at what KIKI and ${companion.name} are discovering!`
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
        prompt: b.l2Prompt,
        options: l2.options,
        expectedCoreConcept: setup.learningGoal,
        scaffoldingHint: `Think about how the pieces fit together!`
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
        prompt: b.l3Prompt,
        options: l3.options,
        expectedCoreConcept: setup.learningGoal,
        scaffoldingHint: `Remember our core discovery!`
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
        prompt: b.l4Prompt,
        expectedCoreConcept: setup.learningGoal,
        scaffoldingHint: `Spelling and grammar don’t matter—just share your thoughts!`
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
        prompt: b.l5Prompt,
        options: l5.options,
        expectedCoreConcept: setup.learningGoal,
        scaffoldingHint: `You are the master of this discovery!`
      }
    ];
  }

  // GENERAL DYNAMIC ENGINE FOR ANY ARBITRARY CUSTOM TOPIC
  // Extracts topic essence and constructs 5 tailored picture-book scenes
  const settingName = setup.storyWorld ? `${setup.storyWorld} Outpost` : 'Adventure Station';
  const interest = setup.interest || 'everyday objects';

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
      kikiDialogue: `“Hi ${child}! Look at this puzzle about ${setup.topic}! How does it really work?”`,
      characterSpeaker: companion.name,
      characterDialogue: `“${companion.sound} I was wondering: how can we achieve our goal: ${setup.learningGoal}?”`,
      shortNarration: [
        `${child} and ${companion.name} arrive at ${settingName} ready for an adventure.`,
        `KIKI points to a curious discovery: our mission today is to master ${setup.topic}!`
      ],
      keyDiscoveryHook: `Mission Focus: ${setup.learningGoal}`,
      interactionType: 'discover_tap',
      prompt: `Let’s investigate ${setup.topic} together! 🚀`,
      expectedCoreConcept: setup.learningGoal,
      scaffoldingHint: `Look at what KIKI and ${companion.name} are discovering!`
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
      prompt: `Which idea explains how ${setup.topic} works?`,
      options: [
        `The core rule: ${setup.learningGoal}`,
        `It changes completely randomly every second`,
        `We should guess without checking how it works`
      ],
      expectedCoreConcept: setup.learningGoal,
      scaffoldingHint: `Think about our learning goal: ${setup.learningGoal}!`
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
      prompt: `How can ${child} solve the dilemma about ${setup.topic}?`,
      options: [
        `Apply the true mechanism: ${setup.learningGoal}`,
        `Assume ${setup.struggle || 'an incorrect guess'} without testing`,
        `Walk away from the puzzle entirely`
      ],
      expectedCoreConcept: setup.learningGoal,
      scaffoldingHint: `Focus on the mechanism: ${setup.learningGoal}!`
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
      prompt: `In your own words, explain to KIKI what you discovered about ${setup.topic}!`,
      expectedCoreConcept: setup.learningGoal,
      scaffoldingHint: `Talk about how ${setup.learningGoal} works!`
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
      prompt: `Now that you understand ${setup.topic}, what will happen next time you see this in the real world?`,
      options: [
        `The same rule stays true everywhere because ${setup.learningGoal}`,
        `It changes into something totally different tomorrow`,
        `We must start over from zero every time`
      ],
      expectedCoreConcept: `Consistent application of ${setup.learningGoal}`,
      scaffoldingHint: `The truth of ${setup.topic} stays true everywhere!`
    }
  ];
}
