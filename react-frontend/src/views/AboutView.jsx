import React from 'react';
import { ShieldCheck, Award, HeartHandshake, UserCheck, MessageSquareQuote } from 'lucide-react';

export default function AboutView() {
  const testimonials = [
    {
      quote: "CardioHealth AI has become an essential tool in our clinical workflow. The speed and precision help us make informed preventative care decisions.",
      author: "Dr. Michael Thompson",
      role: "Cardiologist, City Heart Hospital",
    },
    {
      quote: "As someone with a family history of heart disease, this platform gives me peace of mind with clear, actionable health risk analysis.",
      author: "Jennifer Martinez",
      role: "Patient & Wellness Advocate",
    },
    {
      quote: "The interface is intuitive, interactive, and the report export feature makes patient consultations effortless and informative.",
      author: "Dr. Robert Kim",
      role: "Primary Care Physician",
    },
  ];

  return (
    <div className="space-y-12 py-4 animate-fade-in max-w-6xl mx-auto">
      
      {/* Hero Banner */}
      <div className="glass-card p-8 md:p-12 text-center border border-slate-700/60 rounded-3xl space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold gradient-title">
          About CardioHealth AI
        </h2>
        <p className="text-slate-300 md:text-lg max-w-2xl mx-auto leading-relaxed">
          Convergence of Artificial Intelligence, Machine Learning & Cardiovascular Preventive Medicine.
        </p>
      </div>

      {/* Methodology & Team */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Methodology */}
        <div className="md:col-span-2 glass-card p-8 border border-slate-700/60 rounded-3xl space-y-4">
          <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            Platform Methodology
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            CardioHealth AI utilizes state-of-the-art machine learning algorithms to assess cardiovascular disease risk based on comprehensive patient data.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Developed by a team of data scientists and healthcare professionals, our system analyzes 11 critical risk factors including demographic information, clinical metrics, and lifestyle choices to compute high-precision risk probabilities.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-extrabold text-lg">70,000+</div>
              <div className="text-slate-400 text-xs">Training Patient Records</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="text-emerald-400 font-extrabold text-lg">FastAPI ML Engine</div>
              <div className="text-slate-400 text-xs">Sub-second Inference</div>
            </div>
          </div>
        </div>

        {/* Team Card */}
        <div className="glass-card p-6 border border-slate-700/60 rounded-3xl space-y-4">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            Core Clinical Team
          </h3>

          <div className="space-y-4 text-sm">
            <div className="pb-3 border-b border-slate-800">
              <div className="font-bold text-slate-100">Dr. Sarah Chen</div>
              <div className="text-xs text-cyan-400">Chief Medical Officer</div>
            </div>
            <div className="pb-3 border-b border-slate-800">
              <div className="font-bold text-slate-100">Alex Rodriguez</div>
              <div className="text-xs text-cyan-400">Lead Data Scientist</div>
            </div>
            <div>
              <div className="font-bold text-slate-100">Emily Watson</div>
              <div className="text-xs text-cyan-400">ML Infrastructure Engineer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-100 text-center flex items-center justify-center gap-2">
          <MessageSquareQuote className="w-6 h-6 text-cyan-400" />
          What Clinicians & Patients Say
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div key={idx} className="glass-card p-6 border border-slate-700/60 rounded-2xl space-y-4 flex flex-col justify-between">
              <p className="text-slate-300 text-sm italic leading-relaxed">
                "{item.quote}"
              </p>
              <div>
                <div className="font-bold text-cyan-400 text-sm">{item.author}</div>
                <div className="text-xs text-slate-400">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
