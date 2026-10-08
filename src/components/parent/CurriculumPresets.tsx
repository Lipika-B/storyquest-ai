'use client';

import React from 'react';
import { CURRICULUM_PRESETS, CurriculumPreset } from '@/lib/ai/mockData';
import { Sparkles, ArrowRight, BookOpen, Clock } from 'lucide-react';

interface CurriculumPresetsProps {
  onSelectPreset: (preset: CurriculumPreset) => void;
  selectedPresetId?: string;
}

export const CurriculumPresets: React.FC<CurriculumPresetsProps> = ({
  onSelectPreset,
  selectedPresetId,
}) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-bold text-slate-800">
            Quick Curriculum Presets (1-Click Instant Testing)
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
          Demo Ready
        </span>
      </div>
      <p className="text-xs text-slate-600 mb-4">
        Explore ready-to-test learning adventures designed for specific pedagogical challenges and age bands:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CURRICULUM_PRESETS.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`cursor-pointer rounded-xl p-4 border transition-all text-left flex flex-col justify-between ${
                isSelected
                  ? 'border-sky-500 bg-sky-50/60 shadow-md ring-2 ring-sky-400/30'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {preset.badge}
                  </span>
                  <span className="text-base">{preset.chapters[0]?.badgeEmoji || '📖'}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                  <strong>Need:</strong> {preset.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600">
                <span>{preset.setup.childName} (Age {preset.setup.childAge})</span>
                <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Load Preset <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
