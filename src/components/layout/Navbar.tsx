'use client';

import React from 'react';
import { BookOpen, Sparkles, GraduationCap, Compass, BarChart3, Volume2, VolumeX } from 'lucide-react';
import { StorySpeaker } from '@/lib/utils/speech';

interface NavbarProps {
  currentPortal: 'parent' | 'child' | 'report';
  onSelectPortal: (portal: 'parent' | 'child' | 'report') => void;
  childName?: string;
  starsEarned: number;
  hasReportData: boolean;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPortal,
  onSelectPortal,
  childName,
  starsEarned,
  hasReportData,
  isSpeaking,
  onToggleSpeech,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => onSelectPortal('parent')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                StoryQuest
              </span>
              <span className="bg-sky-100 text-sky-700 text-xs font-bold px-1.5 py-0.5 rounded-full border border-sky-200 uppercase tracking-wider">
                AI
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Two sides • One learning adventure
            </p>
          </div>
        </div>

        {/* Portal Switcher (Two Sides of the Same Experience) */}
        <nav aria-label="Portal Navigation" className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => onSelectPortal('parent')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              currentPortal === 'parent'
                ? 'bg-white text-sky-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-sky-600" />
            <span>Parent & Teacher</span>
          </button>

          <button
            onClick={() => onSelectPortal('child')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              currentPortal === 'child'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Child Quest</span>
            {starsEarned > 0 && (
              <span className="bg-amber-100/90 text-amber-900 text-xs px-1.5 py-0.2 rounded-full font-bold ml-1">
                ⭐ {starsEarned}
              </span>
            )}
          </button>

          {hasReportData && (
            <button
              onClick={() => onSelectPortal('report')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                currentPortal === 'report'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden md:inline">Learning</span> Report
            </button>
          )}
        </nav>

        {/* Accessibility & Audio Controls */}
        <div className="flex items-center gap-2">
          {currentPortal === 'child' && (
            <button
              onClick={onToggleSpeech}
              title={isSpeaking ? 'Stop read-aloud' : 'Read story aloud'}
              aria-label={isSpeaking ? 'Stop read-aloud audio' : 'Read story aloud'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isSpeaking
                  ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden lg:inline">{isSpeaking ? 'Pause Audio' : 'Read Aloud'}</span>
            </button>
          )}

          {childName && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Learner: <strong>{childName}</strong></span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
