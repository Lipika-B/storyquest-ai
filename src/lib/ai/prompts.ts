import { ParentSetup, ChildInteraction } from '../types/quest';

export function getAgeBandDescription(age: number): { band: string; pedagogy: string } {
  if (age <= 7) {
    return {
      band: 'Early Explorer (Ages 5-7)',
      pedagogy: `
- Sentence structure: Very short, lively, clear sentences (maximum 8-12 words).
- Tone: Playful, warm, sensory, magical. Use sound words (whoosh, pop, clang).
- Metaphors: Concrete physical objects (straws, cookies, sponges, warm sun, big hugs).
- Character: Cute, friendly personified creature or companion who feels like a peer.
- Vocabulary: Simple everyday words. Do NOT use complex scientific jargon without immediately grounding it in a physical sensation.
- Questions: Focus on what characters see, feel, or do directly.
      `.trim()
    };
  } else if (age <= 10) {
    return {
      band: 'Curious Adventurer (Ages 8-10)',
      pedagogy: `
- Sentence structure: Dynamic compound sentences, active narrative pacing.
- Tone: Adventurous, inquisitive, mystery-solving. Treat the child as a fellow investigator.
- Metaphors: Mechanisms, cause-and-effect, stepping stones, recipes, gears, codes.
- Character: A clever young inventor, explorer, or robot who encounters practical problems.
- Vocabulary: Introduce key school terminology with clear contextual explanations.
- Questions: Ask for step-by-step logic, connections, and predictions.
      `.trim()
    };
  } else {
    return {
      band: 'Master Sleuth (Ages 11-13)',
      pedagogy: `
- Sentence structure: Sophisticated narrative structure, scientific/conceptual tension.
- Tone: Intelligent, high-stakes exploration, respectful of emerging autonomy.
- Metaphors: Systems, variables, proportional balance, real-world engineering or scientific models.
- Character: A skilled technician, cadet, or young specialist dealing with system puzzles.
- Vocabulary: Use precise conceptual terminology (e.g., denominator, chlorophyll, kinetic, equilibrium).
- Questions: Focus on mechanism, "why does this rule hold", and edge cases.
      `.trim()
    };
  }
}

