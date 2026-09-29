import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Users,
  Briefcase,
  FolderGit2,
  Building,
  FileText,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    users,
    jobs,
    projects,
    posts,
    companies,
    setSelectedProfileId,
    setActiveTab
  } = useApp();

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'people' | 'jobs' | 'projects' | 'posts'>('all');

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Search results
  const matchedUsers = q
    ? users.filter(
        u =>
          u.name.toLowerCase().includes(q) ||
          u.headline.toLowerCase().includes(q) ||
          u.skills.some(s => s.name.toLowerCase().includes(q))
      )
    : users.slice(0, 3);

  const matchedJobs = q
    ? jobs.filter(
        j =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.skills.some(s => s.toLowerCase().includes(q))
      )
    : jobs.slice(0, 3);

  const matchedProjects = q
    ? projects.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.technologies.some(t => t.toLowerCase().includes(q))
      )
    : projects.slice(0, 3);

  const handleSelectUser = (id: string) => {
    setSelectedProfileId(id);
    setActiveTab('profile');
    setIsSearchOpen(false);
  };

  const handleSelectJob = () => {
    setActiveTab('jobs');
    setIsSearchOpen(false);
  };

  const handleSelectProject = () => {
    setActiveTab('projects');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="h-5 w-5 text-cyan-500 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search across people, technologies, jobs, projects, and dispatches..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1 text-xs text-slate-400 hover:text-slate-200"
          >
            Esc
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 text-xs">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'people', label: 'People' },
            { id: 'jobs', label: 'Jobs' },
            { id: 'projects', label: 'Projects' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Stream */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 divide-y divide-slate-100 dark:divide-slate-800/60">
          
          {/* People Section */}
          {(activeCategory === 'all' || activeCategory === 'people') && (
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Verified Professionals
              </span>
              <div className="space-y-1.5">
                {matchedUsers.map(user => (
                  <div
                    key={user.id}
                    onClick={() => handleSelectUser(user.id)}
                    className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {user.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {user.headline}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Section */}
          {(activeCategory === 'all' || activeCategory === 'jobs') && (
            <div className="space-y-2 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Open Career Opportunities
              </span>
              <div className="space-y-1.5">
                {matchedJobs.map(job => (
                  <div
                    key={job.id}
                    onClick={handleSelectJob}
                    className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {job.title}
                      </h4>
                      <p className="text-[11px] text-emerald-500">
                        {job.company} · {job.salaryRange.split('·')[0]}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {(activeCategory === 'all' || activeCategory === 'projects') && (
            <div className="space-y-2 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Featured Projects
              </span>
              <div className="space-y-1.5">
                {matchedProjects.map(proj => (
                  <div
                    key={proj.id}
                    onClick={handleSelectProject}
                    className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {proj.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {proj.tagline}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
