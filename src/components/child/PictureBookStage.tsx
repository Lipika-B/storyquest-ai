'use client';

import React, { useState } from 'react';
import { StoryLevel, AdaptiveScaffolding } from '@/lib/types/quest';
import { KikiCharacter } from '../kiki/KikiCharacter';
import { getCompanionDetails } from '@/lib/ai/storyEngine';
import { TryAgainDifferentlyView } from './TryAgainDifferentlyView';
import { Sparkles, ArrowRight, Check, MessageSquare, Send, HelpCircle, Volume2, VolumeX, Hand } from 'lucide-react';
import { playSuccessChime } from '@/lib/utils/audio';

interface PictureBookStageProps {
  level: StoryLevel;
  companionType?: string;
  onSubmitAnswer: (response: string) => void;
  onRetrySubmit: (response: string) => void;
  onContinue: () => void;
  isLoading: boolean;
  successFeedback: string | null;
  activeScaffolding?: AdaptiveScaffolding;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export const PictureBookStage: React.FC<PictureBookStageProps> = ({
  level,
  companionType,
  onSubmitAnswer,
  onRetrySubmit,
  onContinue,
  isLoading,
  successFeedback,
  activeScaffolding,
  isSpeaking,
  onToggleSpeech,
}) => {
  const companion = getCompanionDetails(companionType);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [ownWordsText, setOwnWordsText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [tappedItemIdx, setTappedItemIdx] = useState<number | null>(null);
  const [tappedMsg, setTappedMsg] = useState<string | null>(null);

  const handleTapProp = (emoji: string, idx: number) => {
    playSuccessChime();
    setTappedItemIdx(idx);
    let msg = `Look at this clue: ${level.keyDiscoveryHook}!`;
    if (emoji === '🍌') msg = 'Yum! Bananas contain carbs that break down into energy!';
    else if (emoji === '👄' || emoji === '🦷') msg = 'Teeth chew and mash food into tiny pieces!';
    else if (emoji === '🫧') msg = 'Stomach juices break food down into tiny nutrients!';
    else if (emoji === '🍎') msg = 'Apples are an essential healthy need before extra toys!';
    else if (emoji === '🎮') msg = 'Video games are fun wants—enjoyed after needs are met!';
    else if (emoji === '🚀' || emoji === '💎') msg = 'Fuel crystals arranged in 7 equal groups of 6!';
    else if (emoji === '✈️') msg = 'Curved wings push air faster over the top to create lift!';
    else if (emoji === '💨') msg = 'Fast air creates low pressure above the wing, lifting it!';
    else if (emoji === '🔦') msg = 'Light beams travel straight until an object blocks them!';
    else if (emoji === '🧱') msg = 'Opaque blocks stop light, casting a dark shadow!';
    else if (emoji === '🧼') msg = 'Soap bubbles trap sticky germs and slide them away!';
    else if (emoji === '💧') msg = 'Clean water washes the trapped germs right down the drain!';
    else if (emoji === '🔒' || emoji === '🛡️') msg = 'Padlocks keep your personal passwords safe!';
    else if (emoji === '😮' || emoji === '🫁') msg = 'The diaphragm muscle spasms and makes the *hic* sound!';
    else if (emoji === '🌍' || emoji === '🗺️' || emoji === '🗼' || emoji === '🏛️') msg = 'Every country has a special headquarters capital city!';
    else if (emoji === '🎨' || emoji === '🌈' || emoji === '🔴' || emoji === '🟡' || emoji === '🔵') msg = 'Primary paints (Red, Blue, Yellow) mix into green, orange, and purple!';
    else if (emoji === '🐫' || emoji === '🐻‍❄️' || emoji === '🐾') msg = 'Animals have specialized body features suited to their habitat!';
    else if (emoji === '🔺' || emoji === '🟦' || emoji === '⭐' || emoji === '3️⃣' || emoji === '4️⃣') msg = 'Count sides and sharp corners to recognize every geometric shape!';
    setTappedMsg(msg);
  };

  // Background environment diorama styling based on level theme
  const getThemeStyles = () => {
    switch (level.sceneVisual.theme) {
      case 'space':
        return {
          wrapper: 'bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white',
          ground: 'bg-indigo-900/60 border-t-2 border-indigo-400/30',
          accent: 'border-indigo-400/30',
          dioramaProp: (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-4 left-10 text-amber-300 text-xs animate-pulse">✨</div>
              <div className="absolute top-12 right-24 text-sky-200 text-sm animate-pulse" style={{ animationDelay: '0.7s' }}>⭐</div>
              <div className="absolute top-6 right-1/3 text-amber-200 text-xs animate-pulse" style={{ animationDelay: '1.2s' }}>✨</div>
              <div className="absolute top-4 right-8 w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/40 to-rose-400/40 blur-xs border border-amber-300/30" />
            </div>
          ),
        };
      case 'body':
        return {
          wrapper: 'bg-gradient-to-b from-rose-950 via-pink-900 to-amber-950 text-white',
          ground: 'bg-rose-900/50 border-t-2 border-rose-400/30',
          accent: 'border-rose-400/30',
          dioramaProp: (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-4 left-1/4 w-32 h-32 rounded-full bg-rose-500/20 blur-xl" />
              <div className="absolute top-8 right-1/4 w-28 h-28 rounded-full bg-amber-500/20 blur-xl" />
              <div className="absolute bottom-6 left-1/3 text-xl opacity-60">✨</div>
            </div>
          ),
        };
      case 'forest':
        return {
          wrapper: 'bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-900 text-white',
          ground: 'bg-emerald-900/50 border-t-2 border-emerald-400/30',
          accent: 'border-emerald-400/30',
          dioramaProp: (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-4 left-8 text-xl opacity-80">☀️</div>
              <div className="absolute top-10 right-16 text-emerald-300 text-base opacity-60">🍃</div>
              <div className="absolute top-6 right-1/3 text-emerald-200 text-sm opacity-50">🌿</div>
            </div>
          ),
        };
      case 'sky':
        return {
          wrapper: 'bg-gradient-to-b from-sky-950 via-blue-900 to-indigo-950 text-white',
          ground: 'bg-sky-900/50 border-t-2 border-sky-400/30',
          accent: 'border-sky-400/30',
          dioramaProp: (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-6 left-12 text-2xl opacity-60">☁️</div>
              <div className="absolute top-10 right-20 text-xl opacity-50">💨</div>
              <div className="absolute top-4 right-1/3 text-2xl opacity-40">✈️</div>
            </div>
          ),
        };
      case 'cyber':
        return {
          wrapper: 'bg-gradient-to-b from-slate-950 via-cyan-950 to-slate-900 text-white',
          ground: 'bg-cyan-900/40 border-t-2 border-cyan-400/40',
          accent: 'border-cyan-400/30',
          dioramaProp: (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-6 left-12 text-cyan-300 text-base opacity-70">🛡️</div>
              <div className="absolute top-8 right-24 text-cyan-200 text-sm opacity-80">🔒</div>
              <div className="absolute top-14 right-1/3 text-cyan-400 text-xs opacity-60">⚡</div>
            </div>
          ),
        };
      case 'city':
      case 'school':
      case 'kitchen':
      default:
        return {
          wrapper: 'bg-gradient-to-b from-slate-900 via-amber-950/60 to-slate-900 text-white',
          ground: 'bg-amber-900/40 border-t-2 border-amber-400/30',
          accent: 'border-amber-400/30',
          dioramaProp: (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-6 left-12 text-amber-200 text-base opacity-70">✨</div>
              <div className="absolute top-8 right-20 text-sky-200 text-base opacity-70">🎈</div>
            </div>
          ),
        };
    }
  };

  const theme = getThemeStyles();

  const handleOwnWordsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownWordsText.trim()) return;
    onSubmitAnswer(ownWordsText.trim());
  };

