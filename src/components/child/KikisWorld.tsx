'use client';

import React, { useState } from 'react';
import { KikiCharacter } from '../kiki/KikiCharacter';
import { playSuccessChime, playEncouragementChime } from '@/lib/utils/audio';
import { Sparkles, ArrowRight, Search, Compass, Star, Heart, Rocket, Trees, FlaskConical, Building2, ShieldCheck, Utensils, HelpCircle } from 'lucide-react';

export interface WorldLocation {
  id: string;
  name: string;
  tagline: string;
  iconEmoji: string;
  colorBg: string;
  borderCol: string;
  badgeCol: string;
  kikiReaction: string;
  kikiExpression: 'happy' | 'curious' | 'cheering' | 'thinking' | 'explaining';
  defaultTopic: string;
  defaultGoal: string;
  storyWorld: string;
  companionType: string;
  suggestedAge: number;
}

const WORLD_LOCATIONS: WorldLocation[] = [
  {
    id: 'space-station',
    name: 'Space Station',
    tagline: 'Rocket fuel & 7×6 crystals',
    iconEmoji: '🚀',
    colorBg: 'from-indigo-600 via-purple-600 to-slate-900',
    borderCol: 'border-indigo-400',
    badgeCol: 'bg-indigo-100 text-indigo-900',
    kikiReaction: '“Whoa! Blastoff! We’re heading into deep space with Bolt the Robot! 🚀”',
    kikiExpression: 'cheering',
    defaultTopic: 'Multiplication (The 7 Times Table)',
    defaultGoal: 'Understand 7 × 6 as 7 equal groups of 6',
    storyWorld: 'space',
    companionType: 'robot',
    suggestedAge: 9,
  },
  {
    id: 'wonder-woods',
    name: 'Wonder Woods',
    tagline: 'Monkey Momo & banana snacks',
    iconEmoji: '🌳',
    colorBg: 'from-emerald-600 via-teal-600 to-amber-900',
    borderCol: 'border-emerald-400',
    badgeCol: 'bg-emerald-100 text-emerald-900',
    kikiReaction: '“Ooooh! Into Wonder Woods! Momo the Monkey is waiting in the treehouse! 🍌”',
    kikiExpression: 'happy',
    defaultTopic: 'How Digestion Works',
    defaultGoal: 'Stomach breaks food into tiny nutrients for energy',
    storyWorld: 'forest',
    companionType: 'animal',
    suggestedAge: 8,
  },
  {
    id: 'science-lab',
    name: 'Science Lab',
    tagline: 'Light beams & mysterious shadows',
    iconEmoji: '🧪',
    colorBg: 'from-sky-600 via-cyan-600 to-indigo-900',
    borderCol: 'border-cyan-400',
    badgeCol: 'bg-cyan-100 text-cyan-900',
    kikiReaction: '“Turn on the flashlight! Let’s uncover why shadows follow us! 🔦”',
    kikiExpression: 'curious',
    defaultTopic: 'Why Shadows Form',
    defaultGoal: 'An opaque object blocks straight light beams, casting a shadow',
    storyWorld: 'everyday',
    companionType: 'child',
    suggestedAge: 7,
  },
  {
    id: 'everyday-city',
    name: 'Everyday City',
    tagline: 'Clean parks & fuzzy monsters',
    iconEmoji: '🏙️',
    colorBg: 'from-amber-500 via-orange-500 to-slate-800',
    borderCol: 'border-amber-400',
    badgeCol: 'bg-amber-100 text-amber-900',
    kikiReaction: '“Off to Everyday City! Let’s help Grumble keep the playground sparkly clean! 🌳”',
    kikiExpression: 'happy',
    defaultTopic: 'Keeping Public Places Clean',
    defaultGoal: 'Shared parks belong to everyone so litter must go in trash bins',
    storyWorld: 'city',
    companionType: 'monster',
    suggestedAge: 8,
  },
  {
    id: 'feelings-forest',
    name: 'Feelings Forest',
    tagline: 'Heart lanterns & friendship',
    iconEmoji: '💛',
    colorBg: 'from-rose-500 via-pink-600 to-purple-900',
    borderCol: 'border-pink-400',
    badgeCol: 'bg-rose-100 text-rose-900',
    kikiReaction: '“Feelings Forest is so warm and cozy! Let’s share our brave feelings! ✨”',
    kikiExpression: 'happy',
    defaultTopic: 'Understanding Big Feelings',
    defaultGoal: 'Recognize that feelings come and go like weather clouds',
    storyWorld: 'forest',
    companionType: 'magical',
    suggestedAge: 7,
  },
  {
    id: 'cyber-city',
    name: 'Cyber City',
    tagline: 'Secret passwords & padlock shields',
    iconEmoji: '🔐',
    colorBg: 'from-violet-600 via-purple-700 to-slate-900',
    borderCol: 'border-violet-400',
    badgeCol: 'bg-violet-100 text-violet-900',
    kikiReaction: '“Enter the cyber grid! Time to lock down our secret passcodes! 💻”',
    kikiExpression: 'thinking',
    defaultTopic: 'Online Privacy & Passwords',
    defaultGoal: 'Never share personal secrets or passwords with online strangers',
    storyWorld: 'cyber',
    companionType: 'robot',
    suggestedAge: 10,
  },
  {
    id: 'kikis-kitchen',
    name: 'KIKI’s Kitchen',
    tagline: 'Soap bubbles & clean hands',
    iconEmoji: '🍳',
    colorBg: 'from-orange-500 via-amber-600 to-yellow-800',
    borderCol: 'border-orange-400',
    badgeCol: 'bg-orange-100 text-orange-900',
    kikiReaction: '“Splish-splash! 20 seconds of warm soap bubbles to chase away germs! 🫧”',
    kikiExpression: 'cheering',
    defaultTopic: 'Why We Wash Hands with Soap',
    defaultGoal: 'Soap bubbles trap sticky germs and slide them down the drain in 20 seconds',
    storyWorld: 'kitchen',
    companionType: 'animal',
    suggestedAge: 6,
  },
  {
    id: 'mystery-island',
    name: 'Mystery Island',
    tagline: 'Needs vs. Wants market treasure',
    iconEmoji: '🔎',
    colorBg: 'from-teal-600 via-emerald-700 to-slate-900',
    borderCol: 'border-teal-400',
    badgeCol: 'bg-teal-100 text-teal-900',
    kikiReaction: '“Treasure hunt time! Apples or toy racecars: which do we need first? 🛒”',
    kikiExpression: 'curious',
    defaultTopic: 'Needs vs. Wants',
    defaultGoal: 'Essential needs come first, while fun wants come second',
    storyWorld: 'city',
    companionType: 'child',
    suggestedAge: 8,
  },
  {
    id: 'question-cloud',
    name: 'Question Cloud',
    tagline: '“How do airplanes fly?” & more',
    iconEmoji: '☁️',
    colorBg: 'from-sky-500 via-blue-600 to-indigo-900',
    borderCol: 'border-sky-300',
    badgeCol: 'bg-sky-100 text-sky-900',
    kikiReaction: '“Up into the clouds! Giant metal airplanes flying with invisible lift! ✈️”',
    kikiExpression: 'cheering',
    defaultTopic: 'How Do Airplanes Fly?',
    defaultGoal: 'Curved airplane wings push air faster over top, creating lift',
    storyWorld: 'custom',
    companionType: 'magical',
    suggestedAge: 11,
  },
  {
    id: 'world-passport',
    name: 'World Passport',
    tagline: 'Countries, capitals & world flags',
    iconEmoji: '🌍',
    colorBg: 'from-blue-600 via-indigo-700 to-slate-900',
    borderCol: 'border-blue-400',
    badgeCol: 'bg-blue-100 text-blue-900',
    kikiReaction: '“Pack your backpack! KIKI’s World Passport is taking us to Paris, Tokyo, and New Delhi! 🗺️”',
    kikiExpression: 'cheering',
    defaultTopic: 'KIKI World Passport (Countries & Capitals)',
    defaultGoal: 'Understand countries have special capital cities where leaders meet, like Paris in France and Tokyo in Japan',
    storyWorld: 'city',
    companionType: 'child',
    suggestedAge: 8,
  },
  {
    id: 'rainbow-garden',
    name: 'Rainbow Garden',
    tagline: 'Red, blue & yellow color mixing',
    iconEmoji: '🎨',
    colorBg: 'from-pink-500 via-rose-500 to-amber-700',
    borderCol: 'border-pink-300',
    badgeCol: 'bg-pink-100 text-pink-900',
    kikiReaction: '“Grab your paintbrush! Let’s mix Blue and Yellow to paint vibrant green leaves! 🌈”',
    kikiExpression: 'happy',
    defaultTopic: 'Rainbow Garden (Colours & Primary Mixing)',
    defaultGoal: 'Blue + Yellow makes Green, Red + Yellow makes Orange, Red + Blue makes Purple',
    storyWorld: 'forest',
    companionType: 'animal',
    suggestedAge: 6,
  },
  {
    id: 'animal-habitats',
    name: 'Animal Habitats',
    tagline: 'Camels, polar bears & camouflage',
    iconEmoji: '🐾',
    colorBg: 'from-amber-600 via-yellow-600 to-stone-900',
    borderCol: 'border-amber-400',
    badgeCol: 'bg-amber-100 text-amber-900',
    kikiReaction: '“Meet the animals! See how polar bears stay toasty in arctic snow! 🐻‍❄️”',
    kikiExpression: 'curious',
    defaultTopic: 'Animal Habitats & Adaptations',
    defaultGoal: 'Animals have specialized body adaptations suited to survive in their unique habitats',
    storyWorld: 'forest',
    companionType: 'animal',
    suggestedAge: 7,
  },
];

