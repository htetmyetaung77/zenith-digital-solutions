import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, Loader2, HelpCircle } from 'lucide-react';

interface AIMentorChatProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AIMentorChat: React.FC<AIMentorChatProps> = ({ isOpen, onClose, lang, theme }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: lang === 'mm'
        ? 'မင်္ဂလာပါ! ကျွန်တော်က AuraLearn ရဲ့ AI Course Mentor ပါ။ သင်တန်းရွေးချယ်မှု၊ AI prompt ရေးနည်း၊ digital marketing နှင့် programming လမ်းကြောင်းများအကြောင်း မည်သည့်အရာကိုမဆို မေးမြန်းနိုင်ပါတယ်။'
        : 'Hello! I am AuraLearn AI Mentor. Ask me anything about course recommendations, prompt engineering, coding, or digital marketing strategies.'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: Message = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: lang === 'mm'
            ? 'ဆာဗာ ချိတ်ဆက်မှု အခက်အခဲရှိနေပါသည်။ ကျေးဇူးပြု၍ ခဏနေမှ ထပ်ကြိုးစားပါ။'
            : 'Sorry, there was an error connecting to AI Mentor. Please try again later.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = lang === 'mm' ? [
    'AI Prompt Engineering သင်တန်းက ဘာတွေပါလဲ?',
    'စတင်လေ့လာသူအတွက် ဘယ်သင်တန်းက အကောင်းဆုံးလဲ?',
    'Digital Marketing ဖြင့် လုပ်ငန်းစတင်နည်း'
  ] : [
    'What is covered in AI Prompt Engineering?',
    'Which course is best for absolute beginners?',
    'How to start with Digital Marketing?'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`w-full max-w-2xl border rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[650px] transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>{lang === 'mm' ? 'AuraLearn AI အကြံပေး' : 'AuraLearn AI Mentor'}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-bold border border-emerald-500/30">
                  Online
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'mm' ? 'သင်၏ ကိုယ်ပိုင် ပညာရေးနှင့် အသက်မွေးဝမ်းကျောင်း အကြံပေး' : 'Powered by Google Gemini'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-purple-950 text-purple-400 border border-purple-500/30'
              }`}>
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : isDark ? 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none' : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className={`p-4 rounded-2xl text-sm flex items-center gap-2 border ${isDark ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                <span>{lang === 'mm' ? 'AI စဉ်းစားနေသည်...' : 'AI is thinking...'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Pills */}
        <div className={`px-6 py-2 border-t flex items-center gap-2 overflow-x-auto no-scrollbar ${isDark ? 'bg-slate-950/60 border-slate-800/60' : 'bg-slate-50 border-slate-200'}`}>
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(s)}
              className="px-3 py-1.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 text-xs whitespace-nowrap border border-indigo-500/30 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className={`p-4 border-t flex items-center gap-3 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={lang === 'mm' ? 'AI အကြံပေးကို မေးမြန်းရန်...' : 'Ask AI Mentor a question...'}
            className={`flex-1 rounded-xl px-4 py-3 text-sm border focus:outline-none focus:border-indigo-500 ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500' : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400'
            }`}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !inputMessage.trim()}
            className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-all shadow-lg shadow-indigo-600/30"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
