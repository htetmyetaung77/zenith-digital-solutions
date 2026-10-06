import React from 'react';
import { RESOURCES } from '../data/mockData';
import { FolderDown, FileText, Download, Sparkles, CheckCircle2 } from 'lucide-react';

interface ResourceVaultProps {
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
}

export const ResourceVault: React.FC<ResourceVaultProps> = ({ lang, theme }) => {
  const isDark = theme === 'dark';

  const handleDownload = (title: string) => {
    alert(lang === 'mm' ? `"${title}" ကို စတင်ဒေါင်းလုဒ်လုပ်နေပါပြီ။` : `Starting download for "${title}"...`);
  };

  return (
    <section className={`py-16 min-h-[80vh] transition-colors ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>{lang === 'mm' ? 'အခမဲ့ အရင်းအမြစ်များ စာကြည့်တိုက်' : 'Free Resource Vault'}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'mm' ? 'အခမဲ့ Cheat Sheets, Templates နှင့် E-Books များ' : 'Free Cheat Sheets, Templates & Guides'}
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {lang === 'mm'
              ? 'သင့်လုပ်ငန်းနှင့် ဖန်တီးမှုများကို အမြန်ဆုံး အကောင်အထည်ဖော်ရန် ကျွမ်းကျင်သူများ ပြုစုထားသော အခမဲ့အရင်းအမြစ်များကို ဒေါင်းလုဒ်လုပ်ပါ။'
              : 'Supercharge your workflow with battle-tested templates, prompt engineering cheat sheets, and design kits.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESOURCES.map((res) => (
            <div
              key={res.id}
              className={`p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col justify-between hover:border-indigo-500/40 transition-all group ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-lg bg-indigo-500/15 text-indigo-500 text-xs font-bold border border-indigo-500/30">
                    {res.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {res.fileSize} • {res.downloads.toLocaleString()} downloads
                  </span>
                </div>

                <h3 className={`text-lg font-bold mb-2 group-hover:text-indigo-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'mm' ? res.titleMm : res.title}
                </h3>

                <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {res.description}
                </p>
              </div>

              <div className={`pt-4 border-t flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>{res.type} Format</span>
                </div>
                <button
                  onClick={() => handleDownload(res.title)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'mm' ? 'ဒေါင်းလုဒ်လုပ်မည်' : 'Download Free'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
