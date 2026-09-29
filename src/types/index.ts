export type AccountType = 'Student' | 'Professional' | 'Recruiter' | 'Founder' | 'Company';
export type UserRole = 'USER' | 'STUDENT' | 'PROFESSIONAL' | 'RECRUITER' | 'FOUNDER' | 'COMPANY_ADMIN' | 'ADMIN';

export type ReactionType = 'like' | 'celebrate' | 'insightful' | 'support' | 'curious';

export interface Badge {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  isConsistencyBadge?: boolean;
  tier?: 'bronze' | 'silver' | 'gold' | 'diamond';
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  endorsementsCount: number;
  endorsedBy: string[]; // array of user IDs
}

export interface Experience {
  id: string;
  company: string;
  companyLogo?: string;
  position: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  grade?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  category: 'AI' | 'Web' | 'Mobile' | 'Backend' | 'Data Science' | 'Cloud' | 'Open Source';
  imageUrl: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  starsCount: number;
  likesCount: number;
  userLiked?: boolean;
  commentsCount: number;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  createdAt: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollData {
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOptionId?: string;
  expiresAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorHeadline: string;
  content: string;
  createdAt: string;
  likesCount: number;
  userLiked?: boolean;
  replies?: Comment[];
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  authorHeadline: string;
  authorBadge?: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'article' | 'project' | 'poll' | 'achievement' | 'job';
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  articleData?: {
    title: string;
    coverUrl?: string;
    subtitle?: string;
  };
  pollData?: PollData;
  projectRef?: Partial<Project>;
  achievementData?: {
    title: string;
    description: string;
    icon: string;
    metric?: string;
  };
  jobRef?: {
    title: string;
    company: string;
    location: string;
    salary: string;
  };
  tags: string[];
  reactions: Record<ReactionType, number>;
  userReaction?: ReactionType;
  comments: Comment[];
  sharesCount: number;
  saved?: boolean;
  createdAt: string;
}

export interface Connection {
  id: string;
  requesterId: string;
  targetId: string;
  status: 'NONE' | 'REQUEST_SENT' | 'REQUEST_RECEIVED' | 'CONNECTED';
  createdAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  targetId: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyId?: string;
  companyLogo: string;
  location: string;
  isRemote: boolean;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salaryRange: string;
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior' | 'Lead / Staff';
  skills: string[];
  description: string;
  requirements: string[];
  applicantsCount: number;
  postedAt: string;
  recruiterId: string;
  deadline?: string;
}

export type ApplicationStatus = 'Applied' | 'Viewed' | 'Shortlisted' | 'Interview' | 'Offer' | 'Rejected';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantId: string;
  applicantName: string;
  applicantAvatar: string;
  applicantHeadline: string;
  applicantEmail: string;
  resumeUrl: string;
  note: string;
  portfolioUrl?: string;
  status: ApplicationStatus;
  appliedAt: string;
}

export interface Company {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logoUrl: string;
  coverUrl: string;
  industry: string;
  employeesCount: string;
  website: string;
  locations: string[];
  foundedYear: number;
  openJobsCount: number;
  techStack: string[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantHeadline: string;
  isOnline: boolean;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  unreadCount: number;
}

export type NotificationType =
  | 'connection_request'
  | 'connection_accepted'
  | 'post_reaction'
  | 'comment'
  | 'mention'
  | 'message'
  | 'job_recommendation'
  | 'project_interaction'
  | 'streak_milestone';

export interface AppNotification {
  id: string;
  type: NotificationType;
  actorId: string;
  actorName: string;
  actorAvatar: string;
  message: string;
  detail?: string;
  targetId?: string;
  targetType?: 'post' | 'job' | 'profile' | 'project' | 'chat';
  isRead: boolean;
  createdAt: string;
}

export interface ReportItem {
  id: string;
  targetType: 'user' | 'post' | 'comment' | 'job';
  targetId: string;
  targetSnippet: string;
  reportedBy: string;
  reason: 'Spam' | 'Harassment' | 'Fake Account' | 'Fraud' | 'Inappropriate Content' | 'Other';
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = none, 4 = heavy
}

export interface CodingStats {
  problemsSolved: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
  currentStreak: number;
  longestStreak: number;
  contributionGrid: ContributionDay[];
  badges: string[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  avatar: string;
  coverImage?: string;
  headline: string;
  bio: string;
  location: string;
  website?: string;
  github?: string;
  portfolio?: string;
  role: UserRole;
  accountType: AccountType;
  badges: Badge[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  codingStats: CodingStats;
  connectionsCount: number;
  followersCount: number;
  profileViews: number;
  savedJobIds: string[];
  savedPostIds: string[];
  createdAt: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  starterCode: string;
  testCases: { input: string; expected: string }[];
  hint: string;
}

export type DSATier = 'basic' | 'core' | 'pro';
export type DSAProblemDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface DSAProblem {
  id: string;
  title: string;
  difficulty: DSAProblemDifficulty;
  tier: DSATier;
  topicId: string;
  subTopicId?: string;
  isSolved: boolean;
  isBookmarked: boolean;
  notes?: string;
  leetcodeUrl?: string;
  youtubeUrl?: string;
  articleUrl?: string;
  description?: string;
  starterCode?: string;
  testCases?: { input: string; expected: string }[];
}

export interface DSASubTopic {
  id: string;
  title: string;
  problems: DSAProblem[];
}

export interface DSATopic {
  id: string;
  title: string;
  subTopics: DSASubTopic[];
}

export type AuthMode = 'login' | 'signup';
export type AuthTargetRole = 'STUDENT' | 'ADMIN' | 'PROFESSIONAL' | 'RECRUITER';
