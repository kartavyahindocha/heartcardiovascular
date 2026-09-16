import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import AssessmentView from './views/AssessmentView';
import AnalyticsView from './views/AnalyticsView';
import AboutView from './views/AboutView';
import ContactView from './views/ContactView';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [isBackendOnline, setIsBackendOnline] = useState(true);

  // Toggle Theme
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  // Check Backend Health Status on Mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/health');
        if (res.ok) {
          setIsBackendOnline(true);
        } else {
          setIsBackendOnline(false);
        }
      } catch (err) {
        setIsBackendOnline(false);
      }
    };
    checkHealth();
  }, []);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${theme === 'light' ? 'light bg-slate-50 text-slate-900' : 'bg-[#0b0f19] text-slate-100'}`}>
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        isBackendOnline={isBackendOnline}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && <HomeView onStartAssessment={() => setActiveTab('assessment')} />}
        {activeTab === 'assessment' && <AssessmentView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
