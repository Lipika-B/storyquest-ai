'use client';

import React, { useState } from 'react';
import { playSuccessChime, playStarEarnedSound, playEncouragementChime } from '@/lib/utils/audio';
import { ArrowLeft, Sparkles, Check, Globe, MapPin, Award } from 'lucide-react';
import { KikiCharacter } from '../kiki/KikiCharacter';

interface CountryDestination {
  id: string;
  name: string;
  flag: string;
  capital: string;
  distractors: string[];
  landmark: string;
  landmarkEmoji: string;
  funFact: string;
  accentCol: string;
}

const DESTINATIONS: CountryDestination[] = [
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    capital: 'Paris',
    distractors: ['Lyon', 'Marseille'],
    landmark: 'Eiffel Tower',
    landmarkEmoji: '🗼',
    funFact: 'Paris is called the City of Light, and the Eiffel Tower expands 15 cm taller during hot summer days!',
    accentCol: 'border-blue-400 bg-blue-50',
  },
  {
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    capital: 'Tokyo',
    distractors: ['Kyoto', 'Osaka'],
    landmark: 'Mount Fuji',
    landmarkEmoji: '🗻',
    funFact: 'Tokyo is a bustling capital with superfast bullet trains called Shinkansen that zoom across the islands!',
    accentCol: 'border-rose-400 bg-rose-50',
  },
  {
    id: 'india',
    name: 'India',
    flag: '🇮🇳',
    capital: 'New Delhi',
    distractors: ['Mumbai', 'Kolkata'],
    landmark: 'Taj Mahal',
    landmarkEmoji: '🏛️',
    funFact: 'New Delhi is the national capital, surrounded by colorful spice markets and the majestic peacock bird!',
    accentCol: 'border-amber-400 bg-amber-50',
  },
  {
    id: 'egypt',
    name: 'Egypt',
    flag: '🇪🇬',
    capital: 'Cairo',
    distractors: ['Alexandria', 'Giza'],
    landmark: 'Great Pyramids of Giza',
    landmarkEmoji: '🏺',
    funFact: 'Cairo is known as the city of a thousand minarets along the banks of the long Nile River!',
    accentCol: 'border-yellow-500 bg-yellow-50',
  },
  {
    id: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    capital: 'Brasília',
    distractors: ['Rio de Janeiro', 'São Paulo'],
    landmark: 'Amazon Rainforest',
    landmarkEmoji: '🦜',
    funFact: 'Brasília is a planned capital city built in the shape of an airplane when seen from high in space!',
    accentCol: 'border-emerald-400 bg-emerald-50',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    capital: 'London',
    distractors: ['Manchester', 'Edinburgh'],
    landmark: 'Big Ben & River Thames',
    landmarkEmoji: '🕰️',
    funFact: 'London is the historic capital where giant red double-decker buses cross over the River Thames!',
    accentCol: 'border-indigo-400 bg-indigo-50',
  },
];

interface WorldPassportViewProps {
  childName?: string;
  onBack: () => void;
  onStartQuest?: (topic: string, goal: string) => void;
}

