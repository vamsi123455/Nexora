import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Post,
  Project,
  Job,
  Company,
  Application,
  AppNotification,
  Conversation,
  Message,
  ReactionType,
  ReportItem,
  CodingChallenge,
  ApplicationStatus,
  DSATopic,
  AuthMode,
  AuthTargetRole
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_POSTS,
  INITIAL_PROJECTS,
  INITIAL_JOBS,
  INITIAL_COMPANIES,
  INITIAL_APPLICATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_REPORTS,
  CODING_CHALLENGES
} from '../data/seedData';
import { INITIAL_DSA_TOPICS } from '../data/dsaSheetData';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchUser: (userId: string) => void;
  users: User[];
  posts: Post[];
  projects: Project[];
  jobs: Job[];
  companies: Company[];
  applications: Application[];
  notifications: AppNotification[];
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  reports: ReportItem[];
  codingChallenges: CodingChallenge[];
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedProfileId: string | null;
  setSelectedProfileId: (id: string | null) => void;
  selectedCompanyId: string | null;
  setSelectedCompanyId: (id: string | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNewPostModalOpen: boolean;
  setIsNewPostModalOpen: (open: boolean) => void;
  isArticleEditorOpen: boolean;
  setIsArticleEditorOpen: (open: boolean) => void;
  initialPostMedia: { url: string; type: 'image' | 'video'; name?: string } | null;
  setInitialPostMedia: (media: { url: string; type: 'image' | 'video'; name?: string } | null) => void;
  openPostModalWithMedia: (media: { url: string; type: 'image' | 'video'; name?: string }) => void;

  // Authentication State & Actions
  isAuthModalOpen: boolean;
  authModalMode: AuthMode;
  authTargetRole: AuthTargetRole;
  openAuthModal: (mode: AuthMode, targetRole?: AuthTargetRole) => void;
  closeAuthModal: () => void;
  loginWithCredentials: (email: string, password?: string, role?: string) => { success: boolean; error?: string };
  signupWithCredentials: (name: string, email: string, password: string, role: string, accountType: string) => { success: boolean; error?: string };
  logout: () => void;
  isLoggedIn: boolean;

  // Striver's A2Z DSA Sheet State & Actions
  dsaTopics: DSATopic[];
  toggleDSAProblemSolved: (problemId: string) => void;
  toggleDSAProblemBookmarked: (problemId: string) => void;
  updateDSAProblemNotes: (problemId: string, notes: string) => void;
  dsaStats: {
    total: number;
    solved: number;
    percent: number;
    basicSolved: number;
    basicTotal: number;
    coreSolved: number;
    coreTotal: number;
    proSolved: number;
    proTotal: number;
  };

  // Post Actions
  createPost: (postData: Partial<Post>) => void;
  reactToPost: (postId: string, reactionType: ReactionType) => void;
  addComment: (postId: string, content: string, parentCommentId?: string) => void;
  likeComment: (postId: string, commentId: string) => void;
  toggleSavePost: (postId: string) => void;
  deletePost: (postId: string) => void;
  votePoll: (postId: string, optionId: string) => void;

  // Project Actions
  createProject: (projectData: Partial<Project>) => void;
  likeProject: (projectId: string) => void;

  // Job & Application Actions
  toggleSaveJob: (jobId: string) => void;
  applyForJob: (jobId: string, note: string, portfolioUrl?: string, resumeUrl?: string) => void;
  createJob: (jobData: Partial<Job>) => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => void;

  // Network & Relationship Actions
  getConnectionStatus: (targetUserId: string) => 'NONE' | 'REQUEST_SENT' | 'REQUEST_RECEIVED' | 'CONNECTED';
  sendConnectionRequest: (targetUserId: string) => void;
  acceptConnectionRequest: (targetUserId: string) => void;
  rejectConnectionRequest: (targetUserId: string) => void;
  removeConnection: (targetUserId: string) => void;
  isFollowing: (targetUserId: string) => boolean;
  toggleFollow: (targetUserId: string) => void;
  endorseSkill: (targetUserId: string, skillId: string) => void;

  // Messaging Actions
  sendMessage: (conversationId: string, content: string) => void;
  startConversationWith: (userId: string) => void;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;

  // Notifications Actions
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // Coding & Gamification Actions
  solveChallenge: (challengeId: string) => void;

  // Moderation / Admin Actions
  reportContent: (targetType: 'user' | 'post' | 'comment' | 'job', targetId: string, reason: any, snippet: string) => void;
  resolveReport: (reportId: string, action: 'dismiss' | 'delete') => void;

  // Toast feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('nexora_users');
    if (!saved) return INITIAL_USERS;
    try {
      const parsed = JSON.parse(saved);
      // Ensure newly added initial users like student & admin exist
      const missing = INITIAL_USERS.filter(iu => !parsed.some((p: User) => p.id === iu.id));
      return [...parsed, ...missing];
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem('nexora_current_user_id') || 'user-vamsi';
  });

  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  // Auth State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>('login');
  const [authTargetRole, setAuthTargetRole] = useState<AuthTargetRole>('STUDENT');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('nexora_logged_in') === 'true';
  });

  // Striver's A2Z DSA Sheet State
  const [dsaTopics, setDsaTopics] = useState<DSATopic[]>(() => {
    const saved = localStorage.getItem('nexora_dsa_topics');
    return saved ? JSON.parse(saved) : INITIAL_DSA_TOPICS;
  });

  useEffect(() => {
    localStorage.setItem('nexora_dsa_topics', JSON.stringify(dsaTopics));
  }, [dsaTopics]);

  useEffect(() => {
    localStorage.setItem('nexora_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  // Compute live DSA progress stats matching TUF screenshot (Basic, Core, Pro tiers)
  const dsaStats = React.useMemo(() => {
    let total = 0;
    let solved = 0;
    let basicSolved = 0;
    let basicTotal = 0;
    let coreSolved = 0;
    let coreTotal = 0;
    let proSolved = 0;
    let proTotal = 0;

    dsaTopics.forEach(topic => {
      topic.subTopics.forEach(sub => {
        sub.problems.forEach(prob => {
          total++;
          if (prob.isSolved) solved++;
          if (prob.tier === 'basic') {
            basicTotal++;
            if (prob.isSolved) basicSolved++;
          } else if (prob.tier === 'core') {
            coreTotal++;
            if (prob.isSolved) coreSolved++;
          } else if (prob.tier === 'pro') {
            proTotal++;
            if (prob.isSolved) proSolved++;
          }
        });
      });
    });

    const percent = total > 0 ? Math.round((solved / total) * 100) : 0;
    return {
      total,
      solved,
      percent,
      basicSolved,
      basicTotal,
      coreSolved,
      coreTotal,
      proSolved,
      proTotal
    };
  }, [dsaTopics]);

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('nexora_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('nexora_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('nexora_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [companies] = useState<Company[]>(INITIAL_COMPANIES);

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('nexora_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('nexora_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('nexora_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [messages, setMessages] = useState<Record<string, Message[]>>(() => {
    const saved = localStorage.getItem('nexora_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('nexora_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [codingChallenges] = useState<CodingChallenge[]>(CODING_CHALLENGES);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('nexora_theme') as 'dark' | 'light') || 'dark';
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState<boolean>(false);
  const [isArticleEditorOpen, setIsArticleEditorOpen] = useState<boolean>(false);
  const [initialPostMedia, setInitialPostMedia] = useState<{ url: string; type: 'image' | 'video'; name?: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openPostModalWithMedia = (media: { url: string; type: 'image' | 'video'; name?: string }) => {
    setInitialPostMedia(media);
    setIsNewPostModalOpen(true);
  };

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('nexora_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('nexora_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('nexora_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('nexora_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('nexora_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('nexora_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('nexora_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('nexora_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('nexora_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('nexora_current_user_id', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('nexora_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-[#0b0f17] text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-200';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-[#f8fafc] text-slate-900 antialiased selection:bg-cyan-500/20 selection:text-cyan-900';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  const switchUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUserId(userId);
      showToast(`Switched active profile to ${target.name} (${target.accountType})`);
    }
  };

  const setCurrentUser = (updated: User) => {
    setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
  };

  // Post Actions
  const createPost = (postData: Partial<Post>) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      authorHeadline: currentUser.headline,
      authorBadge: currentUser.badges[0]?.name,
      content: postData.content || '',
      type: postData.type || 'text',
      mediaUrl: postData.mediaUrl,
      pollData: postData.pollData,
      projectRef: postData.projectRef,
      achievementData: postData.achievementData,
      jobRef: postData.jobRef,
      tags: postData.tags || ['Nexora', 'Engineering'],
      reactions: {
        like: 0,
        celebrate: 0,
        insightful: 0,
        support: 0,
        curious: 0
      },
      comments: [],
      sharesCount: 0,
      saved: false,
      createdAt: 'Just now'
    };

    setPosts([newPost, ...posts]);
    showToast('Your post has been broadcasted to the Nexora network!');
  };

  const reactToPost = (postId: string, reactionType: ReactionType) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const currentRx = p.userReaction;
        const updatedReactions = { ...p.reactions };

        if (currentRx === reactionType) {
          // Un-react
          updatedReactions[reactionType] = Math.max(0, updatedReactions[reactionType] - 1);
          return { ...p, reactions: updatedReactions, userReaction: undefined };
        } else {
          // Remove previous if any
          if (currentRx) {
            updatedReactions[currentRx] = Math.max(0, updatedReactions[currentRx] - 1);
          }
          updatedReactions[reactionType] = (updatedReactions[reactionType] || 0) + 1;

          // If reacting to someone else's post, generate a notification
          if (p.authorId !== currentUser.id) {
            const newNotif: AppNotification = {
              id: `notif-${Date.now()}`,
              type: 'post_reaction',
              actorId: currentUser.id,
              actorName: currentUser.name,
              actorAvatar: currentUser.avatar,
              message: `reacted to your post: "${p.content.slice(0, 45)}..."`,
              detail: `Reaction: ${reactionType.toUpperCase()}`,
              targetId: p.id,
              targetType: 'post',
              isRead: false,
              createdAt: 'Just now'
            };
            setNotifications(nPrev => [newNotif, ...nPrev]);
          }

          return { ...p, reactions: updatedReactions, userReaction: reactionType };
        }
      })
    );
  };

  const addComment = (postId: string, content: string, parentCommentId?: string) => {
    if (!content.trim()) return;

    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;

        const newCommentItem = {
          id: `c-${Date.now()}`,
          postId: p.id,
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorAvatar: currentUser.avatar,
          authorHeadline: currentUser.headline,
          content: content.trim(),
          createdAt: 'Just now',
          likesCount: 0,
          userLiked: false,
          replies: []
        };

        let updatedComments = [...p.comments];

        if (parentCommentId) {
          // Add as reply
          updatedComments = updatedComments.map(c => {
            if (c.id === parentCommentId) {
              return {
                ...c,
                replies: [...(c.replies || []), newCommentItem]
              };
            }
            return c;
          });
        } else {
          updatedComments.push(newCommentItem);
        }

        // Notification for post author
        if (p.authorId !== currentUser.id) {
          const newNotif: AppNotification = {
            id: `notif-${Date.now()}`,
            type: 'comment',
            actorId: currentUser.id,
            actorName: currentUser.name,
            actorAvatar: currentUser.avatar,
            message: `commented on your post: "${content.slice(0, 40)}..."`,
            targetId: p.id,
            targetType: 'post',
            isRead: false,
            createdAt: 'Just now'
          };
          setNotifications(nPrev => [newNotif, ...nPrev]);
        }

        return { ...p, comments: updatedComments };
      })
    );
    showToast('Comment published');
  };

  const likeComment = (postId: string, commentId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const updateList = (list: any[]): any[] =>
          list.map(c => {
            if (c.id === commentId) {
              const liked = !c.userLiked;
              return {
                ...c,
                userLiked: liked,
                likesCount: liked ? c.likesCount + 1 : Math.max(0, c.likesCount - 1)
              };
            }
            if (c.replies?.length) {
              return { ...c, replies: updateList(c.replies) };
            }
            return c;
          });
        return { ...p, comments: updateList(p.comments) };
      })
    );
  };

  const toggleSavePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const newSaved = !p.saved;
        showToast(newSaved ? 'Post saved to your bookmarks' : 'Post removed from bookmarks');
        return { ...p, saved: newSaved };
      })
    );
    // Also sync in currentUser savedPostIds
    setUsers(prev =>
      prev.map(u => {
        if (u.id !== currentUser.id) return u;
        const has = u.savedPostIds?.includes(postId);
        return {
          ...u,
          savedPostIds: has ? u.savedPostIds.filter(id => id !== postId) : [...(u.savedPostIds || []), postId]
        };
      })
    );
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    showToast('Post removed successfully');
  };

  const votePoll = (postId: string, optionId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId || !p.pollData || p.pollData.userVotedOptionId) return p;

        const updatedOptions = p.pollData.options.map(opt => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
          }
          return opt;
        });

        return {
          ...p,
          pollData: {
            ...p.pollData,
            options: updatedOptions,
            totalVotes: p.pollData.totalVotes + 1,
            userVotedOptionId: optionId
          }
        };
      })
    );
    showToast('Vote recorded');
  };

  // Projects
  const createProject = (projectData: Partial<Project>) => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: projectData.title || 'Untitled Project',
      tagline: projectData.tagline || 'Engineering project on Nexora',
      description: projectData.description || '',
      technologies: projectData.technologies || ['TypeScript', 'React'],
      category: projectData.category || 'Web',
      imageUrl: projectData.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      githubUrl: projectData.githubUrl,
      liveDemoUrl: projectData.liveDemoUrl,
      starsCount: 1,
      likesCount: 1,
      commentsCount: 0,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.headline,
      createdAt: 'Just now'
    };

    setProjects([newProj, ...projects]);
    showToast('Project added to your portfolio showcase!');
  };

  const likeProject = (projectId: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id !== projectId) return p;
        const liked = !p.userLiked;
        return {
          ...p,
          userLiked: liked,
          likesCount: liked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      })
    );
  };

  // Jobs & Applications
  const toggleSaveJob = (jobId: string) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id !== currentUser.id) return u;
        const exists = u.savedJobIds?.includes(jobId);
        showToast(exists ? 'Job removed from saved list' : 'Job saved to your opportunity radar');
        return {
          ...u,
          savedJobIds: exists ? u.savedJobIds.filter(id => id !== jobId) : [...(u.savedJobIds || []), jobId]
        };
      })
    );
  };

  const applyForJob = (jobId: string, note: string, portfolioUrl?: string, resumeUrl?: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    // Check if already applied
    const existing = applications.find(a => a.jobId === jobId && a.applicantId === currentUser.id);
    if (existing) {
      showToast('You have already submitted an application for this role!');
      return;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      applicantAvatar: currentUser.avatar,
      applicantHeadline: currentUser.headline,
      applicantEmail: currentUser.email,
      resumeUrl: resumeUrl || 'https://nexora.network/resumes/candidate.pdf',
      note: note.trim(),
      portfolioUrl: portfolioUrl || currentUser.portfolio,
      status: 'Applied',
      appliedAt: new Date().toISOString()
    };

    setApplications([newApp, ...applications]);

    // Increment applicantsCount on the job
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j))
    );

    // Notification to recruiter
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'job_recommendation',
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorAvatar: currentUser.avatar,
      message: `submitted an application for ${job.title}`,
      targetId: job.id,
      targetType: 'job',
      isRead: false,
      createdAt: 'Just now'
    };
    setNotifications(nPrev => [newNotif, ...nPrev]);

    showToast(`Application submitted for ${job.title} at ${job.company}!`);
  };

  const createJob = (jobData: Partial<Job>) => {
    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: jobData.title || 'Senior Software Engineer',
      company: jobData.company || 'Nexora Enterprise',
      companyLogo: jobData.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      location: jobData.location || 'Remote',
      isRemote: jobData.isRemote ?? true,
      employmentType: jobData.employmentType || 'Full-time',
      salaryRange: jobData.salaryRange || '$180,000 - $240,000',
      experienceLevel: jobData.experienceLevel || 'Senior',
      skills: jobData.skills || ['Java', 'Spring Boot', 'Kafka'],
      description: jobData.description || 'Join our high-impact team.',
      requirements: jobData.requirements || ['4+ years building production backend systems'],
      applicantsCount: 0,
      postedAt: 'Just now',
      recruiterId: currentUser.id
    };

    setJobs([newJob, ...jobs]);
    showToast(`Job listing "${newJob.title}" published!`);
  };

  const updateApplicationStatus = (applicationId: string, status: ApplicationStatus) => {
    setApplications(prev =>
      prev.map(a => {
        if (a.id !== applicationId) return a;
        showToast(`Candidate status updated to: ${status}`);
        return { ...a, status };
      })
    );
  };

  // Network & Relationship Actions
  // Storage for connection requests in localStorage
  const [connections, setConnections] = useState<Record<string, 'REQUEST_SENT' | 'REQUEST_RECEIVED' | 'CONNECTED'>>(() => {
    const saved = localStorage.getItem('nexora_connections_map');
    return saved ? JSON.parse(saved) : { 'user-priya': 'CONNECTED', 'user-alex': 'CONNECTED' };
  });

  useEffect(() => {
    localStorage.setItem('nexora_connections_map', JSON.stringify(connections));
  }, [connections]);

  const getConnectionStatus = (targetUserId: string): 'NONE' | 'REQUEST_SENT' | 'REQUEST_RECEIVED' | 'CONNECTED' => {
    if (targetUserId === currentUser.id) return 'NONE';
    return connections[targetUserId] || 'NONE';
  };

  const sendConnectionRequest = (targetUserId: string) => {
    setConnections(prev => ({ ...prev, [targetUserId]: 'REQUEST_SENT' }));
    const targetUser = users.find(u => u.id === targetUserId);

    if (targetUser) {
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        type: 'connection_request',
        actorId: currentUser.id,
        actorName: currentUser.name,
        actorAvatar: currentUser.avatar,
        message: 'sent you a connection request.',
        targetId: currentUser.id,
        targetType: 'profile',
        isRead: false,
        createdAt: 'Just now'
      };
      setNotifications(nPrev => [newNotif, ...nPrev]);
    }

    showToast(`Connection request sent to ${targetUser?.name || 'user'}`);
  };

  const acceptConnectionRequest = (targetUserId: string) => {
    setConnections(prev => ({ ...prev, [targetUserId]: 'CONNECTED' }));

    // Increment connections count for both
    setUsers(prev =>
      prev.map(u => {
        if (u.id === currentUser.id || u.id === targetUserId) {
          return { ...u, connectionsCount: u.connectionsCount + 1 };
        }
        return u;
      })
    );

    const targetUser = users.find(u => u.id === targetUserId);
    showToast(`You are now connected with ${targetUser?.name || 'colleague'}!`);
  };

  const rejectConnectionRequest = (targetUserId: string) => {
    setConnections(prev => {
      const updated = { ...prev };
      delete updated[targetUserId];
      return updated;
    });
    showToast('Connection request dismissed');
  };

  const removeConnection = (targetUserId: string) => {
    setConnections(prev => {
      const updated = { ...prev };
      delete updated[targetUserId];
      return updated;
    });
    setUsers(prev =>
      prev.map(u => {
        if (u.id === currentUser.id || u.id === targetUserId) {
          return { ...u, connectionsCount: Math.max(0, u.connectionsCount - 1) };
        }
        return u;
      })
    );
    showToast('Connection removed');
  };

  // Follow State
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('nexora_following_map');
    return saved ? JSON.parse(saved) : { 'user-priya': true, 'user-alex': true, 'user-david': true };
  });

  useEffect(() => {
    localStorage.setItem('nexora_following_map', JSON.stringify(followingMap));
  }, [followingMap]);

  const isFollowing = (targetUserId: string): boolean => {
    return !!followingMap[targetUserId];
  };

  const toggleFollow = (targetUserId: string) => {
    const isNowFollowing = !followingMap[targetUserId];
    setFollowingMap(prev => ({ ...prev, [targetUserId]: isNowFollowing }));

    setUsers(prev =>
      prev.map(u => {
        if (u.id === targetUserId) {
          return {
            ...u,
            followersCount: isNowFollowing ? u.followersCount + 1 : Math.max(0, u.followersCount - 1)
          };
        }
        return u;
      })
    );

    const targetUser = users.find(u => u.id === targetUserId);
    showToast(isNowFollowing ? `Following ${targetUser?.name}` : `Unfollowed ${targetUser?.name}`);
  };

  const endorseSkill = (targetUserId: string, skillId: string) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id !== targetUserId) return u;
        const updatedSkills = u.skills.map(s => {
          if (s.id !== skillId) return s;
          const alreadyEndorsed = s.endorsedBy.includes(currentUser.id);
          const newEndorsedBy = alreadyEndorsed
            ? s.endorsedBy.filter(id => id !== currentUser.id)
            : [...s.endorsedBy, currentUser.id];
          return {
            ...s,
            endorsementsCount: newEndorsedBy.length,
            endorsedBy: newEndorsedBy
          };
        });
        return { ...u, skills: updatedSkills };
      })
    );
    showToast('Skill endorsement updated!');
  };

  // Messaging Actions
  const sendMessage = (conversationId: string, content: string) => {
    if (!content.trim()) return;

    const conv = conversations.find(c => c.id === conversationId);
    if (!conv) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      receiverId: conv.participantId,
      content: content.trim(),
      timestamp: 'Just now',
      isRead: true
    };

    const currentList = messages[conversationId] || [];
    const updatedMessages = {
      ...messages,
      [conversationId]: [...currentList, newMsg]
    };
    setMessages(updatedMessages);

    // Update conversation last message
    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: content.trim(),
              lastMessageTimestamp: 'Just now'
            }
          : c
      )
    );

    // Simulated responsive reply if chatting with Priya or Alex
    if (conv.participantId === 'user-priya' || conv.participantId === 'user-alex') {
      setTimeout(() => {
        const replyMsg: Message = {
          id: `m-${Date.now() + 1}`,
          conversationId,
          senderId: conv.participantId,
          receiverId: currentUser.id,
          content:
            conv.participantId === 'user-priya'
              ? 'Got it! I just ran a verification pass on the speculative decoding worker. Latency is looking phenomenal.'
              : 'Acknowledged. I will review the metrics on Grafana and sync with you on the partition distribution.',
          timestamp: 'Just now',
          isRead: false
        };

        setMessages(mPrev => ({
          ...mPrev,
          [conversationId]: [...(mPrev[conversationId] || []), replyMsg]
        }));

        setConversations(cPrev =>
          cPrev.map(c =>
            c.id === conversationId
              ? {
                  ...c,
                  lastMessage: replyMsg.content,
                  lastMessageTimestamp: 'Just now',
                  unreadCount: c.unreadCount + 1
                }
              : c
          )
        );
      }, 2000);
    }
  };

  const startConversationWith = (targetUserId: string) => {
    const targetUser = users.find(u => u.id === targetUserId);
    if (!targetUser) return;

    let conv = conversations.find(c => c.participantId === targetUserId);
    if (!conv) {
      conv = {
        id: `conv-${targetUserId}-${Date.now()}`,
        participantId: targetUser.id,
        participantName: targetUser.name,
        participantAvatar: targetUser.avatar,
        participantHeadline: targetUser.headline,
        isOnline: true,
        lastMessage: 'Started new direct message',
        lastMessageTimestamp: 'Just now',
        unreadCount: 0
      };
      setConversations([conv, ...conversations]);
    }

    setActiveConversationId(conv.id);
    setActiveTab('messages');
  };

  // Notifications
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read');
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  // Coding & Gamification
  const solveChallenge = (challengeId: string) => {
    const challenge = codingChallenges.find(c => c.id === challengeId);
    if (!challenge) return;

    setUsers(prev =>
      prev.map(u => {
        if (u.id !== currentUser.id) return u;
        const stats = u.codingStats;
        const diffKey = challenge.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard';
        const updatedSolved = {
          ...stats.problemsSolved,
          [diffKey]: stats.problemsSolved[diffKey] + 1,
          total: stats.problemsSolved.total + 1
        };

        // Increment today in contribution grid
        const todayStr = new Date().toISOString().split('T')[0];
        const grid = stats.contributionGrid.map(d =>
          d.date === todayStr ? { ...d, count: d.count + 1, level: Math.min(4, d.level + 1) as any } : d
        );

        return {
          ...u,
          codingStats: {
            ...stats,
            problemsSolved: updatedSolved,
            currentStreak: stats.currentStreak + 1,
            longestStreak: Math.max(stats.longestStreak, stats.currentStreak + 1),
            contributionGrid: grid
          }
        };
      })
    );

    showToast(`Test suite passed! "${challenge.title}" solved successfully (+1 to Coding Momentum)`);
  };

  // Moderation / Admin
  const reportContent = (
    targetType: 'user' | 'post' | 'comment' | 'job',
    targetId: string,
    reason: any,
    snippet: string
  ) => {
    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      targetType,
      targetId,
      targetSnippet: snippet,
      reportedBy: currentUser.name,
      reason,
      status: 'pending',
      createdAt: 'Just now'
    };
    setReports([newReport, ...reports]);
    showToast('Report submitted for administrative review. Thank you for protecting the Nexora community.');
  };

  const resolveReport = (reportId: string, action: 'dismiss' | 'delete') => {
    const rep = reports.find(r => r.id === reportId);
    if (!rep) return;

    if (action === 'delete') {
      if (rep.targetType === 'post') {
        deletePost(rep.targetId);
      }
    }

    setReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, status: action === 'dismiss' ? 'dismissed' : 'resolved' } : r))
    );
    showToast(`Report marked as ${action === 'dismiss' ? 'dismissed' : 'resolved & moderated'}`);
  };

  // Striver's A2Z DSA Sheet Problem Actions
  const toggleDSAProblemSolved = (problemId: string) => {
    let problemTitle = '';
    let becameSolved = false;

    setDsaTopics(prev =>
      prev.map(topic => ({
        ...topic,
        subTopics: topic.subTopics.map(sub => ({
          ...sub,
          problems: sub.problems.map(prob => {
            if (prob.id === problemId) {
              problemTitle = prob.title;
              becameSolved = !prob.isSolved;
              return { ...prob, isSolved: becameSolved };
            }
            return prob;
          })
        }))
      }))
    );

    // Also update current user problems solved if newly solved
    if (becameSolved) {
      setUsers(prev =>
        prev.map(u => {
          if (u.id !== currentUser.id) return u;
          const stats = u.codingStats;
          return {
            ...u,
            codingStats: {
              ...stats,
              problemsSolved: {
                ...stats.problemsSolved,
                total: stats.problemsSolved.total + 1
              }
            }
          };
        })
      );
      showToast(`✓ Solved: ${problemTitle}`);
    } else {
      showToast(`Marked unsolved: ${problemTitle}`);
    }
  };

  const toggleDSAProblemBookmarked = (problemId: string) => {
    setDsaTopics(prev =>
      prev.map(topic => ({
        ...topic,
        subTopics: topic.subTopics.map(sub => ({
          ...sub,
          problems: sub.problems.map(prob =>
            prob.id === problemId ? { ...prob, isBookmarked: !prob.isBookmarked } : prob
          )
        }))
      }))
    );
    showToast('Problem bookmark updated');
  };

  const updateDSAProblemNotes = (problemId: string, notes: string) => {
    setDsaTopics(prev =>
      prev.map(topic => ({
        ...topic,
        subTopics: topic.subTopics.map(sub => ({
          ...sub,
          problems: sub.problems.map(prob =>
            prob.id === problemId ? { ...prob, notes } : prob
          )
        }))
      }))
    );
    showToast('Personal revision notes saved');
  };

  // Authentication Actions
  const openAuthModal = (mode: AuthMode, targetRole: AuthTargetRole = 'STUDENT') => {
    setAuthModalMode(mode);
    setAuthTargetRole(targetRole);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginWithCredentials = (
    email: string,
    password?: string,
    role?: string
  ): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password ? password.trim() : '';

    if (!cleanEmail) {
      return { success: false, error: 'Please enter your email address.' };
    }

    const found = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      return {
        success: false,
        error: 'No account registered with this email address. Please sign up first.'
      };
    }

    const expectedPassword =
      found.password ||
      (found.id === 'user-student'
        ? 'student123'
        : found.id === 'user-admin'
        ? 'admin123'
        : found.id === 'user-vamsi'
        ? 'founder123'
        : 'password123');

    // Strict validation against database record
    if (cleanPassword !== expectedPassword) {
      return {
        success: false,
        error: 'Invalid password. Verification against database credentials failed.'
      };
    }

    // Success: credentials match stored user record in the database!
    setCurrentUserId(found.id);
    setIsLoggedIn(true);
    localStorage.setItem('nexora_logged_in', 'true');
    setActiveTab('home');
    setIsAuthModalOpen(false);
    showToast(`✓ Credentials verified! Welcome back, ${found.name}.`);
    return { success: true };
  };

  const signupWithCredentials = (
    name: string,
    email: string,
    password: string,
    role: string,
    accountType: string
  ): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password ? password.trim() : '';

    if (!name.trim()) {
      return { success: false, error: 'Please provide your full name.' };
    }
    if (!cleanEmail) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!cleanPassword || cleanPassword.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    const exists = users.some(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return {
        success: false,
        error: 'An account with this email already exists in the database. Please sign in.'
      };
    }

    // Create and persist new user in database with password
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      username: cleanEmail.split('@')[0] || `user_${Date.now().toString().slice(-4)}`,
      email: cleanEmail,
      password: cleanPassword,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      headline:
        role === 'STUDENT'
          ? 'Computer Science Student & DSA Enthusiast'
          : role === 'ADMIN'
          ? 'Platform Administrator'
          : 'Software Engineer',
      bio: 'Enthusiastic engineer mastering Data Structures & Algorithms on Nexora.',
      location: 'Global · Remote',
      role: (role as any) || 'STUDENT',
      accountType: (accountType as any) || 'Student',
      badges: [],
      skills: [{ id: 'sk-new', name: 'DSA & Algorithms', category: 'Core', endorsementsCount: 1, endorsedBy: [] }],
      experiences: [],
      education: [],
      codingStats: {
        problemsSolved: { easy: 0, medium: 0, hard: 0, total: 0 },
        currentStreak: 1,
        longestStreak: 1,
        contributionGrid: [],
        badges: []
      },
      connectionsCount: 0,
      followersCount: 0,
      profileViews: 1,
      savedJobIds: [],
      savedPostIds: [],
      createdAt: new Date().toISOString()
    };

    setUsers(prev => [newUser, ...prev]);

    // IMPORTANT USER SPECIFICATION:
    // "in the case of sign up section after hitting the sign up it not directly open the home page it has to redirect to login page after clicking login and after details verified the home page has to come"
    // DO NOT set isLoggedIn(true) here!
    showToast(`✓ Account registered in database for ${newUser.name}! Redirecting to Sign In.`);
    return { success: true };
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('nexora_logged_in', 'false');
    showToast('Signed out of session. Please sign in to resume.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUser,
        users,
        posts,
        projects,
        jobs,
        companies,
        applications,
        notifications,
        conversations,
        messages,
        reports,
        codingChallenges,
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        selectedProfileId,
        setSelectedProfileId,
        selectedCompanyId,
        setSelectedCompanyId,
        isSearchOpen,
        setIsSearchOpen,
        isNewPostModalOpen,
        setIsNewPostModalOpen,
        isArticleEditorOpen,
        setIsArticleEditorOpen,
        initialPostMedia,
        setInitialPostMedia,
        openPostModalWithMedia,
        isAuthModalOpen,
        authModalMode,
        authTargetRole,
        openAuthModal,
        closeAuthModal,
        loginWithCredentials,
        signupWithCredentials,
        logout,
        isLoggedIn,
        dsaTopics,
        toggleDSAProblemSolved,
        toggleDSAProblemBookmarked,
        updateDSAProblemNotes,
        dsaStats,
        createPost,
        reactToPost,
        addComment,
        likeComment,
        toggleSavePost,
        deletePost,
        votePoll,
        createProject,
        likeProject,
        toggleSaveJob,
        applyForJob,
        createJob,
        updateApplicationStatus,
        getConnectionStatus,
        sendConnectionRequest,
        acceptConnectionRequest,
        rejectConnectionRequest,
        removeConnection,
        isFollowing,
        toggleFollow,
        endorseSkill,
        sendMessage,
        startConversationWith,
        activeConversationId,
        setActiveConversationId,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        solveChallenge,
        reportContent,
        resolveReport,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
