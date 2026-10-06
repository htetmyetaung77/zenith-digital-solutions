import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Course, Lesson } from '../types';
import { X, Star, Clock, Users, BookOpen, CheckCircle2, Play, Lock, ShieldCheck, Award } from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onStartPayment: (course: Course) => void;
  isEnrolled: boolean;
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onStartPayment,
  isEnrolled,
  lang,
  theme,
}) => {
  if (!course) return null;
  const isDark = theme === 'dark';
  const instructorInitials = course.instructor.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`relative w-full max-w-4xl border rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header / Banner */}
        <div className="relative aspect-video max-h-[320px] w-full overflow-hidden bg-slate-950">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 mb-2 inline-block">
              {course.categoryLabel}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'mm' ? course.titleMm : course.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Stats Bar */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl border text-center ${
            isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <span className="text-xs text-slate-400 block">{lang === 'mm' ? 'သင်တန်းချိန်' : 'Duration'}</span>
              <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{course.duration}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">{lang === 'mm' ? 'အဆင့်' : 'Level'}</span>
              <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{course.level}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">{lang === 'mm' ? 'ကျောင်းသားဦးရေ' : 'Students'}</span>
              <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{course.studentsCount.toLocaleString()}+</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">{lang === 'mm' ? 'သုံးသပ်ချက်' : 'Rating'}</span>
              <span className="text-sm font-bold text-amber-500 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-500" /> {course.rating}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{lang === 'mm' ? 'သင်တန်းအကြောင်း' : 'About this Masterclass'}</h3>
            <p className={`leading-relaxed text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {lang === 'mm' ? course.descriptionMm : course.description}
            </p>
          </div>

          {/* Instructor Profile */}
          <div className={`p-5 rounded-2xl border flex items-center gap-4 ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="w-12 h-12 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/40">
              {instructorInitials}
            </div>
            <div>
              <div className="text-xs text-indigo-500 font-semibold mb-0.5">{lang === 'mm' ? 'သင်တန်းပို့ချမည့်ဆရာ' : 'Lead Instructor'}</div>
              <div className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{course.instructor.name}</div>
              <div className="text-xs text-slate-400">{course.instructor.role}</div>
            </div>
          </div>

          {/* Curriculum */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'mm' ? 'သင်ခန်းစာ အစီအစဉ် (Curriculum)' : 'Course Curriculum'}
              </h3>
              {isEnrolled && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  {lang === 'mm' ? '✓ အားလုံး ဖွင့်လှစ်ပြီး (All Unlocked)' : '✓ Fully Unlocked'}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {course.modules.map((mod, idx) => (
                <div key={mod.id} className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className={`p-4 border-b font-semibold text-sm ${isDark ? 'bg-slate-900/60 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'}`}>
                    {mod.title}
                  </div>
                  <div className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                    {mod.lessons.map((lesson) => {
                      const unlocked = isEnrolled || lesson.freePreview;
                      return (
                        <div key={lesson.id} className="p-4 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-3">
                            {unlocked ? (
                              <Play className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                            ) : (
                              <Lock className="w-4 h-4 text-slate-400" />
                            )}
                            <span className={unlocked ? (isDark ? 'text-white font-medium' : 'text-slate-900 font-medium') : 'text-slate-400'}>
                              {lesson.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            {lesson.freePreview && !isEnrolled && (
                              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-500 text-[10px] font-bold border border-indigo-500/30">
                                {lang === 'mm' ? 'အခမဲ့ကြည့်မည်' : 'Free Preview'}
                              </span>
                            )}
                            {isEnrolled && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                {lang === 'mm' ? 'ကြည့်ရှုနိုင်သည်' : 'Unlocked'}
                              </span>
                            )}
                            <span className="text-xs text-slate-400">{lesson.duration}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className={`p-6 border-t flex items-center justify-between ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div>
            <span className="text-xs text-slate-400 block">{lang === 'mm' ? 'သင်တန်းကြေး စုစုပေါင်း' : 'Total Investment'}</span>
            <span className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{course.price.toLocaleString()} MMK</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className={`px-5 py-3 rounded-xl font-semibold text-sm transition-colors border ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              {lang === 'mm' ? 'ပိတ်မည်' : 'Close'}
            </button>
            
            {isEnrolled ? (
              <button
                disabled
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center gap-2 cursor-default shadow-lg shadow-emerald-600/20"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{lang === 'mm' ? 'တက်ရောက်ပြီးပါပြီ (Unlocked)' : 'Enrolled & Unlocked'}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onStartPayment(course);
                  onClose();
                }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2"
              >
                <span>{lang === 'mm' ? 'Wave / AYA ဖြင့် ပေးချေမည်' : 'Pay via Wave / AYA'}</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
