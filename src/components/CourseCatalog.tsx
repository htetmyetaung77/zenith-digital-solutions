import React, { useState } from 'react';
import { Course } from '../types';
import { Search, Star, Clock, Users, BookOpen, ChevronRight, Bookmark } from 'lucide-react';

interface CourseCatalogProps {
  courses: Course[];
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
  onSelectCourse: (course: Course) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (courseId: string) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  lang,
  theme,
  onSelectCourse,
  bookmarkedIds,
  onToggleBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-low' | 'price-high'>('popular');
  const isDark = theme === 'dark';

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.titleMm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.studentsCount - a.studentsCount; // popular
  });

  const categories = [
    { id: 'all', labelMm: 'အားလုံး (All)', labelEn: 'All Courses' },
    { id: 'ai', labelMm: 'AI & ChatGPT', labelEn: 'AI & ChatGPT' },
    { id: 'creator', labelMm: 'Content Creator', labelEn: 'Content Creator' },
    { id: 'coding', labelMm: 'Tech & Coding', labelEn: 'Tech & Coding' },
    { id: 'marketing', labelMm: 'Digital Marketing', labelEn: 'Digital Marketing' },
    { id: 'design', labelMm: 'UI/UX Design', labelEn: 'UI/UX Design' },
  ];

  return (
    <section className={`py-16 transition-colors ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'mm' ? 'ခေတ်မီ အဆင့်မြင့် သင်တန်းများ' : 'Explore Elite Masterclasses'}
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {lang === 'mm'
              ? 'သင့်အနာဂတ် အသက်မွေးဝမ်းကျောင်းနှင့် လုပ်ငန်းတိုးတက်မှုအတွက် အကောင်းဆုံးသင်တန်းများကို ရွေးချယ်လေ့လာပါ။'
              : 'Choose from industry-leading masterclasses designed to accelerate your career and digital dominance.'}
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : isDark 
                      ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800' 
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {lang === 'mm' ? cat.labelMm : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium border focus:outline-none focus:border-indigo-500 ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <option value="popular">{lang === 'mm' ? 'ရေပန်းအစားဆုံး' : 'Most Popular'}</option>
              <option value="rating">{lang === 'mm' ? 'အကောင်းဆုံး သုံးသပ်ချက်' : 'Highest Rated'}</option>
              <option value="price-low">{lang === 'mm' ? 'စျေးနှုန်း (အနိမ့်မှ အမြင့်)' : 'Price: Low to High'}</option>
              <option value="price-high">{lang === 'mm' ? 'စျေးနှုန်း (အမြင့်မှ အနိမ့်)' : 'Price: High to Low'}</option>
            </select>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'mm' ? 'သင်တန်းရှာဖွေရန်...' : 'Search courses...'}
                className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-sm border focus:outline-none focus:border-indigo-500 transition-colors ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 shadow-sm'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className={`text-center py-20 rounded-3xl border ${isDark ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600 shadow-sm'}`}>
            <p className="text-lg">
              {lang === 'mm' ? 'သင်ရှာဖွေသော သင်တန်း မတွေ့ရှိပါ။' : 'No courses found matching your criteria.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const isBookmarked = bookmarkedIds.includes(course.id);
              const instructorInitials = course.instructor.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

              return (
                <div
                  key={course.id}
                  className={`group rounded-3xl border overflow-hidden hover:border-indigo-500/50 transition-all duration-300 flex flex-col cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden" onClick={() => onSelectCourse(course)}>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-indigo-300 text-xs font-bold border border-indigo-500/30">
                        {course.categoryLabel}
                      </span>
                      {course.bestseller && (
                        <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-extrabold shadow">
                          Bestseller
                        </span>
                      )}
                    </div>
                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(course.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isBookmarked 
                          ? 'bg-pink-600 text-white' 
                          : 'bg-slate-950/60 text-slate-200 hover:bg-slate-950'
                      }`}
                      title="Bookmark course"
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between" onClick={() => onSelectCourse(course)}>
                    <div>
                      {/* Meta info */}
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 font-bold text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{course.rating}</span>
                          <span className={isDark ? 'text-slate-500 font-normal' : 'text-slate-400 font-normal'}>({course.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className={`text-lg font-bold mb-2 group-hover:text-indigo-500 transition-colors line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {lang === 'mm' ? course.titleMm : course.title}
                      </h3>

                      <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {lang === 'mm' ? course.subtitleMm : course.subtitle}
                      </p>
                    </div>

                    <div>
                      {/* Instructor (No photos, only name and initials badge) */}
                      <div className={`flex items-center gap-3 pt-4 border-t mb-4 ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
                        <div className="w-9 h-9 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                          {instructorInitials}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{course.instructor.name}</div>
                          <div className="text-[10px] text-slate-400">{course.instructor.role}</div>
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-400 line-through block">
                            {course.originalPrice?.toLocaleString()} MMK
                          </span>
                          <span className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {course.price.toLocaleString()} MMK
                          </span>
                        </div>
                        <button className="px-4 py-2 rounded-xl bg-indigo-600/20 group-hover:bg-indigo-600 text-indigo-500 group-hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-all">
                          <span>{lang === 'mm' ? 'အသေးစိတ်ကြည့်မည်' : 'View Details'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
