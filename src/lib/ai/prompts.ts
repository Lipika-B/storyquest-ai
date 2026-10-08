import { ParentSetup, ChildInteraction, LearningPlan } from '../types/quest';

export function getAgeBandDescription(age: number): { band: string; pedagogy: string } {
  if (age <= 7) {
    return {
      band: 'Early Explorer (Ages 5-7)',
      pedagogy: `
- Sentence structure: Very short, lively, clear sentences (maximum 6-8 words per line).
- Tone: Playful, warm, sensory, magical. Use sound words (whoosh, pop, chomp).
- Metaphors: Concrete physical objects (apples, toys, banana bites, soap bubbles).
- Companion & KIKI: Cute enthusiastic friends.
- Cognitive model: One idea at a time, visual and physical explanations, minimal technical jargon.
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
- Cognitive model: Cause-and-effect reasoning, practical examples, simple subject terminology, prediction challenges.
- Reading: Short, focused story lines (2-3 sentences).
      `.trim()
    };
  } else {
    return {
      band: 'Master Sleuth (Ages 11-13)',
      pedagogy: `
- Sentence structure: Sophisticated narrative pacing, conceptual tension.
- Tone: Intelligent, scientific exploration, respectful of emerging autonomy.
- Metaphors: Systems, variables, proportional balance, inverse relationships, aerodynamic lift, cellular respiration.
- Companion & KIKI: Capable teammates facing real dilemmas.
- Cognitive model: Precise academic vocabulary, mechanisms and processes, "why" and "what if" questions, multiple connected ideas, independent conceptual explain-back.
- Reading: Concise, rich narrative lines.
      `.trim()
    };
  }
}

export function buildLearningPlanPrompt(setup: ParentSetup): string {
  const { band, pedagogy } = getAgeBandDescription(setup.childAge);

  return `You are KIKI's Senior Educational Curriculum Specialist.
Create an AI-Generated LEARNING PLAN before any story writing begins.
Target Learner: ${setup.childName} (Age ${setup.childAge}, ${band})
Topic: "${setup.topic}"
Target Goal: "${setup.learningGoal}"
Known Struggle/Misconception: "${setup.struggle || 'General confusion about the concept'}"
Story World: "${setup.storyWorld || 'space'}"
Companion: "${setup.companionType || 'robot'}"

STRICT PEDAGOGICAL GUIDANCE (AGE ${setup.childAge}):
${pedagogy}

Determine:
1. 4-6 specific, progressive learning objectives adapted to Age ${setup.childAge}.
2. 3-4 key concepts.
3. Prerequisite knowledge.
4. Age-appropriate vocabulary list.
5. 2-3 genuine conceptual misconceptions common for this topic and age.
6. Real-world physical connection.
7. Assessment criteria for checking child understanding.

Respond strictly with valid JSON conforming to this schema (no markdown fences, just pure JSON):
{
  "topic": "${setup.topic}",
  "subjectCategory": "mathematics | science | everyday | custom",
  "targetAge": ${setup.childAge},
  "ageBand": "${setup.childAge <= 7 ? 'early' : setup.childAge <= 10 ? 'middle' : 'upper'}",
  "learningObjectives": [
    "Objective 1: Discovery",
    "Objective 2: Exploration & mechanism",
    "Objective 3: Core hurdle breakthrough",
    "Objective 4: Teach-back articulation",
    "Objective 5: Real-world application"
  ],
  "keyConcepts": ["Concept 1", "Concept 2", "Concept 3"],
  "prerequisiteKnowledge": ["Prerequisite 1"],
  "ageAppropriateVocabulary": ["word1", "word2", "word3", "word4"],
  "likelyMisconceptions": [
    "Misconception 1",
    "Misconception 2"
  ],
  "appropriateDifficulty": "${setup.childAge <= 7 ? 'introductory' : setup.childAge <= 10 ? 'intermediate' : 'advanced'}",
  "realWorldConnection": "Tangible everyday connection",
  "assessmentCriteria": [
    "Criterion 1",
    "Criterion 2"
  ]
}`;
}

