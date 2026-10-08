'use client';

import React from 'react';
import { StoryChapter } from '@/lib/types/quest';
import { Sparkles, MessageCircle, Lightbulb } from 'lucide-react';

interface StoryChapterViewProps {
  chapter: StoryChapter;
}

export const StoryChapterView: React.FC<StoryChapterViewProps> = ({ chapter }) => {
  return (
    <article className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-6">
      {/* Chapter Title Badge */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-2xl shadow-inner animate-float">
          {chapter.badgeEmoji}
        </span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
            Chapter {chapter.chapterNumber}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            {chapter.title}
          </h2>
        </div>
      </div>

      {/* Concept Discovery Pill */}
      {chapter.keyConceptHighlight && (
        <div className="mb-6 p-3.5 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200/80 rounded-2xl flex items-center gap-3 text-xs sm:text-sm text-sky-950 font-semibold shadow-xs">
          <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <span>{chapter.keyConceptHighlight}</span>
        </div>
      )}

      {/* Story Narrative Paragraphs */}
      <div className="space-y-4 text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
        {chapter.storyText.map((paragraph, idx) => (
          <p key={idx} className="tracking-wide">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Character In-Story Dialogue Hook */}
      {chapter.checkpoint.characterDialogue && (
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-xl shadow-xs flex-shrink-0">
            {chapter.badgeEmoji}
          </div>
          <div>
            <span className="block text-xs font-bold text-amber-900 uppercase tracking-wider">
              {chapter.checkpoint.characterSpeaker} says:
            </span>
            <p className="text-sm sm:text-base font-semibold text-amber-950 mt-1 italic">
              {chapter.checkpoint.characterDialogue}
            </p>
          </div>
        </div>
      )}
    </article>
  );
};
