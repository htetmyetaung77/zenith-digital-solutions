import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Course } from '../types';
import { X, ShieldCheck, CheckCircle2, Copy, Sparkles, PhoneCall } from 'lucide-react';

interface PaymentModalProps {
  course: Course | null;
  onClose: () => void;
  onPaymentSuccess: (course: Course) => void;
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ course, onClose, onPaymentSuccess, lang, theme }) => {
  const [selectedMethod, setSelectedMethod] = useState<'wave' | 'aya'>('wave');
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  if (!course) return null;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('09779944100');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      alert(lang === 'mm' ? 'ကျေးဇူးပြု၍ ငွေလွှဲលេខ (Transaction ID) ထည့်သွင်းပါ။' : 'Please enter the transaction ID.');
      return;
    }

    onPaymentSuccess(course);
    onClose();
    alert(lang === 'mm'
      ? `ငွေပေးချေမှု အတည်ပြုပြီးပါပြီ! "${course.titleMm}" သင်တန်းသို့ စာရင်းသွင်းပြီးပါပြီ။`
      : `Payment verified! Successfully enrolled in "${course.title}".`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`w-full max-w-lg border rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 rounded-xl border transition-colors ${
            isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-500 text-xs font-bold border border-indigo-500/30 mb-2 inline-block">
            {lang === 'mm' ? 'လုံခြုံသော မြန်မာငွေပေးချေမှု' : 'Secure Myanmar Payment'}
          </span>
          <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'mm' ? 'ငွေပေးချေရန် (Payment Checkout)' : 'Complete Payment'}
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            {lang === 'mm' ? course.titleMm : course.title} • <span className="font-bold text-indigo-500">{course.price.toLocaleString()} MMK</span>
          </p>
        </div>

        {/* Payment Method Selector */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setSelectedMethod('wave')}
            className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
              selectedMethod === 'wave'
                ? 'bg-amber-500/10 border-amber-500 text-amber-500 font-bold shadow-md'
                : isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-lg">
              W
            </div>
            <span>Wave Pay</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod('aya')}
            className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
              selectedMethod === 'aya'
                ? 'bg-blue-500/10 border-blue-500 text-blue-500 font-bold shadow-md'
                : isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-lg">
              AYA
            </div>
            <span>AYA Pay</span>
          </button>
        </div>

        {/* Transfer Instructions Box */}
        <div className={`p-4 rounded-2xl border mb-6 space-y-3 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-xs text-slate-400">
            {lang === 'mm'
              ? `ကျေးဇူးပြု၍ အောက်ပါ ${selectedMethod === 'wave' ? 'Wave Pay' : 'AYA Pay'} အကောင့်သို့ ငွေလွှဲပေးပါရန်:`
              : `Please transfer funds to the following ${selectedMethod === 'wave' ? 'Wave Pay' : 'AYA Pay'} account:`}
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
            <div>
              <div className="text-xs text-slate-400">Account Name: <span className="font-bold text-white">AuraLearn Official</span></div>
              <div className="text-lg font-extrabold text-indigo-400 tracking-wider">09779944100</div>
            </div>
            <button
              onClick={handleCopyNumber}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? (lang === 'mm' ? 'ကူးယူပြီး!' : 'Copied!') : (lang === 'mm' ? 'ကူးယူရန်' : 'Copy')}</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            {lang === 'mm'
              ? `* ငွေလွှဲပြီးပါက ရလာသော Transaction ID (သို့) Slip နံပါတ်ကို အောက်တွင် ထည့်သွင်းပေးပါ။`
              : `* After transferring, please enter your transaction ID below.`}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitPayment} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              {lang === 'mm' ? 'ငွေလွှဲနံပါတ် (Transaction ID / Slip No)' : 'Transaction ID / Slip Number'}
            </label>
            <input
              type="text"
              required
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g. TXN987654321"
              className={`w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:border-indigo-500 ${
                isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all mt-2"
          >
            {lang === 'mm' ? 'ငွေပေးချေမှု အတည်ပြုမည် (Confirm Payment)' : 'Confirm Payment & Enroll'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
