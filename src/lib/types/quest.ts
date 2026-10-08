export type AgeBand = 'early' | 'middle' | 'upper';

export type StorySetting = 'forest' | 'space' | 'school' | 'everyday' | 'fantasy';
export type CharacterStyle = 'child' | 'animal' | 'robot' | 'fantasy';
export type LearningStyle = 'adventure' | 'mystery' | 'real-life';

export interface ParentSetup {
  childName: string;
  childAge: number;
  topic: string;
  specificNeed: string;
  setting: StorySetting;
  characterStyle: CharacterStyle;
  learningStyle: LearningStyle;
  realWorldContext: string;
}

export type CheckpointType = 'own_words' | 'prediction' | 'choice';

export interface Checkpoint {
  id: string;
  type: CheckpointType;
  prompt: string;
  characterSpeaker: string;
  characterDialogue: string;
  options?: string[]; // for prediction or choice
  expectedCoreConcept: string;
  scaffoldingHint: string;
}

export interface StoryChapter {
  chapterNumber: number;
  title: string;
  storyText: string[];
  keyConceptHighlight: string;
  badgeEmoji: string;
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
  characterGuidance: string;
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
  specificNeed: string;
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
  status: 'story' | 'checkpoint' | 'scaffolding' | 'completed';
  activeScaffolding?: AdaptiveScaffolding;
}
