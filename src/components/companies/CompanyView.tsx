import React, { useState } from 'react';
import {
  Building,
  MapPin,
  Globe,
  Users,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Company } from '../../types';

export const CompanyView: React.FC = () => {
  const {
    companies,
    jobs,
    users,
    selectedCompanyId,
    setSelectedCompanyId,
    setActiveTab,
    setSelectedProfileId
  } = useApp();

  const [activeCompId, setActiveCompId] = useState<string>(selectedCompanyId || companies[0].id);
  const activeCompany = companies.find(c => c.id === activeCompId) || companies[0];

  const companyJobs = jobs.filter(j => j.company.toLowerCase().includes(activeCompany.name.toLowerCase()));
  const companyEmployees = users.filter(u =>
    u.experiences?.some(e => e.company.toLowerCase().includes(activeCompany.name.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-24 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-indigo-500" />
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Company Ecosystems & Engineering Hubs
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explore company culture, tech stacks, verified engineering teams, and open careers
          </p>
        </div>

        {/* Company selector */}
        <div className="flex items-center gap-2">
          {companies.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCompId(c.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                c.id === activeCompany.id
                  ? 'bg-slate-900 text-white dark:bg-cyan-500/15 dark:text-cyan-400 border border-cyan-500/30'
                  : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Company Profile Banner */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] shadow-sm">
        
        {/* Cover */}
        <div className="relative h-44 sm:h-52 w-full bg-slate-900 overflow-hidden">
          <img
            src={activeCompany.coverUrl}
            alt={activeCompany.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/* Details */}
        <div className="p-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 sm:-mt-14 gap-4">
            <img
              src={activeCompany.logoUrl}
              alt={activeCompany.name}
              referrerPolicy="no-referrer"
              className="h-20 w-20 rounded-2xl object-cover border-4 border-white dark:border-[#121824] shadow-xl bg-slate-900"
            />
            {activeCompany.website && (
              <a
                href={activeCompany.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-cyan-500 transition-colors self-start sm:self-auto"
              >
                <Globe className="h-3.5 w-3.5 text-cyan-500" />
                <span>Visit Website</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {activeCompany.name}
            </h2>
            <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400 mt-0.5">
              {activeCompany.tagline}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Building className="h-3.5 w-3.5" />
                {activeCompany.industry}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {activeCompany.employeesCount}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {activeCompany.locations.join(', ')}
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 max-w-3xl">
              {activeCompany.description}
            </p>

            {/* Tech stack */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Primary Technology Stack:
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {activeCompany.techStack.map(t => (
                  <span
                    key={t}
                    className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-mono text-slate-700 dark:text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Open Jobs & Employees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Open Roles */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-emerald-500" />
              <span>Open Roles at {activeCompany.name} ({companyJobs.length})</span>
            </h3>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs font-semibold text-cyan-500 hover:underline"
            >
              All Jobs
            </button>
          </div>

          <div className="space-y-3">
            {companyJobs.map(job => (
              <div
                key={job.id}
                onClick={() => setActiveTab('jobs')}
                className="cursor-pointer p-3 rounded-xl border border-slate-100 dark:border-slate-850 hover:border-emerald-500/50 bg-slate-50/50 dark:bg-slate-900/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </h4>
                  <span className="font-mono text-xs font-bold text-emerald-500 tabular-nums">
                    {job.salaryRange.split('·')[0]}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {job.location} · {job.employmentType}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Employees */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-cyan-500" />
              <span>Engineers & Alumni ({companyEmployees.length})</span>
            </h3>
          </div>

          <div className="space-y-3">
            {companyEmployees.map(emp => (
              <div
                key={emp.id}
                onClick={() => {
                  setSelectedProfileId(emp.id);
                  setActiveTab('profile');
                }}
                className="cursor-pointer p-2.5 rounded-xl border border-slate-100 dark:border-slate-850 hover:border-cyan-500/50 flex items-center gap-3 transition-colors"
              >
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {emp.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {emp.headline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
