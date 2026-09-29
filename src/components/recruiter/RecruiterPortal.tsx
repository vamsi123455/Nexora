import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  ExternalLink,
  MessageSquare,
  Building,
  UserCheck,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus, Job } from '../../types';

export const RecruiterPortal: React.FC = () => {
  const {
    currentUser,
    jobs,
    applications,
    createJob,
    updateApplicationStatus,
    startConversationWith,
    setSelectedProfileId,
    setActiveTab,
    showToast
  } = useApp();

  const [activeTab, setActiveTabLocal] = useState<'pipeline' | 'jobs' | 'post-job'>('pipeline');
  const [pipelineFilter, setPipelineFilter] = useState<string>('All');

  // Post New Job Form
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('Nexora Labs');
  const [newLocation, setNewLocation] = useState('San Francisco, CA');
  const [newIsRemote, setNewIsRemote] = useState(true);
  const [newSalary, setNewSalary] = useState('$195,000 - $260,000');
  const [newSkills, setNewSkills] = useState('Java 21, Spring Boot, Kafka');
  const [newDescription, setNewDescription] = useState('');
  const [newRequirements, setNewRequirements] = useState('');

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createJob({
      title: newTitle.trim(),
      company: newCompany.trim(),
      location: newLocation.trim(),
      isRemote: newIsRemote,
      salaryRange: newSalary.trim(),
      skills: newSkills.split(',').map(s => s.trim()).filter(Boolean),
      description: newDescription.trim() || 'Exciting engineering challenge scaling next-generation infrastructure.',
      requirements: newRequirements ? newRequirements.split('\n').filter(Boolean) : ['5+ years distributed systems experience']
    });

    setActiveTabLocal('jobs');
    setNewTitle('');
    setNewDescription('');
  };

  const filteredApplications = applications.filter(app => {
    if (pipelineFilter === 'All') return true;
    return app.status === pipelineFilter;
  });

  const statuses: ApplicationStatus[] = ['Applied', 'Viewed', 'Shortlisted', 'Interview', 'Offer', 'Rejected'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-24 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-500" />
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Recruiter Talent Command Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Source high-conviction engineering candidates, track interview pipelines, and manage verified roles
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTabLocal('post-job')}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Post New Job</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTabLocal('pipeline')}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
            activeTab === 'pipeline'
              ? 'bg-slate-900 text-white dark:bg-emerald-500/15 dark:text-emerald-400 font-bold border border-emerald-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Candidate Pipeline ({applications.length})
        </button>
        <button
          onClick={() => setActiveTabLocal('jobs')}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
            activeTab === 'jobs'
              ? 'bg-slate-900 text-white dark:bg-emerald-500/15 dark:text-emerald-400 font-bold border border-emerald-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Active Job Listings ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTabLocal('post-job')}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
            activeTab === 'post-job'
              ? 'bg-slate-900 text-white dark:bg-emerald-500/15 dark:text-emerald-400 font-bold border border-emerald-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          + Create Listing
        </button>
      </div>

      {/* Tab: Candidate Pipeline */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          
          {/* Status filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['All', ...statuses].map(st => (
              <button
                key={st}
                onClick={() => setPipelineFilter(st)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                  pipelineFilter === st
                    ? 'bg-emerald-600 text-white'
                    : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] text-slate-600 dark:text-slate-400'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApplications.map(app => (
              <div
                key={app.id}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={() => {
                        setSelectedProfileId(app.applicantId);
                        setActiveTab('profile');
                      }}
                      className="flex items-center gap-2.5 text-left focus:outline-none"
                    >
                      <img
                        src={app.applicantAvatar}
                        alt={app.applicantName}
                        referrerPolicy="no-referrer"
                        className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white hover:text-cyan-500">
                          {app.applicantName}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {app.applicantHeadline}
                        </p>
                      </div>
                    </button>
                  </div>

                  <div className="mt-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 p-2.5 border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase">
                      Applied Role
                    </p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                      {app.jobTitle}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 italic line-clamp-2">
                      "{app.note || 'No custom message.'}"
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">
                      Stage:
                    </span>
                    <select
                      value={app.status}
                      onChange={e => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                      className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                      {statuses.map(st => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startConversationWith(app.applicantId)}
                      className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 py-1 text-xs font-semibold text-cyan-500 hover:bg-cyan-500 hover:text-white transition-colors"
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span>Message</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProfileId(app.applicantId);
                        setActiveTab('profile');
                      }}
                      className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-slate-200 dark:border-slate-750 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-slate-400"
                    >
                      <span>Profile</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Active Jobs */}
      {activeTab === 'jobs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map(job => (
            <div
              key={job.id}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </h3>
                  <p className="text-xs text-emerald-500 font-semibold mt-0.5">
                    {job.company} · {job.location}
                  </p>
                </div>
                <span className="rounded-lg bg-emerald-500/10 px-2 py-0.5 text-xs font-mono font-bold text-emerald-500 tabular-nums">
                  {job.applicantsCount} Applicants
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                {job.description}
              </p>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-400 font-mono tabular-nums">
                <span>{job.salaryRange.split('·')[0]}</span>
                <span>Active</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Post Job */}
      {activeTab === 'post-job' && (
        <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Publish Verified Engineering Role
          </h2>

          <form onSubmit={handlePostJob} className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Job Title:
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Senior Kafka Distributed Systems Engineer"
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Company Name:
                </label>
                <input
                  type="text"
                  value={newCompany}
                  onChange={e => setNewCompany(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Salary Band:
                </label>
                <input
                  type="text"
                  value={newSalary}
                  onChange={e => setNewSalary(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Location:
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="remoteCheck"
                  checked={newIsRemote}
                  onChange={e => setNewIsRemote(e.target.checked)}
                />
                <label htmlFor="remoteCheck" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Remote Eligible
                </label>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Required Tech Skills (comma separated):
              </label>
              <input
                type="text"
                value={newSkills}
                onChange={e => setNewSkills(e.target.value)}
                placeholder="Java 21, Spring Boot, Kafka, PostgreSQL"
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Role Description:
              </label>
              <textarea
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                rows={3}
                placeholder="Describe team mission, core technical challenges, and architecture..."
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTabLocal('jobs')}
                className="rounded-lg px-3 py-1.5 text-xs text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
              >
                Publish Role Listing
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
