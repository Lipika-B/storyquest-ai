'use client';

import React from 'react';
import { SetupForm } from './SetupForm';
import { CurriculumPresets } from './CurriculumPresets';
import { ParentSetup, QuestSession } from '@/lib/types/quest';
import { CurriculumPreset } from '@/lib/ai/mockData';
import { Compass, Sparkles, BookOpen, BarChart3, ArrowRight, ShieldCheck } from 'lucide-react';

interface ParentPortalProps {
  setup: ParentSetup;
  onChangeSetup: (newSetup: ParentSetup) => void;
  onSelectPreset: (preset: CurriculumPreset) => void;
  selectedPresetId?: string;
  onGenerateQuest: () => void;
  isLoading: boolean;
  activeSession: QuestSession | null;
  onJumpToQuest: () => void;
  onViewReport: () => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  setup,
  onChangeSetup,
  onSelectPreset,
  selectedPresetId,
  onGenerateQuest,
  isLoading,
  activeSession,
  onJumpToQuest,
  onViewReport,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Parent & Teacher Learning Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Teach any topic through a story <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
            a child won’t want to stop reading.
          </span>
        </h1>
        <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
          Personalize an adventure, see how the lesson dynamically adapts when the child struggles, and review evidence-based learning insights afterwards.
        </p>
      </div>

      {/* Active Session Quick-Resume Pill */}
      {activeSession && (
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{activeSession.chapters[activeSession.currentChapterIndex]?.badgeEmoji || '⭐'}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  Active Adventure In Progress
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  Chapter {activeSession.currentChapterIndex + 1} of {activeSession.chapters.length}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-900">
                {activeSession.setup.childName}’s Quest: {activeSession.setup.topic}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onJumpToQuest}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span>Resume Child Quest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            {activeSession.interactions.length > 0 && (
              <button
                onClick={onViewReport}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-amber-300 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>View Report</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 1-Click Curriculum Presets */}
      <CurriculumPresets
        onSelectPreset={onSelectPreset}
        selectedPresetId={selectedPresetId}
      />

      {/* Detailed Setup Form */}
      <SetupForm
        setup={setup}
        onChangeSetup={onChangeSetup}
        onSubmit={onGenerateQuest}
        isLoading={isLoading}
      />

      {/* Trust & Methodology Footnote */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-500">
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span><strong>No sterile quizzes:</strong> Understanding is verified inside the story context.</span>
        </div>
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
          <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <span><strong>'Try Again, Differently':</strong> Mistakes trigger fresh analogies, never a "Wrong" mark.</span>
        </div>
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
          <BarChart3 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
          <span><strong>Evidence-based reporting:</strong> Verbatim quotes and concrete home activities.</span>
        </div>
      </div>
    </div>
  );
};
