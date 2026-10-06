import React from 'react';
import { motion } from 'framer-motion';
import { X, Award, Trophy, Medal, Sparkles } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose, lang, theme }) => {
  if (!isOpen) return null;
  const isDark = theme === 'dark';

  const leaders = [
    { rank: 1, name: 'Aung Kyaw Moe', courses: 8, points: 2450 },
    { rank: 2, name: 'May Thu Zar', courses: 6, points: 1980 },
    { rank: 3, name: 'Thant Zin Oo', courses: 5, points: 1650 },
    { rank: 4, name: 'Wutt Yi Phyo', courses: 4, points: 1420 },
  ];

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

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-amber-500 font-bold uppercase tracking-wider">AuraLearn Hall of Fame</span>
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'mm' ? 'ထူးချွန်ကျောင်းသားများ ဦးဆောင်သူစာရင်း' : 'Top Scholars Leaderboard'}
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {leaders.map((item) => {
            const initials = item.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
            return (
              <div
                key={item.rank}
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs ${
                    item.rank === 1 ? 'bg-amber-500 text-slate-950' : item.rank === 2 ? 'bg-slate-300 text-slate-950' : item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    #{item.rank}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow">
                    {initials}
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</div>
                    <div className="text-xs text-slate-400">{item.courses} {lang === 'mm' ? 'သင်တန်းပြီးမြောက်' : 'Courses completed'}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-indigo-400">{item.points} XP</div>
                  <div className="text-[10px] text-slate-400">Score</div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
