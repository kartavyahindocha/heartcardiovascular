import React, { useState } from 'react';
import { Mail, X, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function EmailReportModal({ isOpen, onClose, assessmentResult }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }

  if (!isOpen) return null;

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/send-report-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient_email: email,
          risk_score: assessmentResult?.risk_score || 0,
          risk_level: assessmentResult?.risk_level || 'Low',
          bmi: assessmentResult?.details?.bmi || 22.0,
          bp_category: assessmentResult?.details?.bp_category || 'Normal',
        }),
      });

      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setStatus({
          type: 'success',
          message: data.message || `Report successfully emailed to ${email}!`,
        });
        setEmail('');
      } else {
        setStatus({
          type: 'error',
          message: data.detail || 'Failed to send report email. Please check backend server.',
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Network error: Unable to reach FastAPI email service.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Send Email Report</h3>
            <p className="text-xs text-slate-400">Receive your clinical assessment summary in your inbox</p>
          </div>
        </div>

        {/* Assessment Preview Pill */}
        {assessmentResult && (
          <div className="mb-5 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-sm">
            <div>
              <span className="text-slate-400 text-xs block">Assessed Risk Score</span>
              <strong className="text-slate-100 text-base">{assessmentResult.risk_score}%</strong>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
              assessmentResult.risk_level === 'Low' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
              assessmentResult.risk_level === 'Moderate' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
              'bg-red-500/20 text-red-400 border-red-500/30'
            }`}>
              {assessmentResult.risk_level} Risk
            </span>
          </div>
        )}

        {/* Status Message Alert */}
        {status && (
          <div className={`mb-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2 border ${
            status.type === 'success' ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60' :
            'bg-rose-950/60 text-rose-300 border-rose-700/60'
          }`}>
            {status.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            <span>{status.message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSendEmail} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Recipient Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. doctor@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl shadow-lg shadow-cyan-600/30 flex items-center gap-2 disabled:opacity-50 transition"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Email Report
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