export const WorldPassportView: React.FC<WorldPassportViewProps> = ({
  childName = 'Explorer',
  onBack,
  onStartQuest,
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('france');
  const [stamps, setStamps] = useState<Record<string, boolean>>({}); // { countryId: true }
  const [feedback, setFeedback] = useState<string | null>(null);

  const activeCountry = DESTINATIONS.find(d => d.id === selectedCountryId) || DESTINATIONS[0];
  const isStamped = Boolean(stamps[activeCountry.id]);
  const stampCount = Object.keys(stamps).length;

  const handleAnswerCapital = (choice: string) => {
    if (choice === activeCountry.capital) {
      playSuccessChime();
      playStarEarnedSound();
      setStamps(prev => ({ ...prev, [activeCountry.id]: true }));
      setFeedback(`🌟 GOLDEN STAMP AWARDED! ${choice} is the proud capital city of ${activeCountry.name}!`);
    } else {
      playEncouragementChime();
      setFeedback(`Not quite! ${choice} is a wonderful city, but the headquarters capital is ${activeCountry.capital}!`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 animate-fadeIn">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to KIKI’s World</span>
        </button>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-amber-950 font-black text-xs shadow-sm">
          <Globe className="w-4 h-4 text-amber-950" />
          <span>World Stamps: {stampCount} / {DESTINATIONS.length}</span>
        </div>
      </div>

      {/* Realistic Children's Passport Book Presentation */}
      <div className="relative bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 border-4 border-amber-400/90 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
        {/* Background Passport Guilloche Pattern Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Passport Header: Golden Seal & Title */}
        <div className="relative z-10 border-b border-amber-400/30 pb-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-inner">
              🌍
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-300 block">
                Official Travel Document • Republic of Wonder
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                KIKI’s World Passport
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <KikiCharacter expression="happy" size="sm" />
            <div className="text-left">
              <span className="block text-[10px] text-amber-300 font-bold">Explorer</span>
              <span className="block text-xs font-black text-white">{childName}</span>
            </div>
          </div>
        </div>

        {/* Country Travel Selector Tabs */}
        <div className="relative z-10 mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {DESTINATIONS.map(d => {
            const hasStamp = Boolean(stamps[d.id]);
            const isSelected = selectedCountryId === d.id;

            return (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setSelectedCountryId(d.id);
                  setFeedback(null);
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-2xl border font-bold text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                <span className="text-lg">{d.flag}</span>
                <span>{d.name}</span>
                {hasStamp && <span className="text-amber-300">★</span>}
              </button>
            );
          })}
        </div>

        {/* Passport Page Interior: Country Dossier + Capital Stamp Challenge */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-inner border border-amber-200">
          {/* Left Column: Country Details & Landmark */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeCountry.flag}</span>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{activeCountry.name}</h3>
                  <span className="text-xs font-bold text-slate-500">Destination Dossier</span>
                </div>
              </div>

              {/* Golden Passport Stamp Visual (if completed) */}
              {isStamped ? (
                <div className="transform rotate-12 border-4 border-amber-600 text-amber-700 rounded-xl px-3 py-1 font-black text-xs text-center uppercase tracking-wider animate-bounce-subtle bg-amber-100 shadow-sm">
                  ★ VISITED ★
                  <br />
                  {activeCountry.capital.toUpperCase()}
                </div>
              ) : (
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                  Unstamped
                </span>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
              <span className="text-3xl flex-shrink-0">{activeCountry.landmarkEmoji}</span>
              <div>
                <span className="block text-[11px] font-black text-amber-900 uppercase">Famous Landmark</span>
                <span className="block text-sm font-bold text-slate-800">{activeCountry.landmark}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-950 font-bold leading-relaxed">
              🌍 <strong>Did You Know?</strong> {activeCountry.funFact}
            </div>
          </div>

          {/* Right Column: Capital City Passport Challenge */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                Passport Stamp Quest
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900">
                What is the official capital city of {activeCountry.name}?
              </h4>
            </div>

            {feedback && (
              <div className="p-3 rounded-xl bg-amber-100 border border-amber-300 text-xs font-bold text-amber-950 animate-fadeIn">
                {feedback}
              </div>
            )}

            {/* MCQ Options for Capital City */}
            <div className="space-y-2">
              {[activeCountry.capital, ...activeCountry.distractors]
                .sort()
                .map((city, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAnswerCapital(city)}
                    className="w-full p-3 rounded-xl border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50 font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      <span>{city}</span>
                    </div>
                    {isStamped && city === activeCountry.capital && (
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    )}
                  </button>
                ))}
            </div>

            {isStamped && onStartQuest && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onStartQuest(
                      `KIKI World Passport (${activeCountry.name} & ${activeCountry.capital})`,
                      `Discover that ${activeCountry.name}'s capital city is ${activeCountry.capital} and explore its landmarks`
                    )
                  }
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 text-amber-950 font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Full Story Adventure for {activeCountry.name}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Grand Explorer Certificate (when all 6 countries stamped) */}
        {stampCount === DESTINATIONS.length && (
          <div className="relative z-10 mt-6 p-4 rounded-2xl bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-between gap-3 animate-fadeIn shadow-lg">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 flex-shrink-0" />
              <div>
                <span className="block text-xs uppercase tracking-wider">World Explorer Master Certified!</span>
                <span className="text-sm font-black">All 6 Golden Passport Stamps Collected!</span>
              </div>
            </div>
            <span className="text-2xl">🏆</span>
          </div>
        )}
      </div>
    </div>
  );
};
