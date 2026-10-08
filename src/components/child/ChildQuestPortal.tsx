'use client';

import React, { useState } from 'react';
import { QuestSession } from '@/lib/types/quest';
import { ChildWelcomeScreen } from './ChildWelcomeScreen';
import { StoryBookScene } from './StoryBookScene';
import { CheckpointView } from './CheckpointView';
import { TryAgainDifferentlyView } from './TryAgainDifferentlyView';
import { QuestCelebration } from './QuestCelebration';
import { QuestMapHeader } from './QuestMapHeader';
import { ArrowRight, Sparkles } from 'lucide-react';
import { StorySpeaker } from '@/lib/utils/speech';

interface ChildQuestPortalProps {
  session: QuestSession;
  onStartAdventure: () => void;
  onSubmitAnswer: (response: string) => void;
  onRetrySubmit: (response: string) => void;
  onContinueToNextChapter: () => void;
  isLoading: boolean;
  successFeedback: string | null;
  onViewReport: () => void;
  onRestart: () => void;
}

export const ChildQuestPortal: React.FC<ChildQuestPortalProps> = ({
  session,
  onStartAdventure,
  onSubmitAnswer,
  onRetrySubmit,
  onContinueToNextChapter,
  isLoading,
  successFeedback,
  onViewReport,
  onRestart,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentChapter = session.chapters[session.currentChapterIndex];

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      StorySpeaker.stop();
      setIsSpeaking(false);
    } else {
      if (!currentChapter) return;
      const textToRead = `${currentChapter.title}. ${currentChapter.narrativeParagraphs.join(' ')}. ${currentChapter.kikiDialogue || ''}`;
      setIsSpeaking(true);
      StorySpeaker.speak(textToRead, () => setIsSpeaking(false));
    }
  };

  // Screen 1: Welcome Screen
  if (session.status === 'welcome') {
    return (
      <ChildWelcomeScreen
        childName={session.setup.childName}
        topic={session.setup.topic}
        companionType={session.setup.companionType}
        storyWorld={session.setup.storyWorld}
        onStartAdventure={onStartAdventure}
      />
    );
  }

  // Completion Screen
  if (session.status === 'completed') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <QuestCelebration
          childName={session.setup.childName}
          topic={session.setup.topic}
          starsEarned={session.starsEarned}
          totalChapters={session.chapters.length}
          onViewReport={onViewReport}
          onRestart={onRestart}
        />
      </div>
    );
  }

  if (!currentChapter) {
    return (
      <div className="max-w-md mx-auto my-12 text-center p-8 bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-600 font-medium">No chapter loaded yet.</p>
        <button
          onClick={onRestart}
          className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-amber-950 font-bold text-sm"
        >
          Return to Studio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 animate-fadeIn">
      {/* Visual Adventure Map Header */}
      <QuestMapHeader
        chapters={session.chapters}
        currentIndex={session.currentChapterIndex}
        childName={session.setup.childName}
        topic={session.setup.topic}
        starsEarned={session.starsEarned}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
      />

      {/* Interactive Storybook Scene (KIKI diorama + narration) */}
      <StoryBookScene
        chapter={currentChapter}
        companionType={session.setup.companionType}
        storyWorld={session.setup.storyWorld}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
      />

      {/* Success Feedback Banner with Star Celebration */}
      {successFeedback && (
        <div className="mb-6 p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-md animate-fadeIn">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-xl shadow-sm">
              ⭐
            </span>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md">
                KIKI Discovery Star Awarded!
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                {successFeedback}
              </h4>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={onContinueToNextChapter}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-400/20 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <span>Continue the Adventure</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

      {/* Try Again, Differently (Adaptive Scaffolding when struggling) */}
      {session.status === 'scaffolding' && session.activeScaffolding && !successFeedback && (
        <TryAgainDifferentlyView
          scaffolding={session.activeScaffolding}
          onRetrySubmit={onRetrySubmit}
          isLoading={isLoading}
        />
      )}

      {/* Interactive Checkpoint (Understanding Check) */}
      {session.status !== 'scaffolding' && !successFeedback && (
        <CheckpointView
          checkpoint={currentChapter.checkpoint}
          onSubmitAnswer={onSubmitAnswer}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
