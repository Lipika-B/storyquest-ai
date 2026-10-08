'use client';

import React from 'react';
import { ParentSetup, StoryLevel } from '@/lib/types/quest';
import { KikiCharacter } from '../kiki/KikiCharacter';
import { getCompanionDetails, getWorldDetails } from '@/lib/ai/storyEngine';
import { Sparkles, ArrowRight, Compass, Star } from 'lucide-react';
import { playSuccessChime } from '@/lib/utils/audio';

interface AdventureIntroProps {
  setup: ParentSetup;
  firstLevel: StoryLevel;
  onStartLevel1: () => void;
  onBackToWorld: () => void;
}

export const AdventureIntro: React.FC<AdventureIntroProps> = ({
  setup,
  firstLevel,
  onStartLevel1,
  onBackToWorld,
}) => {
  const companion = getCompanionDetails(setup.companionType);
  const world = getWorldDetails(setup.storyWorld);

  const handleStart = () => {
    playSuccessChime();
    onStartLevel1();
  };

  return (
    <div className="max-w-2xl mx-auto my-6 p-6 sm:p-10 text-center bg-white border-4 border-amber-300 rounded-3xl shadow-2xl relative overflow-hidden animate-fadeIn">
      {/* Background Soft Sky & World Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-200/50 rounded-full blur-3xl pointer-events-none" />

      {/* Top Breadcrumb: Back to World */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <button
          type="button"
          onClick={onBackToWorld}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
        >
          ← Choose Different World
        </button>

        <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
          Adventure Setup Complete
        </span>
      </div>

      {/* Characters Meet: KIKI + Companion */}
      <div className="relative z-10 flex items-center justify-center gap-6 sm:gap-10 mb-6">
        {/* KIKI */}
        <div className="flex flex-col items-center animate-kiki-float">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-100/80 border-3 border-amber-300 flex items-center justify-center p-2 shadow-md">
            <KikiCharacter expression="cheering" size="md" />
          </div>
          <span className="mt-2 text-xs font-black text-amber-950 bg-amber-200 px-2.5 py-0.5 rounded-full">
            Guide KIKI
          </span>
        </div>

        <div className="text-2xl animate-star">✨</div>

        {/* Companion */}
        <div className="flex flex-col items-center animate-float">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-sky-100/90 border-3 border-sky-300 flex items-center justify-center text-4xl sm:text-5xl shadow-md">
            {companion.avatarEmoji}
          </div>
          <span className="mt-2 text-xs font-black text-sky-950 bg-sky-200 px-2.5 py-0.5 rounded-full">
            {companion.name.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Story Mission Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-black uppercase tracking-wider mb-3">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>Mission Destination: {world.settingName}</span>
      </div>

      <h1 className="relative z-10 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
        The Mystery of {setup.topic}
      </h1>

      {/* Cinematic Dialogue Hook Box */}
      <div className="relative z-10 my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-sky-50 to-amber-50 border-2 border-amber-200 text-left shadow-xs">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-xl flex-shrink-0">🌟</span>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 block">
              KIKI says:
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-900 italic">
              {firstLevel.kikiDialogue || `“${setup.childName || 'Explorer'}, get ready! We have an amazing mystery to solve today!”`}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 pt-3 border-t border-amber-200/60">
          <span className="text-xl flex-shrink-0">{companion.avatarEmoji}</span>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-sky-800 block">
              {companion.name} wonders:
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-900 italic">
              {firstLevel.characterDialogue || `“${companion.sound} How does ${setup.topic} really work? Let’s find out!”`}
            </p>
          </div>
        </div>
      </div>

      {/* Big Action Button */}
      <div className="relative z-10 mt-6">
        <button
          type="button"
          onClick={handleStart}
          className="w-full sm:w-auto px-12 py-5 rounded-3xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-lg sm:text-xl shadow-xl shadow-amber-400/40 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer mx-auto"
        >
          <span>Start Adventure 🚀</span>
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>

        <p className="mt-3 text-xs font-bold text-slate-500">
          5 Fun Levels • Star Rewards • Interactive Picture-Book
        </p>
      </div>
    </div>
  );
};
