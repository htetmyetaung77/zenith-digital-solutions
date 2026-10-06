/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetailModal } from './components/CourseDetailModal';
import { StudentDashboard } from './components/StudentDashboard';
import { AIMentorChat } from './components/AIMentorChat';
import { AIPathQuiz } from './components/AIPathQuiz';
import { CommunityFeed } from './components/CommunityFeed';
import { ResourceVault } from './components/ResourceVault';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { PaymentModal } from './components/PaymentModal';
import { AIPrefaceModal } from './components/AIPrefaceModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { FAQSection } from './components/FAQSection';
import { LessonLearningRoom } from './components/LessonLearningRoom';
import { COURSES } from './data/mockData';
import { Course } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [lang, setLang] = useState<'mm' | 'en'>('mm');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([COURSES[0]]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['c1', 'c2']);
  const [selectedCourseModal, setSelectedCourseModal] = useState<Course | null>(null);
  const [paymentCourse, setPaymentCourse] = useState<Course | null>(null);
  const [learningRoomCourse, setLearningRoomCourse] = useState<Course | null>(null);
  const [aiMentorOpen, setAiMentorOpen] = useState<boolean>(false);
  const [aiPathQuizOpen, setAiPathQuizOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [aiPrefaceOpen, setAiPrefaceOpen] = useState<boolean>(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>({
    name: 'Kyaw Kyaw',
    email: 'kyawkyaw@gmail.com'
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleToggleBookmark = (courseId: string) => {
    setBookmarkedIds(prev => 
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  const handleStartPayment = (course: Course) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    setPaymentCourse(course);
  };

  const handlePaymentSuccess = (course: Course) => {
    if (!enrolledCourses.some(c => c.id === course.id)) {
      setEnrolledCourses(prev => [...prev, course]);
    }
  };

  const bookmarkedCourses = COURSES.filter(c => bookmarkedIds.includes(c.id));

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden transition-colors ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAIMentor={() => setAiMentorOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenPreface={() => setAiPrefaceOpen(true)}
        onOpenLeaderboard={() => setLeaderboardOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
        enrolledCount={enrolledCourses.length}
        bookmarkedCount={bookmarkedIds.length}
      />

      {/* Main Content Area with Page Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <Hero
                lang={lang}
                theme={theme}
                onExplore={() => setActiveTab('courses')}
                onOpenQuiz={() => setAiPathQuizOpen(true)}
              />
              <CourseCatalog
                courses={COURSES}
                lang={lang}
                theme={theme}
                onSelectCourse={(course) => setSelectedCourseModal(course)}
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={handleToggleBookmark}
              />
              <div className={`border-t py-16 ${theme === 'dark' ? 'bg-slate-900/40 border-slate-900' : 'bg-white border-slate-200'}`}>
                <CommunityFeed lang={lang} theme={theme} />
              </div>
              <FAQSection lang={lang} theme={theme} />
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <CourseCatalog
                courses={COURSES}
                lang={lang}
                theme={theme}
                onSelectCourse={(course) => setSelectedCourseModal(course)}
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={handleToggleBookmark}
              />
              <FAQSection lang={lang} theme={theme} />
            </motion.div>
          )}

          {activeTab === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <CommunityFeed lang={lang} theme={theme} />
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <ResourceVault lang={lang} theme={theme} />
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <StudentDashboard
                enrolledCourses={enrolledCourses}
                bookmarkedCourses={bookmarkedCourses}
                lang={lang}
                theme={theme}
                onExploreMore={() => setActiveTab('courses')}
                onSelectCourse={(course) => setSelectedCourseModal(course)}
                onStartLearning={(course) => setLearningRoomCourse(course)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Immersive Lesson Learning Room */}
      {learningRoomCourse && (
        <LessonLearningRoom
          course={learningRoomCourse}
          onClose={() => setLearningRoomCourse(null)}
          lang={lang}
          theme={theme}
        />
      )}

      {/* Modals with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {selectedCourseModal && (
          <CourseDetailModal
            course={selectedCourseModal}
            onClose={() => setSelectedCourseModal(null)}
            onStartPayment={handleStartPayment}
            isEnrolled={enrolledCourses.some(c => c.id === selectedCourseModal.id)}
            lang={lang}
            theme={theme}
          />
        )}

        {paymentCourse && (
          <PaymentModal
            course={paymentCourse}
            onClose={() => setPaymentCourse(null)}
            onPaymentSuccess={handlePaymentSuccess}
            lang={lang}
            theme={theme}
          />
        )}

        {authModalOpen && (
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            onLoginSuccess={(user) => setCurrentUser(user)}
            lang={lang}
            theme={theme}
          />
        )}

        {aiPrefaceOpen && (
          <AIPrefaceModal
            isOpen={aiPrefaceOpen}
            onClose={() => setAiPrefaceOpen(false)}
            lang={lang}
            theme={theme}
          />
        )}

        {leaderboardOpen && (
          <LeaderboardModal
            isOpen={leaderboardOpen}
            onClose={() => setLeaderboardOpen(false)}
            lang={lang}
            theme={theme}
          />
        )}

        {aiMentorOpen && (
          <AIMentorChat
            isOpen={aiMentorOpen}
            onClose={() => setAiMentorOpen(false)}
            lang={lang}
            theme={theme}
          />
        )}

        {aiPathQuizOpen && (
          <AIPathQuiz
            isOpen={aiPathQuizOpen}
            onClose={() => setAiPathQuizOpen(false)}
            courses={COURSES}
            onSelectCourse={(course) => setSelectedCourseModal(course)}
            lang={lang}
            theme={theme}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer lang={lang} theme={theme} />
      
      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}
