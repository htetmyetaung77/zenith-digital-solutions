import React, { useState } from 'react';
import { Course } from '../types';
import { BookOpen, CheckCircle2, Award, Play, Clock, Sparkles, ArrowRight, Download, BarChart2, Bookmark } from 'lucide-react';

interface StudentDashboardProps {
  enrolledCourses: Course[];
  bookmarkedCourses: Course[];
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
  onExploreMore: () => void;
  onSelectCourse: (course: Course) => void;
  onStartLearning: (course: Course) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  enrolledCourses,
  bookmarkedCourses,
  lang,
  theme,
  onExploreMore,
  onSelectCourse,
  onStartLearning
}) => {
  const [activeTab, setActiveTab] = useState<'enrolled' | 'bookmarks'>('enrolled');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(enrolledCourses[0] || null);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const isDark = theme === 'dark';

  const toggleLesson = (lessonId: string) => {
    setCompletedLessons(prev => ({ ...prev, [lessonId]: !prev[lessonId] }));
  };

  // Helper for progress calculation
  const getCourseProgress = (course: Course) => {
    const allLessons = course.modules.flatMap(m => m.lessons);
    if (allLessons.length === 0) return 0;
    const completedCount = allLessons.filter(l => completedLessons[l.id]).length;
    // Default simulated progress if none completed
    return completedCount > 0 ? Math.round((completedCount / allLessons.length) * 100) : 35;
  };

  const getTimeRemaining = (course: Course) => {
    const progress = getCourseProgress(course);
    if (progress === 100) return lang === 'mm' ? 'ပြီးဆုံးပါပြီ (Completed)' : 'Completed';
    const hours = parseInt(course.duration) || 10;
    const remainingHours = Math.max(1, Math.round(hours * (1 - progress / 100)));
    return lang === 'mm' ? `ခန့်မှန်းခြေ ${remainingHours} နာရီ ကျန်ရှိသည်` : `${remainingHours} hrs remaining`;
  };

  return (
    <div className={`py-12 min-h-[85vh] transition-colors ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className={`mb-8 p-8 rounded-3xl border relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border-indigo-500/30' 
            : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-white border-indigo-200 shadow-sm'
        }`}>
          <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-500 text-xs font-bold border border-indigo-500/30 mb-3 inline-block">
                {lang === 'mm' ? 'ကျောင်းသား ဒက်ရှ်ဘုတ်' : 'Student Learning Dashboard'}
              </span>
              <h1 className={`text-3xl sm:text-4xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'mm' ? 'မင်္ဂလာပါ၊ သင်၏ သင်ယူမှုခရီးစဉ်' : 'Welcome back, Scholar!'}
              </h1>
              <p className={`text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'mm'
                  ? 'သင်စာရင်းသွင်းထားသော သင်တန်းများနှင့် တိုးတက်မှုကို ဆက်လက်လေ့လာပါ။'
                  : 'Track your enrolled courses, complete interactive lessons, and earn certificates.'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl border flex items-center gap-3 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-500">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <div>
                  <div className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{enrolledCourses.length}</div>
                  <div className="text-xs text-slate-400">{lang === 'mm' ? 'တက်ရောက်ဆဲ' : 'Enrolled'}</div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-center gap-3 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="w-12 h-12 rounded-xl bg-pink-600/20 flex items-center justify-center text-pink-500">
                  <Bookmark className="w-6 h-6" />
                </div>
                <div>
                  <div className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{bookmarkedCourses.length}</div>
                  <div className="text-xs text-slate-400">{lang === 'mm' ? 'သိမ်းဆည်းထားသည်' : 'Bookmarks'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-3 mb-8 border-b pb-4 border-slate-800">
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'enrolled'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : isDark ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {lang === 'mm' ? 'တက်ရောက်နေသော သင်တန်းများ' : 'My Enrolled Courses'}
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : isDark ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {lang === 'mm' ? 'သိမ်းဆည်းထားသော သင်တန်းများ (Bookmarks)' : 'Bookmarked Courses'}
          </button>
        </div>

        {activeTab === 'enrolled' ? (
          enrolledCourses.length === 0 ? (
            <div className={`text-center py-20 rounded-3xl border space-y-4 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="w-16 h-16 rounded-full bg-indigo-600/20 text-indigo-500 flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'mm' ? 'လက်ရှိတွင် စာရင်းသွင်းထားသော သင်တန်း မရှိသေးပါ။' : 'No courses enrolled yet.'}
              </h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                {lang === 'mm'
                  ? 'အထက်ပါ သင်တန်းများထဲမှ သင့်စိတ်ကြိုက် သင်တန်းကို ရွေးချယ်ပြီး စတင်လေ့လာလိုက်ပါ။'
                  : 'Explore our elite catalog and enroll in your first masterclass to start learning.'}
              </p>
              <button
                onClick={onExploreMore}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all inline-flex items-center gap-2"
              >
                <span>{lang === 'mm' ? 'သင်တန်းများကြည့်မည်' : 'Explore Courses'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Enrolled Courses List with Progress & Time Remaining */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'mm' ? 'သင်တန်းစာရင်းများ' : 'Your Enrolled Courses'}
                </h3>
                {enrolledCourses.map((course) => {
                  const isSelected = selectedCourse?.id === course.id;
                  const progress = getCourseProgress(course);
                  const timeRemaining = getTimeRemaining(course);

                  return (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-3 ${
                        isSelected
                          ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/10'
                          : isDark ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img src={course.image} alt={course.title} className="w-20 h-16 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {lang === 'mm' ? course.titleMm : course.title}
                          </h4>
                          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
                            <span>{course.duration}</span>
                            <span className="text-indigo-400 font-semibold">{timeRemaining}</span>
                          </div>
                        </div>
                      </div>

                      {/* Visual Progress Bar */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>{lang === 'mm' ? 'ပြီးမြောက်မှု' : 'Progress'}</span>
                          <span className="font-bold text-indigo-400">{progress}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: Selected Course Lessons & Player */}
              <div className="lg:col-span-7">
                {selectedCourse && (
                  <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-lg'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-indigo-500 font-bold uppercase tracking-wider">
                          {selectedCourse.categoryLabel}
                        </span>
                        <h2 className={`text-xl sm:text-2xl font-extrabold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {lang === 'mm' ? selectedCourse.titleMm : selectedCourse.title}
                        </h2>
                      </div>
                    </div>

                    {/* Start Learning / Watch Lessons Button */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-950 border border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          {lang === 'mm' ? 'သင်ခန်းစာများကို အစအဆုံး လေ့လာရန်' : 'Start Immersive Learning'}
                        </h3>
                        <p className="text-xs text-slate-300">
                          {lang === 'mm' ? 'ဗီဒီယိုသင်ခန်းစာများ၊ AI Tutor နှင့် Quiz များ ပါဝင်သော Classroom သို့ ဝင်မည်။' : 'Access the full video player, AI tutor, and interactive quizzes.'}
                        </p>
                      </div>
                      <button
                        onClick={() => onStartLearning(selectedCourse)}
                        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 whitespace-nowrap"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>{lang === 'mm' ? 'သင်တန်းစတင်တက်မည်' : 'Enter Classroom'}</span>
                      </button>
                    </div>

                    {/* Lessons Checklist */}
                    <div>
                      <h3 className={`text-base font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {lang === 'mm' ? 'သင်ခန်းစာများ (Checklist)' : 'Lesson Progress'}
                      </h3>
                      <div className="space-y-3">
                        {selectedCourse.modules.flatMap(m => m.lessons).map((lesson) => {
                          const isCompleted = completedLessons[lesson.id];
                          return (
                            <div
                              key={lesson.id}
                              onClick={() => toggleLesson(lesson.id)}
                              className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                                isCompleted
                                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400'
                                  : isDark ? 'bg-slate-950/60 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                                  isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-400'
                                }`}>
                                  {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                                </div>
                                <span className={isCompleted ? 'line-through text-slate-400 font-medium' : 'font-medium'}>
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-xs text-slate-400">{lesson.duration}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Certificate Preview Card */}
                    <div className={`p-6 rounded-2xl border flex items-center justify-between ${
                      isDark 
                        ? 'bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-950 border-indigo-500/30' 
                        : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-white border-indigo-200'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {lang === 'mm' ? 'သင်တန်းဆုလက်မှတ် (Certificate)' : 'Course Completion Certificate'}
                          </div>
                          <div className="text-xs text-slate-400">
                            {lang === 'mm' ? 'သင်ခန်းစာများ 100% ပြီးဆုံးပါက ရယူနိုင်ပါသည်။' : 'Available upon completing all lessons'}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(lang === 'mm' ? 'သင်ခန်းစာများ အားလုံး ပြီးဆုံးမှသာ Certificate ထုတ်ပေးနိုင်ပါသည်။' : 'Complete all lessons to download certificate!')}
                        className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 border transition-colors ${
                          isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        <span>{lang === 'mm' ? 'လက်မှတ်ရယူမည်' : 'Get Certificate'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          /* Bookmarks Tab */
          bookmarkedCourses.length === 0 ? (
            <div className={`text-center py-20 rounded-3xl border space-y-4 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="w-16 h-16 rounded-full bg-pink-600/20 text-pink-500 flex items-center justify-center mx-auto">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'mm' ? 'သိမ်းဆည်းထားသော သင်တန်း မရှိသေးပါ။' : 'No bookmarked courses yet.'}
              </h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                {lang === 'mm'
                  ? 'သင်တန်းများတွင်ရှိသော Bookmark ခလုတ်ကိုနှိပ်၍ ဤနေရာတွင် သိမ်းဆည်းထားနိုင်ပါသည်။'
                  : 'Click the bookmark icon on any course card to save it for later.'}
              </p>
              <button
                onClick={onExploreMore}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all inline-flex items-center gap-2"
              >
                <span>{lang === 'mm' ? 'သင်တန်းများကြည့်မည်' : 'Explore Courses'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookmarkedCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  className={`group rounded-3xl border overflow-hidden hover:border-indigo-500/50 transition-all duration-300 flex flex-col cursor-pointer shadow-xl ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className={`text-lg font-bold mb-2 group-hover:text-indigo-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'mm' ? course.titleMm : course.title}
                    </h3>
                    <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {lang === 'mm' ? course.subtitleMm : course.subtitle}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <span className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{course.price.toLocaleString()} MMK</span>
                      <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
                        {lang === 'mm' ? 'ကြည့်မည်' : 'View Course'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};
