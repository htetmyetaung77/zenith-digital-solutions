import React, { useState } from 'react';
import { COMMUNITY_POSTS } from '../data/mockData';
import { MessageSquare, Heart, Share2, Sparkles, Send, User } from 'lucide-react';
import { CommunityPost } from '../types';

interface CommunityFeedProps {
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ lang, theme }) => {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [newContent, setNewContent] = useState('');
  const isDark = theme === 'dark';

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      authorName: lang === 'mm' ? 'သင် (You)' : 'You (Student)',
      authorAvatar: '',
      authorRole: 'AuraLearn Scholar',
      timeAgo: 'Just now',
      content: newContent,
      category: 'Discussion',
      likes: 0,
      commentsCount: 0
    };

    setPosts([newPost, ...posts]);
    setNewContent('');
  };

  return (
    <section className={`py-16 min-h-[80vh] transition-colors ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'mm' ? 'ကျောင်းသားများ အသိုင်းအဝိုင်းနှင့် အောင်မြင်မှုများ' : 'Student Community & Success Stories'}
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {lang === 'mm'
              ? 'အခြားသော ဖန်တီးရှင်များနှင့် နည်းပညာသမားများ၏ အတွေ့အကြုံများကို လေ့လာပြီး အကြံဥာဏ်များ ဖလှယ်ပါ။'
              : 'Connect with fellow creators, share your milestones, and discuss cutting-edge tech trends.'}
          </p>
        </div>

        {/* Create Post Box */}
        <form onSubmit={handleCreatePost} className={`mb-10 p-6 rounded-3xl border shadow-xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{lang === 'mm' ? 'မိတ်ဆွေ၏ အတွေ့အကြုံကို မျှဝေပါ' : 'Share your thoughts or milestone'}</div>
              <div className="text-xs text-slate-400">{lang === 'mm' ? 'အသိုင်းအဝိုင်းထံ တင်ပြရန်' : 'Post to community feed'}</div>
            </div>
          </div>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={3}
            placeholder={lang === 'mm' ? 'ယနေ့ ဘာတွေ လေ့လာင်သလဲ? သင့်အောင်မြင်မှုကို မျှဝေပါ...' : 'What did you learn today? Share your milestone...'}
            className={`w-full rounded-2xl p-4 text-sm border focus:outline-none focus:border-indigo-500 mb-4 resize-none ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
            }`}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newContent.trim()}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <span>{lang === 'mm' ? 'တင်မည် (Post)' : 'Post Update'}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => {
            const initials = post.authorName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
            return (
              <div key={post.id} className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow">
                      {initials}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{post.authorName}</div>
                      <div className="text-xs text-slate-400">{post.authorRole} • {post.timeAgo}</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-indigo-500/15 text-indigo-500 text-xs font-bold border border-indigo-500/30">
                    {post.category}
                  </span>
                </div>

                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  {post.content}
                </p>

                {post.image && (
                  <div className="rounded-2xl overflow-hidden aspect-video max-h-[350px]">
                    <img src={post.image} alt="Post attachment" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className={`flex items-center gap-6 pt-4 border-t text-xs font-medium ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.isLiked ? 'text-pink-500 font-bold' : isDark ? 'hover:text-white' : 'hover:text-slate-900'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-pink-500' : ''}`} />
                    <span>{post.likes} {lang === 'mm' ? 'နှစ်သက်သူ' : 'Likes'}</span>
                  </button>
                  <button className={`flex items-center gap-1.5 transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount} {lang === 'mm' ? 'ဆွေးနွေးချက်' : 'Comments'}</span>
                  </button>
                  <button className={`flex items-center gap-1.5 transition-colors ml-auto ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>
                    <Share2 className="w-4 h-4" />
                    <span>{lang === 'mm' ? 'မျှဝေမည်' : 'Share'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
