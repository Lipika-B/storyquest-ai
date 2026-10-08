'use client';

import React from 'react';
import { LearningReport } from '@/lib/types/quest';
import { 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Printer, 
  ArrowLeft, 
  Sparkles, 
  Quote, 
  Target,
  BookOpen,
  Brain
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

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'Mastered':
      case 'Strong':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Developing':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      default:
        return 'bg-amber-100 text-amber-900 border-amber-300';
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

        {/* AI Learning Plan Card (Subtle AI Badge) */}
        {report.learningPlan && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border-2 border-slate-200/90 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  <span>KIKI's AI Learning Plan</span>
                </span>
                <span className="text-xs text-slate-500 font-bold capitalize">
                  {report.learningPlan.subjectCategory} • {report.learningPlan.appropriateDifficulty} Difficulty
                </span>
              </div>
              <BookOpen className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-1">
                  Pedagogical Objectives (Age {report.childAge}):
                </span>
                <ul className="space-y-1">
                  {report.learningPlan.learningObjectives.map((obj, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-800 font-medium flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <strong className="text-slate-800">Age-Adapted Vocabulary:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {report.learningPlan.ageAppropriateVocabulary.map((v, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-bold text-[11px]">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong className="text-slate-800">Likely Misconceptions Monitored:</strong>
                  <p className="text-[11px] text-slate-600 mt-1 italic leading-relaxed">
                    {report.learningPlan.likelyMisconceptions.join('; ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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

        {/* Concept Understanding Profile (4 Dimensions) */}
        {report.understandingProfile && report.understandingProfile.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Concept Understanding Profile
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.understandingProfile.map((dim, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-slate-900">{dim.dimension}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${getRatingBadge(dim.rating)}`}>
                      {dim.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {dim.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 1: Concepts Demonstrated with Direct Evidence (Verbatim Excerpts) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Concepts Demonstrated (with Understanding Evidence)</span>
            </h2>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              ✨ Understanding Evidence
            </span>
          </div>

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

        {/* Section 2: Concepts Needing Reinforcement & AI-Identified Misconceptions */}
        {report.conceptsNeedingReinforcement && report.conceptsNeedingReinforcement.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>Areas for Gentle Reinforcement</span>
              </h2>
              <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                ✨ AI-Identified Misconception
              </span>
            </div>

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

        {/* Adaptive Teaching Strategy (How KIKI Adapted) */}
        {report.howKikiAdapted && (
          <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border border-indigo-200 mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-900">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>How KIKI Adapted to {report.childName}</span>
              </div>
              <span className="text-[11px] font-bold text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                ✨ Adaptive Explanation
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
              {report.howKikiAdapted}
            </p>
          </div>
        )}

        {/* Parent / Teacher Takeaway */}
        {report.parentTeacherTakeaway && (
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-100/60 border border-amber-300 mb-8">
            <div className="text-xs font-black uppercase tracking-wider text-amber-950 mb-1.5 flex items-center gap-2">
              <span>🎓</span>
              <span>Parent & Teacher Key Takeaway</span>
            </div>
            <p className="text-sm sm:text-base text-slate-900 font-semibold leading-relaxed">
              {report.parentTeacherTakeaway}
            </p>
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
