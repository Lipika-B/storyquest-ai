'use client';

import React, { useState } from 'react';
import { Checkpoint } from '@/lib/types/quest';
import { Sparkles, MessageSquare, Send, HelpCircle, Check, ArrowRight } from 'lucide-react';

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
    <section aria-labelledby="checkpoint-title" className="bg-gradient-to-b from-white to-sky-50/40 border-2 border-sky-300/80 rounded-3xl p-6 sm:p-8 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center font-black text-sm shadow-sm">
            ?
          </span>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-sky-700">
              Quest Checkpoint
            </span>
            <h3 id="checkpoint-title" className="text-base sm:text-lg font-black text-slate-900">
              {checkpoint.prompt}
            </h3>
          </div>
        </div>

        {checkpoint.scaffoldingHint && (
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-100/70 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-all cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Clue' : 'Need a Clue?'}</span>
          </button>
        )}
      </div>

      {showHint && (
        <div className="mb-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 font-semibold animate-fadeIn">
          💡 <strong>Companion Clue:</strong> {checkpoint.scaffoldingHint}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Type: Explain It in Your Own Words */}
        {checkpoint.type === 'own_words' ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <label htmlFor="ownWords" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Tell the character in your own words:</span>
                <span className="text-[11px] text-emerald-700 font-semibold normal-case">
                  ✨ Spelling and grammar don’t matter—just share your ideas!
                </span>
              </label>
              <textarea
                id="ownWords"
                rows={3}
                value={ownWordsText}
                onChange={(e) => setOwnWordsText(e.target.value)}
                placeholder="Type your explanation here... How does this work? Why does it happen?"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-base font-medium focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !ownWordsText.trim()}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-base shadow-md shadow-sky-600/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Checking your awesome idea...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Share My Explanation with the Story</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Type: Multiple Choice or Prediction */
          <div className="space-y-3">
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
                        ? 'border-sky-500 bg-sky-50 text-sky-950 shadow-sm ring-2 ring-sky-300/40'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{option}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 ${
                      isSelected ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300'
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
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-base shadow-md shadow-sky-600/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Checking answer...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm My Choice & Continue Quest</span>
                    <ArrowRight className="w-4 h-4" />
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