export function buildStoryPrompt(setup: ParentSetup, plan?: LearningPlan): string {
  const { band, pedagogy } = getAgeBandDescription(setup.childAge);

  const planContext = plan ? `
AI LEARNING PLAN (MANDATORY BLUEPRINT):
- Learning Objectives:
${plan.learningObjectives.map((obj, i) => `  ${i + 1}. ${obj}`).join('\n')}
- Key Concepts: ${plan.keyConcepts.join(', ')}
- Vocabulary: ${plan.ageAppropriateVocabulary.join(', ')}
- Common Misconceptions to Address: ${plan.likelyMisconceptions.join('; ')}
` : '';

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
${planContext}

STRICT PEDAGOGICAL RULES (AGE ${setup.childAge}):
${pedagogy}

CRITICAL 5-LEVEL STORYTEACHING GAME STRUCTURE:
Level 1 (🌟 Discover): Characters encounter the curiosity/dilemma in an illustrated scene. Ends with simple discover tap. Question type: recall.
Level 2 (🔎 Explore): Characters investigate the clue. Ends with choice/prediction. Question type: prediction.
Level 3 (🧩 Solve): Characters encounter a problem requiring the concept. Targets the misconception. Question type: why_reasoning.
Level 4 (💬 Teach KIKI): KIKI sits with a notebook and asks the child: "Can you tell me in your own words how this works?" Ends with own_words check. Question type: teach_back.
Level 5 (🏆 Master): Final celebration quest applying the concept to a new challenge. Ends with master choice. Question type: real_life_transfer.

TOPIC INTEGRITY:
The topic is "${setup.topic}". The ENTIRE story, all dialogue, all visual items, and all questions MUST be strictly about "${setup.topic}". Zero unrelated content!

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
      "questionType": "recall",
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
      "questionType": "prediction",
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
      "questionType": "why_reasoning",
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
      "questionType": "teach_back",
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
      "questionType": "real_life_transfer",
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
  childAge: number,
  plan?: LearningPlan
): string {
  const planInfo = plan ? `
Learning Objectives: ${plan.learningObjectives.join('; ')}
Likely Misconceptions: ${plan.likelyMisconceptions.join('; ')}
` : '';

  return `You are KIKI evaluating a child's conceptual understanding.
Child Age: ${childAge}
Question Prompt: "${promptText}"
Target Concept / Learning Goal: "${expectedCoreConcept}"
${planInfo}
Child's Words: "${childResponse}"

EVALUATION PRINCIPLES:
1. FOCUS STRICTLY ON CONCEPTUAL UNDERSTANDING.
2. ABSOLUTELY IGNORE spelling errors (e.g. "stomack", "esofagus", "nutreint", "diffrent"), punctuation, capitalization, imperfect grammar, or conversational syntax.
3. If the child shows intuitive grasp of the relationship, mark understood: true.
4. If the child is confused or expresses a misconception, identify:
   - what part they DID understand (positiveElementsFound)
   - the exact misconception hurdle (misconceptionIdentified)
5. In friendlyFeedback, speak as KIKI: joyful, warm, cheering! NEVER say "Wrong" or "Incorrect".

Respond strictly with valid JSON:
{
  "understood": true,
  "conceptualGrasp": "solid" | "partial",
  "positiveElementsFound": ["what concept the child grasped"],
  "misconceptionIdentified": null,
  "conceptUnderstoodExcerpt": "Short excerpt of what child understood",
  "conceptNeedingReinforcementExcerpt": null,
  "friendlyFeedback": "Kiki celebration line praising their exact insight",
  "nextAction": "advance"
}
(or if understood is false):
{
  "understood": false,
  "conceptualGrasp": "partial" | "hesitant",
  "positiveElementsFound": ["any good effort or partial idea noticed"],
  "misconceptionIdentified": "Short friendly diagnosis of what tripped them up (e.g. 'Confused stomach churning with small intestine absorption')",
  "conceptUnderstoodExcerpt": "The part they grasped",
  "conceptNeedingReinforcementExcerpt": "The part needing reinforcement",
  "friendlyFeedback": "Kiki supportive line saying: 'That was a super try! Let's peek at this another way...'",
  "nextAction": "try_differently"
}`;
}

