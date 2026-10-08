'use client';

import React, { useState } from 'react';
import { playSuccessChime } from '@/lib/utils/audio';
import { Sparkles, Wind, RotateCcw } from 'lucide-react';

interface PushCartGameProps {
  onComplete: () => void;
}

export const PushCartGame: React.FC<PushCartGameProps> = ({ onComplete }) => {
  const [isPushed, setIsPushed] = useState<boolean>(false);
  const [cartDistanceIce, setCartDistanceIce] = useState<number>(0); // percent 0 to 88%
  const [cartDistanceRough, setCartDistanceRough] = useState<number>(0); // percent 0 to 28%
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handlePush = () => {
    if (isPushed) return;
    playSuccessChime();
    setIsPushed(true);

    // Animate cart on ice gliding far, and cart on rough track stopping early
    let curIce = 0;
    let curRough = 0;

    const interval = setInterval(() => {
      curIce = Math.min(88, curIce + 4);
      curRough = Math.min(28, curRough + 2);

      setCartDistanceIce(curIce);
      setCartDistanceRough(curRough);

      if (curIce >= 88) {
        clearInterval(interval);
        setIsCompleted(true);
        onComplete();
      }
    }, 50);
  };

  const handleReset = () => {
    setIsPushed(false);
    setCartDistanceIce(0);
    setCartDistanceRough(0);
  };

  return (
    <div className="bg-gradient-to-b from-sky-50 to-indigo-50 border-2 border-sky-300 rounded-3xl p-5 sm:p-7 shadow-lg my-4 text-slate-900 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wind className="w-6 h-6 text-sky-600" />
          <div>
            <h4 className="text-base sm:text-lg font-black text-sky-950">
              Mini-Game: Push the Cart on Ice vs. Rough Track!
            </h4>
            <p className="text-xs text-sky-800 font-bold">
              Give both carts the exact same push! Watch which one glides farther and why!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="p-2 rounded-xl bg-white hover:bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold transition-all"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Physics Tracks */}
      <div className="space-y-4 bg-white/95 border-2 border-sky-200 rounded-2xl p-5">
        {/* Track 1: Slick Ice */}
        <div>
          <div className="flex items-center justify-between text-xs font-black text-sky-950 mb-1.5">
            <span className="flex items-center gap-1.5">
              <span>🧊 Track A: Ultra-Slick Ice</span>
              <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">Very Low Friction</span>
            </span>
            <span className="font-mono text-sky-700">{Math.round((cartDistanceIce / 88) * 100)}m</span>
          </div>
          <div className="relative h-14 bg-gradient-to-r from-sky-100 via-cyan-100 to-sky-200 rounded-xl border border-sky-300 overflow-hidden flex items-center px-3">
            {/* Finish Line Flag */}
            <div className="absolute right-3 top-2 text-xl">🏁</div>

            {/* Cart on Ice */}
            <div
              className="absolute transition-all duration-75 flex items-center"
              style={{ left: `${cartDistanceIce}%` }}
            >
              <div className="text-3xl drop-shadow-sm">🛒</div>
              {isPushed && cartDistanceIce < 85 && (
                <span className="text-xs animate-pulse text-sky-500 font-bold">💨 WHOOSH!</span>
              )}
            </div>
          </div>
        </div>

        {/* Track 2: Rough Gravel & Grass */}
        <div>
          <div className="flex items-center justify-between text-xs font-black text-amber-950 mb-1.5">
            <span className="flex items-center gap-1.5">
              <span>🌿 Track B: Bumpy Gravel & Grass</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">High Friction Resistance</span>
            </span>
            <span className="font-mono text-amber-700">{Math.round((cartDistanceRough / 88) * 100)}m</span>
          </div>
          <div className="relative h-14 bg-gradient-to-r from-amber-100 via-stone-100 to-emerald-100 rounded-xl border border-amber-300 overflow-hidden flex items-center px-3">
            {/* Finish Line Flag */}
            <div className="absolute right-3 top-2 text-xl opacity-40">🏁</div>

            {/* Cart on Rough Track */}
            <div
              className="absolute transition-all duration-75 flex items-center"
              style={{ left: `${cartDistanceRough}%` }}
            >
              <div className="text-3xl drop-shadow-sm">🛒</div>
              {isPushed && cartDistanceRough >= 28 && (
                <span className="text-xs text-rose-600 font-black ml-1 bg-white px-1.5 py-0.5 rounded border border-rose-200">
                  Stopped! 🛑 Friction pushed back!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Push Action Controls */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="p-2.5 rounded-xl bg-sky-100 text-sky-950 text-xs font-bold">
          💡 <strong>Discovery:</strong> Friction is the rubbing force that resists sliding motion!
        </div>

        <button
          type="button"
          onClick={handlePush}
          disabled={isPushed}
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-sm shadow-md flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <Wind className="w-4 h-4" />
          <span>{isPushed ? 'Rolling...' : 'PUSH BOTH CARTS! 💨'}</span>
        </button>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="mt-4 p-3 rounded-2xl bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center justify-between gap-2 font-black text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Newton Champion! Smooth ice glides far because low friction doesn't stop it!</span>
          </div>
          <span className="px-2.5 py-1 bg-emerald-200 rounded-lg text-emerald-900">
            Force Star Earned! ⭐
          </span>
        </div>
      )}
    </div>
  );
};
