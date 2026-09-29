import React from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopSearchBar } from './TopSearchBar';

export const TopBar: React.FC = () => {
  const {
    setSelectedProfileId,
    setActiveTab,
    setIsNewPostModalOpen,
    isLoggedIn
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0b0f17]/90 transition-colors">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Nexora Name on the side */}
        <button
          onClick={() => {
            setSelectedProfileId(null);
            setActiveTab('home');
          }}
          className="group flex items-center gap-2.5 text-left focus-visible:outline-none"
          title="NEXORA Home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 text-white font-display font-extrabold text-base tracking-tighter shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            N
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            NEXORA
          </span>
        </button>

        {/* Right Corner: LinkedIn-Style Search Bar & Post Button */}
        {isLoggedIn && (
          <div className="flex items-center gap-2.5">
            {/* Interactive Top Search Bar with LinkedIn Dropdown Popover */}
            <TopSearchBar />

            {/* Post Option */}
            <button
              type="button"
              onClick={() => setIsNewPostModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3.5 sm:px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              title="Create Post"
            >
              <Plus className="h-4 w-4" />
              <span>Post</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

