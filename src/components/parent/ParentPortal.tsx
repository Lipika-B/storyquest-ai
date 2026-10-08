'use client';

import React from 'react';
import { SetupForm } from './SetupForm';
import { TopicLibraryPicker } from './TopicLibraryPicker';
import { ParentSetup, QuestSession } from '@/lib/types/quest';
import { TopicPreset } from '@/lib/data/topicLibrary';
import { KikiCharacter } from '../kiki/KikiCharacter';
import { Sparkles, ArrowRight, BarChart3, ShieldCheck, HeartHandshake, Lightbulb } from 'lucide-react';

interface ParentPortalProps {
  setup: ParentSetup;
  onChangeSetup: (newSetup: ParentSetup) => void;
  onSelectTopicPreset: (preset: TopicPreset) => void;
  selectedTopicId?: string;
  onGenerateQuest: () => void;
  isLoading: boolean;
  activeSession: QuestSession | null;
  onJumpToQuest: () => void;
  onViewReport: () => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  setup,
  onChangeSetup,
  onSelectTopicPreset,
  selectedTopicId,
  onGenerateQuest,
  isLoading,
  activeSession,
  onJumpToQuest,
  onViewReport,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Brand Hero with KIKI Companion */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 text-center sm:text-left bg-gradient-to-r from-amber-50 via-sky-50 to-amber-50 border-2 border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-200 text-amber-950 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>KIKI • Little stories. Big discoveries.</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Teach any topic through a story <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              your child won’t want to stop reading.
            </span>
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-700 font-medium">
            Set what your child should learn. KIKI crafts an age-appropriate adventure, checks real understanding, and adapts the lesson if they struggle.
          </p>
        </div>

        {/* KIKI Friendly Mascot */}
        <div className="flex-shrink-0">
          <KikiCharacter expression="happy" size="lg" />
        </div>
      </div>

      {/* Active Session Quick-Resume Pill */}
      {activeSession && (() => {
        const levels = activeSession.levels || activeSession.chapters || [];
        const currentIdx = activeSession.currentLevelIndex ?? activeSession.currentChapterIndex ?? 0;
        const currentLvl = levels[currentIdx];
        return (
          <div className="mb-8 p-4 rounded-2xl bg-amber-100/70 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentLvl?.sceneEmoji || '⭐'}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
                    Active Adventure In Progress
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-950">
                    Level {currentIdx + 1} of {levels.length || 5}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {activeSession.setup.childName}’s Adventure: {activeSession.setup.topic}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onJumpToQuest}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>Enter Adventure with KIKI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {activeSession.interactions && activeSession.interactions.length > 0 && (
                <button
                  type="button"
                  onClick={onViewReport}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-amber-300 text-amber-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>View Report</span>
                </button>
              )}
            </div>
          </div>
        );
      })()}


      {/* 1. Curated KIKI Topic Worlds */}
      <TopicLibraryPicker
        onSelectTopicPreset={onSelectTopicPreset}
        selectedTopicId={selectedTopicId}
      />

      {/* 2. Focused Setup Form */}
      <SetupForm
        setup={setup}
        onChangeSetup={onChangeSetup}
        onSubmit={onGenerateQuest}
        isLoading={isLoading}
      />

      {/* Three Pillars Footnote */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
          <HeartHandshake className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <span><strong>The story is the product:</strong> Real narrative puzzles replace sterile quizzes.</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <span><strong>'Try Again, Differently':</strong> Mistakes trigger fresh analogies—never a "Wrong" mark.</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span><strong>Evidence-based insights:</strong> Verbatim quotes and concrete home activities.</span>
        </div>
      </div>
    </div>
  );
};
