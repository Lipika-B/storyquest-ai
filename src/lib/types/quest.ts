export type AgeBand = 'early' | 'middle' | 'upper';

export type StoryWorld = 
  | 'space' 
  | 'forest' 
  | 'city' 
  | 'school' 
  | 'kitchen' 
  | 'ocean' 
  | 'village' 
  | 'fantasy' 
  | 'cyber'
  | 'everyday'
  | 'custom';

export type CompanionType = 
  | 'robot' 
  | 'animal' 
  | 'child' 
  | 'magical' 
  | 'monster'
  | 'custom';

export type LearningStyle = 
  | 'adventure' 
  | 'mystery' 
  | 'real-life' 
  | 'discovery' 
  | 'rescue';

export interface ParentSetup {
  childName: string;
  childAge: number;
  topic: string;
  learningGoal: string; // What the child should understand after the story
  struggle?: string;    // What the child struggles with
  interest?: string;    // What the child enjoys (animals, space, cooking, dinosaurs, etc.)
  storyWorld?: StoryWorld | string;
  companionType?: CompanionType | string;
  learningStyle?: LearningStyle | string;
}

export type CheckpointType = 'choice' | 'prediction' | 'own_words';

export interface Checkpoint {
  id: string;
  type: CheckpointType;
  prompt: string;
  kikiDialogue: string;
  characterSpeaker: string;
  characterDialogue?: string;
  options?: string[]; // for choice or prediction
  expectedCoreConcept: string;
  scaffoldingHint: string;
}

export interface StoryChapter {
  chapterNumber: number;
  phase: 'spark' | 'puzzle' | 'triumph'; // 1: The Spark, 2: The Puzzle, 3: The Triumph
  title: string;
  sceneSetting: string;
  sceneEmoji: string;
  kikiExpression: 'happy' | 'thinking' | 'curious' | 'cheering' | 'explaining';
  kikiDialogue: string;
  narrativeParagraphs: string[];
  keyConceptHook: string;
  checkpoint: Checkpoint;
}

export interface ChildInteraction {
  chapterNumber: number;
  checkpointId: string;
  question: string;
  childResponse: string;
  attemptNumber: number;
  demonstratedConcept: boolean;
  positiveEvidence: string[];
  misconceptionIdentified?: string | null;
  scaffoldingUsed: boolean;
  alternateAnalogy?: string;
}

export interface EvaluationResult {
  understood: boolean;
  positiveElementsFound: string[];
  misconceptionIdentified?: string | null;
  friendlyFeedback: string;
  nextAction: 'advance' | 'try_differently';
}

export interface AdaptiveScaffolding {
  encouragingNote: string;
  kikiExpression: 'thinking' | 'explaining';
  kikiDialogue: string;
  alternateAnalogy: string;
  realWorldConnection: string;
  followUpPrompt: string;
  options?: string[];
  expectedConcept: string;
}

export interface ReportDemonstratedConcept {
  concept: string;
  evidenceQuote: string;
  observation: string;
}

export interface ReportReinforcementConcept {
  concept: string;
  diagnosedHurdle: string;
  recommendation: string;
}

export interface NextLearningActivity {
  title: string;
  type: 'home_experiment' | 'discussion' | 'hands_on_game';
  description: string;
  whyItHelps: string;
}

export interface LearningReport {
  id: string;
  topic: string;
  learningGoal: string;
  childName: string;
  childAge: number;
  ageBandLabel: string;
  estimatedMastery: 'Beginning Exploration' | 'Developing Understanding' | 'Strong Understanding' | 'Mastered Concept';
  masterySummary: string;
  conceptsDemonstrated: ReportDemonstratedConcept[];
  conceptsNeedingReinforcement: ReportReinforcementConcept[];
  cognitiveObservations: string[];
  suggestedNextActivities: NextLearningActivity[];
  totalStars: number;
  createdAt: string;
}

export interface QuestSession {
  id: string;
  setup: ParentSetup;
  currentChapterIndex: number;
  chapters: StoryChapter[];
  starsEarned: number;
  interactions: ChildInteraction[];
  status: 'welcome' | 'story' | 'checkpoint' | 'scaffolding' | 'completed';
  activeScaffolding?: AdaptiveScaffolding;
}
