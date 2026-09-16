import React from 'react';
import { Activity, Scale, HeartPulse, ShieldAlert } from 'lucide-react';

export default function HealthBreakdown({ details = {}, riskScore = 0, riskLevel = 'Low' }) {
  const bmi = details?.bmi || 22.0;
  const bpCategory = details?.bp_category || 'Normal';
  const dataSource = details?.data_source || 'FastAPI Model Engine';

  // Calculate BMI bar percentage (bounded between 10% and 100%)
  const bmiPercent = Math.min(Math.max(((bmi - 15) / 25) * 100, 10), 100);

  // Determine BMI category label
  let bmiCategoryLabel = 'Normal Weight';
  if (bmi < 18.5) bmiCategoryLabel = 'Underweight';
  else if (bmi >= 25 && bmi < 30) bmiCategoryLabel = 'Overweight';
  else if (bmi >= 30) bmiCategoryLabel = 'Obese';

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Progress Bars Container */}
      <div className="glass-card p-6 border border-slate-700/60 rounded-2xl">
        <h4 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          Clinical Biomarker Analysis
        </h4>

        {/* BMI Progress Bar */}
        <div className="mb-5">
          <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
            <span className="text-slate-200">Body Mass Index (BMI): <strong className="text-cyan-400">{bmi}</strong></span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {bmiCategoryLabel}
            </span>
          </div>
          <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400"
              style={{ width: `${bmiPercent}%` }}
            />
          </div>
        </div>

        {/* Risk Level Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
            <span className="text-slate-200">Overall Cardiovascular Risk: <strong className="text-cyan-400">{riskScore}%</strong></span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase border ${
              riskLevel === 'Low' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
              riskLevel === 'Moderate' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
              'bg-red-500/20 text-red-400 border-red-500/30'
            }`}>
              {riskLevel} Risk Tier
            </span>
          </div>
          <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                riskLevel === 'Low' ? 'from-emerald-500 to-teal-400' :
                riskLevel === 'Moderate' ? 'from-amber-500 to-yellow-400' :
                'from-rose-600 to-red-500'
              }`}
              style={{ width: `${riskScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-5 border border-slate-700/60 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs uppercase font-semibold text-slate-400 tracking-wide">
              Body Mass Index (BMI)
            </div>
            <div className="text-xl font-extrabold text-slate-100 mt-0.5">
              {bmi} <span className="text-xs font-normal text-slate-400">({bmiCategoryLabel})</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 border border-slate-700/60 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs uppercase font-semibold text-slate-400 tracking-wide">
              Blood Pressure Classification
            </div>
            <div className="text-xl font-extrabold text-slate-100 mt-0.5">
              {bpCategory}
            </div>
          </div>
        </div>
      </div>

      {/* Engine Attribution & Disclaimer */}
      <div className="text-center p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex justify-center items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>Trained Engine: <strong className="text-slate-300">{dataSource}</strong></span>
      </div>
    </div>
  );
}
