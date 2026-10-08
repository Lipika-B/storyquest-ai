'use client';

import React from 'react';
import { StoryChapter } from '@/lib/types/quest';
import { Sparkles, Volume2, VolumeX, CheckCircle2, Circle } from 'lucide-react';

interface QuestMapHeaderProps {
  chapters: StoryChapter[];
  currentIndex: number;
  childName: string;
  topic: string;
  starsEarned: number;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export const QuestMapHeader: React.FC<QuestMapHeaderProps> = ({
  chapters,
  currentIndex,
  childName,
  topic,
  starsEarned,
  isSpeaking,
  onToggleSpeech,
}) => {
  return (
    <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 mb-6 shadow-md relative overflow-hidden">
      {/* Decorative stars / background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-300">
              Active Quest Adventure
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
            {childName}’s Quest: {topic}
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Read Aloud button */}
          <button
            onClick={onToggleSpeech}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
            <span>{isSpeaking ? 'Pause Audio' : 'Listen Aloud'}</span>
          </button>

          {/* Stars Earned */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-black shadow-inner">
            <span className="text-sm animate-star">⭐</span>
            <span>{starsEarned} / {chapters.length} Stars</span>
          </div>
        </div>
      </div>

      {/* Quest Milestones Progress Tracker */}
      <div className="relative z-10">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center justify-between">
          <span>Quest Journey Progress</span>
          <span>Chapter {currentIndex + 1} of {chapters.length}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {chapters.map((chapter, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div
                key={chapter.chapterNumber}
                className={`rounded-2xl p-3 border transition-all ${
                  isCurrent
                    ? 'bg-white/15 border-amber-400/80 shadow-md ring-2 ring-amber-400/40'
                    : isCompleted
                    ? 'bg-white/5 border-emerald-400/40 text-emerald-200'
                    : 'bg-white/5 border-white/10 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base sm:text-lg">{chapter.badgeEmoji}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">
                      Now
                    </span>
                  ) : (
                    <Circle className="w-4 h-4 text-white/30" />
                  )}
                </div>
                <div className="font-extrabold text-xs sm:text-sm truncate text-white">
                  Ch. {chapter.chapterNumber}: {chapter.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
