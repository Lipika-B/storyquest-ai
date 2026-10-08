'use client';

import React from 'react';

export type KikiExpression = 'happy' | 'thinking' | 'curious' | 'cheering' | 'explaining';

interface KikiCharacterProps {
  expression?: KikiExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showDialogue?: string;
}

export const KikiCharacter: React.FC<KikiCharacterProps> = ({
  expression = 'happy',
  size = 'md',
  className = '',
  showDialogue,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-40 sm:h-40',
    xl: 'w-44 h-44 sm:w-52 sm:h-52',
  };

  const getEyeExpression = () => {
    switch (expression) {
      case 'thinking':
        return (
          <>
            {/* Left eye looking up */}
            <circle cx="38" cy="46" r="5" fill="#1e293b" />
            <circle cx="39" cy="44" r="2" fill="#ffffff" />
            {/* Right eye squinting slightly */}
            <path d="M 58 48 Q 63 43 68 48" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        );
      case 'curious':
        return (
          <>
            {/* Wide sparkling curious eyes */}
            <circle cx="38" cy="48" r="6" fill="#1e293b" />
            <circle cx="40" cy="46" r="2.5" fill="#ffffff" />
            <circle cx="64" cy="48" r="7" fill="#1e293b" />
            <circle cx="66.5" cy="45.5" r="3" fill="#ffffff" />
          </>
        );
      case 'cheering':
        return (
          <>
            {/* Happy arch eyes ^ ^ */}
            <path d="M 33 50 Q 38 42 43 50" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 59 50 Q 64 42 69 50" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        );
      case 'explaining':
        return (
          <>
            <circle cx="38" cy="48" r="5.5" fill="#1e293b" />
            <circle cx="39.5" cy="46" r="2" fill="#ffffff" />
            <circle cx="64" cy="48" r="5.5" fill="#1e293b" />
            <circle cx="65.5" cy="46" r="2" fill="#ffffff" />
          </>
        );
      case 'happy':
      default:
        return (
          <>
            <circle cx="38" cy="48" r="5.5" fill="#1e293b" />
            <circle cx="40" cy="46" r="2" fill="#ffffff" />
            <circle cx="64" cy="48" r="5.5" fill="#1e293b" />
            <circle cx="66" cy="46" r="2" fill="#ffffff" />
          </>
        );
    }
  };

  const getMouthExpression = () => {
    switch (expression) {
      case 'cheering':
        return (
          // Big joyful open mouth with tongue
          <g>
            <path d="M 43 57 Q 51 71 59 57 Z" fill="#e11d48" />
            <path d="M 47 62 Q 51 68 55 62" fill="#fb7185" />
          </g>
        );
      case 'thinking':
        return (
          // Small wondering mouth o
          <ellipse cx="51" cy="58" rx="3.5" ry="4" fill="#be123c" />
        );
      case 'curious':
        return (
          // Curious smile
          <path d="M 44 57 Q 52 64 58 58" stroke="#be123c" strokeWidth="3" strokeLinecap="round" fill="none" />
        );
      case 'explaining':
      case 'happy':
      default:
        return (
          // Friendly open smile
          <path d="M 42 56 Q 51 67 60 56" stroke="#be123c" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        );
    }
  };

  const getHandGestures = () => {
    if (expression === 'cheering') {
      return (
        <>
          {/* Hands raised high cheering! */}
          <ellipse cx="18" cy="38" rx="6" ry="8" fill="#38bdf8" transform="rotate(-25 18 38)" />
          <ellipse cx="84" cy="38" rx="6" ry="8" fill="#38bdf8" transform="rotate(25 84 38)" />
        </>
      );
    } else if (expression === 'thinking') {
      return (
        <>
          {/* Hand to cheek */}
          <ellipse cx="24" cy="62" rx="6" ry="7" fill="#38bdf8" />
          <ellipse cx="64" cy="62" rx="6" ry="7" fill="#38bdf8" transform="rotate(-30 64 62)" />
        </>
      );
    }
    // Resting friendly little hands
    return (
      <>
        <ellipse cx="20" cy="62" rx="6" ry="8" fill="#38bdf8" transform="rotate(15 20 62)" />
        <ellipse cx="82" cy="62" rx="6" ry="8" fill="#38bdf8" transform="rotate(-15 82 62)" />
      </>
    );
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble (if provided) */}
      {showDialogue && (
        <div className="mb-2 max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl bg-white border-2 border-amber-300 shadow-md text-amber-950 text-xs sm:text-sm font-bold text-center animate-bounce-subtle relative">
          <span>{showDialogue}</span>
          <div className="w-3 h-3 bg-white border-r-2 border-b-2 border-amber-300 transform rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
        </div>
      )}

      {/* Animated KIKI Mascot SVG */}
      <div className={`${sizeMap[size]} animate-kiki-float drop-shadow-md`}>
        <svg viewBox="0 0 102 102" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Glowing gradient for body */}
            <linearGradient id="kikiBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            {/* Belly highlight */}
            <radialGradient id="kikiBelly" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.1" />
            </radialGradient>
            {/* Little golden star on antenna */}
            <radialGradient id="kikiStar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#eab308" />
            </radialGradient>
          </defs>

          {/* Little Antenna Stalk */}
          <path d="M 51 24 Q 48 14 51 8" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" fill="none" />
          
          {/* Glowing Golden Star on Top */}
          <g transform="translate(51, 8)">
            <polygon 
              points="0,-7 2,-2 7,-2 3,2 5,7 0,4 -5,7 -3,2 -7,-2 -2,-2" 
              fill="url(#kikiStar)"
              className="animate-spin-slow origin-center" 
            />
          </g>

          {/* Little Feet */}
          <ellipse cx="40" cy="85" rx="8" ry="5" fill="#0369a1" />
          <ellipse cx="62" cy="85" rx="8" ry="5" fill="#0369a1" />

          {/* Hands */}
          {getHandGestures()}

          {/* Main Round Body */}
          <circle cx="51" cy="54" r="32" fill="url(#kikiBody)" />

          {/* Belly Soft Glow */}
          <ellipse cx="51" cy="62" rx="18" ry="14" fill="url(#kikiBelly)" />

          {/* Rosy Cheeks */}
          <ellipse cx="30" cy="54" rx="5" ry="3.5" fill="#f43f5e" opacity="0.45" />
          <ellipse cx="72" cy="54" rx="5" ry="3.5" fill="#f43f5e" opacity="0.45" />

          {/* Eyes */}
          {getEyeExpression()}

          {/* Mouth */}
          {getMouthExpression()}
        </svg>
      </div>

      {/* Little Shadow */}
      <div className="w-12 h-2.5 bg-slate-900/10 rounded-full blur-[2px] mt-0.5" />
    </div>
  );
};
