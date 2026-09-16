import React from 'react';
import Heart3D from '../components/Heart3D';
import { Cpu, BarChart2, Zap, ArrowRight, ShieldCheck, Database, SlidersHorizontal } from 'lucide-react';

export default function HomeView({ onStartAssessment }) {
  return (
    <div className="space-y-12 py-6 animate-fade-in">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden glass-card p-8 md:p-12 text-center max-w-4xl mx-auto border border-slate-700/60 rounded-3xl shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Zap className="w-3.5 h-3.5" /> Next-Gen Medical ML Intelligence
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight gradient-title leading-tight mb-4">
          Advanced Cardiovascular Health Assessment
        </h1>
        
        <p className="text-slate-300 md:text-lg max-w-2xl mx-auto leading-relaxed">
          CardioHealth AI evaluates key clinical risk factors with a standardized Machine Learning engine trained on 70,000+ patient records, delivering instant risk assessment scores and actionable insights.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={onStartAssessment}
            className="px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-cyan-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
          >
            🩺 Launch Risk Assessment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3D Interactive WebGL Heart Canvas */}
      <div className="py-2">
        <Heart3D />
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="glass-card p-6 border border-slate-700/60 rounded-2xl hover:-translate-y-2 transition-all">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-4 animate-float">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Machine Learning Engine</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Standardized Logistic Regression ML model trained on 70,000 anonymized clinical patient records with self-scaling features.
          </p>
        </div>

        <div className="glass-card p-6 border border-slate-700/60 rounded-2xl hover:-translate-y-2 transition-all">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-4 animate-float">
            <BarChart2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">11 Biomarker Analysis</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Comprehensive evaluation of age, gender, height, weight, BMI, blood pressure, cholesterol, glucose, and lifestyle factors.
          </p>
        </div>

        <div className="glass-card p-6 border border-slate-700/60 rounded-2xl hover:-translate-y-2 transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4 animate-float">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Real-Time Scoring</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Instant microsecond risk evaluation with probability percentages, risk categories, speedometer gauge meter, and email export.
          </p>
        </div>
      </div>

      {/* Interactive Workflow Scrollytelling Section */}
      <div className="max-w-5xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-cyan-950/20 to-slate-900/60 border border-cyan-500/20">
        <h3 className="text-center text-2xl font-black text-cyan-400 mb-8 flex items-center justify-center gap-2">
          <span>📜 Interactive ML Pipeline Workflow</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <Database className="w-4 h-4" /> 1️⃣ Data Ingestion
            </div>
            <h4 className="text-lg font-bold text-slate-100">70,000 Records</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Continuous validation and clean ingestion across 11 key cardiovascular metrics.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4" /> 2️⃣ Normalization
            </div>
            <h4 className="text-lg font-bold text-slate-100">Self-Scaling Preprocessing</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Automatic BMI derivation and blood pressure stage classification algorithm.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> 3️⃣ Inference Service
            </div>
            <h4 className="text-lg font-bold text-slate-100">FastAPI Model Dispatch</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Asynchronous probability estimation delivered with clinical accuracy.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
