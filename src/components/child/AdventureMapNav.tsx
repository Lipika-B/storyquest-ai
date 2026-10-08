'use client';

import React from 'react';
import { StoryLevel } from '@/lib/types/quest';
import { Volume2, VolumeX, CheckCircle2, Lock, Sparkles } from 'lucide-react';

interface AdventureMapNavProps {
  levels: StoryLevel[];
  currentIndex: number;
  childName: string;
  topic: string;
  starsEarned: number;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export const AdventureMapNav: React.FC<AdventureMapNavProps> = ({
  levels,
  currentIndex,
  childName,
  topic,
  starsEarned,
  isSpeaking,
  onToggleSpeech,
}) => {
  const phaseIcons: Record<string, string> = {
    discover: '🌟',
    explore: '🔎',
    solve: '🧩',
    teach: '💬',
    master: '🏆',
  };

  return (
    <nav aria-label="Adventure Progress Map" className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-4 sm:p-6 mb-6 shadow-xl relative overflow-hidden border border-amber-300/20">
      {/* Background starlight flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar: Quest Title, Audio Narrator & Star Counter */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              KIKI Adventure Quest
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white mt-0.5 truncate max-w-md sm:max-w-xl">
            {childName}’s Quest: {topic}
          </h1>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          {/* Read Aloud button */}
          <button
            type="button"
            onClick={onToggleSpeech}
            className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
            }`}
            title="KIKI reads story aloud"
            aria-label="KIKI reads story aloud"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
            <span>{isSpeaking ? 'Pause Audio' : 'KIKI Read to Me'}</span>
          </button>

          {/* Stars Earned */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-black shadow-inner">
            <span className="text-sm">⭐</span>
            <span>{starsEarned} / {levels.length || 5} Stars</span>
          </div>
        </div>
      </div>

      {/* 5-Step Visual Progression Trail */}
      <div className="relative z-10">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
          <span>Adventure Map</span>
          <span>Level {currentIndex + 1} of {levels.length || 5}</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
          {levels.map((lvl, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isLocked = idx > currentIndex;
            const icon = phaseIcons[lvl.phase] || lvl.sceneEmoji || '🌟';

            return (
              <div
                key={lvl.levelNumber || idx}
                className={`relative rounded-2xl p-2 sm:p-3 text-center transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-b from-amber-400/25 to-amber-500/10 border-2 border-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40 scale-[1.02]'
                    : isCompleted
                    ? 'bg-emerald-950/40 border border-emerald-400/50 text-emerald-200'
                    : 'bg-white/5 border border-white/10 text-white/40'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-base sm:text-xl">{icon}</span>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 hidden sm:inline" />
                  )}
                  {isLocked && (
                    <Lock className="w-3 h-3 text-white/30 hidden sm:inline" />
                  )}
                </div>

                <div className="text-[10px] sm:text-xs font-black truncate text-white">
                  {lvl.phaseLabel || `Level ${idx + 1}`}
                </div>

                {isCurrent && (
                  <span className="inline-block mt-1 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-xs">
                    Current
                  </span>
                )}
                {isCompleted && (
                  <span className="inline-block mt-1 text-[9px] font-black text-amber-300">
                    ⭐ Done
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
