import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  UserPlus,
  MessageSquare,
  Search,
  Filter,
  Check,
  X,
  Sparkles,
  Shield,
  Briefcase
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ConsistencyBadge, ProfessionalBadgeChip } from '../badges/ConsistencyBadge';

export const NetworkView: React.FC = () => {
  const {
    currentUser,
    users,
    getConnectionStatus,
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
    removeConnection,
    isFollowing,
    toggleFollow,
    setSelectedProfileId,
    setActiveTab,
    startConversationWith
  } = useApp();

  const [networkFilter, setNetworkFilter] = useState<'all' | 'developers' | 'ai' | 'recruiters' | 'founders' | 'my-connections'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Find incoming connection requests
  // For demo, let's treat any user with 'REQUEST_RECEIVED' status
  // or simulate incoming request from Jordan Lee if not yet decided
  const pendingRequests = users.filter(u => {
    return getConnectionStatus(u.id) === 'REQUEST_RECEIVED';
  });

  // Filter users
  const filteredUsers = users.filter(u => {
    if (u.id === currentUser.id) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        u.name.toLowerCase().includes(q) ||
        u.headline.toLowerCase().includes(q) ||
        u.skills.some(s => s.name.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (networkFilter === 'my-connections') {
      return getConnectionStatus(u.id) === 'CONNECTED';
    }
    if (networkFilter === 'developers') {
      return u.role === 'PROFESSIONAL' || u.role === 'FOUNDER';
    }
    if (networkFilter === 'ai') {
      return u.headline.toLowerCase().includes('ai') || u.skills.some(s => s.name.toLowerCase().includes('ai') || s.name.toLowerCase().includes('machine learning'));
    }
    if (networkFilter === 'recruiters') {
      return u.role === 'RECRUITER' || u.accountType === 'Recruiter';
    }
    if (networkFilter === 'founders') {
      return u.role === 'FOUNDER' || u.accountType === 'Founder';
    }
    return true;
  });

  const myConnectionsCount = users.filter(u => getConnectionStatus(u.id) === 'CONNECTED').length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-24 space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-cyan-500" />
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Network Intelligence
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Grow, discover and maintain your professional network graph · {myConnectionsCount} Connected Peers
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, or skill..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-900/60 pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Professionals' },
          { id: 'my-connections', label: `My Connections (${myConnectionsCount})` },
          { id: 'developers', label: 'Systems & Backend' },
          { id: 'ai', label: 'AI & Data Scientists' },
          { id: 'founders', label: 'Founders & CTOs' },
          { id: 'recruiters', label: 'Talent Partners' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setNetworkFilter(tab.id as any)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
              networkFilter === tab.id
                ? 'bg-cyan-500 text-white shadow-xs'
                : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Incoming Requests Section (if any) */}
      {pendingRequests.length > 0 && (
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Pending Connection Requests ({pendingRequests.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pendingRequests.map(reqUser => (
              <div
                key={reqUser.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-3 shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={reqUser.avatar}
                    alt={reqUser.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {reqUser.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {reqUser.headline}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => acceptConnectionRequest(reqUser.id)}
                    className="rounded-lg bg-cyan-500 p-1.5 text-white hover:bg-cyan-400"
                    title="Accept"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => rejectConnectionRequest(reqUser.id)}
                    className="rounded-lg border border-slate-300 dark:border-slate-700 p-1.5 text-slate-400 hover:text-rose-500"
                    title="Ignore"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* People Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map(person => {
          const connStatus = getConnectionStatus(person.id);
          const following = isFollowing(person.id);

          return (
            <div
              key={person.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div>
                {/* User Header */}
                <div className="flex items-start justify-between gap-3">
                  <button
                    onClick={() => {
                      setSelectedProfileId(person.id);
                      setActiveTab('profile');
                    }}
                    className="text-left group flex items-start gap-3 flex-1 min-w-0"
                  >
                    <img
                      src={person.avatar}
                      alt={person.name}
                      referrerPolicy="no-referrer"
                      className="h-12 w-12 rounded-full object-cover border border-slate-200 dark:border-slate-700 group-hover:ring-2 group-hover:ring-cyan-500 transition-all flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors truncate">
                          {person.name}
                        </h3>
                        {person.badges.some(b => b.isConsistencyBadge) && (
                          <ConsistencyBadge size="sm" showLabel={false} />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {person.headline}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {person.location}
                      </p>
                    </div>
                  </button>
                </div>

                {/* Skills tags */}
                <div className="mt-3.5 flex flex-wrap gap-1">
                  {person.skills.slice(0, 3).map(sk => (
                    <span
                      key={sk.id}
                      className="rounded bg-slate-100 dark:bg-slate-800/90 px-1.5 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-300"
                    >
                      {sk.name}
                    </span>
                  ))}
                  {person.skills.length > 3 && (
                    <span className="text-[10px] text-slate-400 font-mono self-center">
                      +{person.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono tabular-nums">
                  <span>{person.connectionsCount} connections</span>
                  <span>{person.codingStats.problemsSolved.total} problems</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                {/* Connect State */}
                {connStatus === 'CONNECTED' ? (
                  <button
                    onClick={() => removeConnection(person.id)}
                    className="flex-1 rounded-xl border border-emerald-500/40 bg-emerald-500/10 py-1.5 text-xs font-semibold text-emerald-500 hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/40 transition-colors"
                  >
                    Connected
                  </button>
                ) : connStatus === 'REQUEST_SENT' ? (
                  <button
                    onClick={() => removeConnection(person.id)}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 py-1.5 text-xs font-semibold text-slate-400 hover:text-rose-400"
                  >
                    Pending
                  </button>
                ) : (
                  <button
                    onClick={() => sendConnectionRequest(person.id)}
                    className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-cyan-500 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-cyan-400 transition-colors"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    <span>Connect</span>
                  </button>
                )}

                {/* Follow */}
                <button
                  onClick={() => toggleFollow(person.id)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                    following
                      ? 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      : 'border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10'
                  }`}
                  title={following ? 'Unfollow' : 'Follow'}
                >
                  {following ? 'Following' : 'Follow'}
                </button>

                {/* Message */}
                <button
                  onClick={() => startConversationWith(person.id)}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 p-1.5 text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500 transition-colors"
                  title="Direct Message"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
