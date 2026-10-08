'use client';

import React, { useState } from 'react';
import { ParentSetup, StorySetting, CharacterStyle, LearningStyle } from '@/lib/types/quest';
import { getAgeBandDescription } from '@/lib/ai/prompts';
import { Sparkles, Compass, User, BookOpen, AlertCircle, Rocket } from 'lucide-react';

interface SetupFormProps {
  setup: ParentSetup;
  onChangeSetup: (newSetup: ParentSetup) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const SetupForm: React.FC<SetupFormProps> = ({
  setup,
  onChangeSetup,
  onSubmit,
  isLoading,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  const updateField = <K extends keyof ParentSetup>(key: K, value: ParentSetup[K]) => {
    setValidationError(null);
    onChangeSetup({ ...setup, [key]: value });
  };

  const { band, pedagogy } = getAgeBandDescription(setup.childAge);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setup.topic.trim()) {
      setValidationError('Please enter a learning topic (e.g. Photosynthesis, 7 Times Table, Gravity).');
      return;
    }
    if (!setup.childName.trim()) {
      setValidationError('Please enter the child’s name for personalized storytelling.');
      return;
    }
    setValidationError(null);
    onSubmit();
  };

  const settingsOptions: { id: StorySetting; label: string; icon: string }[] = [
    { id: 'space', label: 'Space & Stars', icon: '🚀' },
    { id: 'forest', label: 'Magical Forest', icon: '🌲' },
    { id: 'everyday', label: 'Everyday Life', icon: '🏡' },
    { id: 'school', label: 'School & Lab', icon: '🎒' },
    { id: 'fantasy', label: 'Fantasy Realm', icon: '🏰' },
  ];

  const characterOptions: { id: CharacterStyle; label: string; icon: string }[] = [
    { id: 'robot', label: 'Clever Robot', icon: '🤖' },
    { id: 'animal', label: 'Playful Animal', icon: '🦊' },
    { id: 'child', label: 'Fellow Kid Explorer', icon: '👧' },
    { id: 'fantasy', label: 'Magical Creature', icon: '✨' },
  ];

  const learningStyleOptions: { id: LearningStyle; label: string; icon: string }[] = [
    { id: 'adventure', label: 'High Adventure', icon: '🗺️' },
    { id: 'mystery', label: 'Detective Mystery', icon: '🔍' },
    { id: 'real-life', label: 'Real-Life Story', icon: '📖' },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Compass className="w-5 h-5 text-sky-600" />
          <span>Craft a Personalized Learning Adventure</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Tell StoryQuest about your learner and their specific goal. The AI will weave it into an age-calibrated quest.
        </p>
      </div>

      {validationError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-sm font-medium">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <span>{validationError}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Child Name & Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="childName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Child’s Name *
            </label>
            <div className="relative">
              <input
                id="childName"
                type="text"
                value={setup.childName}
                onChange={(e) => updateField('childName', e.target.value)}
                placeholder="e.g. Maya"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 text-sm font-medium focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                required
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="childAge" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Child’s Age ({setup.childAge} years old) *
              </label>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                {band}
              </span>
            </div>
            <input
              id="childAge"
              type="range"
              min="5"
              max="13"
              step="1"
              value={setup.childAge}
              onChange={(e) => updateField('childAge', parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600 focus:outline-none"
            />
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1">
              <span>Age 5 (Early)</span>
              <span>Age 9 (Curious)</span>
              <span>Age 13 (Sleuth)</span>
            </div>
          </div>
        </div>

        {/* Age Pedagogical Note Box */}
        <div className="p-3.5 bg-sky-50/70 border border-sky-200/80 rounded-xl text-xs text-sky-900 leading-relaxed">
          <strong className="font-bold text-sky-950">Age-Adaptive Calibration: </strong>
          Story vocabulary, sentence complexity, and checkpoint depth will automatically scale for <strong>{band}</strong>.
        </div>

        {/* Topic and Specific Need */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="topic" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Learning Topic *
            </label>
            <input
              id="topic"
              type="text"
              value={setup.topic}
              onChange={(e) => updateField('topic', e.target.value)}
              placeholder="e.g. The 7 Times Table, Photosynthesis, Gravity"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 text-sm font-medium focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="context" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Real-World Context / Hobby
            </label>
            <input
              id="context"
              type="text"
              value={setup.realWorldContext}
              onChange={(e) => updateField('realWorldContext', e.target.value)}
              placeholder="e.g. baking cookies, building rockets, soccer"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 text-sm font-medium focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
            />
          </div>
        </div>

        {/* Specific Learning Need / Misconception */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="specificNeed" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Specific Learning Need or Challenge (Optional but powerful)
            </label>
            <span className="text-[11px] text-slate-500">Helps AI target the exact hurdle</span>
          </div>
          <textarea
            id="specificNeed"
            rows={2}
            value={setup.specificNeed}
            onChange={(e) => updateField('specificNeed', e.target.value)}
            placeholder="e.g. Understands multiplication as equal groups, but gets stuck on 7x6 and 7x7. Or: Thinks plants eat dirt like cereal."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 text-sm font-medium focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all resize-none"
          />
        </div>

        {/* Story Customization (Setting, Character, Style) */}
        <div className="pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            Story Customization (Setting, Character & Style)
          </h3>

          <div className="space-y-4">
            {/* Setting */}
            <div>
              <span className="block text-xs font-medium text-slate-600 mb-2">Story Setting:</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {settingsOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => updateField('setting', opt.id)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      setup.setting === opt.id
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Character Style */}
            <div>
              <span className="block text-xs font-medium text-slate-600 mb-2">Companion Character Style:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {characterOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => updateField('characterStyle', opt.id)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      setup.characterStyle === opt.id
                        ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Learning Style */}
            <div>
              <span className="block text-xs font-medium text-slate-600 mb-2">Narrative Genre:</span>
              <div className="grid grid-cols-3 gap-2">
                {learningStyleOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => updateField('learningStyle', opt.id)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      setup.learningStyle === opt.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-lg shadow-sky-600/25 flex items-center justify-center gap-3 transition-all hover:shadow-xl active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Weaving Pedagogical Quest...</span>
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5 text-amber-300 animate-bounce" />
                <span>Launch StoryQuest for {setup.childName || 'Learner'}</span>
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-500 mt-2">
            Adapts automatically to the child’s answers during the story.
          </p>
        </div>
      </div>
    </form>
  );
};
