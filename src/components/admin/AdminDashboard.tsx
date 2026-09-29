import React from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Trash2,
  Users,
  FileText,
  Briefcase,
  Layers,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    posts,
    jobs,
    applications,
    reports,
    resolveReport,
    deletePost
  } = useApp();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-24 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-rose-500" />
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Platform Administration & Moderation
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            System invariants, community health metrics, and content governance queue
          </p>
        </div>

        <span className="rounded-lg bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-mono font-bold text-rose-500">
          ADMIN PRIVILEGED
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-3.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">
            Total Users
          </span>
          <p className="mt-1 font-mono text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            {users.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-3.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">
            Total Posts
          </span>
          <p className="mt-1 font-mono text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            {posts.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-3.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">
            Active Jobs
          </span>
          <p className="mt-1 font-mono text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            {jobs.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-3.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">
            Applications
          </span>
          <p className="mt-1 font-mono text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            {applications.length}
          </p>
        </div>

        <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3.5 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-semibold text-rose-500 uppercase">
            Pending Reports
          </span>
          <p className="mt-1 font-mono text-xl font-bold text-rose-400 tabular-nums">
            {reports.filter(r => r.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Moderation Queue */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <span>Community Moderation Queue</span>
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {reports.map(rep => (
            <div
              key={rep.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-500 uppercase font-mono">
                    {rep.reason}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Reported {rep.targetType} ({rep.targetId})
                  </span>
                  <span className="text-[10px] text-slate-400">by {rep.reportedBy}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 italic">
                  "{rep.targetSnippet}"
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {rep.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => resolveReport(rep.id, 'dismiss')}
                      className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => resolveReport(rep.id, 'delete')}
                      className="flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-500"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Take Action</span>
                    </button>
                  </>
                ) : (
                  <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-mono text-slate-400 capitalize">
                    {rep.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Users Directory Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Active Account Registry
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase">
                <th className="pb-2">User</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Account Type</th>
                <th className="pb-2">Connections</th>
                <th className="pb-2">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="py-2.5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <img
                      src={u.avatar}
                      alt={u.name}
                      referrerPolicy="no-referrer"
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span>{u.name}</span>
                  </td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-400 font-mono">
                    {u.role}
                  </td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-400">
                    {u.accountType}
                  </td>
                  <td className="py-2.5 font-mono tabular-nums text-slate-700 dark:text-slate-300">
                    {u.connectionsCount}
                  </td>
                  <td className="py-2.5 font-mono tabular-nums text-amber-500 font-bold">
                    {u.codingStats?.currentStreak || 0}d
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
