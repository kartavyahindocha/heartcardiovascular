import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }
  };

  return (
    <div className="space-y-10 py-4 animate-fade-in max-w-6xl mx-auto">
      
      {/* Banner */}
      <div className="glass-card p-8 md:p-12 text-center border border-slate-700/60 rounded-3xl space-y-3">
        <h2 className="text-3xl md:text-5xl font-extrabold gradient-title">
          Get In Touch
        </h2>
        <p className="text-slate-300 md:text-lg max-w-xl mx-auto">
          Have questions regarding API integrations, clinical research, or support? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Form */}
        <div className="glass-card p-6 md:p-8 border border-slate-700/60 rounded-3xl space-y-6">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            Send Us a Message
          </h3>

          {submitted && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Thank you! Your message has been received successfully.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="Dr. John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:border-cyan-400 focus:outline-none text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="doctor@hospital.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:border-cyan-400 focus:outline-none text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:border-cyan-400 focus:outline-none text-sm"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Clinical Support">Clinical Support</option>
                <option value="API Integration">API Integration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">Message</label>
              <textarea
                rows="4"
                placeholder="Describe your inquiry..."
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
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details Card */}
        <div className="glass-card p-6 md:p-8 border border-slate-700/60 rounded-3xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-100">Contact Information</h3>
            
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-100">Direct Email</div>
                  <div className="text-slate-400">cardiocare@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-100">Business Hours</div>
                  <div className="text-slate-400">Monday - Friday: 9:00 AM - 6:00 PM EST</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-100">Medical AI Hub</div>
                  <div className="text-slate-400">Cardiovascular AI & Health Analytics Division</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-400">
            💡 For immediate API integration questions or technical setup, consult the backend API documentation or health endpoints.
          </div>
        </div>

      </div>

    </div>
  );
}
