import React, { useState } from 'react';
import {
  MapPin,
  Globe,
  Github,
  Briefcase,
  GraduationCap,
  Sparkles,
  Edit3,
  Flame,
  FolderGit2,
  ThumbsUp,
  MessageSquare,
  UserPlus,
  Check,
  ExternalLink,
  Plus,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostCard } from '../posts/PostCard';
import { ConsistencyBadge, ProfessionalBadgeChip } from '../badges/ConsistencyBadge';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    users,
    selectedProfileId,
    setCurrentUser,
    posts,
    projects,
    getConnectionStatus,
    sendConnectionRequest,
    acceptConnectionRequest,
    removeConnection,
    isFollowing,
    toggleFollow,
    endorseSkill,
    startConversationWith,
    showToast
  } = useApp();

  const activeUserId = selectedProfileId || currentUser.id;
  const profileUser = users.find(u => u.id === activeUserId) || currentUser;
  const isOwnProfile = profileUser.id === currentUser.id;

  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'experience' | 'projects' | 'coding' | 'activity'>('about');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(profileUser.name);
  const [editHeadline, setEditHeadline] = useState(profileUser.headline);
  const [editBio, setEditBio] = useState(profileUser.bio);
  const [editLocation, setEditLocation] = useState(profileUser.location);
  const [newSkillName, setNewSkillName] = useState('');

  const connectionStatus = getConnectionStatus(profileUser.id);
  const following = isFollowing(profileUser.id);

  // User posts & projects
  const userPosts = posts.filter(p => p.authorId === profileUser.id);
  const userProjects = projects.filter(p => p.authorId === profileUser.id);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwnProfile) return;

    setCurrentUser({
      ...currentUser,
      name: editName,
      headline: editHeadline,
      bio: editBio,
      location: editLocation
    });
    setIsEditModalOpen(false);
    showToast('Profile updated successfully');
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill = {
      id: `sk-${Date.now()}`,
      name: newSkillName.trim(),
      category: 'Specialization',
      endorsementsCount: 1,
      endorsedBy: [currentUser.id]
    };
    setCurrentUser({
      ...currentUser,
      skills: [...currentUser.skills, newSkill]
    });
    setNewSkillName('');
    showToast(`Added ${newSkill.name} to your skills`);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 pb-24">
      
      {/* Profile Header Canvas */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] shadow-sm">
        
        {/* Cover Photo */}
        <div className="relative h-44 sm:h-56 w-full bg-slate-800 overflow-hidden">
          <img
            src={
              profileUser.coverImage ||
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80'
            }
            alt="Cover"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Profile Info Bar */}
        <div className="relative px-6 pb-6 pt-0">
          
          {/* Avatar & Floating Actions */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4">
            <div className="relative">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                referrerPolicy="no-referrer"
                className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl object-cover border-4 border-white dark:border-[#121824] shadow-xl bg-slate-900"
              />
              <div className="absolute bottom-1 right-1">
                {profileUser.badges.some(b => b.isConsistencyBadge) && (
                  <ConsistencyBadge size="sm" showLabel={false} />
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {isOwnProfile ? (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-cyan-500 transition-colors"
                >
                  <Edit3 className="h-3.5 w-3.5 text-cyan-500" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  {/* Connect */}
                  {connectionStatus === 'CONNECTED' ? (
                    <button
                      onClick={() => removeConnection(profileUser.id)}
                      className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-500 hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/40 transition-colors"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Connected</span>
                    </button>
                  ) : connectionStatus === 'REQUEST_SENT' ? (
                    <button
                      onClick={() => removeConnection(profileUser.id)}
                      className="rounded-xl border border-slate-300 dark:border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      Request Sent
                    </button>
                  ) : connectionStatus === 'REQUEST_RECEIVED' ? (
                    <button
                      onClick={() => acceptConnectionRequest(profileUser.id)}
                      className="rounded-xl bg-cyan-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-cyan-400 transition-colors"
                    >
                      Accept Request
                    </button>
                  ) : (
                    <button
                      onClick={() => sendConnectionRequest(profileUser.id)}
                      className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-cyan-500/20 hover:bg-cyan-400 transition-colors"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Connect</span>
                    </button>
                  )}

                  {/* Follow */}
                  <button
                    onClick={() => toggleFollow(profileUser.id)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${
                      following
                        ? 'border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                        : 'border border-cyan-500/40 bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500 hover:text-white'
                    }`}
                  >
                    {following ? 'Following' : '+ Follow'}
                  </button>

                  {/* Direct Message */}
                  <button
                    onClick={() => startConversationWith(profileUser.id)}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-cyan-500 transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-cyan-500" />
                    <span>Message</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Name & Headline */}
          <div className="mt-4">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {profileUser.name}
              </h1>
              <span className="text-xs font-mono text-slate-500">
                @{profileUser.username}
              </span>
              {profileUser.badges.map(b => (
                <ProfessionalBadgeChip key={b.id} badge={b} />
              ))}
            </div>

            <p className="mt-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 max-w-2xl">
              {profileUser.headline}
            </p>

            {/* Meta & Links */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>{profileUser.location}</span>
              </div>
              {profileUser.website && (
                <a
                  href={profileUser.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-cyan-500 hover:underline"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Website</span>
                </a>
              )}
              {profileUser.github && (
                <a
                  href={profileUser.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-cyan-500 hover:underline"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              <div className="flex items-center gap-2 font-mono tabular-nums text-slate-600 dark:text-slate-300 font-semibold">
                <span>{profileUser.connectionsCount} connections</span>
                <span aria-hidden="true">·</span>
                <span>{profileUser.followersCount} followers</span>
              </div>
            </div>
          </div>

          {/* Profile Navigation Tabs */}
          <div className="mt-6 flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills & Endorsements' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: `Projects (${userProjects.length})` },
              { id: 'coding', label: 'Coding Momentum' },
              { id: 'activity', label: `Activity (${userPosts.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 -mb-1 ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Module Content */}
      <div className="mt-6 space-y-6">
        
        {/* About Module */}
        {activeTab === 'about' && (
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-6 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800/80">
              Professional Biography
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {profileUser.bio}
            </p>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Education
              </h3>
              <div className="mt-3 space-y-3">
                {profileUser.education.map(edu => (
                  <div key={edu.id} className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {edu.institution}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {edu.degree} in {edu.field}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono tabular-nums">
                        {edu.startYear} — {edu.endYear} {edu.grade ? `· ${edu.grade}` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Skills Module */}
        {activeTab === 'skills' && (
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Verified Technical Skills & Endorsements
              </h2>
              {isOwnProfile && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={e => setNewSkillName(e.target.value)}
                    placeholder="New skill..."
                    className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-xs"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="flex items-center gap-1 rounded-lg bg-cyan-500 px-2.5 py-1 text-xs font-semibold text-white hover:bg-cyan-400"
                  >
                    <Plus className="h-3 w-3" /> Add
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profileUser.skills.map(skill => {
                const hasEndorsed = skill.endorsedBy.includes(currentUser.id);

                return (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/40 p-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {skill.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {skill.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {skill.endorsementsCount} colleague endorsements
                      </p>
                    </div>

                    {!isOwnProfile && (
                      <button
                        onClick={() => endorseSkill(profileUser.id, skill.id)}
                        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                          hasEndorsed
                            ? 'bg-cyan-500 text-white'
                            : 'border border-cyan-500/40 text-cyan-500 hover:bg-cyan-500 hover:text-white'
                        }`}
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>{hasEndorsed ? 'Endorsed' : 'Endorse'}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Experience Timeline Module */}
        {activeTab === 'experience' && (
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-6 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800/80">
              Career History & Technical Roles
            </h2>

            <div className="mt-5 relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-6">
              {profileUser.experiences.map(exp => (
                <div key={exp.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-cyan-500 bg-white dark:bg-[#121824]" />

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {exp.position}
                    </h3>
                    <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400">
                      {exp.company} · {exp.employmentType}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate} · {exp.location}
                    </p>

                    <p className="mt-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      {exp.description}
                    </p>

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {exp.technologies.map(tech => (
                        <span
                          key={tech}
                          className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Module */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Project Portfolio & Repositories
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userProjects.map(proj => (
                <div
                  key={proj.id}
                  className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] overflow-hidden shadow-sm"
                >
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="h-36 w-full object-cover"
                  />
                  <div className="p-4">
                    <span className="text-[10px] font-mono uppercase text-cyan-500 font-semibold">
                      {proj.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                      {proj.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {proj.technologies.map(t => (
                        <span
                          key={t}
                          className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3">
                      <span className="font-mono text-xs text-slate-400 tabular-nums">
                        ★ {proj.starsCount} stars
                      </span>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs font-semibold text-cyan-500 hover:underline"
                        >
                          <span>Repository</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coding Momentum Module */}
        {activeTab === 'coding' && (
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-amber-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Developer Momentum & Coding Consistency
                </h2>
              </div>
              <ConsistencyBadge size="md" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50/50 dark:bg-slate-900/40">
                <span className="text-[11px] text-slate-400">Total Solved</span>
                <p className="font-mono text-xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
                  {profileUser.codingStats.problemsSolved.total}
                </p>
              </div>
              <div className="rounded-xl border border-emerald-500/30 p-3 bg-emerald-500/5">
                <span className="text-[11px] text-emerald-500">Easy</span>
                <p className="font-mono text-xl font-bold text-emerald-400 mt-1 tabular-nums">
                  {profileUser.codingStats.problemsSolved.easy}
                </p>
              </div>
              <div className="rounded-xl border border-amber-500/30 p-3 bg-amber-500/5">
                <span className="text-[11px] text-amber-500">Medium</span>
                <p className="font-mono text-xl font-bold text-amber-400 mt-1 tabular-nums">
                  {profileUser.codingStats.problemsSolved.medium}
                </p>
              </div>
              <div className="rounded-xl border border-rose-500/30 p-3 bg-rose-500/5">
                <span className="text-[11px] text-rose-500">Hard</span>
                <p className="font-mono text-xl font-bold text-rose-400 mt-1 tabular-nums">
                  {profileUser.codingStats.problemsSolved.hard}
                </p>
              </div>
            </div>

            {/* Streak metrics */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-400">
                  Current Continuous Streak
                </span>
                <p className="font-mono text-2xl font-bold text-amber-300 tabular-nums">
                  {profileUser.codingStats.currentStreak} Days
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Longest Streak</span>
                <p className="font-mono text-xl font-bold text-slate-300 tabular-nums">
                  {profileUser.codingStats.longestStreak} Days
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Activity Module */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Recent Engineering Dispatches ({userPosts.length})
            </h2>
            {userPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Edit Professional Identity
            </h3>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Name:
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Headline:
                </label>
                <input
                  type="text"
                  value={editHeadline}
                  onChange={e => setEditHeadline(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Location:
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={e => setEditLocation(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Bio:
                </label>
                <textarea
                  value={editBio}
                  onChange={e => setEditBio(e.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-lg px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-cyan-400"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
