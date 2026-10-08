import { ParentSetup, ChildInteraction } from '../types/quest';

export function getAgeBandDescription(age: number): { band: string; pedagogy: string } {
  if (age <= 7) {
    return {
      band: 'Early Explorer (Ages 5-7)',
      pedagogy: `
- Sentence structure: Very short, lively, clear sentences (maximum 6-8 words per line).
- Tone: Playful, warm, sensory, magical. Use sound words (whoosh, pop, chomp).
- Metaphors: Concrete physical objects (apples, toys, banana bites, soap bubbles).
- Companion & KIKI: Cute enthusiastic friends.
- Reading: Extremely short narration (1-2 sentences).
      `.trim()
    };
  } else if (age <= 10) {
    return {
      band: 'Curious Adventurer (Ages 8-10)',
      pedagogy: `
- Sentence structure: Dynamic compound sentences, active narrative pacing.
- Tone: Adventurous, inquisitive, mystery-solving.
- Metaphors: Stepping stones, recipes, fuel trays, curved wings, shadow blocks.
- Companion & KIKI: Clever team cracking the mystery.
- Reading: Short, focused story lines (2-3 sentences).
      `.trim()
    };
  } else {
    return {
      band: 'Master Sleuth (Ages 11-13)',
      pedagogy: `
- Sentence structure: Sophisticated narrative pacing, conceptual tension.
- Tone: Intelligent, high-stakes exploration, respectful of emerging autonomy.
- Metaphors: Systems, variables, proportional balance, inverse relationships, aerodynamic lift.
- Companion & KIKI: Capable teammates facing real dilemmas.
- Reading: Concise, rich narrative lines.
      `.trim()
    };
  }
}

