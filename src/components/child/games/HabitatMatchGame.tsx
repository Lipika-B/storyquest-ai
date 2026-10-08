'use client';

import React, { useState } from 'react';
import { playSuccessChime, playEncouragementChime } from '@/lib/utils/audio';
import { Sparkles, Check, RotateCcw } from 'lucide-react';

interface AnimalItem {
  id: string;
  name: string;
  emoji: string;
  trait: string;
  targetHabitatId: string;
}

interface Habitat {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  gradient: string;
}

const ANIMALS: AnimalItem[] = [
  { id: 'camel', name: 'Desert Camel', emoji: '🐪', trait: 'Fat-storing hump & wide sand feet', targetHabitatId: 'desert' },
  { id: 'polar-bear', name: 'Polar Bear', emoji: '🐻‍❄️', trait: 'Thick insulating blubber & white fur', targetHabitatId: 'arctic' },
  { id: 'monkey', name: 'Spider Monkey', emoji: '🐒', trait: 'Grippy tail & hands for tree branches', targetHabitatId: 'canopy' },
];

const HABITATS: Habitat[] = [
  { id: 'desert', name: 'Hot Desert', emoji: '🏜️', desc: 'Sunny sand dunes with very little water', gradient: 'from-amber-100 to-yellow-100 border-amber-400' },
  { id: 'arctic', name: 'Freezing Arctic', emoji: '❄️', desc: 'Icebergs and snowdrifts with freezing winds', gradient: 'from-sky-100 to-indigo-100 border-sky-400' },
  { id: 'canopy', name: 'Rainforest Canopy', emoji: '🌴', desc: 'High tree branches and warm rain showers', gradient: 'from-emerald-100 to-teal-100 border-emerald-400' },
];

interface HabitatMatchGameProps {
  onComplete: () => void;
}

export const HabitatMatchGame: React.FC<HabitatMatchGameProps> = ({ onComplete }) => {
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>('camel');
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}); // { animalId: habitatId }
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectAnimal = (animalId: string) => {
    setSelectedAnimalId(animalId);
  };

  const handleSelectHabitat = (habitatId: string) => {
    if (!selectedAnimalId) return;

    const animal = ANIMALS.find(a => a.id === selectedAnimalId);
    if (!animal) return;

    if (animal.targetHabitatId === habitatId) {
      // Correct Match!
      playSuccessChime();
      const newMatches = { ...matchedPairs, [selectedAnimalId]: habitatId };
      setMatchedPairs(newMatches);
      setFeedbackMsg(`🎉 Yes! ${animal.name} lives in the ${HABITATS.find(h => h.id === habitatId)?.name}! ${animal.trait}!`);

      // Find next unmatched animal
      const nextUnmatched = ANIMALS.find(a => !newMatches[a.id]);
      if (nextUnmatched) {
        setSelectedAnimalId(nextUnmatched.id);
      } else {
        setSelectedAnimalId(null);
        setIsCompleted(true);
        onComplete();
      }
    } else {
      // Incorrect Match
      playEncouragementChime();
      setFeedbackMsg(`Brrr/Oops! ${animal.name} needs a different home suited for ${animal.trait}!`);
    }
  };

  const handleReset = () => {
    setMatchedPairs({});
    setSelectedAnimalId('camel');
    setFeedbackMsg(null);
    setIsCompleted(false);
  };

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-3xl p-5 sm:p-7 shadow-lg my-4 text-slate-900 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <div>
            <h4 className="text-base sm:text-lg font-black text-emerald-950">
              Mini-Game: Match Animals to Their Habitats!
            </h4>
            <p className="text-xs text-emerald-800 font-bold">
              Tap an animal, then tap where it belongs based on its body adaptations!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="p-2 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold transition-all"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Feedback banner */}
      {feedbackMsg && (
        <div className="mb-4 p-3 rounded-2xl bg-white/90 border-2 border-emerald-200 text-xs font-bold text-emerald-900 shadow-sm animate-bounce-subtle">
          {feedbackMsg}
        </div>
      )}

      {/* Row 1: Animals to Choose */}
      <div className="mb-6">
        <span className="block text-xs font-black uppercase tracking-wider text-emerald-900 mb-2">
          1. Select an Animal:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ANIMALS.map(animal => {
            const isMatched = Boolean(matchedPairs[animal.id]);
            const isSelected = selectedAnimalId === animal.id;

            return (
              <button
                key={animal.id}
                type="button"
                onClick={() => !isMatched && handleSelectAnimal(animal.id)}
                disabled={isMatched}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-100/70 border-emerald-300 opacity-80 cursor-default'
                    : isSelected
                    ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-300 scale-102'
                    : 'bg-white/80 hover:bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{animal.emoji}</span>
                  <div>
                    <span className="block text-xs font-black text-slate-900">{animal.name}</span>
                    <span className="block text-[10px] font-bold text-slate-500 truncate max-w-[130px]">
                      {animal.trait}
                    </span>
                  </div>
                </div>
                {isMatched && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: Habitats */}
      <div>
        <span className="block text-xs font-black uppercase tracking-wider text-emerald-900 mb-2">
          2. Tap the Matching Habitat:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {HABITATS.map(habitat => {
            const occupyingAnimals = ANIMALS.filter(a => matchedPairs[a.id] === habitat.id);

            return (
              <button
                key={habitat.id}
                type="button"
                onClick={() => handleSelectHabitat(habitat.id)}
                className={`p-4 rounded-2xl border-2 bg-gradient-to-br ${habitat.gradient} text-left transition-all hover:scale-102 active:scale-98 cursor-pointer shadow-sm min-h-[110px] flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{habitat.emoji}</span>
                    <span className="text-xs font-black text-slate-900">{habitat.name}</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-600 leading-tight">
                    {habitat.desc}
                  </p>
                </div>

                {/* Animals placed inside this habitat */}
                <div className="mt-2 flex items-center gap-1.5 flex-wrap min-h-[28px]">
                  {occupyingAnimals.map(a => (
                    <span
                      key={a.id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-black text-slate-900 border border-emerald-400 shadow-xs animate-fadeIn"
                    >
                      <span>{a.emoji}</span>
                      <span>{a.name.split(' ')[0]}</span>
                    </span>
                  ))}
                  {occupyingAnimals.length === 0 && (
                    <span className="text-[10px] text-slate-400 italic">Tap to place here</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="mt-4 p-3 rounded-2xl bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center justify-between gap-2 font-black text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Master Ranger! All animals matched with their adaptation superpowers!</span>
          </div>
          <span className="px-2.5 py-1 bg-emerald-200 rounded-lg text-emerald-900">
            Habitat Badge Earned! ⭐
          </span>
        </div>
      )}
    </div>
  );
};
