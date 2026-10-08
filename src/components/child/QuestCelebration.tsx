'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playStarEarnedSound, playSuccessChime } from '@/lib/utils/audio';
import { KikiCharacter } from '../kiki/KikiCharacter';
import { Trophy, Star, ArrowRight, Sparkles, Heart, Lightbulb, Compass, Award } from 'lucide-react';

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
    playSuccessChime();
    setTimeout(() => playStarEarnedSound(), 300);
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
        });
      }, 350);
    } catch (e) {
      console.debug('Confetti suppressed:', e);
    }
  }, []);

  const badges = [
    { emoji: '🌟', title: 'Curious Explorer', desc: 'Dived boldly into the unknown' },
    { emoji: '🧠', title: 'Concept Cracker', desc: 'Solved the central puzzle' },
    { emoji: '💡', title: "KIKI's Teacher", desc: 'Taught the concept in your own words' },
    { emoji: '🌍', title: 'World Adventurer', desc: 'Explored KIKI’s magical world' },
  ];

  return (
    <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-10 text-center shadow-xl max-w-3xl mx-auto my-6 animate-fadeIn">
      {/* Cheering KIKI mascot */}
      <div className="mb-4 flex flex-col items-center">
        <KikiCharacter
          expression="cheering"
          size="lg"
          showDialogue={`“YAY! You did it, ${childName}! KIKI is so proud of you! 🎉”`}
        />
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-black uppercase tracking-wider mb-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>Adventure Complete!</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
        You Mastered {topic}!
      </h2>

      <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
        You journeyed through KIKI’s world, figured out the secret clues, taught KIKI in your own words, and unlocked the big discovery!
      </p>

      {/* Explorer Stars */}
      <div className="my-6 flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap">
        {Array.from({ length: totalChapters }).map((_, i) => (
          <div
            key={i}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md transition-all ${
              i < starsEarned
                ? 'bg-amber-400 text-amber-950 border-2 border-amber-300 scale-105 animate-bounce-subtle'
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            ⭐
          </div>
        ))}
      </div>

      <p className="text-xs font-bold text-amber-900 bg-amber-100/70 py-1 px-3 rounded-full inline-block mb-6">
        Collected {starsEarned} of {totalChapters} Explorer Stars! ⭐
      </p>

      {/* Cute Discovery Highlights (Sections 35-38) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left my-6">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase tracking-wide mb-1">
            <span>🌟</span>
            <span>You Discovered</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            How the pieces connect and why the core rule of <strong>{topic}</strong> stays true everywhere!
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
          <div className="flex items-center gap-2 text-xs font-black text-sky-900 uppercase tracking-wide mb-1">
            <span>🧠</span>
            <span>You Figured Out</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            The cause-and-effect mechanism behind the puzzle instead of just guessing!
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <div className="flex items-center gap-2 text-xs font-black text-emerald-900 uppercase tracking-wide mb-1">
            <span>⭐</span>
            <span>You Were Great At</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            Explaining your thinking in your own words and sharing your curious ideas!
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
          <div className="flex items-center gap-2 text-xs font-black text-rose-900 uppercase tracking-wide mb-1">
            <span>💡</span>
            <span>KIKI Noticed</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            {childName}’s fantastic persistence and excitement when testing new clues!
          </p>
        </div>
      </div>

      {/* Badges Earned Section */}
      <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
          Explorer Badges Earned
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {badges.map((b, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <span className="text-2xl block mb-1">{b.emoji}</span>
              <span className="text-xs font-black text-slate-800 block truncate">{b.title}</span>
              <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">{b.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
        <button
          onClick={onViewReport}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>View Learning Report with Parent / Teacher 🎓</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all cursor-pointer"
        >
          New Adventure in KIKI’s World 🗺️
        </button>
      </div>
    </div>
  );
};