export function buildStoryPrompt(setup: ParentSetup): string {
  const { band, pedagogy } = getAgeBandDescription(setup.childAge);

  return `You are KIKI AI, an extraordinary children's storytelling companion.
Tagline: "Little stories. Big discoveries."
Create a personalized 5-LEVEL picture-book adventure game for ${setup.childName} (Age ${setup.childAge}, ${band}).

MISSION PARAMETERS:
- Topic: "${setup.topic}"
- Core Learning Goal: "${setup.learningGoal}"
- Specific Struggle/Misconception: "${setup.struggle || 'General confusion about the concept'}"
- Story World: "${setup.storyWorld || 'space'}"
- Companion Type: "${setup.companionType || 'robot'}"
- Child Interest / Context: "${setup.interest || 'everyday exploration'}"

STRICT PEDAGOGICAL RULES (AGE ${setup.childAge}):
${pedagogy}

CRITICAL 5-LEVEL GAME STRUCTURE:
Level 1 (🌟 Discover): Characters encounter the curiosity/dilemma in an illustrated scene. Ends with simple discover tap.
Level 2 (🔎 Explore): Characters investigate the clue. Ends with choice/prediction.
Level 3 (🧩 Solve): Characters encounter a problem requiring the concept. Ends with puzzle choice.
Level 4 (💬 Teach KIKI): KIKI sits with a notebook and asks the child: "Can you tell me in your own words how this works?" Ends with own_words check.
Level 5 (🏆 Master): Final celebration quest applying the concept to a new challenge. Ends with master choice.

Respond strictly with valid JSON conforming to this schema (no markdown fences, just pure JSON):
{
  "levels": [
    {
      "levelNumber": 1,
      "phase": "discover",
      "phaseLabel": "1. Discover",
      "title": "string",
      "sceneVisual": {
        "theme": "space | forest | city | kitchen | school | ocean | cyber | sky | body | everyday",
        "backdropGradient": "from-amber-100 via-sky-100 to-amber-50",
        "visualItems": ["emoji1", "emoji2", "emoji3", "emoji4"],
        "characterAction": "string"
      },
      "sceneEmoji": "string (1 emoji)",
      "kikiExpression": "curious",
      "kikiDialogue": "Short speech",
      "characterSpeaker": "Companion Name",
      "characterDialogue": "Companion speech",
      "shortNarration": ["line 1", "line 2"],
      "keyDiscoveryHook": "string",
      "interactionType": "discover_tap",
      "prompt": "Let's investigate! 🚀",
      "expectedCoreConcept": "${setup.learningGoal}",
      "scaffoldingHint": "Short hint"
    },
    {
      "levelNumber": 2,
      "phase": "explore",
      "phaseLabel": "2. Explore",
      "title": "string",
      "sceneVisual": {
        "theme": "string",
        "backdropGradient": "string",
        "visualItems": ["emoji1", "emoji2", "emoji3", "emoji4"],
        "characterAction": "string"
      },
      "sceneEmoji": "string (1 emoji)",
      "kikiExpression": "thinking",
      "kikiDialogue": "Short speech",
      "characterSpeaker": "Companion Name",
      "characterDialogue": "Companion speech",
      "shortNarration": ["line 1", "line 2"],
      "keyDiscoveryHook": "string",
      "interactionType": "choice",
      "prompt": "Question prompt",
      "options": ["Correct option", "Distractor A", "Distractor B"],
      "expectedCoreConcept": "${setup.learningGoal}",
      "scaffoldingHint": "Short hint"
    },
    {
      "levelNumber": 3,
      "phase": "solve",
      "phaseLabel": "3. Solve",
      "title": "string",
      "sceneVisual": {
        "theme": "string",
        "backdropGradient": "string",
        "visualItems": ["emoji1", "emoji2", "emoji3", "emoji4"],
        "characterAction": "string"
      },
      "sceneEmoji": "string (1 emoji)",
      "kikiExpression": "explaining",
      "kikiDialogue": "Short speech",
      "characterSpeaker": "Companion Name",
      "characterDialogue": "Companion speech",
      "shortNarration": ["line 1", "line 2"],
      "keyDiscoveryHook": "string",
      "interactionType": "choice",
      "prompt": "Question prompt",
      "options": ["Correct option", "Distractor A", "Distractor B"],
      "expectedCoreConcept": "${setup.learningGoal}",
      "scaffoldingHint": "Short hint"
    },
    {
      "levelNumber": 4,
      "phase": "teach",
      "phaseLabel": "4. Teach KIKI",
      "title": "Explain It in Your Own Words",
      "sceneVisual": {
        "theme": "string",
        "backdropGradient": "string",
        "visualItems": ["emoji1", "emoji2", "emoji3", "emoji4"],
        "characterAction": "string"
      },
      "sceneEmoji": "💬",
      "kikiExpression": "happy",
      "kikiDialogue": "Can you tell me in your own words how this works?",
      "characterSpeaker": "Companion Name",
      "characterDialogue": "Companion speech",
      "shortNarration": ["line 1", "line 2"],
      "keyDiscoveryHook": "string",
      "interactionType": "own_words",
      "prompt": "In your own words, explain to KIKI what you discovered!",
      "expectedCoreConcept": "${setup.learningGoal}",
      "scaffoldingHint": "Spelling and grammar don't matter—just share your thoughts!"
    },
    {
      "levelNumber": 5,
      "phase": "master",
      "phaseLabel": "5. Master",
      "title": "string",
      "sceneVisual": {
        "theme": "string",
        "backdropGradient": "string",
        "visualItems": ["emoji1", "emoji2", "emoji3", "emoji4"],
        "characterAction": "string"
      },
      "sceneEmoji": "🏆",
      "kikiExpression": "cheering",
      "kikiDialogue": "Hooray! Final master puzzle!",
      "characterSpeaker": "Companion Name",
      "characterDialogue": "Companion speech",
      "shortNarration": ["line 1", "line 2"],
      "keyDiscoveryHook": "string",
      "interactionType": "master_choice",
      "prompt": "Master question prompt",
      "options": ["Correct option", "Distractor A", "Distractor B"],
      "expectedCoreConcept": "${setup.learningGoal}",
      "scaffoldingHint": "Short hint"
    }
  ]
}`;
}

export function buildEvaluationPrompt(
  promptText: string,
  childResponse: string,
  expectedCoreConcept: string,
  childAge: number
): string {
  return `You are KIKI evaluating a child's conceptual understanding.
Child Age: ${childAge}
Question Prompt: "${promptText}"
Target Concept / Learning Goal: "${expectedCoreConcept}"
Child's Words: "${childResponse}"

EVALUATION PRINCIPLES:
1. FOCUS STRICTLY ON CONCEPTUAL UNDERSTANDING.
2. ABSOLUTELY IGNORE spelling, punctuation, capitalization, imperfect grammar, or broken phrasing.
3. If the child shows intuitive grasp of the relationship, mark understood: true.
4. If the child is confused, guessed randomly, or shows the misconception, mark understood: false and diagnose the hurdle gently.
5. In friendlyFeedback, speak as KIKI: joyful, warm, cheering! NEVER say "Wrong" or "Incorrect".

Respond strictly with valid JSON:
{
  "understood": true,
  "positiveElementsFound": ["what concept the child grasped"],
  "misconceptionIdentified": null,
  "friendlyFeedback": "Kiki celebration line praising their exact insight",
  "nextAction": "advance"
}
(or if understood is false):
{
  "understood": false,
  "positiveElementsFound": ["any good effort or partial idea noticed"],
  "misconceptionIdentified": "Short friendly diagnosis of what tripped them up",
  "friendlyFeedback": "Kiki supportive line saying: 'That was a super try! Let's peek at this another way...'",
  "nextAction": "try_differently"
}`;
}

