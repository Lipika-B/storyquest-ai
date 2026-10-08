'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playStarEarnedSound } from '@/lib/utils/audio';
import { Trophy, Star, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface QuestCelebrationProps {
  childName: string;
  topic: string;
  starsEarned: number;
  totalChapters: number;
  onViewReport: () => void;
  onRestart: () => void;
}

export const QuestCelebration: React.FC<QuestCelebrationProps> = ({
  childName,
  topic,
  starsEarned,
  totalChapters,
  onViewReport,
  onRestart,
}) => {
  useEffect(() => {
    // Launch celebratory confetti bursts
    playStarEarnedSound();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 350);
    } catch (e) {
      console.debug('Confetti suppressed:', e);
    }
  }, []);

  return (
    <div className="bg-white border-2 border-amber-300 rounded-3xl p-8 sm:p-12 text-center shadow-lg max-w-2xl mx-auto my-8 animate-fadeIn">
      {/* Trophy Badge */}
      <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-white shadow-xl shadow-amber-400/30 mb-6 animate-bounce">
        <Trophy className="w-12 h-12 text-amber-950" />
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-black uppercase tracking-wider mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Quest Complete!</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
        Hooray, {childName}! You did it!
      </h2>

      <p className="mt-2 text-base text-slate-600 max-w-md mx-auto">
        You journeyed through the full adventure and unlocked the secrets of <strong>{topic}</strong>!
      </p>

      {/* Star badges */}
      <div className="my-6 flex items-center justify-center gap-3">
        {Array.from({ length: totalChapters }).map((_, i) => (
          <div
            key={i}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md transition-all ${
              i < starsEarned
                ? 'bg-amber-400 text-amber-950 border-2 border-amber-300 scale-105'
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}
          >
            ⭐
          </div>
        ))}
      </div>

      <p className="text-xs font-bold text-slate-500 mb-8">
        Earned {starsEarned} of {totalChapters} Adventure Stars
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onViewReport}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>View Learning Report with Parent / Teacher</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all cursor-pointer"
        >
          Start a New Quest
        </button>
      </div>
    </div>
  );
};