  return (
    <article aria-label={`Story Level ${level.levelNumber}`} className="bg-white rounded-3xl border-2 border-amber-200/90 shadow-xl overflow-hidden mb-6 animate-fadeIn">
      {/* 1. BIG PICTURE / SCENE (Primary Illustrated Visual Focus) */}
      <div className={`relative px-6 pt-6 pb-12 overflow-hidden transition-all duration-500 ${theme.wrapper}`}>
        {theme.dioramaProp}

        {/* Level & Phase Pill Header */}
        <div className="relative z-10 flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xs">
              {level.phaseLabel} • {level.title}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleSpeech}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black backdrop-blur-md transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                : 'bg-white/20 hover:bg-white/30 text-white border border-white/25'
            }`}
            title="Read story aloud"
            aria-label="Read story aloud"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Pause' : 'Read to Me'}</span>
          </button>
        </div>

        {/* The Illustrated Visual Stage: KIKI + Center Visual Props + Companion */}
        <div className="relative z-10 flex items-end justify-between sm:justify-around py-3 sm:py-6">
          {/* KIKI on the Left */}
          <div className="flex flex-col items-center">
            <KikiCharacter
              expression={level.kikiExpression}
              size="md"
            />
            <span className="mt-2 text-[11px] font-black tracking-wide px-2.5 py-0.5 rounded-full bg-white/25 backdrop-blur-xs text-white">
              KIKI
            </span>
          </div>

          {/* Center Visual Props / Vignette */}
          <div className="flex flex-col items-center justify-center max-w-[200px] sm:max-w-xs text-center mx-2">
            {/* Tapped Discovery Popup */}
            {tappedMsg && (
              <div className="mb-2 p-2 rounded-xl bg-amber-400 text-amber-950 font-black text-xs shadow-lg animate-bounce-subtle border-2 border-white max-w-xs">
                ✨ {tappedMsg}
              </div>
            )}

            <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
              {(level.sceneVisual.visualItems || []).map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleTapProp(item, idx)}
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 text-2xl sm:text-3xl shadow-lg transform transition-all cursor-pointer active:scale-95 ${
                    tappedItemIdx === idx
                      ? 'scale-125 bg-amber-300 text-slate-950 ring-4 ring-amber-400 animate-bounce-subtle'
                      : 'hover:scale-110 hover:bg-white/30 animate-float'
                  }`}
                  style={{ animationDelay: `${idx * 0.3}s` }}
                  title="Tap this clue!"
                  aria-label={`Clue ${item}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <span className="text-[10px] text-amber-200/90 font-bold mb-1">
              👆 Tap any clue to inspect!
            </span>

            {/* Character Action description pill */}
            {level.sceneVisual.characterAction && (
              <span className="text-[11px] sm:text-xs font-bold text-amber-200/90 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 max-w-xs truncate">
                {level.sceneVisual.characterAction}
              </span>
            )}
          </div>

          {/* Companion on the Right */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-md animate-float" style={{ animationDelay: '0.4s' }}>
              {companion.avatarEmoji}
            </div>
            <span className="mt-2 text-[11px] font-black tracking-wide px-2.5 py-0.5 rounded-full bg-white/25 backdrop-blur-xs text-white truncate max-w-[100px]">
              {companion.name.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* In-Scene Dialogue Speech Bubble */}
        {(level.kikiDialogue || level.characterDialogue) && (
          <div className="relative z-10 max-w-lg mx-auto mt-4 px-4 py-3 rounded-2xl bg-white/95 text-slate-900 border-2 border-amber-300 shadow-lg text-xs sm:text-sm font-bold text-center">
            {level.kikiDialogue && (
              <div>
                <span className="text-amber-700 block text-[10px] uppercase font-black tracking-wider">
                  KIKI says:
                </span>
                <p className="italic text-slate-800">“{level.kikiDialogue}”</p>
              </div>
            )}
            {level.characterDialogue && !level.kikiDialogue && (
              <div>
                <span className="text-sky-700 block text-[10px] uppercase font-black tracking-wider">
                  {level.characterSpeaker} says:
                </span>
                <p className="italic text-slate-800">“{level.characterDialogue}”</p>
              </div>
            )}
          </div>
        )}

        {/* Diorama Ground Horizon */}
        <div className={`absolute bottom-0 left-0 right-0 h-6 ${theme.ground}`} />
      </div>

      {/* 2. SHORT STORY / DIALOGUE CARD */}
      <div className="p-6 sm:p-8 bg-white border-b border-amber-100">
        {/* Discovery Hook Pill */}
        {level.keyDiscoveryHook && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-950 border border-amber-300 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{level.keyDiscoveryHook}</span>
          </div>
        )}

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3">
          {level.title}
        </h2>

        {/* 1 to 3 short story narrative lines */}
        <div className="space-y-3 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
          {level.shortNarration.map((sentence, idx) => (
            <p key={idx} className="tracking-wide">
              {sentence}
            </p>
          ))}
        </div>

        {/* Companion Speaker In-Story Dialogue (if both existed) */}
        {level.characterDialogue && level.kikiDialogue && (
          <div className="mt-5 p-3.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-center gap-3">
            <span className="text-2xl flex-shrink-0">{companion.avatarEmoji}</span>
            <div>
              <span className="block text-[11px] font-black text-sky-900 uppercase tracking-wider">
                {level.characterSpeaker}:
              </span>
              <p className="text-xs sm:text-sm font-bold text-sky-950 italic">
                “{level.characterDialogue}”
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 3. ONE SIMPLE INTERACTION SECTION */}
      <div className="p-6 sm:p-8 bg-amber-50/40">
        {/* SUCCESS BANNER & UNLOCK NEXT LEVEL */}
        {successFeedback ? (
          <div className="p-6 rounded-3xl bg-amber-100/90 border-2 border-amber-400 shadow-md animate-fadeIn text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <span className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-2xl shadow-sm flex-shrink-0">
                ⭐
              </span>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-950 bg-amber-300/80 px-2.5 py-0.5 rounded-md inline-block">
                  KIKI Discovery Star Awarded!
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  {successFeedback}
                </h4>
              </div>
            </div>

            <button
              type="button"
              onClick={onContinue}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-base flex items-center justify-center gap-2.5 shadow-lg shadow-amber-400/25 transition-all hover:scale-105 active:scale-95 cursor-pointer mx-auto sm:mx-0"
            >
              <span>Continue the Adventure</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        ) : activeScaffolding ? (
          /* "TRY AGAIN, DIFFERENTLY" (Adaptive Scaffolding) */
          <TryAgainDifferentlyView
            scaffolding={activeScaffolding}
            onRetrySubmit={onRetrySubmit}
            isLoading={isLoading}
          />
        ) : (
          /* ACTIVE INTERACTION: 1 SIMPLE STEP */
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {level.interactionType === 'discover_tap' ? 'Ready to Discover?' : level.prompt}
              </h3>

              {level.scaffoldingHint && (
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-200/70 hover:bg-amber-200 px-3 py-1.5 rounded-xl border border-amber-300 transition-all cursor-pointer flex-shrink-0"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>{showHint ? 'Hide Clue' : 'Need a Clue?'}</span>
                </button>
              )}
            </div>

            {/* Hint Drawer */}
            {showHint && level.scaffoldingHint && (
              <div className="p-4 rounded-2xl bg-amber-100/90 border border-amber-300 text-xs sm:text-sm font-semibold text-amber-950 mb-4 animate-fadeIn">
                💡 <strong>KIKI's Secret Clue:</strong> {level.scaffoldingHint}
              </div>
            )}

            {/* INTERACTION TYPE 1: DISCOVER TAP */}
            {level.interactionType === 'discover_tap' && (
              <div className="text-center py-2">
                <button
                  type="button"
                  onClick={() => onSubmitAnswer('tap_discover')}
                  disabled={isLoading}
                  className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-lg shadow-xl shadow-amber-400/30 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 disabled:opacity-60 cursor-pointer mx-auto"
                >
                  {isLoading ? (
                    <span>Discovering with KIKI...</span>
                  ) : (
                    <>
                      <span>{level.prompt || 'Let’s Find Out! 🚀'}</span>
                      <ArrowRight className="w-5 h-5 stroke-[3]" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* INTERACTION TYPE 2: MULTIPLE CHOICE / PREDICTION / MASTER */}
            {(level.interactionType === 'choice' ||
              level.interactionType === 'prediction' ||
              level.interactionType === 'master_choice') && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  {(level.options || [
                    'Observe carefully and test the pattern',
                    'Guess randomly without checking',
                  ]).map((option, idx) => {
                    const isSelected = selectedChoice === option;
                    const letterLabel = ['A', 'B', 'C', 'D'][idx] || '•';

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedChoice(option)}
                        className={`w-full p-4 rounded-2xl text-left border-2 text-sm sm:text-base font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-amber-500 bg-white text-amber-950 shadow-md ring-2 ring-amber-300'
                            : 'border-slate-200 bg-white text-slate-800 hover:border-amber-300 hover:bg-amber-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${
                              isSelected
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {letterLabel}
                          </span>
                          <span>{option}</span>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500 text-white'
                              : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => selectedChoice && onSubmitAnswer(selectedChoice)}
                    disabled={isLoading || !selectedChoice}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-base shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-amber-950/30 border-t-amber-950 rounded-full animate-spin" />
                        <span>KIKI is checking...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Answer</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* INTERACTION TYPE 3: EXPLAIN IT IN YOUR OWN WORDS */}
            {level.interactionType === 'own_words' && (
              <form onSubmit={handleOwnWordsSubmit} className="space-y-4">
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-sky-950 font-medium">
                    KIKI is listening! Tell KIKI in your own words how it works. Don't worry about spelling or grammar—just share what you discovered!
                  </p>
                </div>

                <textarea
                  value={ownWordsText}
                  onChange={(e) => setOwnWordsText(e.target.value)}
                  placeholder="Tell KIKI: How does this work?..."
                  rows={3}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none text-slate-900 text-sm sm:text-base font-medium placeholder-slate-400 transition-all resize-none bg-white"
                />

                <button
                  type="submit"
                  disabled={isLoading || !ownWordsText.trim()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-base shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-amber-950/30 border-t-amber-950 rounded-full animate-spin" />
                      <span>KIKI is listening...</span>
                    </>
                  ) : (
                    <>
                      <span>Teach KIKI 💬</span>
                      <Send className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
