'use client';

import React, { useState } from 'react';
import { playSuccessChime } from '@/lib/utils/audio';
import { Sparkles, Check, RotateCcw } from 'lucide-react';

interface PizzaCutterGameProps {
  onComplete: () => void;
}

export const PizzaCutterGame: React.FC<PizzaCutterGameProps> = ({ onComplete }) => {
  // Slices: 1, 2, 3, 4, 8
  const [slices, setSlices] = useState<number>(2);
  const [selectedSliceIdx, setSelectedSliceIdx] = useState<number | null>(0);
  const [hasExploredThirds, setHasExploredThirds] = useState<boolean>(false);
  const [hasExploredFourths, setHasExploredFourths] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectSlices = (num: number) => {
    playSuccessChime();
    setSlices(num);
    setSelectedSliceIdx(0);
    if (num === 3) setHasExploredThirds(true);
    if (num === 4) setHasExploredFourths(true);

    if ((num === 3 && hasExploredFourths) || (num === 4 && hasExploredThirds) || (num >= 3)) {
      setIsCompleted(true);
      onComplete();
    }
  };

  // Generate SVG slice paths for an N-slice pizza
  const radius = 90;
  const cx = 110;
  const cy = 110;

  const renderSlices = () => {
    if (slices === 1) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          className="fill-amber-400 stroke-amber-600 stroke-[4] cursor-pointer hover:opacity-95 transition-all"
          onClick={() => setSelectedSliceIdx(0)}
        />
      );
    }

    const paths = [];
    const angleStep = (2 * Math.PI) / slices;

    for (let i = 0; i < slices; i++) {
      const startAngle = i * angleStep - Math.PI / 2;
      const endAngle = (i + 1) * angleStep - Math.PI / 2;

      const x1 = cx + radius * Math.cos(startAngle);
      const y1 = cy + radius * Math.sin(startAngle);
      const x2 = cx + radius * Math.cos(endAngle);
      const y2 = cy + radius * Math.sin(endAngle);

      const largeArcFlag = angleStep > Math.PI ? 1 : 0;
      const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      const isSelected = selectedSliceIdx === i;

      paths.push(
        <path
          key={i}
          d={d}
          onClick={() => setSelectedSliceIdx(i)}
          className={`cursor-pointer transition-all ${
            isSelected
              ? 'fill-amber-300 stroke-amber-600 stroke-[3] filter drop-shadow-md'
              : 'fill-amber-400/90 hover:fill-amber-300 stroke-amber-600/80 stroke-[2]'
          }`}
        />
      );
    }
    return paths;
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-7 shadow-lg my-4 text-slate-900 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍕</span>
          <div>
            <h4 className="text-base sm:text-lg font-black text-amber-950">
              Mini-Game: Slice the Pizza & Compare Fractions!
            </h4>
            <p className="text-xs text-amber-800 font-bold">
              Choose how many equal slices to cut. Notice what happens to each slice's size!
            </p>
          </div>
        </div>
      </div>

      {/* Pizza Diorama & Comparison Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white/95 border-2 border-amber-200 rounded-2xl p-5">
        {/* Left: Interactive Pizza Plate */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-[220px] h-[220px] rounded-full bg-amber-100/70 border-4 border-amber-300 flex items-center justify-center p-2 shadow-inner">
            <svg width="220" height="220" viewBox="0 0 220 220">
              {/* Outer Pizza Crust */}
              <circle cx={cx} cy={cy} r={radius + 8} className="fill-amber-600/90" />
              {/* Sauce Base */}
              <circle cx={cx} cy={cy} r={radius + 2} className="fill-rose-500/80" />
              {/* Slices */}
              {renderSlices()}
              {/* Decorative Pepperonis & Herbs */}
              <circle cx={cx - 35} cy={cy - 25} r="9" className="fill-rose-700 pointer-events-none" />
              <circle cx={cx + 35} cy={cy - 20} r="9" className="fill-rose-700 pointer-events-none" />
              <circle cx={cx - 15} cy={cy + 40} r="9" className="fill-rose-700 pointer-events-none" />
              <circle cx={cx + 30} cy={cy + 35} r="9" className="fill-rose-700 pointer-events-none" />
              <circle cx={cx} cy={cy} r="6" className="fill-amber-200 pointer-events-none" />
            </svg>
          </div>
          <span className="mt-2 text-[11px] font-bold text-amber-900 bg-amber-100 px-3 py-0.5 rounded-full">
            👆 Tap any slice to inspect!
          </span>
        </div>

        {/* Right: Math Insight Card */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-amber-100/80 border border-amber-300 text-center">
            <span className="text-xs uppercase font-black tracking-wider text-amber-900 block mb-1">
              One Slice Fraction
            </span>
            <div className="text-3xl font-black text-amber-950 flex items-center justify-center gap-1.5">
              <span>1</span>
              <span>/</span>
              <span className="text-orange-600 underline decoration-wavy decoration-2">{slices}</span>
            </div>
            <p className="text-xs font-bold text-amber-800 mt-1">
              {slices === 1 && '1 Whole Pizza! No sharing yet!'}
              {slices === 2 && 'Each friend gets 1/2 (One Half)! Very big slice!'}
              {slices === 3 && 'Each friend gets 1/3 (One Third)! Bigger than 1/4!'}
              {slices === 4 && 'Each friend gets 1/4 (One Fourth)! Smaller than 1/3!'}
              {slices === 8 && 'Each friend gets 1/8 (One Eighth)! Lots of tiny bites!'}
            </p>
          </div>

          {/* Big Denominator Secret Callout */}
          <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-950">
            💡 <strong>The Secret Rule:</strong> The bigger the bottom number (denominator), the <em>smaller</em> each slice gets, because the whole pizza is split into more pieces!
          </div>

          {/* Slicing Controls */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="w-full text-xs font-black text-slate-700 mb-1">Choose Slices:</span>
            {[
              { n: 2, label: '2 Halves (1/2)' },
              { n: 3, label: '3 Thirds (1/3)' },
              { n: 4, label: '4 Fourths (1/4)' },
              { n: 8, label: '8 Eighths (1/8)' },
            ].map(({ n, label }) => (
              <button
                key={n}
                type="button"
                onClick={() => handleSelectSlices(n)}
                className={`px-3 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                  slices === n
                    ? 'bg-amber-500 text-amber-950 border-amber-600 shadow-sm scale-105'
                    : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="mt-4 p-3 rounded-2xl bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center justify-between gap-2 font-black text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Awesome! You discovered why 1/3 is bigger than 1/4!</span>
          </div>
          <span className="px-2.5 py-1 bg-emerald-200 rounded-lg text-emerald-900">
            Concept Unlocked! ⭐
          </span>
        </div>
      )}
    </div>
  );
};
