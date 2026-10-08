'use client';

import React, { useState } from 'react';
import { playSuccessChime } from '@/lib/utils/audio';
import { Sparkles, Palette, RotateCcw } from 'lucide-react';

interface ColorMixGameProps {
  onComplete: () => void;
}

export const ColorMixGame: React.FC<ColorMixGameProps> = ({ onComplete }) => {
  // Selected primary colors: max 2
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [mixedResult, setMixedResult] = useState<{ name: string; colorHex: string; emoji: string; desc: string } | null>(null);
  const [discoveredColors, setDiscoveredColors] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const PRIMARY_PAINTS = [
    { id: 'red', name: 'Red', hex: '#ef4444', emoji: '🔴' },
    { id: 'yellow', name: 'Yellow', hex: '#eab308', emoji: '🟡' },
    { id: 'blue', name: 'Blue', hex: '#3b82f6', emoji: '🔵' },
  ];

  const handleToggleColor = (id: string) => {
    let next: string[];
    if (selectedColors.includes(id)) {
      next = selectedColors.filter(c => c !== id);
    } else {
      if (selectedColors.length >= 2) {
        next = [selectedColors[1], id];
      } else {
        next = [...selectedColors, id];
      }
    }
    setSelectedColors(next);
    setMixedResult(null);
  };

  const handleMix = () => {
    if (selectedColors.length < 2) return;
    playSuccessChime();

    let res = null;
    if (selectedColors.includes('blue') && selectedColors.includes('yellow')) {
      res = { name: 'Vibrant Green', colorHex: '#22c55e', emoji: '🟢', desc: 'Blue + Yellow makes Green! Like fresh leaves and grass!' };
    } else if (selectedColors.includes('red') && selectedColors.includes('yellow')) {
      res = { name: 'Warm Orange', colorHex: '#f97316', emoji: '🟠', desc: 'Red + Yellow makes Orange! Like pumpkins and glowing sunbeams!' };
    } else if (selectedColors.includes('red') && selectedColors.includes('blue')) {
      res = { name: 'Royal Purple', colorHex: '#a855f7', emoji: '🟣', desc: 'Red + Blue makes Purple! Like grapes and violet wildflowers!' };
    }

    if (res) {
      setMixedResult(res);
      const updatedDiscovered = Array.from(new Set([...discoveredColors, res.name]));
      setDiscoveredColors(updatedDiscovered);

      if (updatedDiscovered.length >= 2 || res.name.includes('Green')) {
        setIsCompleted(true);
        onComplete();
      }
    }
  };

  const handleReset = () => {
    setSelectedColors([]);
    setMixedResult(null);
  };

  return (
    <div className="bg-gradient-to-b from-rose-50 via-amber-50 to-pink-50 border-2 border-rose-300 rounded-3xl p-5 sm:p-7 shadow-lg my-4 text-slate-900 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Palette className="w-6 h-6 text-rose-500" />
          <div>
            <h4 className="text-base sm:text-lg font-black text-rose-950">
              Mini-Game: Mix Primary Colours on the Palette!
            </h4>
            <p className="text-xs text-rose-800 font-bold">
              Tap any two primary paint drops, then swirl them together to create a brand new colour!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="p-2 rounded-xl bg-white hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold transition-all"
          title="Clear"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Palette Stage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center bg-white/95 border-2 border-rose-200 rounded-2xl p-5">
        {/* Left: Primary paint drops */}
        <div>
          <span className="block text-xs font-black uppercase tracking-wider text-rose-900 mb-2">
            1. Select Two Primary Drops:
          </span>
          <div className="flex items-center gap-3">
            {PRIMARY_PAINTS.map(paint => {
              const isSelected = selectedColors.includes(paint.id);
              return (
                <button
                  key={paint.id}
                  type="button"
                  onClick={() => handleToggleColor(paint.id)}
                  className={`flex-1 p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-slate-800 shadow-md ring-4 ring-rose-300 scale-105'
                      : 'border-slate-200 hover:border-slate-400 bg-slate-50'
                  }`}
                  style={{ backgroundColor: isSelected ? `${paint.hex}25` : undefined }}
                >
                  <span className="text-3xl mb-1">{paint.emoji}</span>
                  <span className="text-xs font-black text-slate-800">{paint.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleMix}
              disabled={selectedColors.length !== 2}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-black text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <Palette className="w-4 h-4" />
              <span>🎨 Swirl & Mix Selected Paints!</span>
            </button>
          </div>
        </div>

        {/* Right: Mixing Pool Swirl Result */}
        <div className="flex flex-col items-center justify-center text-center p-4 min-h-[160px] rounded-2xl bg-slate-50 border border-slate-200">
          {mixedResult ? (
            <div className="animate-fadeIn space-y-2">
              <div
                className="w-16 h-16 rounded-full mx-auto shadow-md border-4 border-white flex items-center justify-center text-3xl animate-bounce-subtle"
                style={{ backgroundColor: mixedResult.colorHex }}
              >
                {mixedResult.emoji}
              </div>
              <h5 className="text-base font-black text-slate-900">{mixedResult.name}!</h5>
              <p className="text-xs font-bold text-slate-600 max-w-xs">{mixedResult.desc}</p>
            </div>
          ) : (
            <div className="text-slate-400 space-y-1">
              <span className="text-4xl block animate-pulse">🖌️</span>
              <p className="text-xs font-bold">Select 2 primary paints and hit Swirl & Mix!</p>
            </div>
          )}
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="mt-4 p-3 rounded-2xl bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center justify-between gap-2 font-black text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Artist Triumph! You discovered how primary colors make new secondary colors!</span>
          </div>
          <span className="px-2.5 py-1 bg-emerald-200 rounded-lg text-emerald-900">
            Color Star Awarded! ⭐
          </span>
        </div>
      )}
    </div>
  );
};
