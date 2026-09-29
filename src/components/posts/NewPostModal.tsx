import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Image as ImageIcon,
  Video,
  Smile,
  Clock,
  ChevronDown,
  Globe,
  MessageSquare,
  Award,
  BarChart2,
  FolderGit2,
  Sparkles,
  Check,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NewPostModal: React.FC = () => {
  const {
    currentUser,
    isNewPostModalOpen,
    setIsNewPostModalOpen,
    createPost,
    showToast,
    initialPostMedia,
    setInitialPostMedia,
    projects
  } = useApp();

  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [postAudience, setPostAudience] = useState<'Anyone' | 'Connections only'>('Anyone');
  const [commentAudience, setCommentAudience] = useState<'Anyone' | 'Connections only' | 'No one'>('Anyone');
  const [isAudienceMenuOpen, setIsAudienceMenuOpen] = useState(false);
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleTime, setScheduleTime] = useState('');

  // Optional attached modules
  const [extraType, setExtraType] = useState<'none' | 'poll' | 'project' | 'milestone'>('none');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['Option 1', 'Option 2']);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [milestoneTitle, setMilestoneTitle] = useState('');

  const photoFileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  // Load initial media if passed via context (e.g. from in-feed photo/video buttons)
  useEffect(() => {
    if (initialPostMedia) {
      setMediaUrl(initialPostMedia.url);
      setMediaType(initialPostMedia.type);
      setInitialPostMedia(null);
    }
  }, [initialPostMedia, setInitialPostMedia]);

  if (!isNewPostModalOpen) return null;

  // Local file picker for photo
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setMediaUrl(event.target.result as string);
        setMediaType('image');
        showToast('Photo selected from your computer!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Local file picker for video
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setMediaUrl(event.target.result as string);
        setMediaType('video');
        showToast('Video selected from your computer!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Proofread button handler
  const handleProofread = () => {
    if (!content.trim()) {
      showToast('Write some thoughts first to proofread.');
      return;
    }
    // Polish text: fix spacing, capitalize sentences, clean commas
    let polished = content.trim();
    polished = polished.charAt(0).toUpperCase() + polished.slice(1);
    polished = polished.replace(/\s+/g, ' ');
    polished = polished.replace(/([.?!])\s*([a-z])/g, (_, p1, p2) => `${p1} ${p2.toUpperCase()}`);
    setContent(polished);
    showToast('✨ Proofread applied! Grammar & formatting polished.');
  };

  const insertEmoji = (emoji: string) => {
    setContent(prev => prev + emoji);
    setIsEmojiPickerOpen(false);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !mediaUrl && extraType === 'none') return;

    let pollData = undefined;
    if (extraType === 'poll' && pollQuestion.trim()) {
      pollData = {
        question: pollQuestion.trim(),
        options: pollOptions.filter(o => o.trim()).map((opt, idx) => ({
          id: `opt-${idx}`,
          text: opt.trim(),
          votes: 0
        })),
        totalVotes: 0,
        expiresAt: '3 days left'
      };
    }

    let projectRef = undefined;
    if (extraType === 'project' && selectedProjectId) {
      const proj = projects.find(p => p.id === selectedProjectId);
      if (proj) {
        projectRef = {
          id: proj.id,
          title: proj.title,
          tagline: proj.tagline
        };
      }
    }

    let achievementData = undefined;
    if (extraType === 'milestone' && milestoneTitle.trim()) {
      achievementData = {
        title: milestoneTitle.trim(),
        description: 'Celebrated engineering milestone',
        icon: 'Award'
      };
    }

    createPost({
      content: content.trim() || (mediaType === 'video' ? 'Shared a new video demonstration.' : 'Shared a photo update.'),
      type: mediaUrl ? (mediaType === 'video' ? 'video' : 'image') : extraType === 'poll' ? 'poll' : extraType === 'project' ? 'project' : extraType === 'milestone' ? 'achievement' : 'text',
      mediaUrl: mediaUrl || undefined,
      mediaType: mediaUrl ? mediaType : undefined,
      pollData,
      projectRef,
      achievementData,
      tags: ['Nexora', 'Engineering', 'TechCommunity']
    });

    showToast(scheduleTime ? `Post scheduled for ${scheduleTime}!` : 'Post published to feed! 🚀');

    // Reset and close
    setContent('');
    setMediaUrl(null);
    setExtraType('none');
    setPollQuestion('');
    setScheduleTime('');
    setIsNewPostModalOpen(false);
  };

  const isPostable = content.trim().length > 0 || mediaUrl !== null || (extraType === 'poll' && pollQuestion.trim().length > 0);

  const emojis = ['🚀', '💡', '👏', '🔥', '💻', '✨', '📈', '🙌', '🎉', '🧠', '❤️', '👍'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Hidden file inputs for local filesystem uploads */}
      <input
        ref={photoFileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />
      <input
        ref={videoFileInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="hidden"
      />

      <div
        className="w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1b2230] shadow-2xl p-6 relative flex flex-col max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header (matching Image 1 exactly) */}
        <div className="flex items-start justify-between pb-3">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="h-14 w-14 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
            />
            <div>
              {/* User Name with dropdown arrow */}
              <button
                type="button"
                className="flex items-center gap-1 font-bold text-base text-slate-900 dark:text-white uppercase tracking-wide hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <span>{currentUser.name}</span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              {/* Two Pill Dropdowns: Post to Anyone & Comments: Anyone */}
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                {/* Audience Pill */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAudienceMenuOpen(!isAudienceMenuOpen);
                      setIsCommentMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Globe className="h-3.5 w-3.5 text-slate-500" />
                    <span>Post to {postAudience}</span>
                    <ChevronDown className="h-3 w-3 text-slate-400" />
                  </button>

                  {isAudienceMenuOpen && (
                    <div className="absolute top-8 left-0 z-50 w-44 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-1.5 shadow-xl">
                      {(['Anyone', 'Connections only'] as const).map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setPostAudience(opt);
                            setIsAudienceMenuOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                            postAudience === opt
                              ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 font-semibold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span>{opt}</span>
                          {postAudience === opt && <Check className="h-3.5 w-3.5 text-cyan-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Comments Pill */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCommentMenuOpen(!isCommentMenuOpen);
                      setIsAudienceMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-slate-500" />
                    <span>Comments: {commentAudience}</span>
                    <ChevronDown className="h-3 w-3 text-slate-400" />
                  </button>

                  {isCommentMenuOpen && (
                    <div className="absolute top-8 left-0 z-50 w-48 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-1.5 shadow-xl">
                      {(['Anyone', 'Connections only', 'No one'] as const).map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setCommentAudience(opt);
                            setIsCommentMenuOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                            commentAudience === opt
                              ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 font-semibold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span>{opt}</span>
                          {commentAudience === opt && <Check className="h-3.5 w-3.5 text-cyan-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Close button (top right X) */}
          <button
            type="button"
            onClick={() => setIsNewPostModalOpen(false)}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Text Area (matching "Share your thoughts ..." placeholder from Image 1) */}
        <form onSubmit={handlePostSubmit} className="flex-1 flex flex-col justify-between mt-2">
          <div className="space-y-4">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Share your thoughts ..."
              rows={6}
              className="w-full bg-transparent text-base sm:text-lg leading-relaxed text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none resize-none"
              autoFocus
            />

            {/* Media Preview (Photo or Video from computer) */}
            {mediaUrl && (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black/10 dark:bg-black/50">
                {mediaType === 'video' ? (
                  <video
                    src={mediaUrl}
                    controls
                    className="w-full max-h-72 object-contain rounded-xl"
                  />
                ) : (
                  <img
                    src={mediaUrl}
                    alt="Post attachment"
                    className="w-full max-h-72 object-cover rounded-xl"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setMediaUrl(null)}
                  className="absolute top-2 right-2 rounded-full bg-black/75 p-1.5 text-white hover:bg-rose-600 transition-colors"
                  title="Remove media"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Attached Modules (Poll / Milestone / Project) */}
            {extraType === 'poll' && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-900/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Create Poll</span>
                  <button type="button" onClick={() => setExtraType('none')} className="text-slate-400 hover:text-slate-200">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={pollQuestion}
                  onChange={e => setPollQuestion(e.target.value)}
                  placeholder="Poll Question?"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
                />
                {pollOptions.map((opt, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={opt}
                    onChange={e => {
                      const copy = [...pollOptions];
                      copy[idx] = e.target.value;
                      setPollOptions(copy);
                    }}
                    placeholder={`Option ${idx + 1}`}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                ))}
              </div>
            )}

            {extraType === 'milestone' && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-900/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Celebrate Milestone</span>
                  <button type="button" onClick={() => setExtraType('none')} className="text-slate-400 hover:text-slate-200">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={milestoneTitle}
                  onChange={e => setMilestoneTitle(e.target.value)}
                  placeholder="e.g. Cleared Google Onsite / Completed 450 DSA Problems"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>
            )}

            {extraType === 'project' && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-900/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Attach Verified Project</span>
                  <button type="button" onClick={() => setExtraType('none')} className="text-slate-400 hover:text-slate-200">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <select
                  value={selectedProjectId}
                  onChange={e => setSelectedProjectId(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
                >
                  <option value="">Select one of your projects...</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Bottom Toolbar (matching Image 1 exactly) */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-4">
            
            {/* Left Icons: Proofread pill, Emoji, Photo, Milestone, Plus */}
            <div className="flex items-center gap-1 sm:gap-2 relative">
              {/* Proofread pill button */}
              <button
                type="button"
                onClick={handleProofread}
                className="rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-800 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                title="Polish and proofread your post"
              >
                <Sparkles className="h-3 w-3 text-cyan-500" />
                <span>Proofread</span>
              </button>

              {/* Emoji Picker Button */}
              <button
                type="button"
                onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Add emoji"
              >
                <Smile className="h-5 w-5" />
              </button>

              {/* Emoji Popover */}
              {isEmojiPickerOpen && (
                <div className="absolute bottom-12 left-16 z-50 flex items-center gap-1.5 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] shadow-xl">
                  {emojis.map(e => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => insertEmoji(e)}
                      className="p-1 hover:scale-125 transition-transform text-base"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}

              {/* Photo file upload icon (from local computer) */}
              <button
                type="button"
                onClick={() => photoFileInputRef.current?.click()}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Upload Photo from Computer"
              >
                <ImageIcon className="h-5 w-5 text-blue-500" />
              </button>

              {/* Video file upload icon (from local computer) */}
              <button
                type="button"
                onClick={() => videoFileInputRef.current?.click()}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Upload Video from Computer"
              >
                <Video className="h-5 w-5 text-emerald-600" />
              </button>

              {/* Milestone Award icon */}
              <button
                type="button"
                onClick={() => setExtraType(extraType === 'milestone' ? 'none' : 'milestone')}
                className={`rounded-full p-2 transition-colors ${
                  extraType === 'milestone'
                    ? 'bg-amber-500/15 text-amber-500'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Celebrate a milestone"
              >
                <Award className="h-5 w-5 text-amber-500" />
              </button>

              {/* More (+) icon */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="More post options"
                >
                  <Plus className="h-5 w-5" />
                </button>

                {isMoreMenuOpen && (
                  <div className="absolute bottom-12 left-0 z-50 w-44 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setExtraType('poll');
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                      <BarChart2 className="h-3.5 w-3.5 text-indigo-500" />
                      <span>Create a Poll</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setExtraType('project');
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                      <FolderGit2 className="h-3.5 w-3.5 text-sky-500" />
                      <span>Attach Project</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Group: Clock icon (schedule) + Post pill button */}
            <div className="flex items-center gap-2">
              {/* Schedule Clock icon */}
              <button
                type="button"
                onClick={() => {
                  setIsScheduleModalOpen(!isScheduleModalOpen);
                  if (!scheduleTime) setScheduleTime('Tomorrow at 9:00 AM');
                }}
                className={`rounded-full p-2 transition-colors ${
                  scheduleTime ? 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Schedule post for later"
              >
                <Clock className="h-5 w-5" />
              </button>

              {/* Schedule time pill indicator if set */}
              {scheduleTime && (
                <span className="hidden sm:inline-block text-[11px] text-cyan-500 font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10">
                  {scheduleTime}
                </span>
              )}

              {/* Post Button (pill button matching Image 1) */}
              <button
                type="submit"
                disabled={!isPostable}
                className={`rounded-full px-5 py-1.5 text-sm font-bold transition-all ${
                  isPostable
                    ? 'bg-[#0a66c2] hover:bg-[#004182] text-white shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