const QUICK_IDEA_CHIPS = [
  { label: '🌍 World Capitals & Flags', topic: 'KIKI World Passport (Countries & Capitals)', goal: 'Countries have special capital cities where leaders meet, like Paris in France and Tokyo in Japan' },
  { label: '🎨 Rainbow Colours & Mixing', topic: 'Rainbow Garden (Colours & Primary Mixing)', goal: 'Blue + Yellow makes Green, Red + Yellow makes Orange, Red + Blue makes Purple' },
  { label: '🐾 Animal Habitats & Camels', topic: 'Animal Habitats & Adaptations', goal: 'Animals have specialized body adaptations suited to survive in their unique habitats' },
  { label: '✈️ How do airplanes fly?', topic: 'How Do Airplanes Fly?', goal: 'Curved airplane wings push air faster over top, creating lift' },
  { label: '🍌 Digestion & Tummy', topic: 'How Digestion Works', goal: 'Stomach breaks food into tiny nutrients for energy' },
  { label: '🔦 Why shadows form?', topic: 'Why Shadows Form', goal: 'An opaque object blocks straight light beams, casting a shadow' },
  { label: '🧼 Soap & Hand Washing', topic: 'Why We Wash Hands with Soap', goal: 'Soap bubbles trap sticky germs and slide them down the drain in 20 seconds' },
  { label: '🍕 Fractions & Sharing', topic: 'Fractions (Halves & Quarters)', goal: 'Equal parts of a whole pizza: more slices means smaller pieces' },
  { label: '🍎 Needs vs. Wants', topic: 'Needs vs. Wants', goal: 'Essential needs come first, while fun wants come second' },
  { label: '😮 Why we get hiccups?', topic: 'Why Do We Get Hiccups?', goal: 'The diaphragm breathing muscle spasms, snapping vocal cords shut' },
  { label: '🚀 7 × 6 Rocket Crystals', topic: 'Multiplication (The 7 Times Table)', goal: 'Understand 7 × 6 as 7 equal groups of 6' },
];

