import React, { useState, useRef } from 'react';
import {
  Users,
  Eye,
  FolderGit2,
  Flame,
  Bookmark,
  Sparkles,
  ArrowRight,
  Briefcase,
  TrendingUp,
  UserPlus,
  Compass,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostCard } from '../posts/PostCard';
import { ConsistencyBadge } from '../badges/ConsistencyBadge';

export const HomeView: React.FC = () => {
  const {
    currentUser,
    users,
    posts,
    jobs,
    projects,
    setIsNewPostModalOpen,
    setIsArticleEditorOpen,
    openPostModalWithMedia,
    setSelectedProfileId,
    setActiveTab,
    sendConnectionRequest,
    getConnectionStatus,
    toggleFollow,
    isFollowing,
    showToast
  } = useApp();

  const [feedFilter, setFeedFilter] = useState<'all' | 'connections' | 'projects' | 'tech'>('all');

  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const photoFileInputRef = useRef<HTMLInputElement>(null);

  // Handle local video selection
  const handleLocalVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        openPostModalWithMedia({
          url: event.target.result as string,
          type: 'video',
          name: file.name
        });
        showToast('Video chosen from your computer! Ready to share.');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle local photo selection
  const handleLocalPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        openPostModalWithMedia({
          url: event.target.result as string,
          type: 'image',
          name: file.name
        });
        showToast('Photo chosen from your computer! Ready to share.');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Filter posts based on tab
  const filteredPosts = posts.filter(post => {
    if (feedFilter === 'connections') {
      const status = getConnectionStatus(post.authorId);
      return status === 'CONNECTED' || post.authorId === currentUser.id;
    }
    if (feedFilter === 'projects') {
      return post.type === 'project' || post.projectRef;
    }
    if (feedFilter === 'tech') {
      return post.tags?.some(t => ['Architecture', 'Java21', 'SpringBoot', 'Kafka', 'SystemDesign'].includes(t));
    }
    return true;
  });

  // Recommended People (exclude current user)
  const recommendedPeople = users
    .filter(u => u.id !== currentUser.id)
    .slice(0, 3);

  // Opportunity Radar (top 2 active jobs)
  const opportunityJobs = jobs.slice(0, 2);

  // Trending Projects
  const trendingProjects = projects.slice(0, 2);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8 pb-24">
      {/* Centered Feed Stream */}
      <div className="space-y-4">
        {/* In-Feed Post Composer Box (matching user reference image) */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-4 sm:p-5 shadow-xs transition-colors">
          {/* Hidden file pickers for local filesystem */}
          <input
            ref={videoFileInputRef}
            type="file"
            accept="video/*"
            onChange={handleLocalVideoSelect}
            className="hidden"
          />
          <input
            ref={photoFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLocalPhotoSelect}
            className="hidden"
          />

          {/* Top row: Avatar + Pill input button */}
          <div className="flex items-center gap-3.5 mb-3.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="h-12 w-12 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700"
            />
            <button
              type="button"
              onClick={() => setIsNewPostModalOpen(true)}
              className="flex-1 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900/60 px-5 py-3 text-left transition-all flex items-center cursor-pointer group"
              title="Start a post"
            >
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Start a post
              </span>
            </button>
          </div>

          {/* Bottom row: Video, Photo, Write article buttons */}
          <div className="flex items-center justify-around sm:justify-start sm:gap-8 pt-1">
            {/* Video button (takes video from local file system) */}
            <button
              type="button"
              onClick={() => videoFileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
              title="Share a video from your computer"
            >
              <div className="flex h-5 w-6 items-center justify-center rounded bg-[#497c38] text-white shrink-0 shadow-xs">
                <svg className="h-3 w-3 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                Video
              </span>
            </button>

            {/* Photo button (takes photo from local file system) */}
            <button
              type="button"
              onClick={() => photoFileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
              title="Share a photo from your computer"
            >
              <div className="flex h-5 w-6 items-center justify-center shrink-0">
                <svg className="h-5 w-5 text-[#2c75d3] fill-current" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                Photo
              </span>
            </button>

            {/* Write article button (opens Article Publishing Studio) */}
            <button
              type="button"
              onClick={() => setIsArticleEditorOpen(true)}
              className="flex items-center gap-2 rounded-xl px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
              title="Write an article"
            >
              <div className="flex h-5 w-6 items-center justify-center shrink-0">
                <svg className="h-5 w-5 text-[#b24020]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 5h6v4H3V5zm0 6h6v4H3v-4zm0 6h6v2H3v-2zm8-12h10v2H11V5zm0 6h10v2H11v-2zm0 6h10v2H11v-2z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                Write article
              </span>
            </button>
          </div>
        </div>

        {/* Posts Stream */}
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
