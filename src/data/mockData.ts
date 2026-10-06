import { Course, CommunityPost, ResourceItem, QuizQuestion } from '../types';

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'AI Prompt Engineering & ChatGPT Advanced Masterclass',
    titleMm: 'AI Prompt Engineering နှင့် ChatGPT အဆင့်မြင့် မာစတာကလပ်',
    subtitle: 'Master generative AI, custom GPTs, workflow automation, and AI-driven content generation.',
    subtitleMm: 'Generative AI ကို ကျွမ်းကျင်စွာအသုံးပြုခြင်း၊ Custom GPTs တည်ဆောက်ခြင်းနှင့် အလုပ်အကိုင် အလိုအလျောက်လုပ်ဆောင်ခြင်း။',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    level: 'All Levels',
    rating: 4.9,
    reviewsCount: 1420,
    studentsCount: 5230,
    duration: '12 Hours',
    price: 45000,
    originalPrice: 95000,
    instructor: {
      name: 'Ko Hein Htet',
      role: 'AI Researcher & Tech Founder',
    },
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    description: 'Learn how to leverage state-of-the-art AI models to automate tasks, generate high-converting copy, write robust code, and build AI agents without heavy programming.',
    descriptionMm: 'ခေတ်မီ AI မော်ဒယ်များကို အသုံးပြု၍ လုပ်ငန်းများကို အလိုအလျောက်လုပ်ဆောင်ရန်၊ စာပေနှင့် ရုပ်ရှင်ဇာတ်ညွှန်းများ ဖန်တီးရန်နှင့် ပရိုဂရမ်မရေးဘဲ AI Agent များ တည်ဆောက်နည်းကို လက်တွေ့သင်ကြားပေးမည်။',
    tags: ['ChatGPT', 'Prompt Engineering', 'AI Agents', 'Automation'],
    bestseller: true,
    featured: true,
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Foundations of Generative AI & Prompt Science',
        lessons: [
          { id: 'l1', title: 'Introduction to LLMs and How AI Thinks', duration: '15 mins', freePreview: true },
          { id: 'l2', title: 'The 5 Pillars of High-Performance Prompting', duration: '25 mins', freePreview: true },
          { id: 'l3', title: 'Few-Shot Prompting and Chain-of-Thought Techniques', duration: '30 mins' },
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Building Custom GPTs & Workflow Automation',
        lessons: [
          { id: 'l4', title: 'Creating Your First Custom GPT for Business', duration: '40 mins' },
          { id: 'l5', title: 'Integrating APIs with Make.com and ChatGPT', duration: '45 mins' },
          { id: 'l6', title: 'Automating Social Media Content Generation', duration: '35 mins' },
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Viral Reels & TikTok Cinematic Video Production',
    titleMm: 'TikTok နှင့် Reels ဗီဒီယိုဖန်တီးမှု မာစတာတန်း',
    subtitle: 'Shoot cinematic videos, master CapCut & Premiere Pro, and grow millions of views.',
    subtitleMm: 'ရုပ်ရှင်ဆန်သော ရိုက်ကူးနည်းများ၊ CapCut နှင့် Premiere Pro ဖြင့် တည်းဖြတ်ခြင်း၊ View သိန်းချီရအောင် တည်ဆောက်နည်း။',
    category: 'creator',
    categoryLabel: 'Content Creator',
    level: 'Beginner',
    rating: 4.8,
    reviewsCount: 980,
    studentsCount: 4100,
    duration: '10 Hours',
    price: 39000,
    originalPrice: 80000,
    instructor: {
      name: 'Su Myat Noe',
      role: 'Top Creator & Video Director',
    },
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
    description: 'Turn your smartphone into a cinematic camera. Master hooks, storytelling frameworks, lighting, audio design, and algorithms for TikTok, Facebook Reels, and YouTube Shorts.',
    descriptionMm: 'လက်ကိုင်ဖုန်းဖြင့် အရည်အသွေးမြင့် ဗီဒီယိုများရိုက်ကူးနည်း၊ ပရိသတ်ကို ချက်ချင်းဆွဲဆောင်နိုင်သော Hook အသုံးချနည်းနှင့် Social Algorithm များကို ကျွမ်းကျင်ပိုင်နိုင်စွာ ကိုင်တွယ်နည်း။',
    tags: ['Video Editing', 'CapCut', 'TikTok Growth', 'Storytelling'],
    bestseller: true,
    featured: true,
    modules: [
      {
        id: 'm2-1',
        title: 'Module 1: Smartphone Cinematography & Lighting',
        lessons: [
          { id: 'l2-1', title: 'Camera Settings & Frame Rates for Cinematic Look', duration: '20 mins', freePreview: true },
          { id: 'l2-2', title: 'Three-Point Lighting on a Budget', duration: '30 mins' },
        ]
      },
      {
        id: 'm2-2',
        title: 'Module 2: Advanced CapCut & Premiere Pro Editing',
        lessons: [
          { id: 'l2-3', title: 'Dynamic Captions & Sound Effects Masterclass', duration: '35 mins' },
          { id: 'l2-4', title: 'Color Grading & Fast-paced Storytelling', duration: '40 mins' },
        ]
      }
    ]
  },
  {
    id: 'c3',
    title: 'Full-Stack Web App Development with React & Node.js',
    titleMm: 'React နှင့် Node.js ဖြင့် Web App တည်ဆောက်နည်း',
    subtitle: 'Build production-ready web applications from scratch with modern TypeScript and Tailwind CSS.',
    subtitleMm: 'TypeScript နှင့် Tailwind CSS တို့ကို အသုံးပြု၍ ခေတ်မီဝဘ်အပလီကေးရှင်းများကို အစအဆုံး တည်ဆောက်နည်း။',
    category: 'coding',
    categoryLabel: 'Tech & Coding',
    level: 'Intermediate',
    rating: 4.95,
    reviewsCount: 750,
    studentsCount: 2890,
    duration: '24 Hours',
    price: 65000,
    originalPrice: 130000,
    instructor: {
      name: 'Min Thu Kyaw',
      role: 'Senior Software Architect',
    },
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    description: 'Comprehensive software engineering bootcamp covering React 19, TypeScript, Express REST APIs, database architecture, and cloud deployment.',
    descriptionMm: 'React 19၊ TypeScript၊ Express API နှင့် Database များချိတ်ဆက်ကာ ကမ္ဘာ့အဆင့်မီ Web Developer တစ်ဦးဖြစ်လာစေရန် လက်တွေ့စီမံကိန်းများနှင့်တကွ သင်ကြားပေးမည်။',
    tags: ['React', 'TypeScript', 'Node.js', 'Full-Stack'],
    featured: true,
    modules: [
      {
        id: 'm3-1',
        title: 'Module 1: Modern React & TypeScript Architecture',
        lessons: [
          { id: 'l3-1', title: 'TypeScript Deep Dive for React Developers', duration: '45 mins', freePreview: true },
          { id: 'l3-2', title: 'State Management & Custom Hooks', duration: '50 mins' },
        ]
      }
    ]
  },
  {
    id: 'c4',
    title: 'Digital Marketing & High-Converting Funnels 2026',
    titleMm: 'ဒီဂျစ်တယ် စျေးကွက်ဖော်ဆောင်ရေးနှင့် Funnels များတည်ဆောက်ခြင်း',
    subtitle: 'Scale your business with Meta Ads, TikTok Ads, SEO, and automated email marketing.',
    subtitleMm: 'Meta Ads၊ TikTok Ads, SEO နှင့် အလိုအလျောက် Email Marketing ဖြင့် လုပ်ငန်းတိုးချဲ့နည်း။',
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    level: 'All Levels',
    rating: 4.7,
    reviewsCount: 620,
    studentsCount: 3400,
    duration: '14 Hours',
    price: 42000,
    originalPrice: 85000,
    instructor: {
      name: 'Wutt Yi Phyo',
      role: 'Growth Marketer & Agency Founder',
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    description: 'Learn data-driven digital marketing strategies that generate consistent leads and sales for e-commerce, service businesses, and personal brands.',
    descriptionMm: 'E-commerce နှင့် ဝန်ဆောင်မှုလုပ်ငန်းများအတွက် Customer အမြောက်အမြား ရရှိစေမည့် အဆင့်မြင့် ကြော်ငြာမဟာဗျူဟာများနှင့် Funnel တည်ဆောက်နည်းများ။',
    tags: ['Meta Ads', 'Funnel', 'SEO', 'E-commerce'],
    modules: [
      {
        id: 'm4-1',
        title: 'Module 1: Advanced Meta & TikTok Ads Targeting',
        lessons: [
          { id: 'l4-1', title: 'Psychology of High-Converting Ad Creative', duration: '30 mins', freePreview: true },
          { id: 'l4-2', title: 'Scaling Budgets Profitably', duration: '45 mins' },
        ]
      }
    ]
  },
  {
    id: 'c5',
    title: 'UI/UX Design Systems & Figma Masterclass',
    titleMm: 'Figma ဖြင့် UI/UX ဒီဇိုင်းစနစ်များ ဖန်တီးနည်း',
    subtitle: 'Design world-class mobile apps and web platforms with design systems and interactive prototyping.',
    subtitleMm: 'ခေတ်မီ Mobile App နှင့် Web ဒီဇိုင်းများကို Figma ဖြင့် Professional ဆန်ဆန် ဖန်တီးနည်း။',
    category: 'design',
    categoryLabel: 'UI/UX Design',
    level: 'Intermediate',
    rating: 4.88,
    reviewsCount: 510,
    studentsCount: 2150,
    duration: '16 Hours',
    price: 48000,
    originalPrice: 99000,
    instructor: {
      name: 'Aung Kyaw Moe',
      role: 'Lead Product Designer',
    },
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=80',
    description: 'Master Figma auto-layout, design tokens, component variants, wireframing, user research, and handoff to developers.',
    descriptionMm: 'Figma ၏ Auto Layout၊ Design Tokens နှင့် Interactive Prototyping တို့ကို အသေးစိတ်လေ့လာပြီး ကမ္ဘာ့အဆင့်မီ Product Designer ဖြစ်လာစေရန်။',
    tags: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping'],
    modules: [
      {
        id: 'm5-1',
        title: 'Module 1: Advanced Figma Components & Auto Layout',
        lessons: [
          { id: 'l5-1', title: 'Mastering Auto Layout 5.0', duration: '40 mins', freePreview: true },
          { id: 'l5-2', title: 'Building Scalable Design Systems', duration: '50 mins' },
        ]
      }
    ]
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    authorName: 'Thant Zin Oo',
    authorAvatar: '',
    authorRole: 'AI Course Student',
    timeAgo: '2 hours ago',
    content: 'ကျွန်တော် AI Prompt Engineering သင်တန်းပြီးဆုံးသွားပါပြီ။ ယခုအခါ ကိုယ်ပိုင် Custom GPT တစ်ခု တည်ဆောက်ပြီး client များကို ဝန်ဆောင်မှုပေးနိုင်နေပါပြီ။ ကျေးဇူးတင်ပါတယ် AuraLearn! 🚀',
    category: 'Success Story',
    likes: 124,
    commentsCount: 18,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'p2',
    authorName: 'May Thu Zar',
    authorAvatar: '',
    authorRole: 'Video Creator & Marketer',
    timeAgo: '5 hours ago',
    content: 'TikTok & Reels Video Production သင်တန်းကပေးတဲ့ Hook formula တွေကိုသုံးပြီး ဗီဒီယိုတင်လိုက်တာ 24 နာရီအတွင်း View 50K ကျော်သွားပါပြီ။ 💯 ထပ်မံလေ့လာဖို့ရှိတာတွေ ဆက်သွားနေပါတယ်။',
    category: 'Creator Tip',
    likes: 89,
    commentsCount: 12
  },
  {
    id: 'p3',
    authorName: 'Kyaw Swar Hein',
    authorAvatar: '',
    authorRole: 'Full-Stack Developer',
    timeAgo: '1 day ago',
    content: 'React & Node.js course က project လက်တွေ့ဆန်လွန်းလို့ လက်တွေ့အလုပ်ခွင်မှာ ချက်ချင်းအသုံးချလို့ရပါတယ်။ Code structure တွေရှင်းလင်းပြီး mentor ကလည်း အမြဲကူညီပေးပါတယ်။',
    category: 'Coding Help',
    likes: 210,
    commentsCount: 34
  }
];

export const RESOURCES: ResourceItem[] = [
  {
    id: 'r1',
    title: 'Ultimate ChatGPT Prompt Engineering Cheat Sheet 2026',
    titleMm: 'ChatGPT Prompt Engineering လမ်းညွှန်စာစောင် (2026)',
    type: 'CheatSheet',
    downloads: 12400,
    fileSize: '4.2 MB',
    category: 'AI & Tech',
    description: 'Over 150+ ready-to-use prompt templates for coding, marketing, writing, and productivity.'
  },
  {
    id: 'r2',
    title: 'Viral Video Hook & Script Writing Framework',
    titleMm: 'ဗီဒီယို View များစေသော Hook နှင့် ဇာတ်ညွှန်းရေးနည်း ပုံစံခွက်',
    type: 'PDF',
    downloads: 8900,
    fileSize: '2.8 MB',
    category: 'Creator',
    description: 'Step-by-step psychological triggers to hook viewers in the first 3 seconds of your Reels.'
  },
  {
    id: 'r3',
    title: 'Figma UI/UX Component Kit & Wireframe Template',
    titleMm: 'Figma UI/UX Component Kit နှင့် Wireframe Template',
    type: 'Template',
    downloads: 6700,
    fileSize: '15.4 MB',
    category: 'Design',
    description: 'Save 20+ hours of design time with pre-built dark mode and light mode components.'
  },
  {
    id: 'r4',
    title: 'Meta Ads High-Converting Campaign Structure Guide',
    titleMm: 'Meta Ads ကြော်ငြာအောင်မြင်မှုအတွက် Campaign Structure လမ်းညွှန်',
    type: 'PDF',
    downloads: 5100,
    fileSize: '3.1 MB',
    category: 'Marketing',
    description: 'Learn how professional media buyers structure budgets and audience targeting in 2026.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'သင်အဓိက တိုးတက်လိုသော သို့မဟုတ် စိတ်ဝင်စားသော နယ်ပယ်က ဘာလဲ?',
    options: [
      { text: 'Artificial Intelligence & Automation (AI နှင့် အလိုအလျောက်စနစ်)', category: 'ai' },
      { text: 'Content Creation, Video & Social Media (ဗီဒီယိုနှင့် ဆိုရှယ်မီဒီယာဖန်တီးမှု)', category: 'creator' },
      { text: 'Software Development & Coding (ဆော့ဖ်ဝဲလ် ရေးသားခြင်း)', category: 'coding' },
      { text: 'Digital Marketing & Business Growth (စျေးကွက်ဖော်ဆောင်ရေးနှင့် လုပ်ငန်းတိုးချဲ့မှု)', category: 'marketing' },
      { text: 'UI/UX & Digital Product Design (ဒီဂျစ်တယ် ထုတ်ကုန်ဒီဇိုင်း)', category: 'design' },
    ]
  }
];
