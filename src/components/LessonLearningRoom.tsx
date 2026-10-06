import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Course, Lesson } from '../types';
import { X, Play, Pause, CheckCircle2, Bot, Send, FileText, HelpCircle, ArrowLeft, Volume2, Maximize2 } from 'lucide-react';

interface LessonLearningRoomProps {
  course: Course;
  onClose: () => void;
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
}

export const LessonLearningRoom: React.FC<LessonLearningRoomProps> = ({ course, onClose, lang, theme }) => {
  const allLessons = course.modules.flatMap(m => m.lessons);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedMap, setCompletedMap] = useState<Record<number, boolean>>({});
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'transcript' | 'aiTutor' | 'quiz'>('transcript');
  
  const [tutorMessages, setTutorMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: lang === 'mm'
        ? `မင်္ဂလာပါ! "${course.titleMm}" သင်တန်း၏ သင်ခန်းစာအတွက် မေးခွန်းများရှိပါက ကျွန်ုပ်ကို မေးမြန်းနိုင်ပါတယ်။`
        : `Hello! Ask me any questions regarding this lesson in "${course.title}".`
    }
  ]);
  const [tutorInput, setTutorInput] = useState('');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  const isDark = theme === 'dark';

  const handleToggleComplete = (index: number) => {
    setCompletedMap(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSendTutor = async () => {
    if (!tutorInput.trim()) return;
    const userMsg = tutorInput;
    setTutorMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setTutorInput('');

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Regarding lesson "${currentLesson.title}" in course "${course.title}": ${userMsg}` })
      });
      const data = await res.json();
      setTutorMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (err) {
      setTutorMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, AI tutor is temporarily offline.' }]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col text-slate-100 overflow-hidden">
      {/* Top Navbar */}
      <div className="h-16 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-2 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'mm' ? 'ဒက်ရှ်ဘုတ်သို့ ပြန်မည်' : 'Back to Dashboard'}</span>
          </button>
          <div className="h-6 w-px bg-slate-800 hidden sm:block" />
          <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
            {lang === 'mm' ? course.titleMm : course.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
            {lang === 'mm' ? `သင်ခန်းစာ ${currentLessonIndex + 1} / ${allLessons.length}` : `Lesson ${currentLessonIndex + 1} of ${allLessons.length}`}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left: Video Player & Interactive Workspace */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950 overflow-y-auto">
          {/* Authentic Video Player Simulation */}
          <div className="relative aspect-video bg-slate-900 w-full flex items-center justify-center group overflow-hidden border-b border-slate-800">
            <img src={course.image} alt={currentLesson.title} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white shadow-2xl shadow-indigo-600/50 transition-transform transform hover:scale-110"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
            </div>
            
            {/* Video Control Bar Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 to-transparent flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <span>04:12 / 15:45</span>
              </div>
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 cursor-pointer hover:text-white" />
                <Maximize2 className="w-4 h-4 cursor-pointer hover:text-white" />
              </div>
            </div>
          </div>

          {/* Lesson Title & Actions */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                  {lang === 'mm' ? `သင်ခန်းစာ ${currentLessonIndex + 1}` : `Current Lesson`}
                </span>
                <h1 className="text-2xl font-extrabold text-white mt-1">
                  {currentLesson.title}
                </h1>
              </div>

              <button
                onClick={() => handleToggleComplete(currentLessonIndex)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
                  completedMap[currentLessonIndex]
                    ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{completedMap[currentLessonIndex] ? (lang === 'mm' ? 'ပြီးဆုံးပါပြီ (Completed)' : 'Completed') : (lang === 'mm' ? 'ပြီးမြောက်ကြောင်း မှတ်မည်' : 'Mark as Complete')}</span>
              </button>
            </div>

            {/* Interactive Tabs: Transcript / AI Tutor / Quiz */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setActiveTab('transcript')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
                    activeTab === 'transcript' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>{lang === 'mm' ? 'သင်ခန်းစာ မှတ်စု' : 'Transcript & Notes'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('aiTutor')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
                    activeTab === 'aiTutor' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Bot className="w-4 h-4 text-indigo-300" />
                  <span>{lang === 'mm' ? 'AI ဆရာ (AI Tutor)' : 'Ask AI Tutor'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
                    activeTab === 'quiz' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'mm' ? 'ဉာဏ်စမ်းမေးခွန်း (Quiz)' : 'Knowledge Quiz'}</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="pt-4">
                {activeTab === 'transcript' && (
                  <div className="space-y-4 text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                    <h3 className="text-white font-bold mb-2">Key Takeaways from this Lesson:</h3>
                    <p>1. Understanding core concepts and practical implementation frameworks.</p>
                    <p>2. Real-world case studies and industry best practices for 2026.</p>
                    <p>3. Step-by-step walkthrough of automated workflows and prompt engineering.</p>
                  </div>
                )}

                {activeTab === 'aiTutor' && (
                  <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 flex flex-col h-[300px]">
                    <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-2">
                      {tutorMessages.map((m, i) => (
                        <div key={i} className={`flex gap-3 text-xs ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                          <div className={`p-3 rounded-2xl max-w-[85%] ${m.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-200'}`}>
                            {m.text}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tutorInput}
                        onChange={(e) => setTutorInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendTutor()}
                        placeholder={lang === 'mm' ? 'ဒီသင်ခန်းစာအကြောင်း AI ကို မေးရန်...' : 'Ask AI tutor about this lesson...'}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        onClick={handleSendTutor}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'quiz' && (
                  <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-white">Quick Check: What is the primary focus of this lesson?</h3>
                    <div className="space-y-2">
                      {[
                        'Mastering advanced theoretical concepts and practical execution',
                        'Ignoring industry standards',
                        'Manual repetitive data entry'
                      ].map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => setQuizAnswer(idx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                            quizAnswer === idx ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 border-slate-800 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setQuizSubmitted(true)}
                      className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow"
                    >
                      Submit Answer
                    </button>
                    {quizSubmitted && (
                      <div className="text-xs font-bold text-emerald-400 mt-2">
                        {quizAnswer === 0 ? 'Correct! Excellent job.' : 'Incorrect, try again!'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Course Curriculum Playlist Sidebar */}
        <div className="lg:col-span-4 bg-slate-900 border-l border-slate-800 flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-slate-800 bg-slate-950 font-bold text-sm text-white">
            {lang === 'mm' ? 'သင်တန်း သင်ခန်းစာများ (Curriculum)' : 'Course Curriculum'}
          </div>
          <div className="divide-y divide-slate-800/80">
            {course.modules.map((mod) => (
              <div key={mod.id}>
                <div className="p-3 bg-slate-900/90 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {mod.title}
                </div>
                <div className="divide-y divide-slate-800/40">
                  {mod.lessons.map((lesson, idx) => {
                    const isSelected = allLessons[currentLessonIndex]?.id === lesson.id;
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setCurrentLessonIndex(allLessons.findIndex(l => l.id === lesson.id))}
                        className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected ? 'bg-indigo-950/60 border-l-4 border-indigo-500' : 'hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {idx + 1}
                          </div>
                          <div>
                            <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                              {lesson.title}
                            </div>
                            <div className="text-[10px] text-slate-500">{lesson.duration}</div>
                          </div>
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
    </div>
  );
};
