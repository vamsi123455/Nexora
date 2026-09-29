import React, { useState } from 'react';
import {
  Bell,
  CheckCircle,
  Users,
  ThumbsUp,
  MessageSquare,
  Briefcase,
  Flame,
  Check,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationType } from '../../types';

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setSelectedProfileId,
    setActiveTab
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');

  const getNotifIcon = (type: NotificationType) => {
    switch (type) {
      case 'connection_request':
      case 'connection_accepted':
        return <Users className="h-4 w-4 text-cyan-500" />;
      case 'post_reaction':
        return <ThumbsUp className="h-4 w-4 text-emerald-500" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-indigo-500" />;
      case 'job_recommendation':
        return <Briefcase className="h-4 w-4 text-amber-500" />;
      case 'streak_milestone':
        return <Flame className="h-4 w-4 text-orange-500" />;
      default:
        return <Bell className="h-4 w-4 text-cyan-500" />;
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return !n.isRead;
    if (filterType === 'network') return n.type.includes('connection');
    return true;
  });

  const handleNotificationClick = (notif: any) => {
    markNotificationAsRead(notif.id);
    if (notif.targetType === 'profile' && notif.targetId) {
      setSelectedProfileId(notif.targetId);
      setActiveTab('profile');
    } else if (notif.targetType === 'job') {
      setActiveTab('jobs');
    } else if (notif.targetType === 'post') {
      setActiveTab('home');
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 pb-24 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-cyan-500" />
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Notification Stream
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time updates on peer endorsements, network activity, job advancements, and milestones
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-750 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-500 transition-colors"
        >
          <Check className="h-3.5 w-3.5 text-cyan-500" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'all', label: `All (${notifications.length})` },
          { id: 'unread', label: `Unread (${notifications.filter(n => !n.isRead).length})` },
          { id: 'network', label: 'Network' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              filterType === tab.id
                ? 'bg-cyan-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] divide-y divide-slate-100 dark:divide-slate-850 overflow-hidden shadow-sm">
        {filteredNotifs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No notifications in this filter category
          </div>
        ) : (
          filteredNotifs.map(notif => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-4 flex items-start justify-between gap-3 cursor-pointer transition-colors ${
                !notif.isRead
                  ? 'bg-cyan-50/25 dark:bg-cyan-950/20'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={notif.actorAvatar}
                    alt={notif.actorName}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-750"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-[#121824] shadow-xs">
                    {getNotifIcon(notif.type)}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-snug">
                    <strong className="text-slate-900 dark:text-white font-bold mr-1">
                      {notif.actorName}
                    </strong>
                    {notif.message}
                  </p>
                  {notif.detail && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {notif.detail}
                    </p>
                  )}
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                    {notif.createdAt}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {!notif.isRead && (
                  <span className="h-2 w-2 rounded-full bg-cyan-500" />
                )}
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
