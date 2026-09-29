import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Clock,
  X,
  User as UserIcon,
  Briefcase,
  FolderGit2,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TopSearchBar: React.FC = () => {
  const {
    users,
    jobs,
    projects,
    posts,
    setSelectedProfileId,
    setActiveTab
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Recent entities matching the reference image
  const recentEntities = [
    {
      id: 'recent-gayathri',
      name: 'Gayathri M',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      type: 'user'
    },
    {
      id: 'recent-kavya',
      name: 'Kavya Nallu',
      initials: 'K',
      bg: 'bg-[#0073b1]',
      type: 'user'
    },
    {
      id: 'recent-bhairav',
      name: 'cheenuru bhairav .',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      type: 'user'
    },
    {
      id: 'recent-fe',
      name: 'Frontend Develo...',
      iconBadge: 'F3',
      bg: 'bg-amber-400 text-slate-900',
      type: 'topic'
    }
  ];

  // Recent search queries matching user's image
  const recentQueries = [
    '1st year',
    'shaik saniya',
    'saik saniya'
  ];

  // Try searching for suggestions matching user's image
  const trySearchingFor = [
    'frontend developer',
    'web developer',
    'senior frontend developer',
    'front end developer',
    'frontend engineer'
  ];

  const handleSelectQuery = (text: string) => {
    setQuery(text);
    inputRef.current?.focus();
  };

  const handleSelectUser = (userId: string) => {
    // If it's a real user ID or fallback to matching user
    const matched = users.find(u => u.id === userId || u.name.toLowerCase().includes(userId.toLowerCase()));
    if (matched) {
      setSelectedProfileId(matched.id);
      setActiveTab('profile');
    } else if (users[0]) {
      setSelectedProfileId(users[0].id);
      setActiveTab('profile');
    }
    setIsOpen(false);
  };

  const q = query.toLowerCase().trim();

  // Dynamic search results when query is typed
  const matchedUsers = q
    ? users.filter(
        u =>
          u.name.toLowerCase().includes(q) ||
          u.headline.toLowerCase().includes(q) ||
          u.skills.some(s => s.name.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const matchedJobs = q
    ? jobs.filter(
        j =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchedProjects = q
    ? projects.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      ).slice(0, 2)
    : [];

  return (
    <div ref={containerRef} className="relative">
      {/* Search Input Bar */}
      <div
        className={`flex items-center gap-2 rounded-full border transition-all duration-200 bg-slate-100 dark:bg-slate-900/90 px-3.5 py-1.5 w-44 sm:w-64 md:w-80 ${
          isOpen
            ? 'border-blue-500 ring-2 ring-blue-500/20 bg-white dark:bg-slate-900 shadow-md'
            : 'border-slate-300/80 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-600'
        }`}
      >
        <Search className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search"
          className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="rounded-full p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <kbd className="hidden md:inline-block rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
            ⌘K
          </kbd>
        )}
      </div>

      {/* Dropdown Menu (matching the exact LinkedIn screenshot layout) */}
      {isOpen && (
        <div className="absolute top-11 right-0 sm:left-0 z-50 w-[320px] sm:w-[390px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1b2230] shadow-2xl py-3.5 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden">
          
          {/* Default State: When query is empty (Exact match to user's uploaded image) */}
          {!q ? (
            <div className="space-y-4">
              {/* Header: Recent & Show all */}
              <div className="px-4 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Recent
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Show all
                </button>
              </div>

              {/* Horizontal Row of Recent Entities/People */}
              <div className="px-4 flex items-start gap-4 overflow-x-auto pb-1 scrollbar-none">
                {recentEntities.map(entity => (
                  <button
                    key={entity.id}
                    type="button"
                    onClick={() => {
                      if (entity.type === 'user') {
                        handleSelectUser(entity.name);
                      } else {
                        handleSelectQuery('Frontend Developer');
                      }
                    }}
                    className="flex flex-col items-center text-center group cursor-pointer shrink-0 w-16"
                  >
                    <div className="relative mb-1.5">
                      {entity.avatar ? (
                        <img
                          src={entity.avatar}
                          alt={entity.name}
                          className="h-12 w-12 rounded-full object-cover border border-slate-200 dark:border-slate-700 group-hover:ring-2 group-hover:ring-blue-500 transition-all"
                        />
                      ) : entity.initials ? (
                        <div className={`h-12 w-12 rounded-full ${entity.bg} text-white font-bold text-lg flex items-center justify-center shadow-xs group-hover:ring-2 group-hover:ring-blue-500 transition-all`}>
                          {entity.initials}
                        </div>
                      ) : (
                        <div className={`h-12 w-12 rounded-xl ${entity.bg} font-black text-sm flex items-center justify-center shadow-xs group-hover:ring-2 group-hover:ring-blue-500 transition-all`}>
                          {entity.iconBadge}
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 leading-tight">
                      {entity.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Recent Search Queries with Clock Icon */}
              <div className="space-y-0.5 pt-1">
                {recentQueries.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectQuery(item)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group cursor-pointer"
                  >
                    <Clock className="h-4 w-4 text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-200 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {item}
                    </span>
                  </button>
                ))}
              </div>

              {/* Section Header: Try searching for */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="px-4 pb-1">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Try searching for
                  </span>
                </div>

                {/* Suggestions List with Magnifying Glass Icon */}
                <div className="space-y-0.5">
                  {trySearchingFor.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectQuery(item)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group cursor-pointer"
                    >
                      <Search className="h-4 w-4 text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-200 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Active Live Search Results when user types a query */
            <div className="space-y-3 max-h-[70vh] overflow-y-auto">
              <div className="px-4 flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Matching Results
                </span>
                <span className="text-[11px] text-slate-400">
                  {matchedUsers.length + matchedJobs.length + matchedProjects.length} found
                </span>
              </div>

              {/* People */}
              {matchedUsers.length > 0 && (
                <div className="space-y-1">
                  <div className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    People
                  </div>
                  {matchedUsers.map(user => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => {
                        setSelectedProfileId(user.id);
                        setActiveTab('profile');
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800/70 text-left transition-colors cursor-pointer group"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {user.headline}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Jobs */}
              {matchedJobs.length > 0 && (
                <div className="space-y-1 pt-1">
                  <div className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Jobs
                  </div>
                  {matchedJobs.map(job => (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => {
                        setActiveTab('jobs');
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800/70 text-left transition-colors cursor-pointer group"
                    >
                      <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                          {job.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {job.company} · {job.salaryRange}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Projects */}
              {matchedProjects.length > 0 && (
                <div className="space-y-1 pt-1">
                  <div className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Projects
                  </div>
                  {matchedProjects.map(project => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => {
                        setActiveTab('projects');
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800/70 text-left transition-colors cursor-pointer group"
                    >
                      <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <FolderGit2 className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                          {project.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {project.tagline}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {matchedUsers.length === 0 && matchedJobs.length === 0 && matchedProjects.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-500">
                  No direct matches for "{query}". Press Enter to search community wide.
                </div>
              )}

              {/* See all results footer button */}
              <div className="px-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-colors"
                >
                  <span>See all results for "{query}"</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
