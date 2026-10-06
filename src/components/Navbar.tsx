import React, { useState } from 'react';
import { Sparkles, BookOpen, Users, FolderDown, User, Globe, Search, Menu, X, Bot, ShieldCheck, Sun, Moon, Bookmark, LogOut, Trophy, Bell, Check } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'mm' | 'en';
  setLang: (lang: 'mm' | 'en') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenAIMentor: () => void;
  onOpenAuth: () => void;
  onOpenPreface: () => void;
  onOpenLeaderboard: () => void;
  currentUser: { name: string; email: string } | null;
  onLogout: () => void;
  enrolledCount: number;
  bookmarkedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  theme,
  toggleTheme,
  onOpenAIMentor,
  onOpenAuth,
  onOpenPreface,
  onOpenLeaderboard,
  currentUser,
  onLogout,
  enrolledCount,
  bookmarkedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      titleMm: '✨ သင်တန်းအသစ် အသိပေးချက်',
      titleEn: '✨ New Course Announced',
      descMm: 'Advanced Agentic Workflows သင်တန်း အသစ် တင်လိုက်ပါပြီ။',
      descEn: 'Advanced Agentic Workflows masterclass is now live.',
      time: '10 mins ago',
      unread: true
    },
    {
      id: 2,
      titleMm: '🤖 AI Mentor တုံ့ပြန်ချက်',
      titleEn: '🤖 AI Mentor Feedback',
      descMm: 'သင့်ရဲ့ Prompt Engineering မေးခွန်းကို AI ဆရာ ဖြေကြားပေးထားပါတယ်။',
      descEn: 'AI Mentor has replied to your prompt engineering query.',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      titleMm: '🏆 Hall of Fame အပ်ဒိတ်',
      titleEn: '🏆 Leaderboard Update',
      descMm: 'ယခုသီတင်းပတ်၏ ထူးချွန်ကျောင်းသားစာရင်း ထွက်ရှိပါပြီ။',
      descEn: 'This week’s top scholars leaderboard has been updated.',
      time: 'Yesterday',
      unread: false
    }
  ]);

  const isDark = theme === 'dark';
  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all ${
      isDark ? 'bg-slate-950/80 border-slate-800/80 text-white' : 'bg-white/80 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
              <Sparkles className="w-6 h-6 text-indigo-500 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              AuraLearn
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-indigo-500 font-semibold">
              {lang === 'mm' ? 'အဆင့်မြင့် အကယ်ဒမီ' : 'Next-Gen Academy'}
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            {lang === 'mm' ? 'ပင်မစာမျက်နှာ' : 'Home'}
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'courses'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            {lang === 'mm' ? 'သင်တန်းများ' : 'Courses'}
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'community'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            {lang === 'mm' ? 'အသိုင်းအဝိုင်း' : 'Community'}
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'resources'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            {lang === 'mm' ? 'အရင်းအမြစ်များ' : 'Resources'}
          </button>
          <button
            onClick={onOpenPreface}
            className={`px-3 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
              isDark ? 'text-indigo-400 hover:text-white hover:bg-slate-800/50' : 'text-indigo-600 hover:text-indigo-900 hover:bg-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'mm' ? 'အမှာစာ' : 'Preface'}</span>
          </button>
          <button
            onClick={onOpenLeaderboard}
            className={`px-3 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
              isDark ? 'text-amber-400 hover:text-white hover:bg-slate-800/50' : 'text-amber-600 hover:text-amber-900 hover:bg-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{lang === 'mm' ? 'Hall of Fame' : 'Leaderboard'}</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Notification Bell with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`p-2.5 rounded-xl border transition-colors relative ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className={`absolute right-0 mt-3 w-80 rounded-2xl shadow-2xl border p-4 z-50 ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider">{lang === 'mm' ? 'သတိပေးချက်များ (Notifications)' : 'Notifications'}</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-[10px] text-indigo-400 hover:underline">
                      {lang === 'mm' ? 'အားလုံးဖတ်ပြီးဟု မှတ်မည်' : 'Mark all read'}
                    </button>
                  )}
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-3 rounded-xl border transition-colors ${
                      n.unread 
                        ? (isDark ? 'bg-indigo-950/40 border-indigo-500/40' : 'bg-indigo-50/60 border-indigo-200')
                        : (isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200')
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">{lang === 'mm' ? n.titleMm : n.titleEn}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-300">{lang === 'mm' ? n.descMm : n.descEn}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Mentor Button */}
          <button
            onClick={onOpenAIMentor}
            className={`relative px-3.5 py-2.5 rounded-xl border text-sm font-medium flex items-center gap-2 transition-all group shadow-sm ${
              isDark 
                ? 'bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/30 text-indigo-300' 
                : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700'
            }`}
          >
            <Bot className="w-4 h-4 text-indigo-500 group-hover:rotate-12 transition-transform" />
            <span>{lang === 'mm' ? 'AI အကြံပေး' : 'AI Mentor'}</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-colors flex items-center justify-center ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Language Switch */}
          <button
            onClick={() => setLang(lang === 'mm' ? 'en' : 'mm')}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Switch Language"
          >
            <Globe className="w-4 h-4 text-indigo-500" />
            <span>{lang === 'mm' ? 'ENG' : 'မြန်မာ'}</span>
          </button>

          {/* Dashboard Button */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className="relative px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>{lang === 'mm' ? 'ဒက်ရှ်ဘုတ်' : 'Dashboard'}</span>
            {enrolledCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow">
                {enrolledCount}
              </span>
            )}
          </button>

          {/* Auth / Log In Button */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <div className="text-right">
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{currentUser.name}</div>
                <div className="text-[10px] text-emerald-400">Online</div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/40 text-slate-300 hover:text-red-400 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-sm shadow-md transition-all"
            >
              {lang === 'mm' ? 'အကောင့်ဝင်ရန်' : 'Log In / Sign Up'}
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
          <button
            onClick={() => setLang(lang === 'mm' ? 'en' : 'mm')}
            className={`p-2 rounded-lg text-xs font-bold border ${isDark ? 'bg-slate-900 text-slate-300 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200'}`}
          >
            {lang === 'mm' ? 'ENG' : 'မြန်မာ'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b p-5 space-y-3 ${isDark ? 'bg-slate-950/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-900'}`}>
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${activeTab === 'home' ? 'bg-indigo-600 text-white' : isDark ? 'text-slate-300' : 'text-slate-700'}`}
          >
            {lang === 'mm' ? 'ပင်မစာမျက်နှာ' : 'Home'}
          </button>
          <button
            onClick={() => { setActiveTab('courses'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${activeTab === 'courses' ? 'bg-indigo-600 text-white' : isDark ? 'text-slate-300' : 'text-slate-700'}`}
          >
            {lang === 'mm' ? 'သင်တန်းများ' : 'Courses'}
          </button>
          <button
            onClick={() => { setActiveTab('community'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${activeTab === 'community' ? 'bg-indigo-600 text-white' : isDark ? 'text-slate-300' : 'text-slate-700'}`}
          >
            {lang === 'mm' ? 'အသိုင်းအဝိုင်း' : 'Community'}
          </button>
          <button
            onClick={() => { setActiveTab('resources'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${activeTab === 'resources' ? 'bg-indigo-600 text-white' : isDark ? 'text-slate-300' : 'text-slate-700'}`}
          >
            {lang === 'mm' ? 'အရင်းအမြစ်များ' : 'Resources'}
          </button>
          <button
            onClick={() => { onOpenPreface(); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${isDark ? 'text-indigo-400 bg-slate-900' : 'text-indigo-600 bg-slate-100'}`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'mm' ? 'AI အမှာစာ (Preface)' : 'AI Preface'}</span>
          </button>
          <button
            onClick={() => { onOpenLeaderboard(); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${isDark ? 'text-amber-400 bg-slate-900' : 'text-amber-600 bg-slate-100'}`}
          >
            <Trophy className="w-4 h-4" />
            <span>{lang === 'mm' ? 'ဦးဆောင်သူစာရင်း (Leaderboard)' : 'Leaderboard'}</span>
          </button>
          <button
            onClick={() => { onOpenAIMentor(); setMobileMenuOpen(false); }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>{lang === 'mm' ? 'AI အကြံပေးနှင့် ဆွေးနွေးမည်' : 'Chat with AI Mentor'}</span>
          </button>
          <button
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold bg-indigo-600 text-white flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>{lang === 'mm' ? 'ကျွန်ုပ်၏သင်ယူမှု Dashboard' : 'My Learning Dashboard'}</span>
          </button>

          {currentUser ? (
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300">Logged in as <b>{currentUser.name}</b></span>
              <button
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 text-xs font-bold"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow"
            >
              {lang === 'mm' ? 'အကောင့်ဝင်ရန် / Log In' : 'Log In / Sign Up'}
            </button>
          )}
        </div>
      )}
    </header>
  );
};
