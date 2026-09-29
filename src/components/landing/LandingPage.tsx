import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Terminal,
  FolderGit2,
  Briefcase,
  Users,
  Flame,
  ShieldCheck,
  CheckCircle,
  Cpu,
  Layers,
  Code
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ConsistencyBadge } from '../badges/ConsistencyBadge';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setSelectedProfileId, users } = useApp();

  return (
    <div className="relative overflow-hidden pb-24">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-7xl opacity-30 blur-3xl pointer-events-none">
        <div className="h-full w-full bg-gradient-to-r from-cyan-500/30 via-indigo-500/20 to-emerald-500/30" />
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:pt-24 pb-12 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-400 backdrop-blur-xs">
          <ConsistencyBadge size="sm" />
          <span>Next-Generation Professional Ecosystem</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
          Build. Connect. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Create. Grow.
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Your professional identity, verified network, project portfolio, and high-conviction engineering opportunities — unified in one living ecosystem.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 active:scale-95 transition-all"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:border-cyan-500 transition-colors"
          >
            Explore Verified Network
          </button>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="pt-16 grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
          
          <div
            onClick={() => setActiveTab('profile')}
            className="cursor-pointer rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm hover:border-cyan-500/50 transition-colors group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-3">
              Professional Identity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Verified skills, career milestones, timeline histories, and prestigious CONSISTENCY badges.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('projects')}
            className="cursor-pointer rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm hover:border-sky-500/50 transition-colors group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
              <FolderGit2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-3">
              Interactive Portfolios
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Showcase production code, live demos, and real architectural blueprints with star tracking.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('coding')}
            className="cursor-pointer rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 shadow-sm hover:border-amber-500 transition-colors group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Flame className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-amber-400 mt-3 flex items-center gap-1.5">
              <span>Coding Momentum</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              52-week contribution matrices, test runners, and automated problem streak validation.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('jobs')}
            className="cursor-pointer rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm hover:border-emerald-500/50 transition-colors group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Briefcase className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-3">
              Transparent Careers
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Verified salary bands, direct hiring teams, and end-to-end application lifecycle tracking.
            </p>
          </div>

        </div>

        {/* Featured Engineers Strip */}
        <div className="pt-16 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Connecting Engineers Across High-Scale Infrastructure
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {users.slice(0, 5).map(u => (
              <button
                key={u.id}
                onClick={() => {
                  setSelectedProfileId(u.id);
                  setActiveTab('profile');
                }}
                className="flex items-center gap-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-1.5 pr-4 hover:border-cyan-500 transition-colors"
              >
                <img
                  src={u.avatar}
                  alt={u.name}
                  referrerPolicy="no-referrer"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[120px]">
                    {u.name}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate max-w-[120px]">
                    {u.headline.split('@')[1] || u.accountType}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
};
