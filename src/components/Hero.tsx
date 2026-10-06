import React from 'react';
import { Sparkles, ArrowRight, Play, Star, ShieldCheck, Zap, Users, Award } from 'lucide-react';

interface HeroProps {
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
  onExplore: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, theme, onExplore, onOpenQuiz }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 transition-colors ${
      isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs sm:text-sm font-medium shadow-inner ${
              isDark 
                ? 'bg-indigo-950/80 border-indigo-500/30 text-indigo-300 shadow-indigo-500/20' 
                : 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-indigo-100'
            }`}>
              <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
              <span>
                {lang === 'mm'
                  ? '✨ ခေတ်မီ AI နည်းပညာနှင့် ဖန်တီးမှုများအတွက် အကောင်းဆုံးအကယ်ဒမီ'
                  : '✨ Next-Gen AI, Tech & Creator Academy for 2026'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15]">
              {lang === 'mm' ? (
                <>
                  အနာဂတ်ကို ဦးဆောင်မည့် <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">AI နှင့် ဖန်တီးမှုပညာရပ်များ</span>
                </>
              ) : (
                <>
                  Master <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">AI, Tech & Content Creation</span> Like a Pro
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className={`text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {lang === 'mm'
                ? 'ChatGPT Prompt Engineering၊ TikTok Viral ဗီဒီယိုရိုက်ကူးနည်း၊ Full-Stack Coding နှင့် Digital Marketing တို့ကို ကျွမ်းကျင်ပညာရှင်များထံမှ အသေးစိတ်လေ့လာပါ။'
                : 'Learn cutting-edge skills from top industry leaders. Build custom AI workflows, shoot viral reels, and scale your career with confidence.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-base shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5"
              >
                <span>{lang === 'mm' ? 'သင်တန်းများကို စတင်ကြည့်ရှုမည်' : 'Explore All Courses'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenQuiz}
                className={`w-full sm:w-auto px-8 py-4 rounded-2xl border font-bold text-base flex items-center justify-center gap-3 transition-all shadow-md ${
                  isDark 
                    ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-700/80' 
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-sm'
                }`}
              >
                <Zap className="w-5 h-5 text-amber-500" />
                <span>{lang === 'mm' ? 'AI Career Quiz ဖြေမည်' : 'Take AI Career Quiz'}</span>
              </button>
            </div>

            {/* Stats row */}
            <div className={`pt-8 border-t grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left ${
              isDark ? 'border-slate-800/80' : 'border-slate-200'
            }`}>
              <div>
                <div className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>15K+</div>
                <div className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {lang === 'mm' ? 'တက်ရောက်နေသော ကျောင်းသားများ' : 'Active Students'}
                </div>
              </div>
              <div>
                <div className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>4.9/5</div>
                <div className={`text-xs sm:text-sm mt-1 flex items-center justify-center lg:justify-start gap-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{lang === 'mm' ? 'ပျမ်းမျှ သုံးသပ်ချက်' : 'Average Rating'}</span>
                </div>
              </div>
              <div>
                <div className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>100%</div>
                <div className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {lang === 'mm' ? 'လက်တွေ့ကျွမ်းကျင်မှု' : 'Practical Projects'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Card / Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className={`rounded-3xl border p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden group transition-colors ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xl'
              }`}>
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all" />
                
                {/* Course preview badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-lg bg-indigo-500/15 text-indigo-500 text-xs font-bold border border-indigo-500/30">
                    Featured Masterclass
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>4.9</span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-video mb-5 shadow-lg bg-gradient-to-tr from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center">
                  <div className="absolute inset-0 bg-indigo-600/20 mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-indigo-600/95 backdrop-blur-md flex items-center justify-center text-white shadow-xl shadow-indigo-600/50 group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 text-xs font-bold text-white bg-slate-950/70 px-3 py-1 rounded-lg backdrop-blur-md">
                    AI Masterclass 2026
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'mm' ? 'AI Prompt Engineering & ChatGPT Advanced' : 'AI Prompt Engineering & ChatGPT Advanced'}
                </h3>
                <p className={`text-sm mb-6 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {lang === 'mm'
                    ? 'Generative AI ကို အသုံးပြု၍ လုပ်ငန်းများကို အလိုအလျောက်လုပ်ဆောင်ခြင်းနှင့် Custom GPTs တည်ဆောက်ခြင်း။'
                    : 'Master generative AI, custom GPTs, workflow automation, and AI-driven content generation.'}
                </p>

                <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <div>
                    <span className="text-xs text-slate-500 block">{lang === 'mm' ? 'သင်တန်းကြေး' : 'Price'}</span>
                    <span className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>45,000 MMK</span>
                  </div>
                  <button
                    onClick={onExplore}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/20"
                  >
                    {lang === 'mm' ? 'လေ့လာမည်' : 'Enroll Now'}
                  </button>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className={`absolute -bottom-6 -left-6 border p-4 rounded-2xl shadow-xl backdrop-blur-lg flex items-center gap-3.5 hidden sm:flex ${
                isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">{lang === 'mm' ? 'အာမခံချက်' : 'Verified Certificate'}</div>
                  <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{lang === 'mm' ? 'နိုင်ငံတကာ အသိအမှတ်ပြု' : 'Global Standard'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
