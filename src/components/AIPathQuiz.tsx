import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, CheckCircle2, ArrowRight, Zap, Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/mockData';
import { Course } from '../types';

interface AIPathQuizProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
}

export const AIPathQuiz: React.FC<AIPathQuizProps> = ({ isOpen, onClose, courses, onSelectCourse, lang, theme }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [resultCourse, setResultCourse] = useState<Course | null>(null);
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const handleSelectOption = (category: string) => {
    setSelectedCategory(category);
    const matched = courses.find(c => c.category === category) || courses[0];
    setResultCourse(matched);
    setCurrentStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`w-full max-w-xl border rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative transition-colors ${
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

        {currentStep === 0 ? (
          <div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950 border border-indigo-500/30 text-indigo-300 text-xs font-bold w-max mb-4">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>{lang === 'mm' ? 'AI Career Path Finder' : 'AI Career Path Finder'}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {QUIZ_QUESTIONS[0].question}
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              {lang === 'mm' ? 'သင့်အတွက် အသင့်တော်ဆုံး သင်တန်းလမ်းကြောင်းကို ချက်ချင်းရှာဖွေပေးပါမည်။' : 'Select your primary interest to get an instant AI-curated learning path.'}
            </p>

            <div className="space-y-3">
              {QUIZ_QUESTIONS[0].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.category)}
                  className={`w-full text-left p-4 rounded-2xl border font-medium text-sm flex items-center justify-between transition-all group ${
                    isDark 
                      ? 'bg-slate-950/80 hover:bg-indigo-950/40 border-slate-800 hover:border-indigo-500/50 text-slate-200 hover:text-white' 
                      : 'bg-slate-50 hover:bg-indigo-50 border-slate-200 hover:border-indigo-300 text-slate-800'
                  }`}
                >
                  <span>{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-600/30">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-xs font-bold border border-emerald-500/30 mb-2 inline-block">
                {lang === 'mm' ? 'သင့်အတွက် အကြံပြုသော သင်တန်း' : 'Recommended Masterclass'}
              </span>
              <h2 className={`text-2xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {resultCourse && (lang === 'mm' ? resultCourse.titleMm : resultCourse.title)}
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
                {resultCourse && (lang === 'mm' ? resultCourse.subtitleMm : resultCourse.subtitle)}
              </p>
            </div>

            {resultCourse && (
              <div className={`p-4 rounded-2xl border flex items-center gap-4 text-left ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <img src={resultCourse.image} alt={resultCourse.title} className="w-20 h-16 rounded-xl object-cover" />
                <div>
                  <div className="text-xs text-indigo-500 font-semibold">{resultCourse.categoryLabel}</div>
                  <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{resultCourse.price.toLocaleString()} MMK</div>
                  <div className="text-xs text-slate-400 mt-1">{resultCourse.duration} • {resultCourse.level}</div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentStep(0)}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors border ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
              >
                {lang === 'mm' ? 'ပြန်လည်ရွေးချယ်မည်' : 'Retake Quiz'}
              </button>
              <button
                onClick={() => {
                  if (resultCourse) onSelectCourse(resultCourse);
                  onClose();
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all"
              >
                {lang === 'mm' ? 'သင်တန်းကြည့်မည်' : 'View Course'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
