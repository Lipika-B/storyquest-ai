'use client';

import React, { useState } from 'react';
import { TOPIC_LIBRARY, TopicCategory, TopicPreset } from '@/lib/data/topicLibrary';
import { Sparkles, ChevronRight, Wand2 } from 'lucide-react';

interface TopicLibraryPickerProps {
  onSelectTopicPreset: (preset: TopicPreset) => void;
  selectedTopicId?: string;
}

export const TopicLibraryPicker: React.FC<TopicLibraryPickerProps> = ({
  onSelectTopicPreset,
  selectedTopicId,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('math');

  const customIdeas: TopicPreset[] = [
    {
      id: 'custom-airplane-flight',
      topic: 'How Do Airplanes Fly?',
      category: 'science',
      subtopic: 'Aviation Physics',
      learningGoal: 'Curved airplane wings (airfoils) create lower air pressure above, generating upward Lift against gravity.',
      defaultStruggle: 'Thinks airplane engines push directly upward into the sky like rocket thrusters.',
      suggestedAge: 10,
      world: 'sky',
      companion: 'child',
      interest: 'paper airplanes and flying clouds',
      learningStyle: 'adventure'
    },
    {
      id: 'custom-moon-phases',
      topic: 'Why Does the Moon Change Shape?',
      category: 'science',
      subtopic: 'Space & Astronomy',
      learningGoal: 'The Moon orbits Earth while lit by the Sun, so we see different angles of its sunlit half (Moon phases).',
      defaultStruggle: 'Thinks Earth’s dark cloud shadow covers the moon every single night.',
      suggestedAge: 9,
      world: 'space',
      companion: 'magical',
      interest: 'stargazing and telescope adventures',
      learningStyle: 'mystery'
    },
    {
      id: 'custom-rain-cycle',
      topic: 'How Does Rain Happen?',
      category: 'science',
      subtopic: 'Weather & Water Cycle',
      learningGoal: 'The Sun heats water into invisible vapor that rises, cools into droplet clouds, and falls as refreshing rain.',
      defaultStruggle: 'Thinks rain comes from water tanks leaking through holes in the sky.',
      suggestedAge: 7,
      world: 'forest',
      companion: 'animal',
      interest: 'rain boots and puddle jumping',
      learningStyle: 'discovery'
    },
    {
      id: 'custom-computers-binary',
      topic: 'How Do Computers Remember Numbers?',
      category: 'science',
      subtopic: 'Computer Science',
      learningGoal: 'Computers use billions of tiny electrical switches (transistors) turned ON (1) or OFF (0) to store data.',
      defaultStruggle: 'Thinks computers have tiny people inside writing notes on paper.',
      suggestedAge: 10,
      world: 'cyber',
      companion: 'robot',
      interest: 'video game coding and robot gizmos',
      learningStyle: 'mystery'
    }
  ];

  const isCustomTab = activeCategoryId === 'custom';
  const activeCategory = TOPIC_LIBRARY.find(c => c.id === activeCategoryId) || TOPIC_LIBRARY[0];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 mb-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>KIKI's Curated Learning Worlds</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            Choose What KIKI Teaches (or customize your own)
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-semibold">
          Click any topic to pre-fill goals & age-appropriate context
        </span>
      </div>

      {/* Visual Worlds Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-5">
        {TOPIC_LIBRARY.map((category) => {
          const isActive = activeCategoryId === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategoryId(category.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? 'bg-amber-400 text-amber-950 border-amber-400 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <span>{category.emoji}</span>
              <span>{category.name}</span>
            </button>
          );
        })}

        {/* ✨ Have Your Own Idea Tab */}
        <button
          type="button"
          onClick={() => setActiveCategoryId('custom')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer border ${
            isCustomTab
              ? 'bg-amber-400 text-amber-950 border-amber-400 shadow-sm'
              : 'bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-900 border-amber-200'
          }`}
        >
          <span>✨</span>
          <span>Have Your Own Idea</span>
        </button>
      </div>

      {/* Content depending on active tab */}
      {isCustomTab ? (
        <div>
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-sm">
                💡
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Teach Any Custom Topic with AI
                </h3>
                <p className="text-xs text-slate-600">
                  Select a curiosity inspiration below to pre-fill the form, or type any custom topic in the form below!
                </p>
              </div>
            </div>
            <Wand2 className="w-5 h-5 text-amber-600 hidden sm:block flex-shrink-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {customIdeas.map((preset) => {
              const isSelected = selectedTopicId === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => onSelectTopicPreset(preset)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all text-left flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-400 bg-amber-50/70 shadow-md ring-2 ring-amber-300/60'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-300 hover:shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-extrabold text-sm text-slate-900">
                        {preset.topic}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-bold">
                        Age {preset.suggestedAge}+
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed mb-2">
                      <strong>Learning Goal:</strong> {preset.learningGoal}
                    </p>
                    {preset.defaultStruggle && (
                      <p className="text-[11px] text-amber-900/80 italic">
                        Focus: {preset.defaultStruggle}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-amber-800">
                    <span className="capitalize">{preset.world} • {preset.companion}</span>
                    <span className="flex items-center gap-1">
                      Load Custom Idea <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeCategory.topics.map((preset) => {
            const isSelected = selectedTopicId === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => onSelectTopicPreset(preset)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all text-left flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50/70 shadow-md ring-2 ring-amber-300/60'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-sm text-slate-900">
                      {preset.topic}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-bold">
                      Age {preset.suggestedAge}+
                    </span>
                  </div>
                  {preset.subtopic && (
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded mb-1.5">
                      {preset.subtopic}
                    </span>
                  )}
                  <p className="text-xs text-slate-700 font-medium leading-relaxed mb-2">
                    <strong>Learning Goal:</strong> {preset.learningGoal}
                  </p>
                  {preset.defaultStruggle && (
                    <p className="text-[11px] text-amber-900/80 italic">
                      Focus: {preset.defaultStruggle}
                    </p>
                  )}
                </div>

                <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-amber-800">
                  <span className="capitalize">{preset.world} • {preset.companion}</span>
                  <span className="flex items-center gap-1">
                    Load Topic <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
