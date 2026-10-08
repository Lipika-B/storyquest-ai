'use client';

import React from 'react';
import { LearningReport } from '@/lib/types/quest';
import { 
  BarChart3, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Printer, 
  ArrowLeft, 
  Sparkles, 
  Quote, 
  Calendar,
  Target
} from 'lucide-react';
import { KikiCharacter } from '../kiki/KikiCharacter';

interface LearningReportViewProps {
  report: LearningReport;
  onBackToStudio: () => void;
}

export const LearningReportView: React.FC<LearningReportViewProps> = ({
  report,
  onBackToStudio,
}) => {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const getMasteryColor = (mastery: LearningReport['estimatedMastery']) => {
    switch (mastery) {
      case 'Mastered Concept':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Strong Understanding':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Developing Understanding':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'Beginning Exploration':
        return 'bg-purple-100 text-purple-900 border-purple-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Print & Back Controls */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <button
          onClick={onBackToStudio}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to KIKI Studio</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-2xl shadow-xs transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF Report</span>
        </button>
      </div>

      {/* Main Report Card */}
      <article className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm print:border-none print:shadow-none">
        {/* Header with KIKI Mascot */}
        <div className="border-b border-slate-200 pb-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-sm shadow-xs">
                🌟
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-amber-900">
                KIKI • Learning Insights & Diagnostic Snapshot
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Learning Report: {report.childName}
            </h1>

            <div className="flex flex-wrap items-center gap-2.5 mt-2.5 text-xs font-bold text-slate-600">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                Age: {report.childAge} ({report.ageBandLabel})
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                Topic: <strong>{report.topic}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-200">
                ⭐ {report.totalStars} Discovery Stars
              </span>
            </div>
          </div>

          <div className="hidden sm:block flex-shrink-0">
            <KikiCharacter expression="cheering" size="sm" />
          </div>
        </div>

        {/* Learning Goal vs Estimated Understanding */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/60 border border-amber-200 mb-8">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-900 mb-2">
            <Target className="w-4 h-4 text-amber-600" />
            <span>Target Learning Goal</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-amber-950 mb-4">
            “{report.learningGoal}”
          </p>

          <div className="pt-3 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
              Estimated Understanding Level
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${getMasteryColor(report.estimatedMastery)}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{report.estimatedMastery}</span>
            </span>
          </div>

          <p className="mt-3 text-sm text-slate-800 font-medium leading-relaxed">
            {report.masterySummary}
          </p>

          <p className="mt-3 text-[11px] text-slate-500 italic">
            * Note for parents & educators: This estimate is derived from how the child reasoned during interactive story checkpoints, not a formal standardized exam.
          </p>
        </div>

        {/* Section 1: Concepts Demonstrated with Direct Evidence */}
        <div className="mb-8">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Concepts Demonstrated (with Verbatim Evidence from Child)</span>
          </h2>

          <div className="space-y-3">
            {report.conceptsDemonstrated.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200">
                <div className="font-black text-sm text-emerald-950 mb-1.5">
                  {item.concept}
                </div>
                <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs sm:text-sm font-semibold text-slate-800 mb-2 flex items-start gap-2">
                  <Quote className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{item.evidenceQuote}</span>
                </div>
                <p className="text-xs font-medium text-emerald-900">
                  <strong>Diagnostic Observation:</strong> {item.observation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Concepts Needing Reinforcement */}
        {report.conceptsNeedingReinforcement && report.conceptsNeedingReinforcement.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>Areas for Gentle Reinforcement</span>
            </h2>

            <div className="space-y-3">
              {report.conceptsNeedingReinforcement.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <div className="font-black text-sm text-amber-950 mb-1">
                    {item.concept}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 font-medium mb-2">
                    <strong>Observed Hurdle:</strong> {item.diagnosedHurdle}
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-amber-200 text-xs text-amber-950 font-semibold">
                    💡 <strong>KIKI's Recommendation:</strong> {item.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Cognitive & Learning Style Observations */}
        {report.cognitiveObservations && report.cognitiveObservations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-sky-600" />
              <span>Learning Behavior & Engagement Observations</span>
            </h2>

            <ul className="space-y-2">
              {report.cognitiveObservations.map((obs, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Section 4: Suggested Next Learning Activities */}
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>Suggested Next Learning Activities (Real-World & Offline)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.suggestedNextActivities.map((act, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {act.type === 'home_experiment' ? '🔬 Hands-On Experiment' : act.type === 'hands_on_game' ? '🎲 Physical Game' : '💬 Bedtime Chat'}
                    </span>
                  </div>
                  <h3 className="font-black text-sm text-slate-900 mb-1">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-700 mb-3 leading-relaxed font-medium">
                    {act.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] font-semibold text-amber-900">
                  <strong>Why it helps:</strong> {act.whyItHelps}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Footer Return Button */}
      <div className="text-center mt-8 print:hidden">
        <button
          onClick={onBackToStudio}
          className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-md transition-all cursor-pointer"
        >
          Create Another Learning Adventure with KIKI
        </button>
      </div>
    </div>
  );
};