export function buildStoryPrompt(setup: ParentSetup): string {
  const { band, pedagogy } = getAgeBandDescription(setup.childAge);

  return `You are StoryQuest AI, a world-class pedagogical storyteller.
Create an engaging 3-chapter learning adventure for a child named "${setup.childName}" (Age ${setup.childAge}, ${band}).

LEARNING MISSION:
- Topic: "${setup.topic}"
- Specific Learning Need / Goal: "${setup.specificNeed}"
- Story Setting: "${setup.setting}"
- Character Style: "${setup.characterStyle}"
- Learning Style: "${setup.learningStyle}"
- Real-World Context: "${setup.realWorldContext}"

STRICT PEDAGOGICAL GUIDELINES FOR AGE ${setup.childAge}:
${pedagogy}

STORY STRUCTURE:
- Chapter 1 (The Spark of Discovery): Introduce the setting, the companion character, and the initial dilemma where the school concept first appears naturally.
  End with Checkpoint 1 (Type: "choice" or "prediction").
- Chapter 2 (The Puzzle Crossroads): The dilemma deepens. The child must solve the core challenge.
  End with Checkpoint 2 (Type: "own_words" - MUST ask the child to explain the core concept in their own words to help the character!).
- Chapter 3 (The Master Triumph): Celebrating the successful application of the concept and looking ahead.
  End with Checkpoint 3 (Type: "prediction" or "choice" testing generalization of the concept).

CRITICAL REQUIREMENT:
The educational concept must remain 100% mathematically and scientifically accurate while feeling like a natural, thrilling part of the story.

Respond strictly with valid JSON conforming to this schema (no markdown fences, just pure JSON):
{
  "chapters": [
    {
      "chapterNumber": 1,
      "title": "string",
      "badgeEmoji": "string (1 emoji)",
      "keyConceptHighlight": "string (1 punchy sentence)",
      "storyText": ["paragraph 1", "paragraph 2", "paragraph 3"],
      "checkpoint": {
        "id": "c1",
        "type": "choice",
        "prompt": "string",
        "characterSpeaker": "string",
        "characterDialogue": "string",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "expectedCoreConcept": "string",
        "scaffoldingHint": "string"
      }
    },
    {
      "chapterNumber": 2,
      "title": "string",
      "badgeEmoji": "string (1 emoji)",
      "keyConceptHighlight": "string",
      "storyText": ["paragraph 1", "paragraph 2", "paragraph 3"],
      "checkpoint": {
        "id": "c2",
        "type": "own_words",
        "prompt": "string (asking child to explain the core concept in their own words to help the character)",
        "characterSpeaker": "string",
        "characterDialogue": "string",
        "expectedCoreConcept": "string",
        "scaffoldingHint": "string"
      }
    },
    {
      "chapterNumber": 3,
      "title": "string",
      "badgeEmoji": "string (1 emoji)",
      "keyConceptHighlight": "string",
      "storyText": ["paragraph 1", "paragraph 2", "paragraph 3"],
      "checkpoint": {
        "id": "c3",
        "type": "prediction",
        "prompt": "string",
        "characterSpeaker": "string",
        "characterDialogue": "string",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "expectedCoreConcept": "string",
        "scaffoldingHint": "string"
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
  return `You are an expert pedagogical evaluator assessing a child's understanding.
Child Age: ${childAge}
Question Prompt: "${promptText}"
Expected Core Concept: "${expectedCoreConcept}"
Child's Response: "${childResponse}"

CRITICAL EVALUATION RULES:
1. FOCUS ON CONCEPTUAL UNDERSTANDING ONLY.
2. DO NOT judge grammar, spelling, punctuation, capitalization, or sentence elegance. A child might write "becuz 5 is 35 and add 7" - this demonstrates understanding!
3. If the child shows the central insight or mechanism, mark understood as true.
4. If the child is confused, missed the relationship, or guessed wildly, mark understood as false and diagnose the specific hurdle.
5. In friendlyFeedback, ALWAYS be encouraging, warm, and speak to the child with joy. NEVER say "Wrong" or "Incorrect".

Respond strictly with valid JSON (no markdown fences, just pure JSON):
{
  "understood": true,
  "positiveElementsFound": ["specific concept element recognized in child's words"],
  "misconceptionIdentified": null,
  "friendlyFeedback": "Warm, encouraging 1-2 sentence response to the child praising their insight",
  "nextAction": "advance"
}
(or if understood is false):
{
  "understood": false,
  "positiveElementsFound": ["any piece they got right or good effort shown"],
  "misconceptionIdentified": "Short pedagogical diagnosis of what confused them",
  "friendlyFeedback": "Warm, supportive message saying what a cool try that was and getting ready to look at it differently",
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

  return `You are StoryQuest AI's adaptive learning engine creating a "Try Again, Differently" moment.
Child: ${setup.childName} (Age ${setup.childAge}, ${band})
Story Setting: ${setup.setting}
Character Style: ${setup.characterStyle}
Real-World Context: ${setup.realWorldContext}
Original Question: "${question}"
Child's Attempt: "${childResponse}"
Core Concept: "${expectedConcept}"
Diagnosed Hurdle: "${misconception || 'Uncertainty about the underlying rule'}"

MISSION:
The child struggled with this concept. Provide an ALTERNATE TEACHING ANGLE.
Do NOT just repeat the same explanation.
- Shift to a tangible, physical real-world comparison connected to ${setup.realWorldContext} or ${setup.setting}.
- Have the story character guide them with warmth and zero judgment.
- Present a scaffolded mini-question with 2-3 simple choices so the child can easily succeed and build confidence.

Respond strictly with valid JSON (no markdown fences, just pure JSON):
{
  "encouragingNote": "Great effort! Let's look at this secret a whole new way...",
  "characterGuidance": "Character speaking with encouragement and warmth",
  "alternateAnalogy": "A fresh, vivid physical analogy (e.g. baking trays, sharing toys, stepping stones)",
  "realWorldConnection": "Direct link to child's everyday world",
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
  return `You are a master educational diagnostician and child learning specialist.
Generate a comprehensive, evidence-based Parent/Teacher Learning Report for:
Child: ${setup.childName} (Age ${setup.childAge})
Topic: "${setup.topic}"
Specific Learning Need: "${setup.specificNeed}"
Total Stars Earned: ${starsEarned}

SESSION TRANSCRIPT & CHILD INTERACTIONS:
${JSON.stringify(interactions, null, 2)}

REPORT PHILOSOPHY:
- Answer: "Did the child appear to understand the concept, and what should we do next?"
- DO NOT claim definitive proof. Frame findings as an estimate based on session interactions.
- Provide real evidence: quote the child's actual responses directly.
- Diagnose specific hurdles constructively.
- Suggest 2 concrete, engaging offline activities (kitchen math, home science, or bedtime conversation).

Respond strictly with valid JSON (no markdown fences, just pure JSON):
{
  "id": "report-${Date.now()}",
  "topic": "${setup.topic}",
  "specificNeed": "${setup.specificNeed}",
  "childName": "${setup.childName}",
  "childAge": ${setup.childAge},
  "ageBandLabel": "Early Explorer / Curious Adventurer / Master Sleuth",
  "estimatedMastery": "Developing Understanding",
  "masterySummary": "Comprehensive 2-3 sentence overview of what the child demonstrated during the quest",
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
    "Specific observation 2",
    "Specific observation 3"
  ],
  "suggestedNextActivities": [
    {
      "title": "Activity Title",
      "type": "home_experiment",
      "description": "Step by step description of real world activity",
      "whyItHelps": "Pedagogical rationale"
    },
    {
      "title": "Discussion Title",
      "type": "discussion",
      "description": "Conversation starter for car ride or dinner table",
      "whyItHelps": "Pedagogical rationale"
    }
  ],
  "totalStars": ${starsEarned},
  "createdAt": "${new Date().toISOString()}"
}`;
}
