import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, ExternalLink, HeartPulse, Building2 } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'OPD Consultation Appointment', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: '', email: '', phone: '', subject: 'OPD Consultation Appointment', message: '' });
    }
  };

  return (
    <div className="space-y-10 py-4 animate-fade-in max-w-6xl mx-auto">
      
      {/* Banner */}
      <div className="glass-card p-8 md:p-12 text-center border border-slate-700/60 rounded-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          Rajkot, Gujarat • Saurashtra Health Corridor
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold gradient-title">
          Contact Rajkot Clinical Center
        </h2>
        <p className="text-slate-300 md:text-lg max-w-2xl mx-auto">
          Connect with our cardiovascular specialists, book an OPD consultation in Rajkot, or inquire about AI screening integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Form */}
        <div className="glass-card p-6 md:p-8 border border-slate-700/60 rounded-3xl space-y-6">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            Request Consultation / Send Inquiry
          </h3>

          {submitted && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Dhanyavaad! Your inquiry has been dispatched to our Rajkot clinical coordination desk.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:border-cyan-400 focus:outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:border-cyan-400 focus:outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="patient@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:border-cyan-400 focus:outline-none text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Inquiry Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:border-cyan-400 focus:outline-none text-sm"
              >
                <option value="OPD Consultation Appointment">OPD Consultation Appointment (Rajkot)</option>
                <option value="Preventative Heart Health Checkup">Preventative Heart Health Checkup</option>
                <option value="Second Opinion on Angiography / Stents">Second Opinion on Angiography / Stents</option>
                <option value="Hospital & Clinic API Integration">Hospital & Clinic API Integration</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Message / Health Query</label>
              <textarea
                rows="4"
                placeholder="Share your symptoms, recent BP/cholesterol readings, or inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:border-cyan-400 focus:outline-none text-sm resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 transition"
            >
              <Send className="w-4 h-4" />
              Submit Inquiry
            </button>
          </form>
        </div>

        {/* Contact Details Card */}
        <div className="glass-card p-6 md:p-8 border border-slate-700/60 rounded-3xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              Rajkot Center Directory
            </h3>
            
            <div className="space-y-4 text-sm text-slate-300">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-100">Physical Address</div>
                  <div className="text-slate-300 text-xs leading-relaxed mt-0.5">
                    150 Feet Ring Road, Near Raiya Circle,<br />
                    Opp. Big Bazaar Corridor, Rajkot, Gujarat – 360007, India
                  </div>
                </div>
              </div>

              {/* Phone & Helpline */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-100">Phone & Appointments</div>
                  <div className="text-slate-300 text-xs mt-0.5 space-y-0.5">
                    <div>OPD Reception: <strong className="text-slate-100">+91 (0281) 669 4444</strong></div>
                    <div>General Inquiry: <strong className="text-slate-100">+91 (0281) 247 5000</strong></div>
                  </div>
                </div>
              </div>

              {/* 24x7 Emergency */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20 shrink-0 mt-0.5">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-rose-400">24x7 Cardiac Emergency & Cath Lab</div>
                  <div className="text-slate-300 text-xs mt-0.5">
                    Emergency Helpline: <strong className="text-rose-400">+91 99099 24365 / 108</strong>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-100">Official Email</div>
                  <div className="text-slate-300 text-xs mt-0.5">
                    <a href="mailto:rajkot.cardiohealth@gmail.com" className="text-cyan-400 hover:underline">
                      rajkot.cardiohealth@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-100">Consultation Timings</div>
                  <div className="text-slate-300 text-xs mt-0.5 space-y-0.5">
                    <div>Monday – Saturday: 9:00 AM – 8:00 PM IST</div>
                    <div>Sunday: 10:00 AM – 1:00 PM (Emergency 24x7)</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300">📍 Landmark Navigation</div>
            <p>Easily accessible from Rajkot Junction Railway Station (6.5 km) and Rajkot Hirasar International Airport (32 km via Rajkot-Ahmedabad Highway).</p>
          </div>
        </div>

      </div>

    </div>
  );
}

