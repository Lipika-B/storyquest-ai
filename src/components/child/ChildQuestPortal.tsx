'use client';

import React, { useState } from 'react';
import { AdventureSession } from '@/lib/types/quest';
import { ChildWelcomeScreen } from './ChildWelcomeScreen';
import { PictureBookStage } from './PictureBookStage';
import { AdventureMapNav } from './AdventureMapNav';
import { QuestCelebration } from './QuestCelebration';
import { StorySpeaker } from '@/lib/utils/speech';

interface ChildQuestPortalProps {
  session: AdventureSession;
  onStartAdventure: () => void;
  onSubmitAnswer: (response: string) => void;
  onRetrySubmit: (response: string) => void;
  onContinueToNextChapter: () => void; // alias for continue next level
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

  // Safety fallback for levels array
  const levels = session.levels || session.chapters || [];
  const currentIndex = session.currentLevelIndex ?? session.currentChapterIndex ?? 0;
  const currentLevel = levels[currentIndex];

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      StorySpeaker.stop();
      setIsSpeaking(false);
    } else {
      if (!currentLevel) return;
      const textToRead = `${currentLevel.title}. ${currentLevel.shortNarration.join(' ')}. ${currentLevel.kikiDialogue || ''} ${currentLevel.characterDialogue || ''}`;
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

  // Screen 2: Completion Grand Celebration Screen
  if (session.status === 'completed') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <QuestCelebration
          childName={session.setup.childName}
          topic={session.setup.topic}
          starsEarned={session.starsEarned}
          totalChapters={levels.length || 5}
          onViewReport={onViewReport}
          onRestart={onRestart}
        />
      </div>
    );
  }

  if (!currentLevel) {
    return (
      <div className="max-w-md mx-auto my-12 text-center p-8 bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-600 font-medium">No adventure level loaded yet.</p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-amber-950 font-bold text-sm cursor-pointer"
        >
          Return to Studio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 animate-fadeIn">
      {/* 5-Step Visual Adventure Map */}
      <AdventureMapNav
        levels={levels}
        currentIndex={currentIndex}
        childName={session.setup.childName}
        topic={session.setup.topic}
        starsEarned={session.starsEarned}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
      />

      {/* Primary Picture Book Diorama Stage + In-Scene Interaction */}
      <PictureBookStage
        level={currentLevel}
        companionType={session.setup.companionType}
        onSubmitAnswer={onSubmitAnswer}
        onRetrySubmit={onRetrySubmit}
        onContinue={onContinueToNextChapter}
        isLoading={isLoading}
        successFeedback={successFeedback}
        activeScaffolding={session.status === 'scaffolding' ? session.activeScaffolding : undefined}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
      />
    </div>
  );
};
