'use client';

import React, { useState } from 'react';
import { ParentSetup, StoryWorld, CompanionType, LearningStyle } from '@/lib/types/quest';
import { getAgeBandDescription } from '@/lib/ai/prompts';
import { Sparkles, User, AlertCircle, Rocket, SlidersHorizontal } from 'lucide-react';

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
  const [showOptionalPersonalization, setShowOptionalPersonalization] = useState(true);

  const updateField = <K extends keyof ParentSetup>(key: K, value: ParentSetup[K]) => {
    setValidationError(null);
    onChangeSetup({ ...setup, [key]: value });
  };

  const { band } = getAgeBandDescription(setup.childAge);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setup.childName.trim()) {
      setValidationError('Please enter your child’s name so KIKI can welcome them.');
      return;
    }
    if (!setup.topic.trim()) {
      setValidationError('Please enter what KIKI should teach (e.g. Multiplication, Photosynthesis, Online Privacy).');
      return;
    }
    if (!setup.learningGoal.trim()) {
      setValidationError('Please specify the learning goal (what should the child understand after the story?).');
      return;
    }
    setValidationError(null);
    onSubmit();
  };

  const worldsOptions: { id: StoryWorld; label: string; icon: string }[] = [
    { id: 'space', label: 'Space Station', icon: '🚀' },
    { id: 'forest', label: 'Wonder Woods', icon: '🌲' },
    { id: 'city', label: 'Everyday City', icon: '🏙️' },
    { id: 'kitchen', label: 'KIKI’s Kitchen', icon: '🍳' },
    { id: 'school', label: 'Discovery Lab', icon: '🎒' },
    { id: 'ocean', label: 'Coral Ocean', icon: '🌊' },
    { id: 'village', label: 'Friendly Village', icon: '🏡' },
    { id: 'cyber', label: 'Cyber City', icon: '🔐' },
  ];

  const companionOptions: { id: CompanionType; label: string; icon: string }[] = [
    { id: 'robot', label: 'Bolt the Robot', icon: '🤖' },
    { id: 'animal', label: 'Barnaby Fox', icon: '🦊' },
    { id: 'child', label: 'Sammy Explorer', icon: '👧' },
    { id: 'magical', label: 'Lumi Sprite', icon: '✨' },
    { id: 'monster', label: 'Fuzzy Monster', icon: '👾' },
  ];

  const learningStyleOptions: { id: LearningStyle; label: string; icon: string }[] = [
    { id: 'adventure', label: 'High Adventure', icon: '🗺️' },
    { id: 'mystery', label: 'Detective Mystery', icon: '🔍' },
    { id: 'discovery', label: 'Curious Discovery', icon: '💡' },
    { id: 'rescue', label: 'Rescue Mission', icon: '🛡️' },
    { id: 'real-life', label: 'Real-Life Problem', icon: '📖' },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
          <span>Parent & Teacher Setup Studio</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Create an Adventure with KIKI
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Tell KIKI what to teach and the specific learning goal. KIKI will weave it into an age-appropriate story.
        </p>
      </div>

      {validationError && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-sm font-bold">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <span>{validationError}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Child Name & Age (Required) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="childName" className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
              Child’s Name *
            </label>
            <div className="relative">
              <input
                id="childName"
                type="text"
                value={setup.childName}
                onChange={(e) => updateField('childName', e.target.value)}
                placeholder="e.g. Alex, Maya, Liam"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 text-sm font-semibold focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all"
                required
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="childAge" className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                Child’s Age: {setup.childAge} years old *
              </label>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
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
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
            />
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1">
              <span>Age 5 (Early Explorer)</span>
              <span>Age 9 (Curious)</span>
              <span>Age 13 (Master Sleuth)</span>
            </div>
          </div>
        </div>

        {/* What should KIKI teach? & Learning Goal (Required) */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div>
            <label htmlFor="topic" className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
              What Should KIKI Teach? (Topic) *
            </label>
            <input
              id="topic"
              type="text"
              value={setup.topic}
              onChange={(e) => updateField('topic', e.target.value)}
              placeholder="e.g. Multiplication (The 7 Times Table), Why Plants Need Sunlight, Keeping Public Places Clean"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 text-sm font-semibold focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="learningGoal" className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                What Should The Child Understand After The Story? (Learning Goal) *
              </label>
              <span className="text-[11px] text-amber-800 font-bold">Key mission parameter</span>
            </div>
            <textarea
              id="learningGoal"
              rows={2}
              value={setup.learningGoal}
              onChange={(e) => updateField('learningGoal', e.target.value)}
              placeholder="e.g. Understand that 7 × 6 means 7 equal groups of 6, and build from 7 × 5 = 35."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 text-sm font-semibold focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all resize-none"
              required
            />
          </div>
        </div>

        {/* Toggle for Optional Personalization */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowOptionalPersonalization(!showOptionalPersonalization)}
            className="flex items-center justify-between w-full py-2 text-xs font-black text-slate-700 uppercase tracking-wider hover:text-amber-800 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>Optional Story Personalization (Struggles, World, Companion, Interests)</span>
            </span>
            <span className="text-amber-600 font-bold text-xs lowercase">
              {showOptionalPersonalization ? 'hide choices' : 'customize more'}
            </span>
          </button>

          {showOptionalPersonalization && (
            <div className="space-y-4 mt-4 animate-fadeIn">
              {/* Specific Struggle */}
              <div>
                <label htmlFor="struggle" className="block text-xs font-bold text-slate-700 mb-1">
                  What does the child struggle with? (Optional)
                </label>
                <input
                  id="struggle"
                  type="text"
                  value={setup.struggle || ''}
                  onChange={(e) => updateField('struggle', e.target.value)}
                  placeholder="e.g. Confuses 7 × 6 and 7 × 7, or thinks plants eat garden dirt like cereal"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium focus:bg-white focus:border-amber-400 transition-all"
                />
              </div>

              {/* What does the child enjoy? (Interest) */}
              <div>
                <label htmlFor="interest" className="block text-xs font-bold text-slate-700 mb-1">
                  What does the child enjoy? (Interest / Real-World Context)
                </label>
                <input
                  id="interest"
                  type="text"
                  value={setup.interest || ''}
                  onChange={(e) => updateField('interest', e.target.value)}
                  placeholder="e.g. rockets, animals, cooking, soccer, dinosaurs, trains, market stalls"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium focus:bg-white focus:border-amber-400 transition-all"
                />
              </div>

              {/* Story World */}
              <div>
                <span className="block text-xs font-bold text-slate-700 mb-2">Story World:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {worldsOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateField('storyWorld', opt.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        setup.storyWorld === opt.id
                          ? 'bg-amber-400 text-amber-950 border-amber-400 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Companion */}
              <div>
                <span className="block text-xs font-bold text-slate-700 mb-2">Adventure Companion:</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {companionOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateField('companionType', opt.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        setup.companionType === opt.id
                          ? 'bg-amber-400 text-amber-950 border-amber-400 shadow-sm'
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
                <span className="block text-xs font-bold text-slate-700 mb-2">Story Style:</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {learningStyleOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateField('learningStyle', opt.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        setup.learningStyle === opt.id
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
            </div>
          )}
        </div>

        {/* Big Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-base shadow-lg shadow-amber-400/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-amber-950/30 border-t-amber-950 rounded-full animate-spin" />
                <span>KIKI is creating {setup.childName}’s adventure...</span>
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5 text-amber-950 animate-bounce" />
                <span>Launch Adventure for {setup.childName || 'Child'} with KIKI 🚀</span>
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-500 mt-2 font-medium">
            KIKI adapts the teaching approach dynamically when the child struggles.
          </p>
        </div>
      </div>
    </form>
  );
};