export function buildScaffoldingPrompt(
  question: string,
  childResponse: string,
  expectedConcept: string,
  misconception: string | null,
  setup: ParentSetup
): string {
  const { band } = getAgeBandDescription(setup.childAge);

  return `You are KIKI creating a supportive "Try Again, Differently" learning moment.
Child: ${setup.childName} (Age ${setup.childAge}, ${band})
Topic: ${setup.topic}
Learning Goal: ${expectedConcept}
Child's Attempt: "${childResponse}"
Hurdle: "${misconception || 'Needs a different analogy'}"

TEACHING MISSION:
Change the teaching approach completely.
- Switch from the previous story mechanic to an alternate, tangible real-world analogy connected to ${setup.topic}.
- KIKI speaks with warmth, excitement, and zero judgment (Never say "Wrong"!).
- Provide a simple follow-up question with 2 clear options so the child succeeds and continues the adventure!

Respond strictly with valid JSON:
{
  "encouragingNote": "Kiki says: 'Wait! Let's look at this secret a whole new way...'",
  "kikiExpression": "explaining",
  "kikiDialogue": "Warm explanation from Kiki",
  "alternateAnalogy": "A fresh physical analogy matching ${setup.topic}",
  "realWorldConnection": "Direct link to their everyday world",
  "followUpPrompt": "A scaffolded question that makes the concept click",
  "options": ["Correct simple choice", "Friendly distractor"],
  "expectedConcept": "${expectedConcept}"
}`;
}

export function buildReportPrompt(
  setup: ParentSetup,
  interactions: ChildInteraction[],
  starsEarned: number
): string {
  return `You are KIKI's Educational Insights Specialist.
Generate an evidence-based Parent/Teacher Learning Report for:
Child: ${setup.childName} (Age ${setup.childAge})
Topic: "${setup.topic}"
Learning Goal: "${setup.learningGoal}"
Total Stars Earned: ${starsEarned} / 5

CHILD'S TRANSCRIPT & INTERACTIONS:
${JSON.stringify(interactions, null, 2)}

REPORT PHILOSOPHY:
- Answer: "Did the child appear to understand the concept, and what should we do next?"
- DO NOT claim definitive psychometric proof. Frame findings as an estimate based on session responses.
- Cite direct quotes from the child as evidence of understanding or hesitation.
- Explain "How KIKI adapted" during the session.
- Suggest 2 concrete, engaging offline activities (kitchen math, home science, or conversation).

Respond strictly with valid JSON:
{
  "id": "kiki-report-${Date.now()}",
  "topic": "${setup.topic}",
  "learningGoal": "${setup.learningGoal}",
  "childName": "${setup.childName}",
  "childAge": ${setup.childAge},
  "ageBandLabel": "Early Explorer / Curious Adventurer / Master Sleuth",
  "estimatedMastery": "Strong Understanding",
  "masterySummary": "Comprehensive overview of what the child demonstrated during the 5-level adventure",
  "conceptsDemonstrated": [
    {
      "concept": "Concept name",
      "evidenceQuote": "Direct quote from child",
      "observation": "What this reveals about their cognitive model"
    }
  ],
  "conceptsNeedingReinforcement": [
    {
      "concept": "Area needing reinforcement",
      "diagnosedHurdle": "Exact hurdle or hesitation observed",
      "recommendation": "Constructive pedagogical tip for the parent/teacher"
    }
  ],
  "howKikiAdapted": "Detailed explanation of teaching strategies, alternative analogies, and scaffolding used during the levels",
  "cognitiveObservations": [
    "Specific observation 1",
    "Specific observation 2"
  ],
  "suggestedNextActivities": [
    {
      "title": "Activity Title",
      "type": "home_experiment",
      "description": "Step by step real-world activity",
      "whyItHelps": "Why this anchors the learning"
    },
    {
      "title": "Discussion Title",
      "type": "discussion",
      "description": "Conversation prompt",
      "whyItHelps": "Why this anchors the learning"
    }
  ],
  "totalStars": ${starsEarned},
  "totalLevels": 5,
  "createdAt": "${new Date().toISOString()}"
}`;
}
