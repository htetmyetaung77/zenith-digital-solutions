export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
  videoUrl?: string;
  freePreview?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  titleMm: string;
  subtitle: string;
  subtitleMm: string;
  category: 'ai' | 'creator' | 'coding' | 'marketing' | 'design';
  categoryLabel: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  price: number; // in MMK or USD, e.g., 45000
  originalPrice?: number;
  instructor: {
    name: string;
    role: string;
    avatar?: string;
  };
  image: string;
  description: string;
  descriptionMm: string;
  modules: Module[];
  tags: string[];
  bestseller?: boolean;
  featured?: boolean;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar?: string;
  authorRole: string;
  timeAgo: string;
  content: string;
  category: string;
  likes: number;
  commentsCount: number;
  image?: string;
  isLiked?: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  titleMm: string;
  type: 'PDF' | 'Template' | 'Preset' | 'CheatSheet';
  downloads: number;
  fileSize: string;
  category: string;
  description: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    category: 'ai' | 'creator' | 'coding' | 'marketing' | 'design';
  }[];
}
