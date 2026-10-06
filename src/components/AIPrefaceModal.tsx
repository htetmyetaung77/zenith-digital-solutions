import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, AlertTriangle, CheckCircle2, BookOpen } from 'lucide-react';

interface AIPrefaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
}

export const AIPrefaceModal: React.FC<AIPrefaceModalProps> = ({ isOpen, onClose, lang, theme }) => {
  if (!isOpen) return null;
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`w-full max-w-3xl border rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto transition-colors ${
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

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-indigo-500 font-bold uppercase tracking-wider">AuraLearn Academy Preface</span>
            <h2 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              အမှာစာ - AI ၏ ကောင်းကျိုး၊ ဆိုးကျိုးများနှင့် အကျိုးရှိစွာ အသုံးချရေး
            </h2>
          </div>
        </div>

        <div className={`space-y-6 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-300">
            <b>နိဒါန်း:</b> ယနေ့ခေတ် ကမ္ဘာ့နည်းပညာ အပြောင်းအလဲတွင် Artificial Intelligence (AI) သည် လူသားတို့၏ နေ့စဉ်ဘဝနှင့် လုပ်ငန်းခွင်များကို အခြေခံမှစ၍ ပြောင်းလဲနေပြီ ဖြစ်ပါသည်။ ဤအမှာစာတွင် AI ၏ အကျိုး၊ အပြစ်နှင့် အကျိုးရှိရှိ အသုံးချနည်းများကို တင်ပြထားပါသည်။
          </div>

          <div>
            <h3 className={`text-base font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>၁။ AI ၏ ကောင်းကျိုးများ (Benefits)</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><b>အချိန်နှင့် လုပ်အား သက်သာစေခြင်း:</b> လုပ်ငန်းစဉ်များကို အလိုအလျောက် လုပ်ဆောင်ပေးနိုင်ခြင်း။</li>
              <li><b>အချက်အလက်ခွဲခြမ်းစိတ်ဖြာမှု:</b> ကြီးမားသောဒေတာများကို စက္ကန့်ပိုင်းအတွင်း စစ်ဆေးပေးနိုင်ခြင်း။</li>
            </ul>
          </div>

          <div>
            <h3 className={`text-base font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>၂။ AI ၏ ဆိုးကျိုးများနှင့် စိန်ခေါ်မှုများ (Drawbacks)</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><b>အလုပ်အကိုင် အပြောင်းအလဲ:</b> အချို့သော လုပ်ငန်းခွင်များတွင် AI ဖြင့် အစားထိုးခံရနိုင်ခြေရှိခြင်း။</li>
              <li><b>မှားယွင်းနိုင်ခြေ:</b> AI ၏ Hallucination ကြောင့် မှားယွင်းသော သတင်းအချက်အလက်များ ပါလာနိုင်ခြင်း။</li>
            </ul>
          </div>

          <div>
            <h3 className={`text-base font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <span>၃။ AI ကို အကျိုးရှိစွာ အသုံးချသင့်ပုံ (Productive Usage)</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><b>Co-pilot အဖြစ် အသုံးပြုပါ:</b> AI ကို မိမိ၏ လက်ထောက်အဖြစ် သုံးပြီး ကိုယ်တိုင် ဝေဖန်ပိုင်းခြားတွေးခေါ်မှု (Critical Thinking) ကို အမြဲသုံးပါ။</li>
              <li><b>ကျင့်ဝတ်ကို လေးစားပါ:</b> မူပိုင်ခွင့်နှင့် လုံခြုံရေးစည်းမျဉ်းများကို လိုက်နာပါ။</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all"
          >
            {lang === 'mm' ? 'နားလည်သဘောပေါက်ပါပြီ' : 'Got it'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
