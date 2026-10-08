'use client';

import React from 'react';
import { StoryChapter, StoryWorld } from '@/lib/types/quest';
import { KikiCharacter } from '../kiki/KikiCharacter';
import { getCompanionDetails } from '@/lib/ai/storyEngine';
import { Volume2, VolumeX, Sparkles, BookOpen } from 'lucide-react';

interface StoryBookSceneProps {
  chapter: StoryChapter;
  companionType?: string;
  storyWorld?: StoryWorld | string;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export const StoryBookScene: React.FC<StoryBookSceneProps> = ({
  chapter,
  companionType,
  storyWorld = 'space',
  isSpeaking,
  onToggleSpeech,
}) => {
  const companion = getCompanionDetails(companionType);

  // Environmental scene theme styles
  const getEnvironmentStyles = () => {
    switch (storyWorld) {
      case 'space':
        return {
          wrapper: 'bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white',
          ground: 'bg-indigo-900/60 border-t-2 border-indigo-500/30',
          elements: (
            <>
              {/* Twinkling stars */}
              <div className="absolute top-6 left-12 text-amber-300 text-xs animate-star">✨</div>
              <div className="absolute top-16 right-20 text-sky-200 text-sm animate-star" style={{ animationDelay: '0.8s' }}>⭐</div>
              <div className="absolute top-10 right-1/3 text-amber-200 text-xs animate-star" style={{ animationDelay: '1.4s' }}>✨</div>
              {/* Distant planet */}
              <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-rose-400 opacity-60 blur-xs border border-amber-300/40" />
            </>
          )
        };
      case 'forest':
        return {
          wrapper: 'bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-50 text-slate-900',
          ground: 'bg-emerald-600/30 border-t-2 border-emerald-500/40',
          elements: (
            <>
              <div className="absolute top-6 left-10 text-xl animate-bounce-subtle">☀️</div>
              <div className="absolute top-8 right-16 text-emerald-800 text-base opacity-70">🍃</div>
              <div className="absolute top-14 right-1/4 text-emerald-700 text-sm opacity-60">🌿</div>
            </>
          )
        };
      case 'kitchen':
        return {
          wrapper: 'bg-gradient-to-b from-amber-100 via-orange-50 to-amber-50 text-slate-900',
          ground: 'bg-amber-300/40 border-t-2 border-amber-400/50',
          elements: (
            <>
              <div className="absolute top-6 left-12 text-base">🥧</div>
              <div className="absolute top-8 right-20 text-base">🍪</div>
            </>
          )
        };
      case 'city':
      case 'school':
      default:
        return {
          wrapper: 'bg-gradient-to-b from-sky-100 via-sky-50 to-slate-50 text-slate-900',
          ground: 'bg-sky-200/50 border-t-2 border-sky-300/60',
          elements: (
            <>
              <div className="absolute top-6 left-10 text-xl">☁️</div>
              <div className="absolute top-10 right-20 text-xl">🎈</div>
            </>
          )
        };
    }
  };

  const env = getEnvironmentStyles();

  return (
    <div className="rounded-3xl border-2 border-slate-200 overflow-hidden shadow-lg mb-6 bg-white">
      {/* 1. Illustrated Storybook Diorama Stage */}
      <div className={`relative px-6 pt-8 pb-12 overflow-hidden transition-all duration-500 ${env.wrapper}`}>
        {/* Scenery Background elements */}
        {env.elements}

        {/* Stage Header: Chapter Banner & Read-Aloud Audio */}
        <div className="relative z-10 flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-sm border border-white/30 text-current">
              Chapter {chapter.chapterNumber} • {chapter.phase === 'spark' ? 'The Spark' : chapter.phase === 'puzzle' ? 'The Puzzle' : 'The Triumph'}
            </span>
          </div>

          <button
            onClick={onToggleSpeech}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold backdrop-blur-md transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                : 'bg-white/25 hover:bg-white/35 text-current border border-white/30'
            }`}
            title="Read story aloud with KIKI"
            aria-label="Read story aloud with KIKI"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
            <span>{isSpeaking ? 'Pause Audio' : 'KIKI Read to Me'}</span>
          </button>
        </div>

        {/* Characters On Stage (KIKI & Companion) */}
        <div className="relative z-10 flex items-end justify-around py-4">
          {/* KIKI on Left */}
          <div className="flex flex-col items-center">
            <KikiCharacter
              expression={chapter.kikiExpression}
              size="md"
            />
            <span className="mt-2 text-xs font-black tracking-wide px-2.5 py-0.5 rounded-full bg-white/30 backdrop-blur-xs">
              KIKI
            </span>
          </div>

          {/* Center Story Interaction Dialogue Bubble */}
          {chapter.kikiDialogue && (
            <div className="max-w-xs sm:max-w-md mx-2 px-4 py-3 rounded-2xl bg-white text-slate-900 border-2 border-amber-300 shadow-md text-xs sm:text-sm font-bold text-center animate-bounce-subtle">
              <span className="text-amber-600 block text-[10px] uppercase font-black tracking-widest mb-0.5">KIKI says:</span>
              <p className="italic">{chapter.kikiDialogue}</p>
            </div>
          )}

          {/* Companion on Right */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-md animate-float">
              {companion.avatarEmoji}
            </div>
            <span className="mt-2 text-xs font-black tracking-wide px-2.5 py-0.5 rounded-full bg-white/30 backdrop-blur-xs truncate max-w-[100px]">
              {companion.name.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Diorama Ground Horizon */}
        <div className={`absolute bottom-0 left-0 right-0 h-6 ${env.ground}`} />
      </div>

      {/* 2. Storybook Narrative Card */}
      <div className="p-6 sm:p-8 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{chapter.sceneEmoji}</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {chapter.title}
          </h2>
        </div>

        {/* Key Concept Discovery Hook */}
        {chapter.keyConceptHook && (
          <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs sm:text-sm text-amber-950 font-bold">
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>{chapter.keyConceptHook}</span>
          </div>
        )}

        {/* Paragraphs with spacious, storybook layout */}
        <div className="space-y-4 text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
          {chapter.narrativeParagraphs.map((para, idx) => (
            <p key={idx} className="tracking-wide">
              {para}
            </p>
          ))}
        </div>

        {/* In-Story Companion Dialogue Bubble */}
        {chapter.checkpoint.characterDialogue && (
          <div className="mt-6 p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{companion.avatarEmoji}</span>
            <div>
              <span className="block text-xs font-black text-sky-900 uppercase tracking-wider">
                {chapter.checkpoint.characterSpeaker} asks:
              </span>
              <p className="text-sm sm:text-base font-bold text-sky-950 mt-0.5 italic">
                {chapter.checkpoint.characterDialogue}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
