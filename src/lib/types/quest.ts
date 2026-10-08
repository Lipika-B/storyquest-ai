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

export type SubjectCategory = 'mathematics' | 'science' | 'everyday' | 'custom';

export interface LearningPlan {
  topic: string;
  subjectCategory: SubjectCategory;
  targetAge: number;
  ageBand: AgeBand;
  learningObjectives: string[];
  keyConcepts: string[];
  prerequisiteKnowledge?: string[];
  ageAppropriateVocabulary: string[];
  likelyMisconceptions: string[];
  appropriateDifficulty: 'introductory' | 'intermediate' | 'advanced';
  realWorldConnection: string;
  assessmentCriteria: string[];
  generatedAt?: string;
}

export interface ParentSetup {
  childName: string;
  childAge: number;
  topic: string;
  learningGoal: string; // What the child should understand after the story
  subjectCategory?: SubjectCategory;
  struggle?: string;    // What the child struggles with
  interest?: string;    // What the child enjoys
  storyWorld?: StoryWorld | string;
  companionType?: CompanionType | string;
  learningStyle?: LearningStyle | string;
}

export type LevelPhase = 'discover' | 'explore' | 'solve' | 'teach' | 'master';

export type QuestionType = 
  | 'recall' 
  | 'why_reasoning' 
  | 'application' 
  | 'prediction' 
  | 'misconception_check' 
  | 'teach_back' 
  | 'real_life_transfer';

export type InteractionType = 'discover_tap' | 'choice' | 'prediction' | 'own_words' | 'master_choice';

export interface SceneVisualDetails {
  theme: 'space' | 'forest' | 'city' | 'kitchen' | 'school' | 'ocean' | 'cyber' | 'sky' | 'body' | 'everyday';
  backdropGradient: string;
  visualItems: string[]; // Emojis or SVG prop keys displayed in the picture scene
  characterAction: string; // Brief description of what characters are doing in the picture
}

export interface StoryLevel {
  levelNumber: number; // 1 to 5
  phase: LevelPhase;   // 'discover' | 'explore' | 'solve' | 'teach' | 'master'
  phaseLabel: string;  // "1. Discover", "2. Explore", "3. Solve", "4. Teach KIKI", "5. Master"
  title: string;
  sceneVisual: SceneVisualDetails;
  sceneEmoji: string;
  kikiExpression: 'happy' | 'thinking' | 'curious' | 'cheering' | 'explaining';
  kikiDialogue: string;
  characterSpeaker: string;
  characterDialogue: string;
  shortNarration: string[]; // 1 to 3 short lines
  keyDiscoveryHook: string;
  interactionType: InteractionType;
  questionType?: QuestionType;
  prompt: string;
  options?: string[]; // for choice, prediction, master
  expectedCoreConcept: string;
  scaffoldingHint: string;
  targetObjective?: string;
  ageDepthExplanation?: string;
}

export interface ChildInteraction {
  levelNumber: number;
  chapterNumber?: number; // compatibility alias
  phase: LevelPhase;
  checkpointId?: string; // compatibility alias
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
  conceptualGrasp?: 'solid' | 'partial' | 'hesitant';
  positiveElementsFound: string[];
  misconceptionIdentified?: string | null;
  conceptUnderstoodExcerpt?: string;
  conceptNeedingReinforcementExcerpt?: string;
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
  targetedMisconception?: string;
  newQuestionType?: QuestionType;
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

export interface UnderstandingDimension {
  dimension: string;
  rating: 'Beginning' | 'Developing' | 'Strong' | 'Mastered';
  notes: string;
}

export interface LearningReport {
  id: string;
  topic: string;
  learningGoal: string;
  childName: string;
  childAge: number;
  ageBandLabel: string;
  learningPlan?: LearningPlan;
  estimatedMastery: 'Beginning Exploration' | 'Developing Understanding' | 'Strong Understanding' | 'Mastered Concept';
  masterySummary: string;
  understandingProfile?: UnderstandingDimension[];
  conceptsDemonstrated: ReportDemonstratedConcept[];
  conceptsNeedingReinforcement: ReportReinforcementConcept[];
  howKikiAdapted: string; // Explains teaching strategy & alternate analogies used
  cognitiveObservations: string[];
  suggestedNextActivities: NextLearningActivity[];
  parentTeacherTakeaway?: string;
  totalStars: number;
  totalLevels: number;
  createdAt: string;
}

export interface AdventureSession {
  id: string;
  setup: ParentSetup;
  learningPlan?: LearningPlan;
  currentLevelIndex: number; // 0 to 4
  levels: StoryLevel[];
  currentChapterIndex?: number; // compatibility alias
  chapters?: StoryLevel[];      // compatibility alias
  starsEarned: number;
  interactions: ChildInteraction[];
  status: 'welcome' | 'intro' | 'playing' | 'story' | 'scaffolding' | 'completed';
  activeScaffolding?: AdaptiveScaffolding;
}

// Compatibility aliases
export type QuestSession = AdventureSession;
export type StoryChapter = StoryLevel;

export interface Checkpoint {
  id: string;
  prompt: string;
  type: InteractionType;
  options?: string[];
  expectedCoreConcept: string;
  characterSpeaker?: string;
  characterDialogue?: string;
  scaffoldingHint?: string;
}
