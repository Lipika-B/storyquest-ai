'use client';

import React from 'react';
import { Sparkles, GraduationCap, BarChart3, Volume2, VolumeX, Compass } from 'lucide-react';
import { KikiCharacter } from '../kiki/KikiCharacter';

interface NavbarProps {
  currentPortal: 'parent' | 'child' | 'report';
  onSelectPortal: (portal: 'parent' | 'child' | 'report') => void;
  childName?: string;
  starsEarned: number;
  hasReportData: boolean;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPortal,
  onSelectPortal,
  childName,
  starsEarned,
  hasReportData,
  isSpeaking,
  onToggleSpeech,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/60 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand: KIKI */}
        <div 
          onClick={() => onSelectPortal('parent')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-400 via-amber-300 to-amber-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <span className="text-xl">🌟</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                KIKI
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Story Teacher
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
              Little stories. Big discoveries.
            </p>
          </div>
        </div>

        {/* Portal Switcher (Two distinct sides) */}
        <nav aria-label="Portal Navigation" className="flex items-center bg-slate-100/80 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => onSelectPortal('parent')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              currentPortal === 'parent'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-sky-600" />
            <span>Parent & Teacher</span>
          </button>

          <button
            onClick={() => onSelectPortal('child')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              currentPortal === 'child'
                ? 'bg-amber-400 text-amber-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Child Adventure</span>
            {starsEarned > 0 && (
              <span className="bg-amber-100 text-amber-950 text-xs px-1.5 py-0.2 rounded-full font-black ml-0.5">
                ⭐ {starsEarned}
              </span>
            )}
          </button>

          {hasReportData && (
            <button
              onClick={() => onSelectPortal('report')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentPortal === 'report'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden md:inline">Learning</span> Report
            </button>
          )}
        </nav>

        {/* Sound toggle & Child badge */}
        <div className="flex items-center gap-2">
          {/* Sound On / Off Control */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Sound Effects Enabled (Click to mute)' : 'Sound Effects Muted (Click to enable)'}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {childName && (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Learner: {childName}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
