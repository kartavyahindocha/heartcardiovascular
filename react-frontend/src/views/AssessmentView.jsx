import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import RiskGauge from '../components/RiskGauge';
import HealthBreakdown from '../components/HealthBreakdown';
import EmailReportModal from '../components/EmailReportModal';
import { User, Stethoscope, Salad, Rocket, Loader2, Mail, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

export default function AssessmentView() {
  // Form Inputs
  const [formData, setFormData] = useState({
    age: 45,
    gender: 1, // 1: Female, 2: Male
    height: 168.0,
    weight: 70.0,
    ap_hi: 120,
    ap_lo: 80,
    cholesterol: 1, // 1: Normal, 2: Above Normal, 3: Well Above Normal
    gluc: 1,
    smoke: 0, // 0: No, 1: Yes
    alco: 0,
    active: 1,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Derived live indicators
  const heightM = formData.height / 100.0;
  const liveBmi = heightM > 0 ? (formData.weight / (heightM * heightM)).toFixed(1) : 0;
  const liveBpStage = formData.ap_hi >= 140 || formData.ap_lo >= 90 ? 'Hypertension Stage 2' :
                      formData.ap_hi >= 130 || formData.ap_lo >= 80 ? 'Hypertension Stage 1' : 'Normal';

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: parseInt(formData.age, 10),
          gender: parseInt(formData.gender, 10),
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          ap_hi: parseInt(formData.ap_hi, 10),
          ap_lo: parseInt(formData.ap_lo, 10),
          cholesterol: parseInt(formData.cholesterol, 10),
          gluc: parseInt(formData.gluc, 10),
          smoke: parseInt(formData.smoke, 10),
          alco: parseInt(formData.alco, 10),
          active: parseInt(formData.active, 10),
        }),
      });

      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setResult(data);
        if (data.risk_level === 'Low') {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } else {
        setError(data.detail || 'Error running model assessment. Make sure FastAPI server is running.');
      }
    } catch (err) {
      setError('Connection Error: Unable to reach FastAPI backend server at /api/generate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 animate-fade-in">
      
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-100 flex items-center justify-center gap-2">
          <span>🩺 Cardiovascular Risk Assessment</span>
        </h2>
        <p className="text-slate-400 text-sm">
          Complete the clinical form below to receive your AI-powered risk analysis and personalized report.
        </p>
      </div>

      {/* Assessment Form Card */}
      <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 border border-slate-700/60 rounded-3xl space-y-8 shadow-2xl">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Demographics */}
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-700/60 flex items-center gap-2 text-cyan-400 font-bold">
              <User className="w-5 h-5" />
              <span>Demographics & Metrics</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Age (Years)</label>
              <input
                type="number"
                min="18"
                max="120"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 font-bold focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Gender</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('gender', 1)}
                  className={`py-2 px-3 rounded-xl font-bold text-sm border transition ${
                    formData.gender === 1
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  Female
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('gender', 2)}
                  className={`py-2 px-3 rounded-xl font-bold text-sm border transition ${
                    formData.gender === 2
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  Male
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Height (cm)</label>
              <input
                type="number"
                min="50"
                max="250"
                step="0.5"
                value={formData.height}
                onChange={(e) => handleChange('height', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 font-bold focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Weight (kg)</label>
              <input
                type="number"
                min="20"
                max="300"
                step="0.5"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 font-bold focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div className="pt-1 text-xs text-cyan-400 font-semibold bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-500/20">
              Live Estimated BMI: <strong className="text-slate-100">{liveBmi}</strong>
            </div>
          </div>

          {/* Column 2: Clinical Measurements */}
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-700/60 flex items-center gap-2 text-cyan-400 font-bold">
              <Stethoscope className="w-5 h-5" />
              <span>Clinical Measurements</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Systolic BP (ap_hi - mmHg)</label>
              <input
                type="number"
                min="60"
                max="260"
                value={formData.ap_hi}
                onChange={(e) => handleChange('ap_hi', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 font-bold focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Diastolic BP (ap_lo - mmHg)</label>
              <input
                type="number"
                min="40"
                max="180"
                value={formData.ap_lo}
                onChange={(e) => handleChange('ap_lo', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 font-bold focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Cholesterol Level</label>
              <select
                value={formData.cholesterol}
                onChange={(e) => handleChange('cholesterol', parseInt(e.target.value, 10))}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 font-bold focus:border-cyan-400 focus:outline-none"
              >
                <option value={1}>Normal</option>
                <option value={2}>Above Normal</option>
                <option value={3}>Well Above Normal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Glucose Level</label>
              <select
                value={formData.gluc}
                onChange={(e) => handleChange('gluc', parseInt(e.target.value, 10))}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 font-bold focus:border-cyan-400 focus:outline-none"
              >
                <option value={1}>Normal</option>
                <option value={2}>Above Normal</option>
                <option value={3}>Well Above Normal</option>
              </select>
            </div>

            <div className="pt-1 text-xs text-rose-400 font-semibold bg-rose-950/30 p-2.5 rounded-xl border border-rose-500/20">
              Live BP Stage: <strong className="text-slate-100">{liveBpStage}</strong>
            </div>
          </div>

          {/* Column 3: Lifestyle & Indicators */}
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-700/60 flex items-center gap-2 text-cyan-400 font-bold">
              <Salad className="w-5 h-5" />
              <span>Lifestyle & Indicators</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Smoking History</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('smoke', 0)}
                  className={`py-2 px-3 rounded-xl font-bold text-sm border transition ${
                    formData.smoke === 0
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('smoke', 1)}
                  className={`py-2 px-3 rounded-xl font-bold text-sm border transition ${
                    formData.smoke === 1
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  Yes
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Alcohol Consumption</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('alco', 0)}
                  className={`py-2 px-3 rounded-xl font-bold text-sm border transition ${
                    formData.alco === 0
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('alco', 1)}
                  className={`py-2 px-3 rounded-xl font-bold text-sm border transition ${
                    formData.alco === 1
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  Yes
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Physically Active</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('active', 1)}
                  className={`py-2 px-3 rounded-xl font-bold text-sm border transition ${
                    formData.active === 1
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('active', 0)}
                  className={`py-2 px-3 rounded-xl font-bold text-sm border transition ${
                    formData.active === 0
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-800" />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl font-black text-lg text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-xl shadow-cyan-600/30 flex items-center justify-center gap-3 transition-all transform active:scale-98 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin text-white" />
              <span>Evaluating ML Risk Model...</span>
            </>
          ) : (
            <>
              <Rocket className="w-6 h-6" />
              <span>Generate Cardiovascular Risk Assessment</span>
            </>
          )}
        </button>
      </form>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-700 text-rose-200 text-sm font-semibold flex items-center gap-3 animate-fade-in">
          <AlertOctagon className="w-6 h-6 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Assessment Output Display */}
      {result && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Pulsing Risk Alert Card */}
          <div className={`p-8 rounded-3xl text-center space-y-4 shadow-2xl ${
            result.risk_level === 'Low' ? 'result-card-low' :
            result.risk_level === 'Moderate' ? 'result-card-moderate' :
            'result-card-high'
          }`}>
            
            <div className="inline-block">
              <span className={`px-6 py-2 rounded-full font-black text-base uppercase tracking-wider border shadow-md ${
                result.risk_level === 'Low' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500' :
                result.risk_level === 'Moderate' ? 'bg-amber-500/20 text-amber-300 border-amber-500' :
                'bg-rose-500/20 text-rose-300 border-rose-500'
              }`}>
                {result.risk_level} Risk Tier
              </span>
            </div>

            <div className="text-6xl md:text-7xl font-black text-slate-100 tracking-tight">
              {result.risk_score}%
            </div>

            <p className="text-slate-300 text-base font-semibold max-w-xl mx-auto">
              {result.message}
            </p>

            {/* Email Report Action Button */}
            <div className="pt-2">
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm rounded-xl border border-slate-600 hover:border-cyan-400 transition flex items-center gap-2 mx-auto"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                Email Clinical Report
              </button>
            </div>
          </div>

          {/* Speedometer Gauge Meter */}
          <div className="glass-card p-6 border border-slate-700/60 rounded-3xl max-w-md mx-auto">
            <RiskGauge score={result.risk_score} level={result.risk_level} />
          </div>

          {/* Detailed Health Breakdown & Progress Bars */}
          <HealthBreakdown
            details={result.details}
            riskScore={result.risk_score}
            riskLevel={result.risk_level}
          />
        </div>
      )}

      {/* Email Report Modal */}
      <EmailReportModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        assessmentResult={result}
      />
    </div>
  );
}
