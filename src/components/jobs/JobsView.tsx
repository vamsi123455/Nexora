import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  CheckCircle,
  FileText,
  Filter,
  ExternalLink,
  ChevronRight,
  Send,
  X,
  Sparkles,
  Building
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Job, Application } from '../../types';

export const JobsView: React.FC = () => {
  const {
    currentUser,
    jobs,
    applications,
    applyForJob,
    toggleSaveJob,
    setActiveTab,
    showToast
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'explore' | 'applications' | 'saved'>('explore');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Selected job for detailed inspection
  const [activeJobId, setActiveJobId] = useState<string>(jobs[0]?.id || '');
  const activeJob = jobs.find(j => j.id === activeJobId) || jobs[0];

  // Apply Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyNote, setApplyNote] = useState('');
  const [applyPortfolio, setApplyPortfolio] = useState(currentUser.portfolio || '');
  const [applyResume, setApplyResume] = useState('vamsi_koyya_staff_systems_resume.pdf');

  // User's own applications
  const myApplications = applications.filter(a => a.applicantId === currentUser.id);

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    if (activeSubTab === 'saved') {
      return currentUser.savedJobIds?.includes(job.id);
    }

    if (remoteOnly && !job.isRemote) return false;

    if (selectedExperience !== 'All' && job.experienceLevel !== selectedExperience) {
      return false;
    }

    if (selectedType !== 'All' && job.employmentType !== selectedType) {
      return false;
    }

    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const match =
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.skills.some(s => s.toLowerCase().includes(q)) ||
        job.location.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJob) return;

    applyForJob(activeJob.id, applyNote, applyPortfolio, applyResume);
    setIsApplyModalOpen(false);
    setApplyNote('');
  };

  const hasAppliedToActiveJob = applications.some(
    a => a.jobId === activeJob?.id && a.applicantId === currentUser.id
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-24 space-y-6">
      
      {/* Top Banner / Command Center Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-emerald-500" />
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Opportunity Radar & Careers
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Verified engineering roles, transparent compensation bands, and zero-spam hiring
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('recruiter')}
            className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
          >
            <span>Hiring? Recruiter Portal</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          {[
            { id: 'explore', label: `Explore Roles (${jobs.length})` },
            { id: 'applications', label: `My Applications (${myApplications.length})` },
            { id: 'saved', label: `Saved (${currentUser.savedJobIds?.length || 0})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-slate-900 text-white dark:bg-emerald-500/15 dark:text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter controls */}
        {activeSubTab === 'explore' && (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setRemoteOnly(!remoteOnly)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                remoteOnly
                  ? 'bg-cyan-500 text-white'
                  : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              Remote Only
            </button>
            <select
              value={selectedExperience}
              onChange={e => setSelectedExperience(e.target.value)}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-xs text-slate-700 dark:text-slate-300"
            >
              <option value="All">All Experience Levels</option>
              <option value="Entry-Level">Entry-Level</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
              <option value="Lead / Staff">Lead / Staff</option>
            </select>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {activeSubTab === 'applications' ? (
        /* Applications Tracker Board */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Application Lifecycle Tracker
            </h2>
            <span className="text-xs text-slate-400">
              Live updates directly from hiring teams
            </span>
          </div>

          {myApplications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
              <Briefcase className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                No active applications yet
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Explore open roles and submit verified applications with one click.
              </p>
              <button
                onClick={() => setActiveSubTab('explore')}
                className="mt-4 rounded-xl bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-cyan-400"
              >
                Browse Engineering Jobs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myApplications.map(app => (
                <div
                  key={app.id}
                  className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {app.jobTitle}
                      </h3>
                      <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        {app.company}
                      </p>
                    </div>
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${
                        app.status === 'Offer'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : app.status === 'Interview'
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : app.status === 'Shortlisted'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    "{app.note || 'Standard verified application package submitted.'}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span>Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                    <span>Document: {app.resumeUrl.split('/').pop()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Explore / Saved Split View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Jobs List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                placeholder="Search jobs, tech, locations..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
              {filteredJobs.length === 0 ? (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-500">
                  No matching jobs found. Try adjusting your filters.
                </div>
              ) : (
                filteredJobs.map(job => {
                  const isSelected = job.id === activeJob?.id;
                  const isSaved = currentUser.savedJobIds?.includes(job.id);

                  return (
                    <div
                      key={job.id}
                      onClick={() => setActiveJobId(job.id)}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-50/20 dark:bg-cyan-950/20 shadow-sm'
                          : 'border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3">
                          <img
                            src={job.companyLogo}
                            alt={job.company}
                            referrerPolicy="no-referrer"
                            className="h-10 w-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                          />
                          <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                              {job.title}
                            </h3>
                            <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                              {job.company}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {job.location} {job.isRemote ? '· Remote' : ''}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={e => {
                            e.stopPropagation();
                            toggleSaveJob(job.id);
                          }}
                          className="text-slate-400 hover:text-emerald-500"
                        >
                          <Bookmark
                            className={`h-4 w-4 ${isSaved ? 'fill-emerald-500 text-emerald-500' : ''}`}
                          />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">
                          {job.salaryRange.split('·')[0]}
                        </span>
                        <span className="text-[11px] text-slate-400">{job.postedAt}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Job Details Drawer (7 Cols) */}
          <div className="lg:col-span-7">
            {activeJob ? (
              <div className="sticky top-20 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-6 shadow-sm space-y-5">
                
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-3">
                    <img
                      src={activeJob.companyLogo}
                      alt={activeJob.company}
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {activeJob.title}
                      </h2>
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {activeJob.company} · {activeJob.employmentType}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {activeJob.location} {activeJob.isRemote ? '(Remote Eligible)' : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSaveJob(activeJob.id)}
                      className="rounded-xl border border-slate-200 dark:border-slate-750 p-2 text-slate-500 hover:text-emerald-500"
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          currentUser.savedJobIds?.includes(activeJob.id)
                            ? 'fill-emerald-500 text-emerald-500'
                            : ''
                        }`}
                      />
                    </button>
                    {hasAppliedToActiveJob ? (
                      <span className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 text-xs font-semibold text-emerald-500">
                        ✓ Application Submitted
                      </span>
                    ) : (
                      <button
                        onClick={() => setIsApplyModalOpen(true)}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
                      >
                        Apply for Role
                      </button>
                    )}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 p-3">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Compensation
                    </span>
                    <p className="font-mono text-xs font-bold text-emerald-500 mt-0.5 tabular-nums">
                      {activeJob.salaryRange}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 p-3">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Experience
                    </span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {activeJob.experienceLevel}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 p-3">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Applicants
                    </span>
                    <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 tabular-nums">
                      {activeJob.applicantsCount} candidates
                    </p>
                  </div>
                </div>

                {/* Tech Skills Chips */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Required Technical Capabilities
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {activeJob.skills.map(sk => (
                      <span
                        key={sk}
                        className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-slate-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Role Overview
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    {activeJob.description}
                  </p>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Candidate Criteria
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc pl-4">
                    {activeJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : null}
          </div>

        </div>
      )}

      {/* Apply Modal */}
      {isApplyModalOpen && activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Apply for {activeJob.title}
                </h3>
                <p className="text-xs text-emerald-500 font-medium">
                  {activeJob.company}
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Applicant Identity:
                </label>
                <div className="mt-1 flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Cover Note / Engineering Highlights:
                </label>
                <textarea
                  value={applyNote}
                  onChange={e => setApplyNote(e.target.value)}
                  placeholder="Summarize your hands-on experience with this stack and why you are interested..."
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Portfolio / GitHub URL:
                </label>
                <input
                  type="text"
                  value={applyPortfolio}
                  onChange={e => setApplyPortfolio(e.target.value)}
                  placeholder="https://github.com/..."
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Resume Attachment:
                </label>
                <div className="mt-1 flex items-center justify-between p-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-emerald-500" />
                    <span>{applyResume}</span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-semibold">
                    Verified PDF
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="rounded-lg px-3 py-1.5 text-xs text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
