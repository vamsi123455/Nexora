import React, { useState } from 'react';
import {
  Home,
  Compass,
  Users,
  Terminal,
  MessageSquare,
  Bell,
  Sun,
  Moon,
  User as UserIcon,
  Shield,
  Briefcase,
  Sparkles,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ConsistencyBadge } from '../badges/ConsistencyBadge';

export const FloatingNav: React.FC = () => {
  const {
    currentUser,
    switchUser,
    users,
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    unreadNotificationsCount,
    setSelectedProfileId,
    logout
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Exact requested bottom options:
  // "so only botton home explore network coding messages alerts profile these only should present do this change"
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'landing', label: 'Explore', icon: Compass },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'coding', label: 'Coding', icon: Terminal },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'notifications', label: 'Alerts', icon: Bell, badgeCount: unreadNotificationsCount }
  ];

  const handleNavClick = (id: string) => {
    setSelectedProfileId(null);
    setActiveTab(id);
    setIsUserMenuOpen(false);
  };

  const handleProfileClick = () => {
    setSelectedProfileId(currentUser.id);
    setActiveTab('profile');
    setIsUserMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Floating Command Rail (Bottom Center) */}
      <aside
        aria-label="Floating Navigation Hub"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-1.5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-[#121824]/95 p-1.5 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all hover:border-cyan-500/30"
      >
        {/* Brand Mini Mark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center pl-2 pr-2 border-r border-slate-200 dark:border-slate-800/80 focus:outline-none cursor-pointer"
          title="NEXORA Home"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 text-white font-display font-extrabold text-xs">
            N
          </div>
        </button>

        {/* Core Nav Items: Home, Explore, Network, Coding, Messages, Alerts */}
        <div className="flex items-center gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-cyan-500/15 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={item.label}
              >
                <div className="relative">
                  <Icon className="h-4 w-4" />
                  {item.badgeCount && item.badgeCount > 0 ? (
                    <span className="absolute -top-1 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-bold text-white">
                      {item.badgeCount}
                    </span>
                  ) : null}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

        {/* Profile Option with user menu */}
        <div className="relative flex items-center gap-1">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-slate-900 text-white dark:bg-cyan-500/15 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Profile & Settings"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="h-4 w-4 rounded-full object-cover border border-slate-300 dark:border-slate-700"
            />
            <span>Profile</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {/* Quick Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="rounded-xl p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5 text-slate-600" />}
          </button>

          {/* Profile Dropdown Menu */}
          {isUserMenuOpen && (
            <div
              className="absolute bottom-12 right-0 w-72 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-2.5 shadow-2xl shadow-black/30 z-50 animate-in fade-in zoom-in-95 duration-100"
              onClick={() => setIsUserMenuOpen(false)}
            >
              <div className="p-2 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {currentUser.name}
                  </p>
                  <ConsistencyBadge size="sm" showLabel={false} />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {currentUser.headline}
                </p>
              </div>

              <div className="py-1">
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer"
                >
                  <UserIcon className="h-3.5 w-3.5 text-cyan-500" />
                  <span>View My Profile Hub</span>
                </button>
                <button
                  onClick={() => setActiveTab('recruiter')}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer"
                >
                  <Briefcase className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Recruiter Portal & Hiring</span>
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer"
                >
                  <Shield className="h-3.5 w-3.5 text-rose-500" />
                  <span>Admin Moderation & Health</span>
                </button>
                <button
                  onClick={() => setActiveTab('landing')}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  <span>Explore Nexora Landing</span>
                </button>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-1.5 mt-1">
                <p className="px-2.5 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Persona
                </p>
                <div className="space-y-0.5">
                  {users.slice(0, 4).map(u => (
                    <button
                      key={u.id}
                      onClick={() => switchUser(u.id)}
                      className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1 text-[11px] cursor-pointer ${
                        u.id === currentUser.id
                          ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <span className="truncate">{u.name}</span>
                      <span className="text-[10px] text-slate-400">{u.accountType}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-1.5 mt-1.5">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Log Out of Nexora</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar: Home, Explore, Network, Coding, Messages, Alerts, Profile */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden items-center justify-around border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#0f141f]/95 px-1 py-2 backdrop-blur-lg"
      >
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition-colors cursor-pointer ${
                isActive ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <div className="relative">
                <Icon className="h-4.5 w-4.5" />
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-cyan-500" />
                ) : null}
              </div>
              <span className="truncate max-w-[45px] text-[10px]">{item.label}</span>
            </button>
          );
        })}

        {/* Mobile Profile Trigger */}
        <button
          onClick={handleProfileClick}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'profile' ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            referrerPolicy="no-referrer"
            className="h-4.5 w-4.5 rounded-full object-cover border border-slate-300 dark:border-slate-700"
          />
          <span className="truncate max-w-[45px] text-[10px]">Profile</span>
        </button>
      </nav>
    </>
  );
};