export function buildScaffoldingPrompt(
  question: string,
  childResponse: string,
  expectedConcept: string,
  misconception: string | null,
  setup: ParentSetup,
  plan?: LearningPlan
): string {
  const { band } = getAgeBandDescription(setup.childAge);

  return `You are KIKI creating a supportive "Try Again, Differently" learning moment.
Child: ${setup.childName} (Age ${setup.childAge}, ${band})
Topic: ${setup.topic}
Learning Goal: ${expectedConcept}
Child's Attempt: "${childResponse}"
Diagnosed Hurdle / Misconception: "${misconception || 'Needs a different analogy'}"

TEACHING MISSION:
Change the teaching approach completely.
- Address the diagnosed misconception directly with an alternate, tangible real-world analogy.
- For example, if the child confused stomach with absorption, explain: "The stomach is like a blender that mashes soup, but the small intestine is like a sponge that drinks up the nutrients!"
- NEVER say "Wrong"!
- Provide a BRAND NEW follow-up question (do NOT repeat the previous question) with 2 clear options so the child succeeds and continues the adventure!

Respond strictly with valid JSON:
{
  "encouragingNote": "Kiki says: 'Wait! Let's look at this secret a whole new way...'",
  "kikiExpression": "explaining",
  "kikiDialogue": "Warm explanation from Kiki",
  "alternateAnalogy": "A fresh physical analogy targeting the misconception",
  "realWorldConnection": "Direct link to their everyday world",
  "followUpPrompt": "A BRAND NEW question that makes the concept click",
  "options": ["Correct simple choice", "Friendly distractor"],
  "expectedConcept": "${expectedConcept}",
  "targetedMisconception": "${misconception || 'Needs concrete analogy'}"
}`;
}

export function buildReportPrompt(
  setup: ParentSetup,
  interactions: ChildInteraction[],
  starsEarned: number,
  plan?: LearningPlan
): string {
  const planInfo = plan ? `
AI Learning Plan Objectives:
${plan.learningObjectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}
Key Concepts: ${plan.keyConcepts.join(', ')}
Likely Misconceptions: ${plan.likelyMisconceptions.join(', ')}
` : '';

  return `You are KIKI's Educational Insights Specialist.
Generate an evidence-based Parent/Teacher Learning Report for:
Child: ${setup.childName} (Age ${setup.childAge})
Topic: "${setup.topic}"
Learning Goal: "${setup.learningGoal}"
Total Stars Earned: ${starsEarned} / 5
${planInfo}

CHILD'S TRANSCRIPT & INTERACTIONS:
${JSON.stringify(interactions, null, 2)}

REPORT PHILOSOPHY:
- Answer: "Did the child appear to understand the concept, and what should we do next?"
- DO NOT claim definitive psychometric proof. Frame findings as an estimate based on session responses.
- Cite direct verbatim quotes from the child as evidence of understanding or hesitation.
- Detail the understanding profile across 4 dimensions:
  1. Core Concept Comprehension
  2. Mechanism & Cause-Effect Reasoning
  3. Misconception Awareness
  4. Real-World Transfer
- Explain "How KIKI adapted" during the session (citing specific analogies used).
- Provide a concise "Parent/Teacher Takeaway".
- Suggest 2 concrete, engaging offline activities (kitchen math, home science, or discussion).

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
  "understandingProfile": [
    {
      "dimension": "Core Concept Comprehension",
      "rating": "Strong",
      "notes": "Demonstrated solid grasp of the core principle"
    },
    {
      "dimension": "Mechanism & Cause-Effect Reasoning",
      "rating": "Developing",
      "notes": "Understood the physical pathway"
    },
    {
      "dimension": "Misconception Awareness",
      "rating": "Strong",
      "notes": "Successfully resolved the diagnosed hurdle through alternate analogy"
    },
    {
      "dimension": "Real-World Transfer",
      "rating": "Strong",
      "notes": "Applied concept to the final dilemma"
    }
  ],
  "conceptsDemonstrated": [
    {
      "concept": "Concept name",
      "evidenceQuote": "Direct verbatim quote from child",
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
  "parentTeacherTakeaway": "Short natural-language summary for the parent or educator",
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
