'use client';

import React, { useState } from 'react';
import { AdaptiveScaffolding } from '@/lib/types/quest';
import { KikiCharacter } from '../kiki/KikiCharacter';
import { ArrowRight, Check } from 'lucide-react';

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
    <section aria-labelledby="adaptive-title" className="bg-gradient-to-b from-amber-50 to-orange-50/60 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-md mb-6 animate-fadeIn">
      {/* KIKI Supportive Header (Never says 'Wrong'!) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-amber-200 pb-5 mb-5">
        <KikiCharacter expression="explaining" size="sm" />
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
            Let's Try Differently! 💡
          </span>
          <h3 id="adaptive-title" className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            {scaffolding.encouragingNote}
          </h3>
        </div>
      </div>

      {/* Alternate Real-World Analogy speech bubble */}
      <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs mb-6">
        <p className="text-sm sm:text-base font-bold text-amber-950 mb-2 italic">
          {scaffolding.kikiDialogue}
        </p>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
          {scaffolding.alternateAnalogy}
        </p>

        {scaffolding.realWorldConnection && (
          <div className="mt-3 pt-3 border-t border-amber-100 flex items-center gap-2 text-xs font-bold text-amber-900">
            <span className="text-sm">🌟</span>
            <span><strong>Everyday Clue:</strong> {scaffolding.realWorldConnection}</span>
          </div>
        )}
      </div>

      {/* Guided Follow-up Mini-Challenge */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-sm sm:text-base font-black text-slate-900">
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
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-base shadow-md shadow-amber-400/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-amber-950/30 border-t-amber-950 rounded-full animate-spin" />
                <span>Checking your discovery...</span>
              </>
            ) : (
              <>
                <span>I See It Now! Continue Adventure</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};
