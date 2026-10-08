'use client';

import React, { useState } from 'react';
import { playSuccessChime } from '@/lib/utils/audio';
import { Sparkles, Lightbulb, Power } from 'lucide-react';

interface FlashlightShadowGameProps {
  onComplete: () => void;
}

export const FlashlightShadowGame: React.FC<FlashlightShadowGameProps> = ({ onComplete }) => {
  // Flashlight elevation angle: 15 (low) to 85 (high overhead)
  const [angle, setAngle] = useState<number>(30);
  const [isOn, setIsOn] = useState<boolean>(true);
  const [hasMovedLow, setHasMovedLow] = useState<boolean>(false);
  const [hasMovedHigh, setHasMovedHigh] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Compute shadow width: low angle = long shadow, high angle = short shadow
  // angle 15 -> shadowWidth ~ 180px, angle 85 -> shadowWidth ~ 25px
  const shadowWidth = isOn ? Math.max(20, Math.round(200 - angle * 2.1)) : 0;
  const shadowOpacity = isOn ? Math.max(0.3, (90 - angle) / 90) : 0;

  // Flashlight position coordinates in SVG
  const lightX = 40;
  const lightY = 160 - angle * 1.4;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setAngle(val);
    if (val <= 25) setHasMovedLow(true);
    if (val >= 70) setHasMovedHigh(true);

    if ((val <= 25 && hasMovedHigh) || (val >= 70 && hasMovedLow) || (hasMovedLow && hasMovedHigh)) {
      if (!isCompleted) {
        setIsCompleted(true);
        playSuccessChime();
        onComplete();
      }
    }
  };

  const handleToggleLight = () => {
    playSuccessChime();
    setIsOn(!isOn);
  };

  return (
    <div className="bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 border-2 border-indigo-400 rounded-3xl p-5 sm:p-7 shadow-lg my-4 text-white animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔦</span>
          <div>
            <h4 className="text-base sm:text-lg font-black text-amber-300">
              Mini-Game: Slide the Flashlight & Watch the Shadow!
            </h4>
            <p className="text-xs text-indigo-200 font-bold">
              Move the flashlight higher and lower. Watch what happens to the shadow on the ground!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggleLight}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            isOn
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          <Power className="w-3.5 h-3.5" />
          <span>{isOn ? 'Light ON' : 'Light OFF'}</span>
        </button>
      </div>

      {/* Interactive SVG Diorama Stage */}
      <div className="relative bg-slate-950/80 border-2 border-indigo-500/40 rounded-2xl p-4 overflow-hidden min-h-[220px] flex items-center justify-center">
        <svg width="100%" height="200" viewBox="0 0 400 200" className="max-w-lg">
          {/* Ground floor line */}
          <line x1="20" y1="160" x2="380" y2="160" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />

          {/* Flashlight Light Beam Rays (if light is ON) */}
          {isOn && (
            <polygon
              points={`${lightX},${lightY} 180,110 180,160 ${180 + shadowWidth},160`}
              fill="rgba(253, 224, 71, 0.25)"
              className="transition-all duration-150"
            />
          )}

          {/* Flashlight Icon / Graphic */}
          <g transform={`translate(${lightX - 20}, ${lightY - 15})`} className="cursor-pointer" onClick={handleToggleLight}>
            <rect x="0" y="8" width="28" height="14" rx="3" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="28,4 38,0 38,30 28,26" fill="#f59e0b" />
            {isOn && (
              <circle cx="42" cy="15" r="10" fill="#fef08a" opacity="0.8" className="animate-pulse" />
            )}
          </g>

          {/* Solid Opaque Block (Blocking the Light) */}
          <g transform="translate(170, 110)">
            <rect x="0" y="0" width="35" height="50" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <text x="17" y="32" fontSize="22" textAnchor="middle" fill="#0f172a" fontWeight="bold">
              🧱
            </text>
          </g>

          {/* Dynamic Cast Shadow on the Ground */}
          {isOn && (
            <ellipse
              cx={205 + shadowWidth / 2}
              cy="162"
              rx={shadowWidth / 2}
              ry="6"
              fill="#000000"
              opacity={shadowOpacity}
              className="transition-all duration-150 filter blur-xs"
            />
          )}

          {/* Shadow Length Label */}
          {isOn && (
            <text
              x={205 + shadowWidth / 2}
              y="180"
              fontSize="11"
              fill="#fde047"
              fontWeight="bold"
              textAnchor="middle"
            >
              Shadow: {shadowWidth > 120 ? 'Super Long! ↔️' : shadowWidth < 60 ? 'Short! ↕️' : 'Medium'}
            </text>
          )}

          {!isOn && (
            <text x="200" y="90" fontSize="13" fill="#94a3b8" fontWeight="bold" textAnchor="middle">
              Light is off! No shadow exists without light! 🌑
            </text>
          )}
        </svg>
      </div>

      {/* Interactive Flashlight Angle Controls */}
      <div className="mt-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label htmlFor="angle-slider" className="text-xs font-bold text-indigo-200">
            Flashlight Elevation / Height:{' '}
            <span className="text-amber-300 font-black">
              {angle < 30 ? 'Low Horizon 🌅' : angle > 65 ? 'High Overhead ☀️' : 'Middle Angle ⛅'}
            </span>
          </label>
          <span className="text-[11px] text-indigo-300 font-mono">{angle}° Elevation</span>
        </div>

        <input
          id="angle-slider"
          type="range"
          min="15"
          max="85"
          value={angle}
          onChange={handleSliderChange}
          disabled={!isOn}
          className="w-full h-3 bg-indigo-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />

        {/* Discovery Insight */}
        <div className="p-3 rounded-xl bg-indigo-900/60 border border-indigo-400/40 text-xs font-bold text-indigo-100 flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
          <p>
            <strong>What you discovered:</strong> Light beams travel in straight lines! When the solid block gets in the way, it blocks the beam. When the light is low, the shadow stretches far across the ground!
          </p>
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="mt-3 p-3 rounded-2xl bg-amber-400 text-slate-950 border border-amber-300 flex items-center justify-between gap-2 font-black text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-950" />
            <span>Bravo! You proved why shadows stretch long when the light is low!</span>
          </div>
          <span className="px-2 py-0.5 bg-amber-200 rounded-md text-amber-950">
            Star Earned! ⭐
          </span>
        </div>
      )}
    </div>
  );
};