interface KikisWorldProps {
  onSelectLocation: (location: WorldLocation) => void;
  onCustomTopicSubmit: (topic: string, learningGoal?: string) => void;
  isLoading: boolean;
}

export const KikisWorld: React.FC<KikisWorldProps> = ({
  onSelectLocation,
  onCustomTopicSubmit,
  isLoading,
}) => {
  const [activeKikiDialogue, setActiveKikiDialogue] = useState<string>(
    '“Hi! 👋 I’m KIKI! Where should we explore today?”'
  );
  const [kikiExpression, setKikiExpression] = useState<'happy' | 'curious' | 'cheering' | 'thinking' | 'explaining'>('cheering');
  const [customInput, setCustomInput] = useState('');
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);

  const handleHoverLocation = (loc: WorldLocation) => {
    setHoveredLocationId(loc.id);
    setActiveKikiDialogue(loc.kikiReaction);
    setKikiExpression(loc.kikiExpression);
  };

  const handleLeaveLocation = () => {
    setHoveredLocationId(null);
  };

  const handleSelectLoc = (loc: WorldLocation) => {
    playSuccessChime();
    setActiveKikiDialogue(loc.kikiReaction);
    setKikiExpression('cheering');
    onSelectLocation(loc);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    playSuccessChime();
    setActiveKikiDialogue(`“Ooooh! An adventure about ${customInput.trim()}?! Let’s discover it! 🚀”`);
    setKikiExpression('cheering');
    onCustomTopicSubmit(customInput.trim());
  };

  const handleChipClick = (chip: typeof QUICK_IDEA_CHIPS[0]) => {
    playSuccessChime();
    setCustomInput(chip.topic);
    setActiveKikiDialogue(`“Aha! ${chip.topic}! Let’s unlock the secret! ✨”`);
    setKikiExpression('cheering');
    onCustomTopicSubmit(chip.topic, chip.goal);
  };

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-100 pb-16">
      {/* 1. Playful Atmospheric Background Scenery (SVG Clouds, Sun, Hills) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Golden Sun with rays */}
        <div className="absolute top-6 right-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-200 shadow-2xl shadow-amber-300/60 blur-xs animate-spin-slow opacity-90" />
        <div className="absolute top-10 right-14 text-4xl animate-bounce-subtle">☀️</div>

        {/* Drifting Clouds */}
        <div className="absolute top-12 left-8 text-5xl opacity-80 animate-float">☁️</div>
        <div className="absolute top-24 left-1/3 text-6xl opacity-70 animate-float" style={{ animationDelay: '1.2s' }}>☁️</div>
        <div className="absolute top-16 right-1/4 text-5xl opacity-75 animate-float" style={{ animationDelay: '2s' }}>☁️</div>

        {/* Rainbow Arc */}
        <div className="absolute -top-20 left-1/4 w-96 h-96 rounded-full border-[18px] border-t-rose-400/30 border-r-amber-400/30 border-b-emerald-400/30 border-l-sky-400/30 blur-sm pointer-events-none" />

        {/* Twinkles & Balloons */}
        <div className="absolute top-28 left-16 text-2xl animate-star">✨</div>
        <div className="absolute top-36 right-20 text-3xl animate-float" style={{ animationDelay: '0.8s' }}>🎈</div>
        <div className="absolute top-44 left-1/4 text-xl animate-star" style={{ animationDelay: '1.5s' }}>⭐</div>

        {/* Rolling cartoon hills in background */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-400/40 via-emerald-300/30 to-transparent rounded-t-[100%] scale-125" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-500/50 to-transparent rounded-t-[80%] scale-110" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {/* 2. Top Character Welcome Banner: KIKI + Big Cartoon Speech Bubble */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 mb-10 text-center sm:text-left">
          {/* Animated KIKI Mascot */}
          <div className="relative flex-shrink-0 animate-kiki-float">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/70 backdrop-blur-md shadow-xl border-4 border-amber-300 flex items-center justify-center p-2">
              <KikiCharacter expression={kikiExpression} size="md" />
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-black text-[11px] px-3 py-0.5 rounded-full shadow-md uppercase tracking-wider">
              Guide KIKI
            </span>
          </div>

          {/* Large Comic Speech Bubble */}
          <div className="relative max-w-xl bg-white border-4 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-amber-400/20 text-slate-900 transition-all">
            {/* Speech bubble pointer notch */}
            <div className="hidden sm:block absolute -left-3 top-8 w-6 h-6 bg-white border-l-4 border-b-4 border-amber-300 transform rotate-45" />

            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                🌈 Welcome to KIKI’s World!
              </span>
              <span className="text-xs text-amber-500 font-bold">Little stories. Big discoveries.</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {activeKikiDialogue}
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm font-bold text-slate-600">
              Tap any magical place below to begin, or type what you want to learn!
            </p>
          </div>
        </div>

        {/* 3. The Interactive Cartoon Map: Clickable Locations Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🗺️</span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-wide drop-shadow-xs">
                Pick a Story World to Explore
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200 shadow-xs hidden sm:inline">
              9 Adventure Lands Ready!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {WORLD_LOCATIONS.map((loc) => {
              const isHovered = hoveredLocationId === loc.id;

              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleSelectLoc(loc)}
                  onMouseEnter={() => handleHoverLocation(loc)}
                  onMouseLeave={handleLeaveLocation}
                  disabled={isLoading}
                  className={`group relative text-left rounded-3xl p-5 sm:p-6 text-white overflow-hidden shadow-xl transition-all duration-300 cursor-pointer border-3 ${loc.borderCol} bg-gradient-to-br ${loc.colorBg} transform hover:-translate-y-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50`}
                >
                  {/* Subtle cartoon background shine */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform" />

                  {/* Top Bar: Icon + Badge */}
                  <div className="relative z-10 flex items-start justify-between gap-3 mb-3">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-md group-hover:scale-110 transition-transform animate-float">
                      {loc.iconEmoji}
                    </div>

                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs ${loc.badgeCol}`}>
                      Age {loc.suggestedAge}+
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-sm group-hover:text-amber-200 transition-colors">
                      {loc.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-bold text-white/90 line-clamp-1">
                      {loc.tagline}
                    </p>
                  </div>

                  {/* Tap Action Bar */}
                  <div className="relative z-10 mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-black text-amber-200">
                    <span>Explore this world</span>
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                      ➔
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. "I HAVE MY OWN IDEA" (Custom Adventure Creator) */}
        <section aria-labelledby="custom-idea-heading" className="bg-white/95 backdrop-blur-md rounded-3xl border-4 border-amber-300 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Cheerful decoration background badge */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>✨ Have your own curiosity?</span>
            </div>

            <h2 id="custom-idea-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What do you want to learn today?
            </h2>

            <p className="mt-1.5 text-sm sm:text-base font-bold text-slate-600">
              Type any question—like <em>“How do airplanes fly?”</em> or <em>“Why do we get hiccups?”</em>—and KIKI will build an adventure just for you!
            </p>
          </div>

          {/* The Big Colorful Input Bar */}
          <form onSubmit={handleCustomSubmit} className="relative z-10 max-w-2xl mx-auto mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50 border-3 border-amber-300 rounded-3xl p-2 sm:p-2.5 shadow-inner focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-200 transition-all">
              <div className="flex items-center gap-2.5 px-3 flex-1 w-full">
                <Search className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="e.g. How do airplanes fly? Or why does the moon change shape?"
                  className="w-full bg-transparent text-slate-900 font-bold text-base sm:text-lg placeholder:text-slate-400 placeholder:font-medium outline-none py-2"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !customInput.trim()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-base sm:text-lg shadow-lg shadow-amber-400/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
              >
                {isLoading ? (
                  <span>Building Adventure... 🚀</span>
                ) : (
                  <>
                    <span>Create My Adventure</span>
                    <Sparkles className="w-5 h-5 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Idea Inspiration Chips */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="block text-center text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5">
              💡 Or click any popular curiosity to start instantly:
            </span>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {QUICK_IDEA_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  disabled={isLoading}
                  className="px-3.5 py-2 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50/70 text-slate-800 hover:text-amber-950 text-xs sm:text-sm font-extrabold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
