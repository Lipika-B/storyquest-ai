import { ParentSetup, StoryChapter, AgeBand } from '../types/quest';

interface CompanionDetails {
  name: string;
  role: string;
  sound: string;
  avatarEmoji: string;
}

interface WorldDetails {
  settingName: string;
  backdropTheme: string;
  atmosphere: string;
}

export function getCompanionDetails(type?: string): CompanionDetails {
  switch (type) {
    case 'robot':
      return {
        name: 'Bolt the Robot',
        role: 'a cheerful mechanical helper with glowing sensors',
        sound: 'BEEP-BOOP!',
        avatarEmoji: '🤖'
      };
    case 'animal':
      return {
        name: 'Barnaby the Red Fox',
        role: 'a curious woodland scout with twitching ears',
        sound: 'Yip-yip!',
        avatarEmoji: '🦊'
      };
    case 'child':
      return {
        name: 'Sammy the Explorer',
        role: 'a brave fellow kid with an adventure backpack',
        sound: 'Aha!',
        avatarEmoji: '👧'
      };
    case 'magical':
      return {
        name: 'Lumi the Star-Sprite',
        role: 'a glowing winged sprite leaving trail of stardust',
        sound: 'Tinkle-sparkle!',
        avatarEmoji: '✨'
      };
    case 'monster':
      return {
        name: 'Grumble the Fuzzy Monster',
        role: 'a giant gentle monster with soft violet fur',
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

export function getWorldDetails(world?: string): WorldDetails {
  switch (world) {
    case 'space':
      return {
        settingName: 'Orbital Star Dock Alpha',
        backdropTheme: 'surrounded by glittering Saturn-like rings and floating nebula clouds',
        atmosphere: 'The starlight hums through crystal viewing panels.'
      };
    case 'forest':
      return {
        settingName: 'The Whispering Greenwood',
        backdropTheme: 'canopied by emerald oak boughs and glowing firefly moss',
        atmosphere: 'A fresh morning breeze rustles through dewy leaves.'
      };
    case 'city':
      return {
        settingName: 'Sunbeam Metro Plaza',
        backdropTheme: 'bustling with friendly neighbors, community parks, and tidy tram lines',
        atmosphere: 'Bells chime as children skip along the sunlit sidewalks.'
      };
    case 'school':
      return {
        settingName: 'The Discovery Lab & Classroom',
        backdropTheme: 'filled with colorful experiment benches, chalkboards, and puzzle stations',
        atmosphere: 'Warm morning light fills the room with curiosity.'
      };
    case 'kitchen':
      return {
        settingName: 'The Sunflower Bakery & Kitchen',
        backdropTheme: 'scented with warm cinnamon, flour dust, and shiny measuring bowls',
        atmosphere: 'Ovens glow with golden warmth.'
      };
    case 'ocean':
      return {
        settingName: 'Sapphire Coral Outpost',
        backdropTheme: 'glowing with pearl reefs and friendly sea turtles gliding by',
        atmosphere: 'Gentle turquoise currents bubble all around.'
      };
    case 'village':
      return {
        settingName: 'Clover Hillside Village',
        backdropTheme: 'lined with cobblestone lanes, colorful market carts, and spinning windmills',
        atmosphere: 'Laughter echoes from the village green.'
      };
    case 'cyber':
      return {
        settingName: 'The Neon Firewall Hub',
        backdropTheme: 'crisscrossed with sparkling data streams and protective safety shields',
        atmosphere: 'Digital lights pulse in gentle rhythm.'
      };
    case 'everyday':
    default:
      return {
        settingName: 'Sunny Meadow & Neighborhood Park',
        backdropTheme: 'a familiar, welcoming world of playgrounds, gardens, and cozy homes',
        atmosphere: 'Birds chirp peacefully in the warm afternoon.'
      };
  }
}

/**
 * Dynamically builds a completely personalized, age-calibrated 3-chapter quest
 * whenever Gemini is offline, ensuring every parameter visibly shapes the story.
 */
export function generateParametricStory(setup: ParentSetup): StoryChapter[] {
  const companion = getCompanionDetails(setup.companionType);
  const world = getWorldDetails(setup.storyWorld);
  const isYoung = setup.childAge <= 7;
  const isOlder = setup.childAge >= 11;
  const child = setup.childName || 'Explorer';
  const topic = setup.topic;
  const goal = setup.learningGoal;
  const struggle = setup.struggle || 'understanding the core relationship';
  const interest = setup.interest || 'everyday challenges';

  // 1. Chapter 1: The Spark (The problem appears naturally inside the world)
  const ch1Paragraphs: string[] = [];
  if (isYoung) {
    ch1Paragraphs.push(
      `Welcome to ${world.settingName}! KIKI the little guide jumped for joy with ${companion.avatarEmoji} ${companion.name}.`,
      `"${companion.sound}" said ${companion.name}. "Look at our ${interest}! Today we have an important mission with ${topic}!"`,
      `KIKI looked around. There was a little problem to solve: ${goal}. But ${companion.name} was scratching their head: "${struggle}". How can ${child} help us get started?`
    );
  } else if (isOlder) {
    ch1Paragraphs.push(
      `At ${world.settingName}, ${world.backdropTheme}. KIKI and ${companion.name} were monitoring the telemetry console for the ${interest} system.`,
      `"${companion.sound} Alert incoming!" announced ${companion.name}. "Our primary mission today requires mastering ${topic}. Specifically: ${goal}."`,
      `The dilemma was clear: previous attempts stalled due to ${struggle}. KIKI turned to ${child}: "We cannot guess. We need to apply the underlying principles of ${topic} to balance the system."`
    );
  } else {
    // Middle Age 8-10
    ch1Paragraphs.push(
      `High inside ${world.settingName}, ${world.atmosphere} KIKI the little adventure companion arrived carrying a golden clipboard.`,
      `"${companion.sound}" clanked ${companion.avatarEmoji} ${companion.name}. "Good thing ${child} is here! We are testing our brand new ${interest}, but we ran straight into a mystery about ${topic}!"`,
      `Here was the puzzle: our mission is to ${goal}. But right now, ${companion.name} is puzzled because "${struggle}". KIKI whispered: "Don't worry, we can figure this out step by step!"`
    );
  }

  // 2. Chapter 2: The Puzzle (Interactive dilemma where child helps characters)
  const ch2Paragraphs: string[] = [];
  if (isYoung) {
    ch2Paragraphs.push(
      `KIKI clapped their little hands. "Look closely at the ${interest}!"`,
      `"${companion.name} was trying to guess," giggled KIKI. "Instead of getting confused by ${struggle}, let's look at the secret rule: ${goal}!"`,
      `KIKI turned to ${child} with big shiny eyes: "Can you tell ${companion.name} in your own words what is really happening?"`
    );
  } else if (isOlder) {
    ch2Paragraphs.push(
      `The sensors at ${world.settingName} flickered as the ${interest} configuration stabilized.`,
      `"Fascinating," observed ${companion.name}. "When we break down ${topic}, the misconception that ${struggle} dissolves once we focus on ${goal}."`,
      `KIKI looked over at ${child}: "The control panel needs a human explanation. Tell us in your own words: why does this principle hold true?"`
    );
  } else {
    ch2Paragraphs.push(
      `KIKI pointed to the sparkling counter. "Look how the parts connect when we work with ${interest}!"`,
      `"${companion.name} thought that ${struggle}," said KIKI. "But when we look at the secret shortcut, we see that ${goal}!"`,
      `Now, ${companion.name} wants to hear from you directly. KIKI says: "Tell us in your own words how you see this working!"`
    );
  }

  // 3. Chapter 3: The Triumph (Solving the problem and looking forward)
  const ch3Paragraphs: string[] = [];
  if (isYoung) {
    ch3Paragraphs.push(
      `"Hooray!" cheered KIKI, dancing around the ${world.settingName}!`,
      `Thanks to ${child}, ${companion.name} smiled big and bright: "${companion.sound} I finally understand ${topic}! Now our ${interest} is working perfectly!"`,
      `KIKI placed a golden Explorer Star into ${child}’s hands. "You solved the mystery of ${topic}!"`
    );
  } else if (isOlder) {
    ch3Paragraphs.push(
      `A resonant chime echoed through ${world.settingName} as the ${interest} meters reached optimal equilibrium.`,
      `"${companion.sound} Mission verified!" reported ${companion.name}. "By understanding that ${goal}, ${child} bypassed the error of ${struggle} completely."`,
      `KIKI gave a crisp salute: "Outstanding analytical work, ${child}. You didn't just memorize an answer—you proved genuine conceptual mastery."`
    );
  } else {
    ch3Paragraphs.push(
      `Golden celebration sparks floated across ${world.settingName}!`,
      `"${companion.sound} We did it!" beamed ${companion.name}. "Because ${child} showed us that ${goal}, our ${interest} adventure is a complete success!"`,
      `KIKI grinned: "Whenever you encounter ${topic} again, remember this secret discovery you made today!"`
    );
  }

  return [
    {
      chapterNumber: 1,
      phase: 'spark',
      title: `${companion.name} & The ${topic} Mystery`,
      sceneSetting: world.settingName,
      sceneEmoji: companion.avatarEmoji,
      kikiExpression: 'curious',
      kikiDialogue: `“Hi ${child}! I'm KIKI! Let's help ${companion.name} solve this ${interest} puzzle together!”`,
      narrativeParagraphs: ch1Paragraphs,
      keyConceptHook: `Mission Focus: ${goal}`,
      checkpoint: {
        id: 'cp-spark',
        type: 'choice',
        prompt: `How should KIKI and ${companion.name} approach ${topic}?`,
        kikiDialogue: `“Look at what we need for our ${interest}! Which approach makes the most sense?”`,
        characterSpeaker: companion.name,
        characterDialogue: `“My gears are ticking! How do we make sure we reach our goal: ${goal}?”`,
        options: [
          `Focus on the core rule: ${goal}`,
          `Guess randomly without checking the pieces`,
          `Assume ${struggle} without checking the math or science`
        ],
        expectedCoreConcept: goal,
        scaffoldingHint: `Remember our goal: ${goal}!`
      }
    },
    {
      chapterNumber: 2,
      phase: 'puzzle',
      title: `The Secret of ${world.settingName}`,
      sceneSetting: world.settingName,
      sceneEmoji: '🔍',
      kikiExpression: 'thinking',
      kikiDialogue: `“You’re doing so well, ${child}! Now tell us what you notice in your own words!”`,
      narrativeParagraphs: ch2Paragraphs,
      keyConceptHook: `Explain the discovery: ${goal}`,
      checkpoint: {
        id: 'cp-puzzle',
        type: 'own_words',
        prompt: `In your own words, explain to KIKI and ${companion.name} how ${topic} works!`,
        kikiDialogue: `“Tell me what you think in your own words! (Spelling and grammar don’t matter at all—just share your awesome idea!)”`,
        characterSpeaker: companion.name,
        characterDialogue: `“Teach me so I never get confused again! Why does this make sense?”`,
        expectedCoreConcept: goal,
        scaffoldingHint: `Talk about how the parts or groups connect to ${goal}!`
      }
    },
    {
      chapterNumber: 3,
      phase: 'triumph',
      title: `Victory at ${world.settingName}!`,
      sceneSetting: world.settingName,
      sceneEmoji: '🏆',
      kikiExpression: 'cheering',
      kikiDialogue: `“Whoa! You solved the whole puzzle! Look at what happens next!”`,
      narrativeParagraphs: ch3Paragraphs,
      keyConceptHook: `Concept Mastered: ${topic}`,
      checkpoint: {
        id: 'cp-triumph',
        type: 'prediction',
        prompt: `Now that you know how ${topic} works, what will happen next when ${companion.name} uses it again?`,
        kikiDialogue: `“Now you’re the master! What will happen next time we use this secret?”`,
        characterSpeaker: companion.name,
        characterDialogue: `“What will happen when we test this pattern on an even bigger adventure?”`,
        options: [
          `The same rule continues to work smoothly because ${goal}`,
          `Everything breaks down completely`,
          `We must start over from zero every time`
        ],
        expectedCoreConcept: `Consistent application of ${goal}`,
        scaffoldingHint: `The rule you discovered stays true everywhere!`
      }
    }
  ];
}
