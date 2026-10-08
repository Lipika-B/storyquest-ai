'use client';

import React, { useState } from 'react';
import { AdventureSession, ParentSetup } from '@/lib/types/quest';
import { KikisWorld, WorldLocation } from './KikisWorld';
import { AdventureIntro } from './AdventureIntro';
import { PictureBookStage } from './PictureBookStage';
import { AdventureMapNav } from './AdventureMapNav';
import { QuestCelebration } from './QuestCelebration';
import { StorySpeaker } from '@/lib/utils/speech';

interface ChildQuestPortalProps {
  session: AdventureSession;
  onSelectLocation: (loc: WorldLocation) => void;
  onCustomTopicSubmit: (topic: string, goal?: string) => void;
  onStartLevel1: () => void;
  onBackToWorld: () => void;
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
  onSelectLocation,
  onCustomTopicSubmit,
  onStartLevel1,
  onBackToWorld,
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
  const currentLevel = levels[currentIndex] || levels[0];

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

  // 1. CHILD HOME SCREEN: 🌈 KIKI'S WORLD (The illustrated cartoon adventure map)
  if (session.status === 'welcome') {
    return (
      <KikisWorld
        onSelectLocation={onSelectLocation}
        onCustomTopicSubmit={onCustomTopicSubmit}
        isLoading={isLoading}
      />
    );
  }

  // 2. CINEMATIC MINI-INTRODUCTION SCREEN
  if (session.status === 'intro') {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
        <AdventureIntro
          setup={session.setup}
          firstLevel={levels[0] || currentLevel}
          onStartLevel1={onStartLevel1}
          onBackToWorld={onBackToWorld}
        />
      </div>
    );
  }

  // 3. COMPLETION GRAND CELEBRATION SCREEN
  if (session.status === 'completed') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <QuestCelebration
          childName={session.setup.childName}
          topic={session.setup.topic}
          starsEarned={session.starsEarned}
          totalChapters={levels.length || 5}
          onViewReport={onViewReport}
          onRestart={onBackToWorld}
        />
      </div>
    );
  }

  // 4. LEVEL-BY-LEVEL PICTURE BOOK ADVENTURE (Levels 1 to 5)
  if (!currentLevel) {
    return (
      <div className="max-w-md mx-auto my-12 text-center p-8 bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-600 font-medium">No adventure level loaded yet.</p>
        <button
          type="button"
          onClick={onBackToWorld}
          className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-amber-950 font-bold text-sm cursor-pointer"
        >
          Return to KIKI’s World
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

      {/* Primary Picture Book Diorama Stage + Interactive In-Scene Elements */}
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
