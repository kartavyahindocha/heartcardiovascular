import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import {
  BarChart3, TrendingUp, Users, Target, Activity, CheckCircle2,
  AlertCircle, Scale, ShieldCheck, FileSpreadsheet, Cpu, Layers
} from 'lucide-react';

export default function AnalyticsView() {
  // Model Metrics & Confusion Matrix Data
  const modelMetrics = {
    trainScore: '71.93%',
    testScore: '72.31%',
    scoreDiff: '0.38%',
    fitStatus: 'Good Fit',
    accuracy: '72.31%',
    precision: '74.52%',
    recall: '67.97%',
    f1Score: '71.09%',
    confusionMatrix: {
      tn: 5358, // True Negative
      fp: 1630, // False Positive
      fn: 2246, // False Negative
      tp: 4766, // True Positive
      total: 14000
    }
  };

  // Chart Data 1: Risk Distribution by Age Group
  const ageData = [
    { ageGroup: '30-39 Yrs', lowRisk: 78, highRisk: 22 },
    { ageGroup: '40-49 Yrs', lowRisk: 62, highRisk: 38 },
    { ageGroup: '50-59 Yrs', lowRisk: 45, highRisk: 55 },
    { ageGroup: '60+ Yrs', lowRisk: 31, highRisk: 69 },
  ];

  // Chart Data 2: Systolic BP Impact Curve
  const bpData = [
    { bp: '100', incidence: 14 },
    { bp: '120', incidence: 28 },
    { bp: '140', incidence: 54 },
    { bp: '160', incidence: 76 },
    { bp: '180', incidence: 91 },
  ];

  // Chart Data 3: Lifestyle Factor Multiplier Correlation
  const lifestyleData = [
    { factor: 'Non-Smoker + Active', ratio: 1.0 },
    { factor: 'Smoker + Inactive', ratio: 2.4 },
    { factor: 'High Cholesterol', ratio: 2.1 },
    { factor: 'High Glucose', ratio: 1.8 },
  ];

  // Chart Data 4: BMI Spectrum Share
  const bmiSpectrumData = [
    { name: 'Normal (18.5-24.9)', value: 36, color: '#10b981' },
    { name: 'Overweight (25-29.9)', value: 41, color: '#38bdf8' },
    { name: 'Obese Class 1 (30-34.9)', value: 17, color: '#f59e0b' },
    { name: 'Obese Class 2+ (35+)', value: 6, color: '#ef4444' },
  ];

  return (
    <div className="space-y-10 py-4 animate-fade-in">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Cpu className="w-3.5 h-3.5" /> Machine Learning Validation & Intelligence
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100 flex items-center justify-center gap-2">
          <span>📊 Model Evaluation & Analytics Dashboard</span>
        </h2>
        <p className="text-slate-400 text-sm">
          Comprehensive performance evaluation, confusion matrix breakdown, overfit/underfit diagnostics, and clinical metrics trained on 70,000 patient records.
        </p>
      </div>

      {/* Top Metric Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <div className="glass-card p-5 border border-slate-700/60 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Test Accuracy</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-emerald-400">{modelMetrics.accuracy}</div>
          <div className="text-[11px] text-slate-400 mt-1">14,000 Test Records</div>
        </div>

        <div className="glass-card p-5 border border-slate-700/60 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Precision Score</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-cyan-400">{modelMetrics.precision}</div>
          <div className="text-[11px] text-slate-400 mt-1">Positive Predictive Value</div>
        </div>

        <div className="glass-card p-5 border border-slate-700/60 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Recall (Sensitivity)</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-indigo-400">{modelMetrics.recall}</div>
          <div className="text-[11px] text-slate-400 mt-1">True Positive Detection</div>
        </div>

        <div className="glass-card p-5 border border-slate-700/60 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">F1-Score</span>
            <Scale className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-amber-400">{modelMetrics.f1Score}</div>
          <div className="text-[11px] text-slate-400 mt-1">Harmonic Mean</div>
        </div>
      </div>

      {/* Model Fit Comparison & Confusion Matrix Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        
        {/* 1. Train Score vs Test Score & Overfit / Underfit Diagnostics */}
        <div className="glass-card p-6 border border-slate-700/60 rounded-3xl space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Scale className="w-5 h-5 text-cyan-400" />
                Train Score vs Test Score Evaluation
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {modelMetrics.fitStatus}
              </span>
            </div>

            {/* Score Comparison Bars */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-slate-300">Train Score (Training Accuracy)</span>
                  <span className="text-cyan-400 font-bold">{modelMetrics.trainScore}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-cyan-500 h-3 rounded-full transition-all duration-500" style={{ width: '71.93%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-slate-300">Test Score (Testing Accuracy)</span>
                  <span className="text-emerald-400 font-bold">{modelMetrics.testScore}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-emerald-500 h-3 rounded-full transition-all duration-500" style={{ width: '72.31%' }} />
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span>Score Difference:</span>
                <span className="text-emerald-400">{modelMetrics.scoreDiff}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The training score ({modelMetrics.trainScore}) and testing score ({modelMetrics.testScore}) are virtually identical (difference: {modelMetrics.scoreDiff}), proving the model generalizes effectively without memorize-based overfitting or underfitting.
              </p>
            </div>
          </div>

          {/* Diagnostic Rules Cards */}
          <div className="grid grid-cols-3 gap-2.5 text-center text-[11px] pt-2">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-slate-300">
              <span className="block font-bold text-rose-400">Overfitting</span>
              <span>Train &gt; Test Score</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-300">
              <span className="block font-bold text-amber-400">Underfitting</span>
              <span>Test &gt; Train Score</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-slate-100 font-semibold ring-1 ring-emerald-500/50">
              <span className="block font-bold text-emerald-400">Good Fit ✓</span>
              <span>Train ≈ Test Score</span>
            </div>
          </div>
        </div>

        {/* 2. Confusion Matrix Showcase Grid */}
        <div className="glass-card p-6 border border-slate-700/60 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Confusion Matrix Showcase
            </h3>
            <span className="text-xs text-slate-400 font-medium">N = 14,000 Samples</span>
          </div>

          <p className="text-xs text-slate-400">
            Evaluating true vs predicted classification results across non-cardio (0) and cardio disease (1) cohorts.
          </p>

          {/* Matrix Grid */}
          <div className="grid grid-cols-2 gap-3.5 pt-1">
            
            {/* True Negative (TN) */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase tracking-wider">
                <span>True Negative (TN)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <div className="text-2xl font-black text-emerald-400">{modelMetrics.confusionMatrix.tn.toLocaleString()}</div>
              <div className="text-[11px] text-slate-300">Correctly Predicted Healthy</div>
            </div>

            {/* False Positive (FP) */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase tracking-wider">
                <span>False Positive (FP)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              </div>
              <div className="text-2xl font-black text-amber-400">{modelMetrics.confusionMatrix.fp.toLocaleString()}</div>
              <div className="text-[11px] text-slate-300">False Alarm (Predicted Disease)</div>
            </div>

            {/* False Negative (FN) */}
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs text-rose-400 font-bold uppercase tracking-wider">
                <span>False Negative (FN)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              </div>
              <div className="text-2xl font-black text-rose-400">{modelMetrics.confusionMatrix.fn.toLocaleString()}</div>
              <div className="text-[11px] text-slate-300">Missed Diagnosis</div>
            </div>

            {/* True Positive (TP) */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-bold uppercase tracking-wider">
                <span>True Positive (TP)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              </div>
              <div className="text-2xl font-black text-cyan-400">{modelMetrics.confusionMatrix.tp.toLocaleString()}</div>
              <div className="text-[11px] text-slate-300">Correctly Predicted Disease</div>
            </div>

          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <span>Accuracy = (TP + TN) / Total</span>
            <span className="font-bold text-cyan-400">{((5358 + 4766) / 14000 * 100).toFixed(2)}%</span>
          </div>
        </div>

      </div>

      {/* Interactive Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        
        {/* Chart 1: Age Distribution */}
        <div className="glass-card p-6 border border-slate-700/60 rounded-3xl">
          <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Risk Distribution by Age Group (%)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="ageGroup" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Legend />
                <Bar dataKey="lowRisk" name="Low Risk %" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="highRisk" name="High Risk %" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Systolic BP Impact */}
        <div className="glass-card p-6 border border-slate-700/60 rounded-3xl">
          <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Impact of Systolic Blood Pressure (mmHg)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bpData}>
                <defs>
                  <linearGradient id="colorIncidence" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="bp" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="incidence" name="Incidence %" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorIncidence)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Interactive Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        
        {/* Chart 3: Lifestyle Correlation */}
        <div className="glass-card p-6 border border-slate-700/60 rounded-3xl">
          <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Lifestyle Risk Multipliers
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lifestyleData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="factor" type="category" stroke="#94a3b8" fontSize={11} width={130} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Bar dataKey="ratio" name="Risk Ratio" fill="#38bdf8" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: BMI Spectrum Pie */}
        <div className="glass-card p-6 border border-slate-700/60 rounded-3xl">
          <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            Body Mass Index (BMI) Spectrum Share (%)
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bmiSpectrumData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bmiSpectrumData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
