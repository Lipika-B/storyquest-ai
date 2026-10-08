'use client';

import React, { useState } from 'react';
import { playSuccessChime } from '@/lib/utils/audio';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface ChewFoodGameProps {
  onComplete: () => void;
  targetFood?: string;
}

export const ChewFoodGame: React.FC<ChewFoodGameProps> = ({
  onComplete,
  targetFood = 'banana',
}) => {
  // Stages: 0: whole food, 1: cut into 2 bites, 2: mashed into 4 tiny pieces with saliva, 3: swallowed into tummy churning
  const [chewStage, setChewStage] = useState<number>(0);
  const [chewCount, setChewCount] = useState<number>(0);
  const [isSwallowed, setIsSwallowed] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleChew = () => {
    playSuccessChime();
    const nextCount = chewCount + 1;
    setChewCount(nextCount);

    if (nextCount === 1) {
      setChewStage(1);
    } else if (nextCount === 2) {
      setChewStage(2);
    } else if (nextCount >= 3 && !isSwallowed) {
      setChewStage(3);
    }
  };

  const handleSwallow = () => {
    playSuccessChime();
    setIsSwallowed(true);
    setChewStage(4);
    setTimeout(() => {
      setIsFinished(true);
      onComplete();
    }, 1200);
  };

  const handleReset = () => {
    setChewStage(0);
    setChewCount(0);
    setIsSwallowed(false);
    setIsFinished(false);
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-7 shadow-lg my-4 text-slate-900 animate-fadeIn">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦷</span>
          <div>
            <h4 className="text-base sm:text-lg font-black text-amber-950">
              Mini-Game: Chew & Break Down the Food!
            </h4>
            <p className="text-xs text-amber-800 font-bold">
              Tap the teeth to chew the food into tiny bites so it can slide down safely!
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="p-2 rounded-xl bg-white hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition-all"
          title="Reset Game"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative bg-white/90 border-2 border-amber-200 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center overflow-hidden">
        {/* Esophagus Slide Line */}
        <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-3 bg-dashed border-r-2 border-l-2 border-amber-300/40 pointer-events-none" />

        {/* Stage 0: Whole Food */}
        {chewStage === 0 && (
          <div className="flex flex-col items-center animate-bounce-subtle">
            <span className="text-6xl sm:text-7xl drop-shadow-md">🍌</span>
            <span className="mt-2 text-xs font-black text-slate-700 bg-amber-100 px-3 py-1 rounded-full">
              Whole Solid Banana (Too big to swallow!)
            </span>
          </div>
        )}

        {/* Stage 1: Two Halves */}
        {chewStage === 1 && (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="flex items-center gap-4 text-5xl sm:text-6xl">
              <span className="transform -rotate-12">🍌</span>
              <span className="text-2xl text-amber-500 font-black">CHOMP!</span>
              <span className="transform rotate-12">🍌</span>
            </div>
            <span className="mt-3 text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
              Bite 1: Teeth broke the banana in half!
            </span>
          </div>
        )}

        {/* Stage 2 & 3: Mashed Bites + Saliva */}
        {(chewStage === 2 || chewStage === 3) && (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="flex items-center justify-center gap-3 flex-wrap max-w-xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-200/90 border border-amber-400 flex items-center justify-center text-2xl shadow-sm animate-pulse">
                🍌
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-200/90 border border-amber-400 flex items-center justify-center text-2xl shadow-sm animate-pulse" style={{ animationDelay: '0.2s' }}>
                🍌
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-200/90 border border-amber-400 flex items-center justify-center text-2xl shadow-sm animate-pulse" style={{ animationDelay: '0.4s' }}>
                💧
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-200/90 border border-amber-400 flex items-center justify-center text-2xl shadow-sm animate-pulse" style={{ animationDelay: '0.6s' }}>
                🍌
              </div>
            </div>
            <span className="mt-3 text-xs font-black text-emerald-900 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300">
              ✨ Mashed into soft tiny pieces with saliva! Ready to swallow!
            </span>
          </div>
        )}

        {/* Stage 4: Down the Esophagus into Tummy */}
        {chewStage === 4 && (
          <div className="flex flex-col items-center animate-fadeIn text-center">
            <div className="relative mb-2">
              <span className="text-6xl sm:text-7xl animate-bounce">🥣</span>
              <div className="absolute -top-1 -right-1 text-2xl animate-spin-slow">🫧</div>
              <div className="absolute top-1/2 -left-3 text-xl animate-star">✨</div>
            </div>
            <h5 className="text-sm sm:text-base font-black text-amber-950">
              Slid safely into the tummy!
            </h5>
            <p className="text-xs font-bold text-amber-800 max-w-xs mt-1">
              Stomach juices churn the tiny bits into liquid energy that muscles can absorb!
            </p>
          </div>
        )}
      </div>

      {/* Interactive Control Buttons */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-950">
            Chew Count: <span className="text-sm font-black text-amber-700">{chewCount}</span> / 3
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {chewStage < 3 && (
            <button
              type="button"
              onClick={handleChew}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-sm shadow-md flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer"
            >
              <span>🦷 CHOMP! Chew the Food!</span>
            </button>
          )}

          {chewStage === 3 && !isSwallowed && (
            <button
              type="button"
              onClick={handleSwallow}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-sm shadow-md flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer animate-pulse"
            >
              <span>⬇️ Swallow Down the Slide!</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}

          {isFinished && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-300 font-black text-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Great Job! You explored mechanical digestion!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
