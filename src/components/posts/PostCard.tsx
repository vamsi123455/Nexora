import React, { useState } from 'react';
import {
  ThumbsUp,
  PartyPopper,
  Lightbulb,
  HeartHandshake,
  HelpCircle,
  MessageSquare,
  Share2,
  Repeat2,
  Bookmark,
  MoreHorizontal,
  CornerDownRight,
  ExternalLink,
  Flame,
  CheckCircle,
  Flag,
  Send,
  Trash2,
  Trophy
} from 'lucide-react';
import { Post, ReactionType } from '../../types';
import { useApp } from '../../context/AppContext';
import { ConsistencyBadge } from '../badges/ConsistencyBadge';

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const {
    currentUser,
    reactToPost,
    addComment,
    likeComment,
    toggleSavePost,
    deletePost,
    votePoll,
    reportContent,
    setSelectedProfileId,
    setActiveTab,
    showToast
  } = useApp();

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReactionMenuOpen, setIsReactionMenuOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState<'Spam' | 'Harassment' | 'Inappropriate Content' | 'Fraud'>('Spam');

  const totalReactions = Object.values(post.reactions).reduce((a, b) => a + b, 0);

  const handleAuthorClick = () => {
    setSelectedProfileId(post.authorId);
    setActiveTab('profile');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Post permalink copied to clipboard!');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(post.id, newCommentText);
    setNewCommentText('');
  };

  const handleReplySubmit = (parentCommentId: string) => {
    if (!replyText.trim()) return;
    addComment(post.id, replyText, parentCommentId);
    setReplyText('');
    setReplyingToCommentId(null);
  };

  const handleReportSubmit = () => {
    reportContent('post', post.id, reportReason, post.content.slice(0, 80));
    setIsReportOpen(false);
    setIsOptionsOpen(false);
  };

  const getReactionDisplay = (type?: ReactionType) => {
    switch (type) {
      case 'celebrate':
        return {
          icon: <span className="text-base sm:text-lg leading-none">👏</span>,
          label: 'Celebrate',
          color: 'text-emerald-600 dark:text-emerald-400 font-bold'
        };
      case 'insightful':
        return {
          icon: <span className="text-base sm:text-lg leading-none">💡</span>,
          label: 'Insightful',
          color: 'text-amber-600 dark:text-amber-400 font-bold'
        };
      case 'support':
        return {
          icon: <span className="text-base sm:text-lg leading-none">🤝</span>,
          label: 'Support',
          color: 'text-rose-600 dark:text-rose-400 font-bold'
        };
      case 'curious':
        return {
          icon: <span className="text-base sm:text-lg leading-none">🤔</span>,
          label: 'Curious',
          color: 'text-purple-600 dark:text-purple-400 font-bold'
        };
      case 'like':
        return {
          icon: <ThumbsUp className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-[#0a66c2] fill-[#0a66c2]" />,
          label: 'Like',
          color: 'text-[#0a66c2] font-bold'
        };
      default:
        return {
          icon: <ThumbsUp className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-slate-600 dark:text-slate-400" />,
          label: 'Like',
          color: 'text-slate-600 dark:text-slate-300 font-semibold'
        };
    }
  };

  const getReactionIcon = (type?: ReactionType) => {
    switch (type) {
      case 'celebrate':
        return <PartyPopper className="h-4 w-4 text-emerald-500" />;
      case 'insightful':
        return <Lightbulb className="h-4 w-4 text-amber-500" />;
      case 'support':
        return <HeartHandshake className="h-4 w-4 text-rose-500" />;
      case 'curious':
        return <HelpCircle className="h-4 w-4 text-purple-500" />;
      default:
        return <ThumbsUp className="h-4 w-4 text-[#0a66c2]" />;
    }
  };

  return (
    <article className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#121824] p-5 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-750">
      
      {/* Post Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleAuthorClick}
            className="group relative flex-shrink-0 focus:outline-none"
          >
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              referrerPolicy="no-referrer"
              className="h-11 w-11 rounded-full object-cover border border-slate-200 dark:border-slate-700 group-hover:ring-2 group-hover:ring-cyan-500 transition-all"
            />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleAuthorClick}
                className="text-sm font-bold text-slate-900 dark:text-white hover:text-cyan-500 transition-colors"
              >
                {post.authorName}
              </button>

              {/* Weekly Contest Winner Badge */}
              {(post.authorBadge === 'WEEKLY_CONTEST_WINNER' || post.authorBadge === 'Contest Winner' || post.authorBadge === 'CONSISTENCY') && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-amber-500/15 border border-amber-500/40 px-2.5 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 shadow-xs">
                  <Trophy className="h-3 w-3 text-amber-500" />
                  <span>Weekly Contest Winner</span>
                </span>
              )}

              {post.authorBadge && post.authorBadge !== 'CONSISTENCY' && post.authorBadge !== 'WEEKLY_CONTEST_WINNER' && post.authorBadge !== 'Contest Winner' && (
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  · {post.authorBadge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
              {post.authorHeadline}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
              <span>{post.createdAt}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{post.type}</span>
            </div>
          </div>
        </div>

        {/* Post Options Menu */}
        <div className="relative">
          <button
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {isOptionsOpen && (
            <div className="absolute right-0 mt-1 w-44 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151c2b] p-1.5 shadow-xl z-20 animate-in fade-in duration-100">
              <button
                onClick={() => {
                  toggleSavePost(post.id);
                  setIsOptionsOpen(false);
                }}
                className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Bookmark className="h-3.5 w-3.5 text-cyan-500" />
                <span>{post.saved ? 'Remove Bookmark' : 'Save Bookmark'}</span>
              </button>
              <button
                onClick={() => {
                  setIsReportOpen(true);
                  setIsOptionsOpen(false);
                }}
                className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                <Flag className="h-3.5 w-3.5" />
                <span>Report Content</span>
              </button>
              {post.authorId === currentUser.id && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                    setIsOptionsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete Post</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Text Body */}
      <div className="mt-3.5 whitespace-pre-line text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {post.content}
      </div>

      {/* Media: Video Player */}
      {post.mediaUrl && (post.type === 'video' || post.mediaType === 'video') && (
        <div className="mt-3.5 overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-black">
          <video
            src={post.mediaUrl}
            controls
            className="w-full max-h-96 object-contain"
          />
        </div>
      )}

      {/* Media: Image */}
      {post.mediaUrl && post.type !== 'video' && post.mediaType !== 'video' && (
        <div className="mt-3.5 overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-900/50">
          <img
            src={post.mediaUrl}
            alt="Post media"
            referrerPolicy="no-referrer"
            className="w-full max-h-96 object-cover hover:scale-[1.01] transition-transform duration-300"
          />
        </div>
      )}

      {/* Article Preview Card */}
      {post.articleData && (
        <div className="mt-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            <span>Published Article</span>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            {post.articleData.title}
          </h4>
          {post.articleData.subtitle && (
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
              {post.articleData.subtitle}
            </p>
          )}
        </div>
      )}

      {/* Poll Component */}
      {post.pollData && (
        <div className="mt-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {post.pollData.question}
            </span>
            <span>{post.pollData.expiresAt}</span>
          </div>

          <div className="space-y-2 pt-1">
            {post.pollData.options.map(opt => {
              const hasVoted = !!post.pollData?.userVotedOptionId;
              const isSelected = post.pollData?.userVotedOptionId === opt.id;
              const percent = post.pollData?.totalVotes
                ? Math.round((opt.votes / post.pollData.totalVotes) * 100)
                : 0;

              return (
                <button
                  key={opt.id}
                  onClick={() => votePoll(post.id, opt.id)}
                  disabled={hasVoted}
                  className={`relative w-full overflow-hidden rounded-lg border p-2.5 text-left text-xs transition-all ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-500/10 font-semibold text-cyan-600 dark:text-cyan-400'
                      : 'border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:border-cyan-500/50'
                  }`}
                >
                  {/* Progress background */}
                  {hasVoted && (
                    <div
                      className="absolute inset-y-0 left-0 bg-cyan-500/15 transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  )}
                  <div className="relative flex items-center justify-between">
                    <span>{opt.text}</span>
                    {hasVoted && (
                      <span className="font-mono text-xs font-semibold tabular-nums">
                        {percent}%
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400 tabular-nums">
            {post.pollData.totalVotes} total votes · Verified engineers
          </p>
        </div>
      )}

      {/* Project Reference Card */}
      {post.projectRef && (
        <div className="mt-3.5 flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-3.5">
          <div className="pr-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-500">
              Attached Project Showcase
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
              {post.projectRef.title}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {post.projectRef.tagline}
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('projects');
            }}
            className="flex-shrink-0 flex items-center gap-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-1 text-xs font-semibold text-cyan-500 hover:bg-cyan-500 hover:text-white transition-colors"
          >
            <span>Explore</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Job Reference Card */}
      {post.jobRef && (
        <div className="mt-3.5 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
              Open Opportunity
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
              {post.jobRef.title} · {post.jobRef.company}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {post.jobRef.location} · {post.jobRef.salary}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('jobs')}
            className="flex-shrink-0 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
          >
            Apply in Jobs
          </button>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-cyan-600 dark:text-cyan-400 font-medium">
          {post.tags.map(tag => (
            <span key={tag} className="hover:underline cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Metrics Row */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          {totalReactions > 0 ? (
            <div className="flex items-center gap-1.5 font-medium tabular-nums">
              <div className="flex -space-x-1">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] text-white">
                  👍
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
                  🎉
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] text-white">
                  💡
                </span>
              </div>
              <span>{totalReactions} reactions</span>
            </div>
          ) : (
            <span>Be first to react</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className="hover:underline"
          >
            {post.comments.length} comments
          </button>
          <span>·</span>
          <span>{post.sharesCount} shares</span>
        </div>
      </div>

      {/* LinkedIn-Style Action Buttons Row */}
      <div className="relative mt-2.5 flex items-center justify-between border-t border-slate-200/80 dark:border-slate-800/80 pt-1">
        
        {/* 1. Like / Reaction Trigger with LinkedIn-style Hover Dock */}
        <div
          className="relative flex-1"
          onMouseEnter={() => setIsReactionMenuOpen(true)}
          onMouseLeave={() => setIsReactionMenuOpen(false)}
        >
          <button
            type="button"
            onClick={() => {
              if (post.userReaction) {
                reactToPost(post.id, post.userReaction);
              } else {
                reactToPost(post.id, 'like');
              }
            }}
            className={`w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer ${
              getReactionDisplay(post.userReaction).color
            }`}
          >
            {getReactionDisplay(post.userReaction).icon}
            <span className="capitalize">{getReactionDisplay(post.userReaction).label}</span>
          </button>

          {/* LinkedIn Reaction Picker Dock */}
          {isReactionMenuOpen && (
            <div className="absolute -top-12 left-0 sm:left-2 flex items-center gap-1 sm:gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2232] px-2.5 sm:px-3 py-1.5 shadow-2xl z-40 animate-in fade-in slide-in-from-bottom-2 duration-150">
              {[
                { type: 'like', emoji: '👍', label: 'Like' },
                { type: 'celebrate', emoji: '👏', label: 'Celebrate' },
                { type: 'support', emoji: '🤝', label: 'Support' },
                { type: 'insightful', emoji: '💡', label: 'Insightful' },
                { type: 'curious', emoji: '🤔', label: 'Curious' }
              ].map(rx => (
                <button
                  key={rx.type}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    reactToPost(post.id, rx.type as ReactionType);
                    setIsReactionMenuOpen(false);
                  }}
                  className="group/emoji relative p-1 text-xl sm:text-2xl hover:scale-135 -translate-y-0 hover:-translate-y-1.5 transition-all duration-200 cursor-pointer"
                  title={rx.label}
                >
                  <span>{rx.emoji}</span>
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 opacity-0 group-hover/emoji:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
                    {rx.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Comment Button */}
        <button
          type="button"
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer ${
            isCommentsOpen
              ? 'text-[#0a66c2] bg-blue-50/50 dark:bg-blue-950/20'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <MessageSquare className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          <span>Comment</span>
        </button>

        {/* 3. Repost / Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer"
        >
          <Repeat2 className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          <span>Repost</span>
        </button>

        {/* 4. Send Button */}
        <button
          type="button"
          onClick={() => {
            showToast('Post link copied to clipboard to send!');
            if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.href);
            }
          }}
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer"
        >
          <Send className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          <span>Send</span>
        </button>

      </div>

      {/* Comments Drawer */}
      {isCommentsOpen && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3 animate-in fade-in duration-150">
          
          {/* Add Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="h-8 w-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="relative flex-1">
              <input
                type="text"
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                placeholder="Add a constructive engineering comment..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900/60 px-3 py-2 pr-10 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-500 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          {/* Comment Threads */}
          <div className="space-y-3 pt-1">
            {post.comments.map(comment => (
              <div key={comment.id} className="space-y-2">
                <div className="flex gap-2.5 items-start">
                  <img
                    src={comment.authorAvatar}
                    alt={comment.authorName}
                    referrerPolicy="no-referrer"
                    className="h-7 w-7 rounded-full object-cover mt-0.5"
                  />
                  <div className="flex-1 rounded-xl bg-slate-50 dark:bg-slate-900/60 p-2.5 border border-slate-100 dark:border-slate-800/60">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {comment.authorName}
                      </span>
                      <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {comment.authorHeadline}
                    </p>
                    <p className="mt-1 text-xs text-slate-800 dark:text-slate-200">
                      {comment.content}
                    </p>

                    <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
                      <button
                        onClick={() => likeComment(post.id, comment.id)}
                        className={`hover:text-cyan-500 font-medium ${
                          comment.userLiked ? 'text-cyan-500 font-bold' : ''
                        }`}
                      >
                        Like {comment.likesCount > 0 ? `(${comment.likesCount})` : ''}
                      </button>
                      <span>·</span>
                      <button
                        onClick={() => setReplyingToCommentId(comment.id)}
                        className="hover:text-cyan-500 font-medium"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="pl-9 space-y-2">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex gap-2 items-start">
                        <CornerDownRight className="h-3.5 w-3.5 text-slate-400 mt-1 flex-shrink-0" />
                        <img
                          src={reply.authorAvatar}
                          alt={reply.authorName}
                          referrerPolicy="no-referrer"
                          className="h-6 w-6 rounded-full object-cover mt-0.5"
                        />
                        <div className="flex-1 rounded-lg bg-slate-100/70 dark:bg-slate-850 p-2 border border-slate-200/50 dark:border-slate-800">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-900 dark:text-white">
                              {reply.authorName}
                            </span>
                            <span className="text-[9px] text-slate-400">{reply.createdAt}</span>
                          </div>
                          <p className="text-xs text-slate-800 dark:text-slate-200 mt-0.5">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input Box */}
                {replyingToCommentId === comment.id && (
                  <div className="pl-9 flex gap-2 pt-1">
                    <input
                      type="text"
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      placeholder={`Reply to ${comment.authorName}...`}
                      className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleReplySubmit(comment.id)}
                      className="rounded-lg bg-cyan-500 px-3 py-1 text-xs font-semibold text-white hover:bg-cyan-400"
                    >
                      Reply
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyingToCommentId(null)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report Modal */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-5 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Report this content
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select reason for reporting this post to community moderators:
            </p>
            <div className="mt-3 space-y-1.5">
              {['Spam', 'Harassment', 'Inappropriate Content', 'Fraud'].map(r => (
                <label key={r} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <input
                    type="radio"
                    name="reason"
                    checked={reportReason === r}
                    onChange={() => setReportReason(r as any)}
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsReportOpen(false)}
                className="px-3 py-1 text-xs text-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                className="rounded-lg bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-500"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

    </article>
  );
};
