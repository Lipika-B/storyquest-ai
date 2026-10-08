'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ParentPortal } from '@/components/parent/ParentPortal';
import { ChildQuestPortal } from '@/components/child/ChildQuestPortal';
import { LearningReportView } from '@/components/report/LearningReportView';
import { 
  ParentSetup, 
  QuestSession, 
  LearningReport, 
  ChildInteraction, 
  EvaluationResult, 
  AdaptiveScaffolding 
} from '@/lib/types/quest';
import { TopicPreset, TOPIC_LIBRARY } from '@/lib/data/topicLibrary';
import { createInitialSession, saveActiveSession, loadActiveSession, clearActiveSession } from '@/lib/utils/session';
import { playSuccessChime, playEncouragementChime, playStarEarnedSound, setSoundEnabled, getSoundEnabled } from '@/lib/utils/audio';
import { StorySpeaker } from '@/lib/utils/speech';
import { generateParametricStory } from '@/lib/ai/storyEngine';

export default function Home() {
  const [currentPortal, setCurrentPortal] = useState<'parent' | 'child' | 'report'>('parent');
  
  // Default Showcase Persona (Requirement 25: 7x6 equal groups, space, robot, rockets)
  const defaultTopicPreset = TOPIC_LIBRARY[0].topics[0];
  const [setup, setSetup] = useState<ParentSetup>({
    childName: 'Alex',
    childAge: defaultTopicPreset.suggestedAge,
    topic: defaultTopicPreset.topic,
    learningGoal: defaultTopicPreset.learningGoal,
    struggle: defaultTopicPreset.defaultStruggle,
    interest: defaultTopicPreset.interest,
    storyWorld: defaultTopicPreset.world,
    companionType: defaultTopicPreset.companion,
    learningStyle: defaultTopicPreset.learningStyle,
  });
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(defaultTopicPreset.id);

  // Active adventure session
  const [session, setSession] = useState<QuestSession | null>(null);
  
  // Learning diagnostic report
  const [report, setReport] = useState<LearningReport | null>(null);

  // Async loading & UI feedback flags
  const [isLoading, setIsLoading] = useState(false);
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(true);

  // Hydrate session from session storage or initialize parametric session
  useEffect(() => {
    const saved = loadActiveSession();
    if (saved) {
      setSession(saved);
      setSetup(saved.setup);
    } else {
      const initialLevels = generateParametricStory(setup);
      const initial = createInitialSession(setup, initialLevels);
      setSession(initial);
    }
  }, []);

  // Sync session changes to storage
  useEffect(() => {
    if (session) {
      saveActiveSession(session);
    }
  }, [session]);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    setSoundEnabledState(nextState);
  };

  const handleSelectTopicPreset = (preset: TopicPreset) => {
    setSelectedTopicId(preset.id);
    const updatedSetup: ParentSetup = {
      ...setup,
      topic: preset.topic,
      learningGoal: preset.learningGoal,
      struggle: preset.defaultStruggle,
      childAge: preset.suggestedAge,
      storyWorld: preset.world,
      companionType: preset.companion,
      interest: preset.interest,
      learningStyle: preset.learningStyle,
    };
    setSetup(updatedSetup);

    // Prepare fresh adventure for this topic
    const freshLevels = generateParametricStory(updatedSetup);
    const newSession = createInitialSession(updatedSetup, freshLevels);
    setSession(newSession);
    setReport(null);
    setSuccessFeedback(null);
  };

  const handleGenerateQuest = async () => {
    setIsLoading(true);
    setSuccessFeedback(null);
    try {
      const res = await fetch('/api/story/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setup }),
      });

      const data = await res.json();
      const generatedLevels = data.levels || data.chapters || [];
      if (generatedLevels.length > 0) {
        const newSession = createInitialSession(setup, generatedLevels);
        setSession(newSession);
        setReport(null);
        setCurrentPortal('child'); // Opens Child Adventure in welcome mode
      }
    } catch (err) {
      console.error('Failed to generate story:', err);
      // Fallback to local parametric generation
      const freshLevels = generateParametricStory(setup);
      const newSession = createInitialSession(setup, freshLevels);
      setSession(newSession);
      setCurrentPortal('child');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartAdventure = () => {
    if (!session) return;
    setSession({
      ...session,
      status: 'story',
    });
  };

  const handleSubmitAnswer = async (response: string) => {
    if (!session) return;
    const levels = session.levels || session.chapters || [];
    const currentIndex = session.currentLevelIndex ?? session.currentChapterIndex ?? 0;
    const currentLevel = levels[currentIndex];
    if (!currentLevel) return;

    // Special Case: Level 1 "discover_tap" ("Let's find out! 🚀")
    if (currentLevel.interactionType === 'discover_tap' || response === 'tap_discover') {
      playSuccessChime();
      playStarEarnedSound();

      const interaction: ChildInteraction = {
        levelNumber: currentLevel.levelNumber || currentIndex + 1,
        phase: currentLevel.phase,
        question: currentLevel.prompt || 'Discover Phase Initiation',
        childResponse: 'Let’s find out! 🚀',
        attemptNumber: 1,
        demonstratedConcept: true,
        positiveEvidence: ['Eagerly leaped into the discovery phase'],
        misconceptionIdentified: null,
        scaffoldingUsed: false,
      };

      const updatedInteractions = [...session.interactions, interaction];
      const newStars = Math.min(levels.length, session.starsEarned + 1);

      setSession({
        ...session,
        starsEarned: newStars,
        interactions: updatedInteractions,
        status: 'story',
        activeScaffolding: undefined,
      });

      setSuccessFeedback(`Discovery unlocked! KIKI says: "${currentLevel.kikiDialogue || 'Off we go!'}" ⭐`);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/story/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptText: currentLevel.prompt,
          childResponse: response,
          expectedCoreConcept: currentLevel.expectedCoreConcept,
          childAge: session.setup.childAge,
          checkpointType: currentLevel.interactionType,
          options: currentLevel.options,
        }),
      });

      const evalResult: EvaluationResult = await res.json();

      if (evalResult.understood) {
        // SUCCESS: Celebrate and award star
        playSuccessChime();
        playStarEarnedSound();

        const interaction: ChildInteraction = {
          levelNumber: currentLevel.levelNumber || currentIndex + 1,
          phase: currentLevel.phase,
          question: currentLevel.prompt,
          childResponse: response,
          attemptNumber: 1,
          demonstratedConcept: true,
          positiveEvidence: evalResult.positiveElementsFound || ['Demonstrated the target concept'],
          misconceptionIdentified: null,
          scaffoldingUsed: false,
        };

        const updatedInteractions = [...session.interactions, interaction];
        const newStars = Math.min(levels.length, session.starsEarned + 1);

        setSession({
          ...session,
          starsEarned: newStars,
          interactions: updatedInteractions,
          status: 'story',
          activeScaffolding: undefined,
        });

        setSuccessFeedback(evalResult.friendlyFeedback || 'Whoa! You figured it out! KIKI is celebrating with you!');
      } else {
        // STRUGGLE: Compassionate KIKI "Try Again, Differently"
        playEncouragementChime();

        const adaptRes = await fetch('/api/story/adapt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: currentLevel.prompt,
            childResponse: response,
            expectedConcept: currentLevel.expectedCoreConcept,
            misconception: evalResult.misconceptionIdentified,
            setup: session.setup,
            checkpointId: `level-${currentLevel.levelNumber}`,
          }),
        });

        const scaffolding: AdaptiveScaffolding = await adaptRes.json();

        const interaction: ChildInteraction = {
          levelNumber: currentLevel.levelNumber || currentIndex + 1,
          phase: currentLevel.phase,
          question: currentLevel.prompt,
          childResponse: response,
          attemptNumber: 1,
          demonstratedConcept: false,
          positiveEvidence: evalResult.positiveElementsFound || ['Willingness to explore'],
          misconceptionIdentified: evalResult.misconceptionIdentified,
          scaffoldingUsed: true,
          alternateAnalogy: scaffolding.alternateAnalogy,
        };

        setSession({
          ...session,
          interactions: [...session.interactions, interaction],
          status: 'scaffolding',
          activeScaffolding: scaffolding,
        });
      }
    } catch (err) {
      console.error('Error evaluating answer:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetrySubmit = (retryAnswer: string) => {
    if (!session) return;
    const levels = session.levels || session.chapters || [];
    const currentIndex = session.currentLevelIndex ?? session.currentChapterIndex ?? 0;
    const currentLevel = levels[currentIndex];
    if (!currentLevel) return;

    playSuccessChime();
    playStarEarnedSound();

    const retryInteraction: ChildInteraction = {
      levelNumber: currentLevel.levelNumber || currentIndex + 1,
      phase: currentLevel.phase,
      question: session.activeScaffolding?.followUpPrompt || 'Scaffolded Clue',
      childResponse: retryAnswer,
      attemptNumber: 2,
      demonstratedConcept: true,
      positiveEvidence: ['Grasped the relationship after hands-on analogy'],
      misconceptionIdentified: null,
      scaffoldingUsed: true,
    };

    const newStars = Math.min(levels.length, session.starsEarned + 1);

    setSession({
      ...session,
      starsEarned: newStars,
      interactions: [...session.interactions, retryInteraction],
      status: 'story',
      activeScaffolding: undefined,
    });

    setSuccessFeedback('You got it! Looking at it differently made the secret unlock! ⭐');
  };

  const handleContinueToNextChapter = async () => {
    if (!session) return;
    setSuccessFeedback(null);
    StorySpeaker.stop();
    setIsSpeaking(false);

    const levels = session.levels || session.chapters || [];
    const currentIndex = session.currentLevelIndex ?? session.currentChapterIndex ?? 0;

    if (currentIndex < levels.length - 1) {
      const nextIdx = currentIndex + 1;
      setSession({
        ...session,
        currentLevelIndex: nextIdx,
        currentChapterIndex: nextIdx,
        status: 'story',
        activeScaffolding: undefined,
      });
    } else {
      // Completed full adventure!
      const completedSession: QuestSession = {
        ...session,
        status: 'completed',
      };
      setSession(completedSession);

      // Pre-synthesize parent report
      try {
        const res = await fetch('/api/story/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            setup: completedSession.setup,
            interactions: completedSession.interactions,
            starsEarned: completedSession.starsEarned,
          }),
        });
        const rep = await res.json();
        setReport(rep);
      } catch (err) {
        console.error('Failed to pre-synthesize report:', err);
      }
    }
  };

  const handleFetchReport = async () => {
    if (report) {
      setCurrentPortal('report');
      return;
    }
    if (!session) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/story/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          setup: session.setup,
          interactions: session.interactions,
          starsEarned: session.starsEarned,
        }),
      });
      const rep = await res.json();
      setReport(rep);
      setCurrentPortal('report');
    } catch (err) {
      console.error('Error fetching report:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleNavbarSpeech = () => {
    if (isSpeaking) {
      StorySpeaker.stop();
      setIsSpeaking(false);
    } else {
      if (!session) return;
      const levels = session.levels || session.chapters || [];
      const currentIndex = session.currentLevelIndex ?? session.currentChapterIndex ?? 0;
      const lvl = levels[currentIndex];
      if (!lvl) return;
      const text = `${lvl.title}. ${lvl.shortNarration.join(' ')}`;
      setIsSpeaking(true);
      StorySpeaker.speak(text, () => setIsSpeaking(false));
    }
  };

  const handleRestart = () => {
    clearActiveSession();
    const defaultTopic = TOPIC_LIBRARY[0].topics[0];
    const newSetup: ParentSetup = {
      childName: 'Alex',
      childAge: defaultTopic.suggestedAge,
      topic: defaultTopic.topic,
      learningGoal: defaultTopic.learningGoal,
      struggle: defaultTopic.defaultStruggle,
      interest: defaultTopic.interest,
      storyWorld: defaultTopic.world,
      companionType: defaultTopic.companion,
      learningStyle: defaultTopic.learningStyle,
    };
    setSetup(newSetup);
    setSelectedTopicId(defaultTopic.id);
    const freshLevels = generateParametricStory(newSetup);
    setSession(createInitialSession(newSetup, freshLevels));
    setReport(null);
    setSuccessFeedback(null);
    setCurrentPortal('parent');
  };


  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Visual & Conceptual Bridge: Shared KIKI Navbar */}
      <Navbar
        currentPortal={currentPortal}
        onSelectPortal={setCurrentPortal}
        childName={session?.setup.childName}
        starsEarned={session?.starsEarned || 0}
        hasReportData={Boolean(report || (session?.interactions && session.interactions.length > 0))}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleNavbarSpeech}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <main className="flex-1">
        {currentPortal === 'parent' && (
          <ParentPortal
            setup={setup}
            onChangeSetup={setSetup}
            onSelectTopicPreset={handleSelectTopicPreset}
            selectedTopicId={selectedTopicId}
            onGenerateQuest={handleGenerateQuest}
            isLoading={isLoading}
            activeSession={session}
            onJumpToQuest={() => setCurrentPortal('child')}
            onViewReport={handleFetchReport}
          />
        )}

        {currentPortal === 'child' && session && (
          <ChildQuestPortal
            session={session}
            onStartAdventure={handleStartAdventure}
            onSubmitAnswer={handleSubmitAnswer}
            onRetrySubmit={handleRetrySubmit}
            onContinueToNextChapter={handleContinueToNextChapter}
            isLoading={isLoading}
            successFeedback={successFeedback}
            onViewReport={handleFetchReport}
            onRestart={handleRestart}
          />
        )}

        {currentPortal === 'report' && (
          report ? (
            <LearningReportView
              report={report}
              onBackToStudio={() => setCurrentPortal('parent')}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 text-center p-8 bg-white rounded-3xl border-2 border-amber-200 shadow-md">
              <span className="text-3xl block mb-2">🌟</span>
              <p className="text-slate-900 font-black text-lg mb-2">
                No active learning report yet.
              </p>
              <p className="text-xs text-slate-600 mb-6 font-medium">
                Complete a story adventure with KIKI to generate an evidence-based diagnostic report!
              </p>
              <button
                onClick={() => setCurrentPortal('child')}
                className="px-6 py-3 rounded-2xl bg-amber-400 text-amber-950 font-black text-sm shadow-md"
              >
                Go to Child Adventure
              </button>
            </div>
          )
        )}
      </main>

      {/* Accessible Storybook Footer */}
      <footer className="border-t border-amber-200/60 bg-white py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900">KIKI</span>
            <span>—</span>
            <span>Little stories. Big discoveries.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <span>Adaptive Storytelling</span>
            <span>•</span>
            <span>Evidence-Based Insights</span>
            <span>•</span>
            <span>Cloud Run Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
