import { ParentSetup, ChildInteraction } from '../types/quest';

export function getAgeBandDescription(age: number): { band: string; pedagogy: string } {
  if (age <= 7) {
    return {
      band: 'Early Explorer (Ages 5-7)',
      pedagogy: `
- Sentence structure: Very short, lively, clear sentences (maximum 8-10 words per sentence).
- Tone: Playful, warm, sensory, magical. Use sound words (whoosh, pop, tap-tap).
- Metaphors: Concrete physical objects (straws, cookies, building blocks, warm sun, hugs).
- Companion & KIKI: Speak like a sweet, enthusiastic friend.
- Language: Everyday simple English. Avoid complicated explanations or adult instructions.
- Questions: Focus on what characters see, touch, or do directly.
      `.trim()
    };
  } else if (age <= 10) {
    return {
      band: 'Curious Adventurer (Ages 8-10)',
      pedagogy: `
- Sentence structure: Dynamic compound sentences, active narrative pacing.
- Tone: Adventurous, inquisitive, mystery-solving. Treat the child as a fellow investigator.
- Metaphors: Stepping stones, recipes, gears, trays, secret codes, cause and effect.
- Companion & KIKI: Encouraging partners cracking the case together.
- Language: Clear, engaging vocabulary with concepts explained through hands-on actions.
- Questions: Ask for step-by-step logic, connections, and predictions.
      `.trim()
    };
  } else {
    return {
      band: 'Master Sleuth (Ages 11-13)',
      pedagogy: `
- Sentence structure: Sophisticated narrative pacing, conceptual tension.
- Tone: Intelligent, high-stakes exploration, respectful of emerging autonomy.
- Metaphors: Systems, variables, proportional balance, inverse relationships, real-world models.
- Companion & KIKI: Capable teammates facing technical/scientific dilemmas.
- Language: Use precise conceptual terminology (e.g., denominator, photosynthesis, privacy, equilibrium).
- Questions: Focus on mechanisms, "why this rule holds", and edge cases.
      `.trim()
    };
  }
}

