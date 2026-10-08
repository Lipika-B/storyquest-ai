'use client';

import React, { useState } from 'react';
import { AdaptiveScaffolding } from '@/lib/types/quest';
import { Sparkles, RefreshCw, Heart, ArrowRight, Check } from 'lucide-react';

interface TryAgainDifferentlyProps {
  scaffolding: AdaptiveScaffolding;
  onRetrySubmit: (response: string) => void;
  isLoading: boolean;
}

export const TryAgainDifferentlyView: React.FC<TryAgainDifferentlyProps> = ({
  scaffolding,
  onRetrySubmit,
  isLoading,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;
    onRetrySubmit(selectedOption);
  };

  return (
    <section aria-labelledby="adaptive-title" className="bg-gradient-to-b from-amber-50 to-orange-50/50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm mb-6 animate-fadeIn">
      {/* Supportive Header (Never says 'Wrong') */}
      <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-xl font-black shadow-sm">
          💡
        </span>
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full border border-amber-300">
            Try Again, Differently
          </span>
          <h3 id="adaptive-title" className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            {scaffolding.encouragingNote}
          </h3>
        </div>
      </div>

      {/* Character Guidance speech bubble */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200 shadow-xs mb-5">
        <p className="text-sm sm:text-base font-bold text-amber-950 mb-2 italic">
          {scaffolding.characterGuidance}
        </p>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
          {scaffolding.alternateAnalogy}
        </p>

        {scaffolding.realWorldConnection && (
          <div className="mt-3 pt-3 border-t border-amber-100 flex items-center gap-2 text-xs font-semibold text-amber-900">
            <span className="text-sm">🌟</span>
            <span><strong>Everyday Connection:</strong> {scaffolding.realWorldConnection}</span>
          </div>
        )}
      </div>

      {/* Scaffolded Follow-up Mini-Challenge */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-sm sm:text-base font-extrabold text-slate-900">
          {scaffolding.followUpPrompt}
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {(scaffolding.options || ['The pieces work together in equal amounts', 'It changes every time']).map((option, idx) => {
            const isSelected = selectedOption === option;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedOption(option)}
                className={`w-full p-4 rounded-2xl text-left border-2 text-sm sm:text-base font-bold transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-white text-amber-950 shadow-sm ring-2 ring-amber-300/60'
                    : 'border-amber-200/80 bg-white/80 text-slate-800 hover:border-amber-300 hover:bg-white'
                }`}
              >
                <span>{option}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 ${
                  isSelected ? 'border-amber-500 bg-amber-500 text-white' : 'border-amber-300'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !selectedOption}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-amber-950 font-black text-base shadow-md shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-amber-950/30 border-t-amber-950 rounded-full animate-spin" />
                <span>Checking your discovery...</span>
              </>
            ) : (
              <>
                <span>I See It Now! Continue Quest</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};
