'use client';

import React, { useState } from 'react';
import { Checkpoint } from '@/lib/types/quest';
import { KikiCharacter } from '../kiki/KikiCharacter';
import { MessageSquare, Send, HelpCircle, Check, ArrowRight, Sparkles } from 'lucide-react';

interface CheckpointViewProps {
  checkpoint: Checkpoint;
  onSubmitAnswer: (response: string) => void;
  isLoading: boolean;
}

export const CheckpointView: React.FC<CheckpointViewProps> = ({
  checkpoint,
  onSubmitAnswer,
  isLoading,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [ownWordsText, setOwnWordsText] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkpoint.type === 'own_words') {
      if (!ownWordsText.trim()) return;
      onSubmitAnswer(ownWordsText.trim());
    } else {
      if (!selectedOption) return;
      onSubmitAnswer(selectedOption);
    }
  };

  return (
    <section aria-labelledby="checkpoint-title" className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-md mb-6 animate-fadeIn">
      {/* KIKI Conversation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-100 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <KikiCharacter expression={checkpoint.type === 'own_words' ? 'curious' : 'thinking'} size="sm" />
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
              KIKI Learning Moment
            </span>
            <h3 id="checkpoint-title" className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {checkpoint.prompt}
            </h3>
          </div>
        </div>

        {checkpoint.scaffoldingHint && (
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/70 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-all cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{showHint ? 'Hide Clue' : 'Need a Clue?'}</span>
          </button>
        )}
      </div>

      {showHint && (
        <div className="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 font-semibold animate-fadeIn flex items-center gap-2">
          <span className="text-lg">💡</span>
          <span><strong>KIKI’s Secret Clue:</strong> {checkpoint.scaffoldingHint}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Core Checkpoint Type: Explain It in Your Own Words */}
        {checkpoint.type === 'own_words' ? (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200">
              <label htmlFor="ownWords" className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                <span>Tell KIKI what you think:</span>
              </label>

              <textarea
                id="ownWords"
                rows={3}
                value={ownWordsText}
                onChange={(e) => setOwnWordsText(e.target.value)}
                placeholder="Tell KIKI how you figured this out... (Don't worry about spelling or grammar!)"
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-white text-slate-900 text-base font-medium focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all resize-none placeholder:text-slate-400"
                required
              />

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                <span className="text-emerald-700">✨ KIKI cares about your ideas, not spelling!</span>
                <span>{ownWordsText.length} characters</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !ownWordsText.trim()}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-base shadow-md shadow-amber-400/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-amber-950/30 border-t-amber-950 rounded-full animate-spin" />
                  <span>KIKI is listening to your idea...</span>
                </>
              ) : (
                <>
                  <span>Tell KIKI 💬</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        ) : (
          /* Choice or Prediction */
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2.5">
              {(checkpoint.options || []).map((option, idx) => {
                const isSelected = selectedOption === option;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedOption(option)}
                    className={`w-full p-4 rounded-2xl text-left border-2 text-sm sm:text-base font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-amber-400 bg-amber-50/80 text-amber-950 shadow-sm ring-2 ring-amber-300/60'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-amber-300 hover:bg-white'
                    }`}
                  >
                    <span>{option}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 ${
                      isSelected ? 'border-amber-500 bg-amber-500 text-white' : 'border-slate-300'
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
                    <span>Checking with KIKI...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Continue Adventure</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
};