export function buildStoryPrompt(setup: ParentSetup): string {
  const { band, pedagogy } = getAgeBandDescription(setup.childAge);

  return `You are KIKI AI, an extraordinary children's storytelling companion.
Tagline: "Little stories. Big discoveries."
Create a personalized 3-chapter story adventure for ${setup.childName} (Age ${setup.childAge}, ${band}).

MISSION PARAMETERS:
- Topic: "${setup.topic}"
- Core Learning Goal: "${setup.learningGoal}"
- Specific Struggle/Misconception: "${setup.struggle || 'General confusion about the concept'}"
- Story World: "${setup.storyWorld || 'space'}"
- Companion Type: "${setup.companionType || 'robot'}"
- Child Interest / Context: "${setup.interest || 'rockets and space fuel'}"
- Learning Style: "${setup.learningStyle || 'adventure'}"

AGE PEDAGOGY RULES (AGE ${setup.childAge}):
${pedagogy}

CRITICAL STORYTELLING RULES:
1. THE STORY IS THE PRODUCT. Do NOT make this a generic textbook with a wrapper.
2. Weave the concept naturally into the story problem.
   Example: If multiplication 7x6 is taught in space with rockets, show a rocket with 7 trays needing 6 fuel crystals each.
3. Chapter 1 (The Spark): Introduce KIKI, the companion, the setting, and the story problem naturally. End with Checkpoint 1 (Choice).
4. Chapter 2 (The Puzzle): The characters encounter a puzzle using the concept. End with Checkpoint 2 (Explain in your own words).
5. Chapter 3 (The Triumph): The child solves the dilemma with the concept! End with Checkpoint 3 (Prediction of what happens next).
6. KIKI is a cute, friendly, enthusiastic guide who appears in each chapter.

Respond strictly with valid JSON conforming to this schema (no markdown fences, just pure JSON):
{
  "chapters": [
    {
      "chapterNumber": 1,
      "phase": "spark",
      "title": "string",
      "sceneSetting": "string",
      "sceneEmoji": "string (1 emoji)",
      "kikiExpression": "curious",
      "kikiDialogue": "Short greeting and excitement from Kiki",
      "narrativeParagraphs": ["paragraph 1", "paragraph 2", "paragraph 3"],
      "keyConceptHook": "string (1 punchy line)",
      "checkpoint": {
        "id": "c1",
        "type": "choice",
        "prompt": "Story-based question asking child how to help",
        "kikiDialogue": "Kiki asking child for help",
        "characterSpeaker": "Companion Name",
        "characterDialogue": "Companion line",
        "options": ["Option A (Correct)", "Option B (Distractor)", "Option C (Distractor)"],
        "expectedCoreConcept": "${setup.learningGoal}",
        "scaffoldingHint": "Gentle friendly clue"
      }
    },
    {
      "chapterNumber": 2,
      "phase": "puzzle",
      "title": "string",
      "sceneSetting": "string",
      "sceneEmoji": "string (1 emoji)",
      "kikiExpression": "thinking",
      "kikiDialogue": "Encouragement from Kiki",
      "narrativeParagraphs": ["paragraph 1", "paragraph 2", "paragraph 3"],
      "keyConceptHook": "string",
      "checkpoint": {
        "id": "c2",
        "type": "own_words",
        "prompt": "Kiki asks: In your own words, can you explain how this works?",
        "kikiDialogue": "Kiki asking child to explain in their own words (no stress on spelling!)",
        "characterSpeaker": "Companion Name",
        "characterDialogue": "Companion line",
        "expectedCoreConcept": "${setup.learningGoal}",
        "scaffoldingHint": "Gentle friendly clue"
      }
    },
    {
      "chapterNumber": 3,
      "phase": "triumph",
      "title": "string",
      "sceneSetting": "string",
      "sceneEmoji": "string (1 emoji)",
      "kikiExpression": "cheering",
      "kikiDialogue": "Celebration from Kiki",
      "narrativeParagraphs": ["paragraph 1", "paragraph 2", "paragraph 3"],
      "keyConceptHook": "string",
      "checkpoint": {
        "id": "c3",
        "type": "prediction",
        "prompt": "Prediction question for next adventure",
        "kikiDialogue": "Kiki prompt",
        "characterSpeaker": "Companion Name",
        "characterDialogue": "Companion line",
        "options": ["Option A (Correct prediction)", "Option B", "Option C"],
        "expectedCoreConcept": "${setup.learningGoal}",
        "scaffoldingHint": "Gentle friendly clue"
      }
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
  return `You are KIKI, a warm, supportive educational companion evaluating a child's response.
Child Age: ${childAge}
Question Prompt: "${promptText}"
Target Concept / Learning Goal: "${expectedCoreConcept}"
Child's Words: "${childResponse}"

EVALUATION PRINCIPLES:
1. FOCUS STRICTLY ON CONCEPTUAL UNDERSTANDING.
2. ABSOLUTELY IGNORE spelling errors, punctuation, capitalization, imperfect grammar, or broken phrasing.
   (e.g., if a 9-year-old says "cuz 7 tray has 6 and 5 tray was 35 so add 7 is 42", this is 100% understood!)
3. If the child shows intuitive grasp of the relationship, mark understood: true.
4. If the child is confused, guessed randomly, or shows the misconception, mark understood: false and diagnose the hurdle gently.
5. In friendlyFeedback, speak as KIKI: joyful, warm, cheering! NEVER say "Wrong" or "Incorrect".

Respond strictly with valid JSON (no markdown fences, just pure JSON):
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
Story Setting: ${setup.storyWorld}
Companion: ${setup.companionType}
Child Interest / Context: ${setup.interest}
Original Question: "${question}"
Child's Attempt: "${childResponse}"
Core Concept: "${expectedConcept}"
Hurdle: "${misconception || 'Needs a different analogy'}"

TEACHING MISSION:
Change the teaching approach completely.
- Switch from the previous story mechanic to an alternate, tangible real-world analogy connected to ${setup.interest || 'everyday objects like blocks or pizza'}.
- KIKI speaks with warmth, excitement, and zero judgment (Never say "Wrong"!).
- Provide a simple follow-up question with 2-3 clear options so the child succeeds and continues the adventure!

Respond strictly with valid JSON (no markdown fences, just pure JSON):
{
  "encouragingNote": "Kiki says: 'Wait! Let's look at this secret a whole new way...'",
  "kikiExpression": "explaining",
  "kikiDialogue": "Warm explanation from Kiki",
  "alternateAnalogy": "A fresh physical analogy (e.g. cookie trays, sharing toys, stepping stones)",
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
Struggle Addressed: "${setup.struggle || 'None specified'}"
Stars Earned: ${starsEarned}

CHILD'S TRANSCRIPT & INTERACTIONS:
${JSON.stringify(interactions, null, 2)}

REPORT PHILOSOPHY:
- Answer: "Did the child appear to understand the concept, and what should we do next?"
- DO NOT claim definitive psychometric proof. Frame findings as an estimate based on session responses.
- Cite direct quotes from the child as evidence of understanding or hesitation.
- Suggest 2 concrete, engaging offline activities (kitchen math, home science, or conversation).

Respond strictly with valid JSON (no markdown fences, just pure JSON):
{
  "id": "kiki-report-${Date.now()}",
  "topic": "${setup.topic}",
  "learningGoal": "${setup.learningGoal}",
  "childName": "${setup.childName}",
  "childAge": ${setup.childAge},
  "ageBandLabel": "Early Explorer / Curious Adventurer / Master Sleuth",
  "estimatedMastery": "Strong Understanding",
  "masterySummary": "Comprehensive 2-3 sentence overview of what the child demonstrated during the adventure",
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
  "createdAt": "${new Date().toISOString()}"
}`;
}
