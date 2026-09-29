import React, { useState } from 'react';
import {
  FolderGit2,
  Plus,
  Star,
  ExternalLink,
  Github,
  Search,
  MessageSquare,
  Sparkles,
  Heart,
  Share2,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';

export const ProjectsView: React.FC = () => {
  const {
    currentUser,
    projects,
    createProject,
    likeProject,
    setSelectedProfileId,
    setActiveTab,
    showToast
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchProjectQuery, setSearchProjectQuery] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New Project Form state
  const [projTitle, setProjTitle] = useState('');
  const [projTagline, setProjTagline] = useState('');
  const [projCategory, setProjCategory] = useState<any>('Backend');
  const [projTech, setProjTech] = useState('Java 21, Spring Boot 3, Kafka');
  const [projDesc, setProjDesc] = useState('');
  const [projGithub, setProjGithub] = useState('');
  const [projDemo, setProjDemo] = useState('');
  const [projImage, setProjImage] = useState('/src/assets/images/nexora_project_cloud_1790680619102.jpg');

  const categories = ['All', 'Backend', 'AI', 'Cloud', 'Web', 'Mobile', 'Open Source'];

  const filteredProjects = projects.filter(p => {
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    if (searchProjectQuery.trim()) {
      const q = searchProjectQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) return;

    createProject({
      title: projTitle.trim(),
      tagline: projTagline.trim(),
      category: projCategory,
      technologies: projTech.split(',').map(t => t.trim()).filter(Boolean),
      description: projDesc.trim(),
      githubUrl: projGithub.trim() || undefined,
      liveDemoUrl: projDemo.trim() || undefined,
      imageUrl: projImage
    });

    setIsSubmitModalOpen(false);
    setProjTitle('');
    setProjDesc('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-24 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-sky-500" />
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Project Showcase & Portfolio Hub
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real production repositories, architectural blueprints, and interactive live demos built by Nexora engineers
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-cyan-500/20 hover:bg-cyan-400 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Showcase Project</span>
        </button>
      </div>

      {/* Categories & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-cyan-500 text-white shadow-xs'
                  : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchProjectQuery}
            onChange={e => setSearchProjectQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] overflow-hidden shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 rounded-md bg-slate-950/80 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 backdrop-blur-xs">
                  {proj.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {proj.title}
                </h3>
                <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400 mt-0.5">
                  {proj.tagline}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mt-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech chips */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {proj.technologies.map(t => (
                    <span
                      key={t}
                      className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Author & Actions Footer */}
            <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2">
              <div className="flex items-center justify-between pt-3">
                <button
                  onClick={() => {
                    setSelectedProfileId(proj.authorId);
                    setActiveTab('profile');
                  }}
                  className="flex items-center gap-2 text-left focus:outline-none"
                >
                  <img
                    src={proj.authorAvatar}
                    alt={proj.authorName}
                    referrerPolicy="no-referrer"
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-cyan-500">
                    {proj.authorName}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => likeProject(proj.id)}
                    className={`flex items-center gap-1 text-xs font-mono tabular-nums ${
                      proj.userLiked
                        ? 'text-rose-500 font-bold'
                        : 'text-slate-500 hover:text-rose-500'
                    }`}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${proj.userLiked ? 'fill-current' : ''}`}
                    />
                    <span>{proj.likesCount}</span>
                  </button>

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-slate-200"
                      title="GitHub Repository"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}

                  {proj.liveDemoUrl && (
                    <a
                      href={proj.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-cyan-400"
                      title="Live Demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Project Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Showcase Your Project
              </h3>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Project Title:
                </label>
                <input
                  type="text"
                  required
                  value={projTitle}
                  onChange={e => setProjTitle(e.target.value)}
                  placeholder="e.g. Distributed Consensus Engine"
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tagline:
                </label>
                <input
                  type="text"
                  value={projTagline}
                  onChange={e => setProjTagline(e.target.value)}
                  placeholder="One sentence value proposition..."
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Category:
                  </label>
                  <select
                    value={projCategory}
                    onChange={e => setProjCategory(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Backend">Backend</option>
                    <option value="AI">AI</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Web">Web</option>
                    <option value="Open Source">Open Source</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Technologies:
                  </label>
                  <input
                    type="text"
                    value={projTech}
                    onChange={e => setProjTech(e.target.value)}
                    placeholder="Java, Kafka, Redis"
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Technical Description:
                </label>
                <textarea
                  value={projDesc}
                  onChange={e => setProjDesc(e.target.value)}
                  rows={3}
                  placeholder="Explain architecture, throughput benchmark, and problem solved..."
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    GitHub URL:
                  </label>
                  <input
                    type="text"
                    value={projGithub}
                    onChange={e => setProjGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Live Demo URL:
                  </label>
                  <input
                    type="text"
                    value={projDemo}
                    onChange={e => setProjDemo(e.target.value)}
                    placeholder="https://..."
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="rounded-lg px-3 py-1.5 text-xs text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-400 transition-colors"
                >
                  Publish to Showcase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
