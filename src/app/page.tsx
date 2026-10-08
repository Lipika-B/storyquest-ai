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
import { CURRICULUM_PRESETS, CurriculumPreset } from '@/lib/ai/mockData';
import { createInitialSession, saveActiveSession, loadActiveSession, clearActiveSession } from '@/lib/utils/session';
import { playSuccessChime, playEncouragementChime, playStarEarnedSound } from '@/lib/utils/audio';
import { StorySpeaker } from '@/lib/utils/speech';

export default function Home() {
  const [currentPortal, setCurrentPortal] = useState<'parent' | 'child' | 'report'>('parent');
  
  // Setup state for parent/teacher
  const [setup, setSetup] = useState<ParentSetup>(CURRICULUM_PRESETS[0].setup);
  const [selectedPresetId, setSelectedPresetId] = useState<string | undefined>(CURRICULUM_PRESETS[0].id);

  // Active quest session
  const [session, setSession] = useState<QuestSession | null>(null);
  
  // Post-quest learning report
  const [report, setReport] = useState<LearningReport | null>(null);

  // Async loading & feedback flags
  const [isLoading, setIsLoading] = useState(false);
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Hydrate or initialize with default session
  useEffect(() => {
    const saved = loadActiveSession();
    if (saved) {
      setSession(saved);
      setSetup(saved.setup);
    } else {
      // Default pre-loaded session using preset 0 (Space Bakery 7 Times Table)
      const defaultPreset = CURRICULUM_PRESETS[0];
      const initial = createInitialSession(defaultPreset.setup, defaultPreset.chapters);
      setSession(initial);
    }
  }, []);

  // Sync session changes to storage
  useEffect(() => {
    if (session) {
      saveActiveSession(session);
    }
  }, [session]);

  const handleSelectPreset = (preset: CurriculumPreset) => {
    setSelectedPresetId(preset.id);
    setSetup(preset.setup);
    const newSession = createInitialSession(preset.setup, preset.chapters);
    setSession(newSession);
    setReport(preset.demoReport);
    setSuccessFeedback(null);
  };

  const handleGenerateQuest = async () => {
    setIsLoading(true);
    setSuccessFeedback(null);
    try {
      const res = await fetch('/api/story/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setup, presetId: selectedPresetId }),
      });

      const data = await res.json();
      if (data.chapters && data.chapters.length > 0) {
        const newSession = createInitialSession(setup, data.chapters);
        setSession(newSession);
        setReport(null); // Reset report for fresh session
        setCurrentPortal('child'); // Seamless transition into Child Quest!
      }
    } catch (err) {
      console.error('Failed to generate quest:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async (response: string) => {
    if (!session) return;
    const currentChapter = session.chapters[session.currentChapterIndex];
    if (!currentChapter) return;

    setIsLoading(true);
    try {
      const checkpoint = currentChapter.checkpoint;
      const res = await fetch('/api/story/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptText: checkpoint.prompt,
          childResponse: response,
          expectedCoreConcept: checkpoint.expectedCoreConcept,
          childAge: session.setup.childAge,
          checkpointType: checkpoint.type,
          options: checkpoint.options,
        }),
      });

      const evalResult: EvaluationResult = await res.json();

      if (evalResult.understood) {
        // SUCCESS: Celebrate and advance
        playSuccessChime();
        playStarEarnedSound();

        const interaction: ChildInteraction = {
          chapterNumber: currentChapter.chapterNumber,
          checkpointId: checkpoint.id,
          question: checkpoint.prompt,
          childResponse: response,
          attemptNumber: 1,
          demonstratedConcept: true,
          positiveEvidence: evalResult.positiveElementsFound || ['Applied the concept correctly'],
          misconceptionIdentified: null,
          scaffoldingUsed: false,
        };

        const updatedInteractions = [...session.interactions, interaction];
        const newStars = Math.min(session.chapters.length, session.starsEarned + 1);

        setSession({
          ...session,
          starsEarned: newStars,
          interactions: updatedInteractions,
          status: 'story',
          activeScaffolding: undefined,
        });

        setSuccessFeedback(evalResult.friendlyFeedback || 'Awesome work! You mastered this checkpoint!');
      } else {
        // STRUGGLED: Compassionate "Try Again, Differently" Adaptive Scaffolding
        playEncouragementChime();

        const adaptRes = await fetch('/api/story/adapt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: checkpoint.prompt,
            childResponse: response,
            expectedConcept: checkpoint.expectedCoreConcept,
            misconception: evalResult.misconceptionIdentified,
            setup: session.setup,
            checkpointId: checkpoint.id,
          }),
        });

        const scaffolding: AdaptiveScaffolding = await adaptRes.json();

        const interaction: ChildInteraction = {
          chapterNumber: currentChapter.chapterNumber,
          checkpointId: checkpoint.id,
          question: checkpoint.prompt,
          childResponse: response,
          attemptNumber: 1,
          demonstratedConcept: false,
          positiveEvidence: evalResult.positiveElementsFound || ['Willingness to try'],
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
    const currentChapter = session.chapters[session.currentChapterIndex];
    if (!currentChapter) return;

    playSuccessChime();
    playStarEarnedSound();

    const retryInteraction: ChildInteraction = {
      chapterNumber: currentChapter.chapterNumber,
      checkpointId: `${currentChapter.checkpoint.id}-retry`,
      question: session.activeScaffolding?.followUpPrompt || 'Follow-up Checkpoint',
      childResponse: retryAnswer,
      attemptNumber: 2,
      demonstratedConcept: true,
      positiveEvidence: ['Grasped the concept with hands-on analogy'],
      misconceptionIdentified: null,
      scaffoldingUsed: true,
    };

    const newStars = Math.min(session.chapters.length, session.starsEarned + 1);

    setSession({
      ...session,
      starsEarned: newStars,
      interactions: [...session.interactions, retryInteraction],
      status: 'story',
      activeScaffolding: undefined,
    });

    setSuccessFeedback('You did it! Looking at it differently made it totally click!');
  };

  const handleContinueToNextChapter = async () => {
    if (!session) return;
    setSuccessFeedback(null);
    StorySpeaker.stop();
    setIsSpeaking(false);

    if (session.currentChapterIndex < session.chapters.length - 1) {
      setSession({
        ...session,
        currentChapterIndex: session.currentChapterIndex + 1,
        status: 'story',
        activeScaffolding: undefined,
      });
    } else {
      // Completed all chapters!
      const completedSession: QuestSession = {
        ...session,
        status: 'completed',
      };
      setSession(completedSession);

      // Pre-synthesize the Parent/Teacher Report
      try {
        const res = await fetch('/api/story/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            setup: completedSession.setup,
            interactions: completedSession.interactions,
            starsEarned: completedSession.starsEarned,
            presetId: selectedPresetId,
          }),
        });
        const rep = await res.json();
        setReport(rep);
      } catch (err) {
        console.error('Failed to generate report:', err);
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
          presetId: selectedPresetId,
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
      const ch = session.chapters[session.currentChapterIndex];
      if (!ch) return;
      const text = `${ch.title}. ${ch.storyText.join(' ')}`;
      setIsSpeaking(true);
      StorySpeaker.speak(text, () => setIsSpeaking(false));
    }
  };

  const handleRestart = () => {
    clearActiveSession();
    const defaultPreset = CURRICULUM_PRESETS[0];
    setSetup(defaultPreset.setup);
    setSelectedPresetId(defaultPreset.id);
    setSession(createInitialSession(defaultPreset.setup, defaultPreset.chapters));
    setReport(null);
    setSuccessFeedback(null);
    setCurrentPortal('parent');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Visual & Conceptual Bridge: Shared Navbar */}
      <Navbar
        currentPortal={currentPortal}
        onSelectPortal={setCurrentPortal}
        childName={session?.setup.childName}
        starsEarned={session?.starsEarned || 0}
        hasReportData={Boolean(report || (session?.interactions && session.interactions.length > 0))}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleNavbarSpeech}
      />

      <main className="flex-1">
        {currentPortal === 'parent' && (
          <ParentPortal
            setup={setup}
            onChangeSetup={setSetup}
            onSelectPreset={handleSelectPreset}
            selectedPresetId={selectedPresetId}
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
            <div className="max-w-md mx-auto my-16 text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <p className="text-slate-700 font-bold mb-4">
                No active learning report yet.
              </p>
              <p className="text-xs text-slate-500 mb-6">
                Complete a child adventure quest to generate an evidence-based diagnostic report!
              </p>
              <button
                onClick={() => setCurrentPortal('child')}
                className="px-6 py-2.5 rounded-xl bg-sky-600 text-white font-extrabold text-sm shadow-sm"
              >
                Go to Child Quest
              </button>
            </div>
          )
        )}
      </main>

      {/* Accessible, Minimal Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">StoryQuest AI</span>
            <span>—</span>
            <span>Teach any concept through an adaptive adventure</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by Gemini & Adaptive Pedagogy</span>
            <span>•</span>
            <span>Cloud Run Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
