import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang, theme }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isDark = theme === 'dark';

  const faqs = [
    {
      qMm: 'ငွေပေးချေရာတွင် Wave Pay နှင့် AYA Pay ကို ဘယ်လိုအသုံးပြုရမလဲ?',
      qEn: 'How do I pay using Wave Pay or AYA Pay?',
      aMm: 'သင်တန်းတစ်ခုကို Enroll နှိပ်ပြီးပါက ငွေပေးချေမှု မိုဒယ်ပေါ်လာပါမည်။ ကျွန်ုပ်တို့၏ AYA / Wave Pay အကောင့် (09779944100) သို့ ငွေလွှဲပြီး ငွေလွှဲနံပါတ် (Transaction ID) ကို ထည့်သွင်းကာ အတည်ပြုရုံဖြင့် သင်တန်းကို ချက်ချင်း လေ့လာခွင့်ရရှိမည် ဖြစ်ပါသည်။',
      aEn: 'Select Wave Pay or AYA Pay in the checkout modal, transfer the course fee to our account (09779944100), and enter your Transaction ID to get instant access.'
    },
    {
      qMm: 'သင်တန်းပြီးဆုံးပါက ဆုလက်မှတ် (Certificate) ရရှိနိုင်ပါသလား?',
      qEn: 'Will I get a certificate upon course completion?',
      aMm: 'ဟုတ်ကဲ့၊ သင်ခန်းစာများအားလုံးကို 100% လေ့လာပြီးဆုံးပါက နိုင်ငံတကာအသိအမှတ်ပြု Course Completion Certificate ကို ဒေါင်းလုဒ်လုပ် ရယူနိုင်ပါသည်။',
      aEn: 'Yes! Once you complete all lessons in a masterclass, you can instantly download your verified Certificate of Completion.'
    },
    {
      qMm: 'သင်တန်းများကို အချိန်အကန့်အသတ်မရှိ (Lifetime Access) လေ့လာနိုင်ပါသလား?',
      qEn: 'Do I have lifetime access to the enrolled courses?',
      aMm: 'ဟုတ်ကဲ့၊ တစ်ကြိမ်ဝယ်ယူထားရုံဖြင့် တစ်သက်တာလုံး အချိန်မရွေး၊ နေရာမရွေး အကြိမ်ကြိမ် ပြန်လည်လေ့လာနိုင်ပါသည်။',
      aEn: 'Yes, once enrolled, you have lifetime access to all course updates, videos, and resources.'
    },
    {
      qMm: 'AI အကြံပေး (AI Mentor) ကို ဘယ်လိုအသုံးပြုရမလဲ?',
      qEn: 'How do I use the AI Mentor?',
      aMm: 'Navbar တွင်ရှိသော "AI အကြံပေး" ခလုတ်ကို နှိပ်၍ သင်တန်းများနှင့် စပ်လျဉ်းသည့် မည်သည့်မေးခွန်းကိုမဆို မြန်မာဘာသာဖြင့် အချိန်မရွေး မေးမြန်းနိုင်ပါသည်။',
      aEn: 'Click the "AI Mentor" button in the navigation bar to ask any questions in Burmese or English about your learning journey.'
    }
  ];

  return (
    <section className={`py-16 transition-colors ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>{lang === 'mm' ? 'မကြာခဏ မေးလေ့ရှိသော မေးခွန်းများ' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'mm' ? 'သိလိုသမျှ မေးခွန်းများနှင့် အဖြေများ' : 'Got Questions? We Have Answers'}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg"
                >
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>{lang === 'mm' ? faq.qMm : faq.qEn}</span>
                  <ChevronDown className={`w-5 h-5 text-indigo-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className={`px-6 pb-6 text-sm leading-relaxed border-t ${isDark ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-600'}`}>
                    <p className="pt-4">{lang === 'mm' ? faq.aMm : faq.aEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
