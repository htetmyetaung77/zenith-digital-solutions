import React from 'react';
import { Sparkles, Mail, Send, Github, Twitter, Facebook, ShieldCheck } from 'lucide-react';

interface FooterProps {
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ lang, theme }) => {
  const isDark = theme === 'dark';

  return (
    <footer className={`py-16 transition-colors border-t ${
      isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>AuraLearn</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {lang === 'mm'
                ? 'ခေတ်မီ AI နည်းပညာ၊ Content Creator ဖန်တီးမှုနှင့် ကမ္ဘာ့အဆင့်မီ ပရိုဂရမ်သင်တန်းများကို အကောင်းဆုံး UI/UX ဖြင့် သင်ကြားပေးနေသော Next-Gen အကယ်ဒမီ။'
                : 'Next-generation learning academy providing elite masterclasses in AI, content creation, and software engineering with stunning UI/UX.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>{lang === 'mm' ? 'လင့်ခ်များ' : 'Quick Links'}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#courses" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>{lang === 'mm' ? 'သင်တန်းများ' : 'All Courses'}</a></li>
              <li><a href="#community" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>{lang === 'mm' ? 'အသိုင်းအဝိုင်း' : 'Student Community'}</a></li>
              <li><a href="#resources" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>{lang === 'mm' ? 'အခမဲ့ အရင်းအမြစ်များ' : 'Resource Vault'}</a></li>
              <li><a href="#dashboard" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>{lang === 'mm' ? 'ကျွန်ုပ်၏သင်ယူမှု' : 'Student Dashboard'}</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>{lang === 'mm' ? 'သတင်းလွှာ ရယူရန်' : 'Stay Updated'}</h4>
            <p className="text-xs text-slate-400">
              {lang === 'mm' ? 'AI နှင့် နည်းပညာအသစ်များကို လက်လွတ်မခံဘဲ သိရှိနိုင်ရန် သတင်းလွှာရယူပါ။' : 'Subscribe to get weekly insights on AI, tech, and creator growth.'}
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder={lang === 'mm' ? 'သင်၏ Email ထည့်ပါ...' : 'Enter your email...'}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm border focus:outline-none focus:border-indigo-500 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500' : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400'
                }`}
              />
              <button
                onClick={() => alert(lang === 'mm' ? 'သတင်းလွှာအတွက် စာရင်းပေးသွင်းပြီးပါပြီ!' : 'Successfully subscribed!')}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 ${isDark ? 'border-slate-900' : 'border-slate-200'}`}>
          <div>© 2026 AuraLearn Academy. All rights reserved.</div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
