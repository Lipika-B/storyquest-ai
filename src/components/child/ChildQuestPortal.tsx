'use client';

import React, { useState } from 'react';
import { QuestSession } from '@/lib/types/quest';
import { QuestMapHeader } from './QuestMapHeader';
import { StoryChapterView } from './StoryChapterView';
import { CheckpointView } from './CheckpointView';
import { TryAgainDifferentlyView } from './TryAgainDifferentlyView';
import { QuestCelebration } from './QuestCelebration';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { StorySpeaker } from '@/lib/utils/speech';

interface ChildQuestPortalProps {
  session: QuestSession;
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
      const textToRead = `${currentChapter.title}. ${currentChapter.storyText.join(' ')}. ${currentChapter.checkpoint.characterDialogue || ''}`;
      setIsSpeaking(true);
      StorySpeaker.speak(textToRead, () => setIsSpeaking(false));
    }
  };

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
          className="mt-4 px-6 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-sm"
        >
          Return to Studio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Adventure Tracker & Sound Bar */}
      <QuestMapHeader
        chapters={session.chapters}
        currentIndex={session.currentChapterIndex}
        childName={session.setup.childName}
        topic={session.setup.topic}
        starsEarned={session.starsEarned}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
      />

      {/* Chapter Story Reader */}
      <StoryChapterView chapter={currentChapter} />

      {/* Success Feedback Banner (After passing checkpoint) */}
      {successFeedback && (
        <div className="mb-6 p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black">
              ⭐
            </span>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                Star Badge Awarded!
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                {successFeedback}
              </h4>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900 mt-1">
            Your understanding carried the story forward!
          </p>
          <div className="mt-4">
            <button
              onClick={onContinueToNextChapter}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <span>Continue to Next Chapter</span>
              <ArrowRight className="w-4 h-4" />
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
