'use client';

import React from 'react';
import { KikiCharacter } from '../kiki/KikiCharacter';
import { getCompanionDetails, getWorldDetails } from '@/lib/ai/storyEngine';
import { Sparkles, ArrowRight, Volume2 } from 'lucide-react';
import { playSuccessChime } from '@/lib/utils/audio';

interface ChildWelcomeScreenProps {
  childName: string;
  topic: string;
  companionType?: string;
  storyWorld?: string;
  onStartAdventure: () => void;
}

export const ChildWelcomeScreen: React.FC<ChildWelcomeScreenProps> = ({
  childName,
  topic,
  companionType,
  storyWorld,
  onStartAdventure,
}) => {
  const companion = getCompanionDetails(companionType);
  const world = getWorldDetails(storyWorld);

  const handleStart = () => {
    playSuccessChime();
    onStartAdventure();
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-8 sm:p-12 text-center bg-white border-2 border-amber-300 rounded-3xl shadow-xl animate-fadeIn relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* KIKI character smiling and welcoming */}
      <div className="mb-4">
        <KikiCharacter
          expression="cheering"
          size="lg"
          showDialogue={`“Hi ${childName}! I'm KIKI! 🌟 Ready for our adventure?”`}
        />
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-black uppercase tracking-wider mb-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>KIKI • Little Stories. Big Discoveries.</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
        Welcome, {childName}!
      </h1>

      <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-sm mx-auto">
        We are heading to <strong>{world.settingName}</strong> with <strong>{companion.name}</strong> to discover <strong>{topic}</strong>!
      </p>

      {/* Companion Invitation Badge */}
      <div className="my-6 p-4 rounded-2xl bg-sky-50 border border-sky-200 inline-flex items-center gap-3 text-left">
        <span className="text-3xl">{companion.avatarEmoji}</span>
        <div>
          <span className="text-xs font-extrabold text-sky-900 block">
            Your Companion: {companion.name}
          </span>
          <span className="text-xs text-sky-700 italic">
            "{companion.sound} Let's explore together!"
          </span>
        </div>
      </div>

      {/* Big Start Adventure Button */}
      <div className="mt-2">
        <button
          onClick={handleStart}
          className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-lg shadow-xl shadow-amber-400/30 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer mx-auto"
        >
          <span>Start Adventure 🚀</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
