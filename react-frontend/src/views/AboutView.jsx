import React from 'react';
import { ShieldCheck, Award, HeartHandshake, UserCheck, MessageSquareQuote, MapPin, Stethoscope, Activity } from 'lucide-react';

export default function AboutView() {
  const testimonials = [
    {
      quote: "CardioHealth AI provides rapid and clinically grounded risk stratification for patients arriving across Saurashtra. It significantly bolsters early preventive interventions before acute coronary events.",
      author: "Dr. Ravi Bhojani",
      role: "Associate Director & Senior Interventional Cardiologist, Rajkot",
    },
    {
      quote: "Following my annual cardiac checkup in Rajkot, using this platform gave my family a transparent breakdown of my lipid profile and blood pressure risk factors.",
      author: "Rajeshbhai Patel",
      role: "Patient & Wellness Advocate, Kalawad Road, Rajkot",
    },
    {
      quote: "The interface combines ICMR clinical metrics with machine learning seamlessly. It is an outstanding educational and screening companion for physicians across Gujarat.",
      author: "Dr. Ankur Thummar",
      role: "Sr. Consultant Cardiologist, 150 Feet Ring Road, Rajkot",
    },
  ];

  const doctors = [
    {
      name: "Dr. Mridul Sharma",
      role: "Director – Interventional Cardiology",
      affiliation: "Sterling Hospital & Heart Care, Raiya Circle, Rajkot",
      specialty: "Complex Angioplasty, Structural Heart Disease & Preventive Cardiology",
    },
    {
      name: "Dr. Ravi Bhojani",
      role: "Associate Director – Interventional Cardiology",
      affiliation: "Cardiac Sciences Division, Rajkot",
      specialty: "Radial Angiography, Coronary Interventions & Heart Failure Care",
    },
    {
      name: "Dr. Ankur Thummar",
      role: "Senior Consultant – Interventional Cardiology",
      affiliation: "Cardiology Department, 150ft Ring Road, Rajkot",
      specialty: "Clinical Cardiology, Echocardiography & Hypertension Management",
    },
    {
      name: "Dr. Mandip Tilara",
      role: "Consultant – Cardiology & Cardiac Electrophysiology",
      affiliation: "Heart Institute, Rajkot, Gujarat",
      specialty: "Arrhythmia Management, Pacemaker Implantation & Risk Stratification",
    },
  ];

  return (
    <div className="space-y-12 py-4 animate-fade-in max-w-6xl mx-auto">
      
      {/* Hero Banner */}
      <div className="glass-card p-8 md:p-12 text-center border border-slate-700/60 rounded-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          Rajkot Cardiovascular Clinical Sciences Center
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold gradient-title">
          About CardioHealth AI
        </h2>
        <p className="text-slate-300 md:text-lg max-w-3xl mx-auto leading-relaxed">
          Convergence of Machine Learning & Evidence-Based Cardiovascular Medicine, delivering high-precision risk analytics for patients and clinicians throughout Rajkot and the Saurashtra region.
        </p>
      </div>

      {/* Methodology & Regional Context */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Methodology */}
        <div className="md:col-span-2 glass-card p-8 border border-slate-700/60 rounded-3xl space-y-5">
          <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            Clinical Methodology & Regional Mission
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            CardioHealth AI was developed to address the escalating prevalence of cardiovascular diseases (CVD) in urban and semi-urban populations across Gujarat. By synthesizing demographic indicators, clinical vitals, cholesterol profiles, and lifestyle parameters, our self-scaling ML engine predicts cardiovascular vulnerability before symptoms escalate.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Our model is trained on tens of thousands of validated clinical records and calibrated against standard South Asian cardiovascular epidemiological guidelines (Cardiological Society of India & ICMR thresholds).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-extrabold text-xl">70,000+</div>
              <div className="text-slate-400 text-xs">Validated Patient Records</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="text-emerald-400 font-extrabold text-xl">Rajkot Hub</div>
              <div className="text-slate-400 text-xs">Saurashtra Referral Base</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
              <div className="text-purple-400 font-extrabold text-xl">&lt; 300ms</div>
              <div className="text-slate-400 text-xs">ML Inference Latency</div>
            </div>
          </div>
        </div>

        {/* Regional Clinical Highlights */}
        <div className="glass-card p-6 border border-slate-700/60 rounded-3xl space-y-5">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Rajkot Center Highlights
          </h3>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> 150 Feet Ring Road Corridor
              </div>
              <p className="text-slate-400">Positioned at Rajkot's premier medical hub, connecting tertiary cardiac care across Jamnagar, Junagadh, Morbi, and Bhavnagar.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5" /> 24x7 Emergency Cath Lab Support
              </div>
              <p className="text-slate-400">Integrated referral system linked with accredited interventional cardiology centers for emergency primary angioplasty (PAMI).</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> NABH & Clinical Standards
              </div>
              <p className="text-slate-400">Adheres to strict healthcare confidentiality, patient data protection, and evidence-based assessment protocols.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Senior Cardiologists & Clinical Advisors */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100 flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-cyan-400" />
            Leading Rajkot Cardiologists & Clinical Consultants
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Experienced cardiac specialists practicing in Rajkot, guiding preventative cardiovascular assessment and interventions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {doctors.map((doc, idx) => (
            <div key={idx} className="glass-card p-5 border border-slate-700/60 rounded-2xl flex flex-col justify-between space-y-3 hover:border-cyan-500/40 transition">
              <div className="space-y-1.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-base border border-cyan-500/20">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-100 text-base pt-2">{doc.name}</h4>
                <div className="text-xs font-semibold text-cyan-400">{doc.role}</div>
                <div className="text-[11px] text-slate-400">{doc.affiliation}</div>
              </div>
              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span className="text-slate-300 font-medium">Focus: </span>{doc.specialty}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-100 text-center flex items-center justify-center gap-2">
          <MessageSquareQuote className="w-6 h-6 text-cyan-400" />
          Clinical Feedback from Saurashtra
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div key={idx} className="glass-card p-6 border border-slate-700/60 rounded-2xl space-y-4 flex flex-col justify-between">
              <p className="text-slate-300 text-sm italic leading-relaxed">
                "{item.quote}"
              </p>
              <div className="pt-2 border-t border-slate-800">
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

