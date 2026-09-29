import {
  User,
  Post,
  Project,
  Job,
  Company,
  AppNotification,
  Conversation,
  Message,
  CodingChallenge,
  ContributionDay,
  Badge,
  ReportItem,
  Application
} from '../types';

export const CONSISTENCY_BADGE: Badge = {
  id: 'badge-consistency',
  name: 'CONSISTENCY',
  slug: 'consistency',
  description: 'Maintained uninterrupted professional development and coding consistency.',
  iconName: 'Flame',
  isConsistencyBadge: true,
  tier: 'diamond'
};

export const VERIFIED_DEV_BADGE: Badge = {
  id: 'badge-verified-dev',
  name: 'Core Engineer',
  slug: 'core-engineer',
  description: 'Verified professional contributor in high-throughput systems.',
  iconName: 'Code',
  tier: 'gold'
};

export const AI_INNOVATOR_BADGE: Badge = {
  id: 'badge-ai-innovator',
  name: 'AI Architect',
  slug: 'ai-architect',
  description: 'Pioneering intelligent autonomous systems and LLM orchestration.',
  iconName: 'Cpu',
  tier: 'gold'
};

export const RECRUITER_STAR_BADGE: Badge = {
  id: 'badge-recruiter-star',
  name: 'Talent Partner',
  slug: 'talent-partner',
  description: 'Recognized for transparent and candidate-first hiring.',
  iconName: 'Briefcase',
  tier: 'silver'
};

// Generate 52 weeks of contribution data
export const generateContributionData = (density: number = 0.7): ContributionDay[] => {
  const days: ContributionDay[] = [];
  const today = new Date();
  const totalDays = 52 * 7;

  for (let i = totalDays; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Seed deterministic random based on date
    const charSum = dateStr.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const active = (charSum % 10) / 10 < density;

    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (active) {
      count = (charSum % 7) + 1;
      if (count <= 2) level = 1;
      else if (count <= 4) level = 2;
      else if (count <= 6) level = 3;
      else level = 4;
    }

    days.push({
      date: dateStr,
      count,
      level
    });
  }
  return days;
};

export const INITIAL_USERS: User[] = [
  {
    id: 'user-vamsi',
    name: 'Vamsi Koyya',
    username: 'vamsikoyya',
    email: 'udayphanindravamsikoyya@gmail.com',
    password: 'founder123',
    avatar: '/src/assets/images/nexora_avatar_vamsi_1790680583296.jpg',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    headline: 'Founding Engineer @ Nexora · Distributed Systems & Modern Web Architect',
    bio: 'Passionate about high-concurrency architectures, reactive frontend design, and scalable developer tools. Architecting the next-generation professional ecosystem on Nexora.',
    location: 'San Francisco, CA · Remote',
    website: 'https://nexora.network/vamsi',
    github: 'https://github.com/vamsikoyya',
    portfolio: 'https://vamsikoyya.dev',
    role: 'FOUNDER',
    accountType: 'Founder',
    badges: [CONSISTENCY_BADGE, VERIFIED_DEV_BADGE],
    skills: [
      { id: 'sk-1', name: 'Java 21', category: 'Backend', endorsementsCount: 38, endorsedBy: ['user-priya', 'user-alex'] },
      { id: 'sk-2', name: 'Spring Boot 3', category: 'Backend', endorsementsCount: 42, endorsedBy: ['user-priya', 'user-alex', 'user-david'] },
      { id: 'sk-3', name: 'PostgreSQL', category: 'Database', endorsementsCount: 31, endorsedBy: ['user-alex'] },
      { id: 'sk-4', name: 'Apache Kafka', category: 'Streaming', endorsementsCount: 27, endorsedBy: ['user-alex'] },
      { id: 'sk-5', name: 'Next.js & React 19', category: 'Frontend', endorsementsCount: 49, endorsedBy: ['user-elena', 'user-priya'] },
      { id: 'sk-6', name: 'TypeScript', category: 'Frontend', endorsementsCount: 54, endorsedBy: ['user-elena', 'user-alex'] },
      { id: 'sk-7', name: 'Redis', category: 'Cache', endorsementsCount: 22, endorsedBy: ['user-alex'] },
      { id: 'sk-8', name: 'Docker & Kubernetes', category: 'DevOps', endorsementsCount: 29, endorsedBy: ['user-alex'] }
    ],
    experiences: [
      {
        id: 'exp-1',
        company: 'Nexora Platform',
        position: 'Founding Systems Architect',
        employmentType: 'Full-time',
        location: 'San Francisco, CA',
        startDate: 'Jan 2024',
        isCurrent: true,
        description: 'Lead design and execution of Nexora core platform services, hybrid event fabric, real-time messaging, and interactive developer portfolio hub.',
        technologies: ['Java 21', 'Spring Boot 3', 'Kafka', 'PostgreSQL', 'Next.js', 'Tailwind CSS']
      },
      {
        id: 'exp-2',
        company: 'Aether Cloud Systems',
        position: 'Senior Distributed Systems Engineer',
        employmentType: 'Full-time',
        location: 'Seattle, WA',
        startDate: 'Mar 2022',
        endDate: 'Dec 2023',
        isCurrent: false,
        description: 'Engineered high-throughput event processing pipelines handling 120,000 req/sec with sub-10ms P99 latency.',
        technologies: ['Java', 'Spring Data JPA', 'Redis Cluster', 'Elasticsearch', 'Docker']
      }
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'University of Washington',
        degree: 'Bachelor of Science',
        field: 'Computer Science & Software Engineering',
        startYear: 2018,
        endYear: 2022,
        grade: 'First Class Honors (GPA 3.92/4.0)',
        description: 'Specialization in Distributed Operating Systems and Scalable Data Architectures.'
      }
    ],
    codingStats: {
      problemsSolved: {
        easy: 184,
        medium: 246,
        hard: 62,
        total: 492
      },
      currentStreak: 42,
      longestStreak: 108,
      contributionGrid: generateContributionData(0.85),
      badges: ['CONSISTENCY', 'Algorithm Grandmaster', 'Kafka Connoisseur']
    },
    connectionsCount: 842,
    followersCount: 2410,
    profileViews: 1420,
    savedJobIds: ['job-1', 'job-3'],
    savedPostIds: ['post-2'],
    createdAt: '2024-01-10T09:00:00Z'
  },
  {
    id: 'user-priya',
    name: 'Priya Sharma',
    username: 'priyasharma_ai',
    email: 'priya.sharma@quantumscale.ai',
    avatar: '/src/assets/images/nexora_avatar_priya_1790680596233.jpg',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1400&q=80',
    headline: 'Staff AI/ML Engineer @ QuantumScale AI · Autonomous Agent Workflows',
    bio: 'Pushing boundaries in foundation model evaluation, multi-agent consensus networks, and scalable inference optimization. Speaker and open-source contributor.',
    location: 'New York, NY · Hybrid',
    website: 'https://priyasharma.ai',
    github: 'https://github.com/priyasharma-ai',
    role: 'PROFESSIONAL',
    accountType: 'Professional',
    badges: [CONSISTENCY_BADGE, AI_INNOVATOR_BADGE],
    skills: [
      { id: 'sk-p1', name: 'Machine Learning', category: 'AI', endorsementsCount: 64, endorsedBy: ['user-vamsi'] },
      { id: 'sk-p2', name: 'PyTorch', category: 'AI', endorsementsCount: 58, endorsedBy: ['user-vamsi'] },
      { id: 'sk-p3', name: 'LLM Orchestration', category: 'AI', endorsementsCount: 47, endorsedBy: ['user-vamsi'] },
      { id: 'sk-p4', name: 'Python', category: 'Language', endorsementsCount: 72, endorsedBy: ['user-vamsi'] }
    ],
    experiences: [
      {
        id: 'exp-p1',
        company: 'QuantumScale AI',
        position: 'Staff AI Engineer',
        employmentType: 'Full-time',
        location: 'New York, NY',
        startDate: 'Aug 2022',
        isCurrent: true,
        description: 'Leading the Agent Framework team. Designed speculative decoding pipelines yielding 2.8x throughput acceleration.',
        technologies: ['PyTorch', 'CUDA', 'Python', 'vLLM', 'FastAPI']
      }
    ],
    education: [
      {
        id: 'edu-p1',
        institution: 'Columbia University',
        degree: 'Master of Science',
        field: 'Computer Science (Machine Learning Track)',
        startYear: 2020,
        endYear: 2022
      }
    ],
    codingStats: {
      problemsSolved: {
        easy: 120,
        medium: 180,
        hard: 45,
        total: 345
      },
      currentStreak: 31,
      longestStreak: 84,
      contributionGrid: generateContributionData(0.78),
      badges: ['CONSISTENCY', 'AI Pioneer']
    },
    connectionsCount: 1120,
    followersCount: 3890,
    profileViews: 2190,
    savedJobIds: [],
    savedPostIds: [],
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 'user-alex',
    name: 'Alex Rivera',
    username: 'alexrivera',
    email: 'alex@vertexcloud.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
    headline: 'Principal Cloud & Site Reliability Architect @ Vertex Cloud',
    bio: 'Obsessed with high-availability systems, zero-downtime database migrations, and telemetry-driven infrastructure.',
    location: 'Austin, TX · Remote',
    github: 'https://github.com/alexrivera-cloud',
    role: 'PROFESSIONAL',
    accountType: 'Professional',
    badges: [VERIFIED_DEV_BADGE],
    skills: [
      { id: 'sk-a1', name: 'Kubernetes', category: 'DevOps', endorsementsCount: 52, endorsedBy: ['user-vamsi'] },
      { id: 'sk-a2', name: 'Go', category: 'Backend', endorsementsCount: 39, endorsedBy: ['user-vamsi'] },
      { id: 'sk-a3', name: 'PostgreSQL', category: 'Database', endorsementsCount: 44, endorsedBy: ['user-vamsi'] }
    ],
    experiences: [
      {
        id: 'exp-a1',
        company: 'Vertex Cloud',
        position: 'Principal SRE',
        employmentType: 'Full-time',
        location: 'Austin, TX',
        startDate: 'Jan 2021',
        isCurrent: true,
        description: 'Architecting multi-region failover and geo-distributed Postgres clusters.',
        technologies: ['Kubernetes', 'Go', 'PostgreSQL', 'Terraform']
      }
    ],
    education: [
      {
        id: 'edu-a1',
        institution: 'University of Texas at Austin',
        degree: 'B.S.',
        field: 'Electrical & Computer Engineering',
        startYear: 2015,
        endYear: 2019
      }
    ],
    codingStats: {
      problemsSolved: { easy: 95, medium: 140, hard: 30, total: 265 },
      currentStreak: 18,
      longestStreak: 55,
      contributionGrid: generateContributionData(0.65),
      badges: ['Reliability Champion']
    },
    connectionsCount: 650,
    followersCount: 1540,
    profileViews: 890,
    savedJobIds: [],
    savedPostIds: [],
    createdAt: '2024-02-15T12:00:00Z'
  },
  {
    id: 'user-elena',
    name: 'Elena Rostova',
    username: 'elenarostova',
    email: 'elena@bytecraft.design',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    headline: 'Design Systems Lead & Frontend Engineer @ ByteCraft',
    bio: 'Crafting pixel-precise interfaces, micro-interactions, and design systems for enterprise software.',
    location: 'Berlin, Germany · Remote',
    website: 'https://elenarostova.design',
    role: 'PROFESSIONAL',
    accountType: 'Professional',
    badges: [CONSISTENCY_BADGE],
    skills: [
      { id: 'sk-e1', name: 'Design Systems', category: 'UI/UX', endorsementsCount: 71, endorsedBy: ['user-vamsi'] },
      { id: 'sk-e2', name: 'Tailwind CSS', category: 'Frontend', endorsementsCount: 63, endorsedBy: ['user-vamsi'] },
      { id: 'sk-e3', name: 'React', category: 'Frontend', endorsementsCount: 56, endorsedBy: ['user-vamsi'] }
    ],
    experiences: [
      {
        id: 'exp-e1',
        company: 'ByteCraft Studios',
        position: 'Head of Product Design',
        employmentType: 'Full-time',
        location: 'Berlin, Germany',
        startDate: 'Feb 2022',
        isCurrent: true,
        description: 'Directed end-to-end design engineering for 14 cross-platform software suites.',
        technologies: ['Figma', 'React', 'Tailwind CSS', 'Framer Motion']
      }
    ],
    education: [
      {
        id: 'edu-e1',
        institution: 'Bauhaus-Universität Weimar',
        degree: 'M.A.',
        field: 'Media Architecture & Interface Design',
        startYear: 2017,
        endYear: 2020
      }
    ],
    codingStats: {
      problemsSolved: { easy: 80, medium: 95, hard: 12, total: 187 },
      currentStreak: 24,
      longestStreak: 60,
      contributionGrid: generateContributionData(0.7),
      badges: ['CONSISTENCY', 'Interface Craftsman']
    },
    connectionsCount: 910,
    followersCount: 2200,
    profileViews: 1340,
    savedJobIds: [],
    savedPostIds: [],
    createdAt: '2024-03-01T08:00:00Z'
  },
  {
    id: 'user-marcus',
    name: 'Marcus Vance',
    username: 'marcus_recruits',
    email: 'marcus@nexoralabs.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    headline: 'Senior Technical Talent Partner @ Nexora Labs & QuantumScale',
    bio: 'Matching extraordinary software engineers, founders, and systems architects with high-conviction engineering teams. Zero spam, transparent compensation.',
    location: 'San Francisco, CA',
    role: 'RECRUITER',
    accountType: 'Recruiter',
    badges: [RECRUITER_STAR_BADGE],
    skills: [
      { id: 'sk-m1', name: 'Tech Recruiting', category: 'Recruitment', endorsementsCount: 68, endorsedBy: ['user-vamsi'] },
      { id: 'sk-m2', name: 'Engineering Leadership', category: 'Hiring', endorsementsCount: 45, endorsedBy: [] },
      { id: 'sk-m3', name: 'Compensation Benchmarking', category: 'HR', endorsementsCount: 37, endorsedBy: [] }
    ],
    experiences: [
      {
        id: 'exp-m1',
        company: 'Nexora Labs',
        position: 'Head of Technical Talent',
        employmentType: 'Full-time',
        location: 'San Francisco, CA',
        startDate: 'Jan 2023',
        isCurrent: true,
        description: 'Built out core distributed systems and foundational AI research engineering teams.',
        technologies: ['Talent Sourcing', 'Pipeline Analytics', 'Executive Search']
      }
    ],
    education: [
      {
        id: 'edu-m1',
        institution: 'UC Berkeley',
        degree: 'B.A.',
        field: 'Organizational Psychology',
        startYear: 2014,
        endYear: 2018
      }
    ],
    codingStats: {
      problemsSolved: { easy: 20, medium: 10, hard: 0, total: 30 },
      currentStreak: 5,
      longestStreak: 12,
      contributionGrid: generateContributionData(0.2),
      badges: ['Talent Scout']
    },
    connectionsCount: 2300,
    followersCount: 5400,
    profileViews: 3820,
    savedJobIds: [],
    savedPostIds: [],
    createdAt: '2024-01-20T14:00:00Z'
  },
  {
    id: 'user-david',
    name: 'David Chen',
    username: 'davidchen_cto',
    email: 'david@synapse-sec.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    headline: 'CTO & Co-Founder @ Synapse Security · Zero-Trust Cryptography',
    bio: 'Building enterprise runtime authorization and confidential computing enclaves. Passionate about formal verification and memory-safe infrastructure.',
    location: 'Boston, MA · In-Person',
    github: 'https://github.com/davidchen-sec',
    role: 'FOUNDER',
    accountType: 'Founder',
    badges: [CONSISTENCY_BADGE, VERIFIED_DEV_BADGE],
    skills: [
      { id: 'sk-d1', name: 'Rust', category: 'Language', endorsementsCount: 88, endorsedBy: ['user-vamsi'] },
      { id: 'sk-d2', name: 'Cryptography', category: 'Security', endorsementsCount: 74, endorsedBy: ['user-vamsi'] },
      { id: 'sk-d3', name: 'Zero-Trust Networks', category: 'Security', endorsementsCount: 65, endorsedBy: [] }
    ],
    experiences: [
      {
        id: 'exp-d1',
        company: 'Synapse Security',
        position: 'Co-Founder & CTO',
        employmentType: 'Full-time',
        location: 'Boston, MA',
        startDate: 'May 2021',
        isCurrent: true,
        description: 'Leading 40+ security researchers and systems engineers developing zero-knowledge attestation engines.',
        technologies: ['Rust', 'WebAssembly', 'Cryptography', 'Linux Kernel']
      }
    ],
    education: [
      {
        id: 'edu-d1',
        institution: 'MIT',
        degree: 'Ph.D.',
        field: 'Computer Science (Cryptography & Systems Security)',
        startYear: 2016,
        endYear: 2021
      }
    ],
    codingStats: {
      problemsSolved: { easy: 210, medium: 320, hard: 110, total: 640 },
      currentStreak: 56,
      longestStreak: 190,
      contributionGrid: generateContributionData(0.9),
      badges: ['CONSISTENCY', 'Security Guru']
    },
    connectionsCount: 1450,
    followersCount: 6200,
    profileViews: 4100,
    savedJobIds: [],
    savedPostIds: [],
    createdAt: '2024-01-05T11:00:00Z'
  },
  {
    id: 'user-student',
    name: 'Rohan Sharma',
    username: 'rohan_dsa',
    email: 'student@nexora.edu',
    password: 'student123',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80',
    headline: 'B.Tech CS Student @ IIT Delhi · Solving Striver A2Z Sheet & Competitive Programming',
    bio: 'Passionate computer science student actively mastering Data Structures, Algorithms, and Core Computer Science fundamentals. Grinding A2Z DSA sheet on Nexora.',
    location: 'New Delhi, India',
    github: 'https://github.com/rohan-dsa',
    role: 'STUDENT',
    accountType: 'Student',
    badges: [CONSISTENCY_BADGE],
    skills: [
      { id: 'sk-s1', name: 'Data Structures', category: 'Core', endorsementsCount: 34, endorsedBy: ['user-vamsi'] },
      { id: 'sk-s2', name: 'Algorithms', category: 'Core', endorsementsCount: 29, endorsedBy: ['user-vamsi'] },
      { id: 'sk-s3', name: 'C++', category: 'Language', endorsementsCount: 41, endorsedBy: ['user-vamsi'] },
      { id: 'sk-s4', name: 'Java', category: 'Language', endorsementsCount: 22, endorsedBy: [] }
    ],
    experiences: [
      {
        id: 'exp-s1',
        company: 'Nexora Open Source',
        position: 'Software Engineering Intern',
        employmentType: 'Internship',
        location: 'Remote',
        startDate: 'May 2024',
        isCurrent: true,
        description: 'Implementing high-performance algorithmic modules and benchmarking data structure execution latency.',
        technologies: ['C++', 'Java 21', 'Algorithms']
      }
    ],
    education: [
      {
        id: 'edu-s1',
        institution: 'Indian Institute of Technology (IIT) Delhi',
        degree: 'Bachelor of Technology',
        field: 'Computer Science and Engineering',
        startYear: 2023,
        endYear: 2027,
        grade: 'CGPA: 9.4/10'
      }
    ],
    codingStats: {
      problemsSolved: { easy: 88, medium: 95, hard: 18, total: 201 },
      currentStreak: 28,
      longestStreak: 45,
      contributionGrid: generateContributionData(0.8),
      badges: ['CONSISTENCY', 'A2Z Sheet Achiever']
    },
    connectionsCount: 420,
    followersCount: 890,
    profileViews: 950,
    savedJobIds: ['job-4'],
    savedPostIds: [],
    createdAt: '2024-03-01T08:00:00Z'
  },
  {
    id: 'user-admin',
    name: 'Aditi Rao',
    username: 'aditi_admin',
    email: 'admin@nexora.network',
    password: 'admin123',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
    headline: 'Chief Governance Officer & Platform Administrator @ Nexora',
    bio: 'Overseeing community trust, code quality invariants, and system reliability across the global Nexora ecosystem.',
    location: 'Bangalore, India · Hybrid',
    role: 'ADMIN',
    accountType: 'Professional',
    badges: [VERIFIED_DEV_BADGE],
    skills: [
      { id: 'sk-ad1', name: 'Platform Governance', category: 'Admin', endorsementsCount: 95, endorsedBy: ['user-vamsi'] },
      { id: 'sk-ad2', name: 'Security & Compliance', category: 'Security', endorsementsCount: 78, endorsedBy: ['user-david'] }
    ],
    experiences: [
      {
        id: 'exp-ad1',
        company: 'Nexora Network',
        position: 'Head of Platform Administration',
        employmentType: 'Full-time',
        location: 'Bangalore',
        startDate: 'Jan 2024',
        isCurrent: true,
        description: 'Managing automated moderation pipelines, trust verification, and administrative operations.',
        technologies: ['Governance', 'Security', 'Data Engineering']
      }
    ],
    education: [
      {
        id: 'edu-ad1',
        institution: 'Indian Institute of Science (IISc)',
        degree: 'Master of Technology',
        field: 'Computer Science and Systems Security',
        startYear: 2017,
        endYear: 2019
      }
    ],
    codingStats: {
      problemsSolved: { easy: 110, medium: 140, hard: 40, total: 290 },
      currentStreak: 19,
      longestStreak: 72,
      contributionGrid: generateContributionData(0.65),
      badges: ['Platform Guardian']
    },
    connectionsCount: 3100,
    followersCount: 8400,
    profileViews: 5200,
    savedJobIds: [],
    savedPostIds: [],
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'AetherFlow: Distributed Event Mesh',
    tagline: 'Sub-millisecond event streaming broker with Kafka protocol compatibility',
    description: 'An ultra-low latency event streaming engine engineered in Java 21 & Rust. Features partition rebalancing with zero consumer stop-the-world pauses, integrated Redis cache caching, and an interactive telemetry dashboard.',
    technologies: ['Java 21', 'Spring Boot 3', 'Kafka', 'PostgreSQL', 'Redis', 'Docker'],
    category: 'Backend',
    imageUrl: '/src/assets/images/nexora_project_cloud_1790680619102.jpg',
    githubUrl: 'https://github.com/vamsikoyya/aetherflow-mesh',
    liveDemoUrl: 'https://aetherflow.io/demo',
    starsCount: 342,
    likesCount: 128,
    commentsCount: 24,
    authorId: 'user-vamsi',
    authorName: 'Vamsi Koyya',
    authorAvatar: '/src/assets/images/nexora_avatar_vamsi_1790680583296.jpg',
    authorRole: 'Founding Engineer @ Nexora',
    createdAt: '2024-03-10T14:30:00Z'
  },
  {
    id: 'proj-2',
    title: 'OmniAgent Consensus Engine',
    tagline: 'Multi-agent autonomous decision orchestration with verifiable proof of reasoning',
    description: 'A framework for orchestrating teams of specialized LLM agents solving multi-step engineering challenges. Includes deterministic execution trace graphing, memory vector indexing, and real-time streaming feedback.',
    technologies: ['PyTorch', 'Python', 'FastAPI', 'React 19', 'Tailwind CSS'],
    category: 'AI',
    imageUrl: '/src/assets/images/nexora_project_neural_1790680608002.jpg',
    githubUrl: 'https://github.com/priyasharma-ai/omni-agent',
    liveDemoUrl: 'https://omniagent.quantumscale.ai',
    starsCount: 615,
    likesCount: 245,
    commentsCount: 42,
    authorId: 'user-priya',
    authorName: 'Priya Sharma',
    authorAvatar: '/src/assets/images/nexora_avatar_priya_1790680596233.jpg',
    authorRole: 'Staff AI Engineer',
    createdAt: '2024-03-02T16:00:00Z'
  },
  {
    id: 'proj-3',
    title: 'KubePulse: Realtime Cluster Topology',
    tagline: 'Visual distributed infrastructure topology debugger and memory leak detector',
    description: 'Instant zero-dependency WebGL visualization of multi-tenant Kubernetes pod affinities, service mesh latency histograms, and eBPF network trace maps.',
    technologies: ['Go', 'eBPF', 'WebGL', 'TypeScript', 'Tailwind CSS'],
    category: 'Cloud',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/alexrivera-cloud/kubepulse',
    liveDemoUrl: 'https://kubepulse.dev',
    starsCount: 418,
    likesCount: 164,
    commentsCount: 19,
    authorId: 'user-alex',
    authorName: 'Alex Rivera',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    authorRole: 'Principal Cloud Architect',
    createdAt: '2024-02-20T11:15:00Z'
  },
  {
    id: 'proj-4',
    title: 'ZeroKey: Enclave-Backed Secrets Manager',
    tagline: 'Hardware-enforced zero-knowledge secrets vault for microservices',
    description: 'Protects enterprise microservice keys inside confidential AMD SEV / Intel SGX enclaves. Guarantees keys are never exposed in plaintext even to root processes.',
    technologies: ['Rust', 'Confidential Computing', 'gRPC', 'WebAssembly'],
    category: 'Backend',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/davidchen-sec/zerokey',
    starsCount: 890,
    likesCount: 310,
    commentsCount: 57,
    authorId: 'user-david',
    authorName: 'David Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    authorRole: 'CTO @ Synapse Security',
    createdAt: '2024-01-25T18:40:00Z'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    authorId: 'user-vamsi',
    authorName: 'Vamsi Koyya',
    authorUsername: 'vamsikoyya',
    authorAvatar: '/src/assets/images/nexora_avatar_vamsi_1790680583296.jpg',
    authorHeadline: 'Founding Engineer @ Nexora · Distributed Systems',
    authorBadge: 'CONSISTENCY',
    content: `Architecture milestone: We have successfully unified our event fabric using Java 21 virtual threads, Spring Boot 3 reactive pipelines, and Kafka consumer groups.\n\nKey takeaways from our load tests:\n1. 72% reduction in p99 latency during peak connection spikes.\n2. In-memory Redis caching with automated cache invalidation prevents stale feed queries.\n3. Decoupling search indexing to Elasticsearch asynchronously keeps our PostgreSQL primary transactional store rock solid.\n\nExcited to share the technical breakdown soon. What is your go-to pattern for keeping read-replicas in sync with real-time websocket delivery?`,
    type: 'project',
    mediaUrl: '/src/assets/images/nexora_project_cloud_1790680619102.jpg',
    projectRef: {
      id: 'proj-1',
      title: 'AetherFlow: Distributed Event Mesh',
      tagline: 'Sub-millisecond event streaming broker with Kafka compatibility'
    },
    tags: ['Architecture', 'Java21', 'SpringBoot', 'Kafka', 'SystemDesign'],
    reactions: {
      like: 48,
      celebrate: 22,
      insightful: 37,
      support: 14,
      curious: 9
    },
    userReaction: 'like',
    comments: [
      {
        id: 'c-1',
        postId: 'post-1',
        authorId: 'user-alex',
        authorName: 'Alex Rivera',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        authorHeadline: 'Principal Cloud Architect @ Vertex',
        content: 'Huge milestone Vamsi! Virtual threads in Java 21 are a game changer for I/O bound worker pools. Are you pinning any native carrier threads when executing JDBC calls against Postgres?',
        createdAt: '2 hours ago',
        likesCount: 12,
        userLiked: true,
        replies: [
          {
            id: 'c-1-r1',
            postId: 'post-1',
            authorId: 'user-vamsi',
            authorName: 'Vamsi Koyya',
            authorAvatar: '/src/assets/images/nexora_avatar_vamsi_1790680583296.jpg',
            authorHeadline: 'Founding Engineer @ Nexora',
            content: 'Great call Alex! HikariCP + PostgreSQL JDBC driver in latest versions handles unpinned carriers smoothly without blocking the OS executor.',
            createdAt: '1 hour ago',
            likesCount: 7
          }
        ]
      },
      {
        id: 'c-2',
        postId: 'post-1',
        authorId: 'user-priya',
        authorName: 'Priya Sharma',
        authorAvatar: '/src/assets/images/nexora_avatar_priya_1790680596233.jpg',
        authorHeadline: 'Staff AI/ML Engineer @ QuantumScale AI',
        content: 'This resilience is exactly what we need when streaming real-time LLM token deltas across thousands of concurrent websockets.',
        createdAt: '30 mins ago',
        likesCount: 5
      }
    ],
    sharesCount: 16,
    saved: true,
    createdAt: '3 hours ago'
  },
  {
    id: 'post-2',
    authorId: 'user-priya',
    authorName: 'Priya Sharma',
    authorUsername: 'priyasharma_ai',
    authorAvatar: '/src/assets/images/nexora_avatar_priya_1790680596233.jpg',
    authorHeadline: 'Staff AI/ML Engineer @ QuantumScale AI',
    authorBadge: 'CONSISTENCY',
    content: `Engineers: When choosing your primary model orchestrator for autonomous multi-agent pipelines in 2026, what is your highest priority criteria?\n\nWe are benchmarking latency vs reasoning coherence across our enterprise agents. Vote below!`,
    type: 'poll',
    pollData: {
      question: 'Highest priority criteria for agent orchestrators:',
      options: [
        { id: 'opt-1', text: 'Deterministic Tool Calling & Schema Validation', votes: 142 },
        { id: 'opt-2', text: 'Sub-second P95 Token Streaming Latency', votes: 89 },
        { id: 'opt-3', text: 'Multi-agent Memory State Checkpointing', votes: 64 },
        { id: 'opt-4', text: 'Open-weight Portability (vLLM / Ollama)', votes: 110 }
      ],
      totalVotes: 405,
      userVotedOptionId: 'opt-1',
      expiresAt: '2 days left'
    },
    tags: ['ArtificialIntelligence', 'MachineLearning', 'AgenticWorkflows', 'Engineering'],
    reactions: {
      like: 62,
      celebrate: 18,
      insightful: 54,
      support: 8,
      curious: 26
    },
    comments: [
      {
        id: 'c-3',
        postId: 'post-2',
        authorId: 'user-david',
        authorName: 'David Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        authorHeadline: 'CTO @ Synapse Security',
        content: 'Deterministic schema validation is paramount. If tool calls produce malformed JSON at runtime, cascading failovers compromise safety guarantees.',
        createdAt: '4 hours ago',
        likesCount: 19
      }
    ],
    sharesCount: 28,
    createdAt: '5 hours ago'
  },
  {
    id: 'post-3',
    authorId: 'user-marcus',
    authorName: 'Marcus Vance',
    authorUsername: 'marcus_recruits',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    authorHeadline: 'Senior Technical Talent Partner @ Nexora Labs',
    authorBadge: 'Talent Partner',
    content: `We are officially hiring 3 Senior Distributed Systems Engineers and 2 Staff AI Infrastructure Engineers for Nexora Labs & QuantumScale AI!\n\nWhat we look for:\n• Deep familiarity with Java 21 / Go / Rust\n• Production experience with Kafka, Redis, and high-concurrency databases\n• Passion for developer tooling and clean architecture\n\n100% remote friendly, $190k - $275k base + equity, transparent team culture. Direct message me or apply directly through our Jobs tab on Nexora!`,
    type: 'job',
    jobRef: {
      title: 'Senior Distributed Systems Architect',
      company: 'Nexora Labs',
      location: 'San Francisco, CA · Remote',
      salary: '$190,000 - $265,000'
    },
    tags: ['TechJobs', 'Hiring', 'SoftwareEngineering', 'RemoteWork'],
    reactions: {
      like: 84,
      celebrate: 45,
      insightful: 21,
      support: 33,
      curious: 12
    },
    comments: [],
    sharesCount: 39,
    createdAt: '8 hours ago'
  },
  {
    id: 'post-4',
    authorId: 'user-elena',
    authorName: 'Elena Rostova',
    authorUsername: 'elenarostova',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    authorHeadline: 'Design Systems Lead @ ByteCraft',
    authorBadge: 'CONSISTENCY',
    content: `Design tip for modern developer dashboards: Stop putting every single numeric figure inside rounded pills and candy-colored badges.\n\nClean unboxed typography with tabular numerals (font-variant-numeric: tabular-nums) creates calm, high-density layouts where data speaks for itself. Less visual noise, more cognitive bandwidth.`,
    type: 'text',
    tags: ['DesignSystems', 'UIUX', 'FrontendArchitecture', 'ProductDesign'],
    reactions: {
      like: 112,
      celebrate: 34,
      insightful: 88,
      support: 19,
      curious: 8
    },
    comments: [
      {
        id: 'c-4',
        postId: 'post-4',
        authorId: 'user-vamsi',
        authorName: 'Vamsi Koyya',
        authorAvatar: '/src/assets/images/nexora_avatar_vamsi_1790680583296.jpg',
        authorHeadline: 'Founding Engineer @ Nexora',
        content: 'Amen! That is the exact design discipline we are embedding throughout Nexora.',
        createdAt: '6 hours ago',
        likesCount: 16
      }
    ],
    sharesCount: 42,
    createdAt: '1 day ago'
  }
];

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'Nexora Labs',
    tagline: 'Building the next generation professional ecosystem & high-scale developer fabric.',
    description: 'Nexora Labs creates high-performance infrastructure, networking protocols, and collaborative ecosystems for developers, founders, and modern technology companies.',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
    industry: 'Developer Tools & Enterprise Software',
    employeesCount: '25-50 employees',
    website: 'https://nexora.network',
    locations: ['San Francisco, CA', 'Seattle, WA', 'Remote'],
    foundedYear: 2024,
    openJobsCount: 4,
    techStack: ['Java 21', 'Spring Boot 3', 'Kafka', 'PostgreSQL', 'Next.js', 'Redis', 'Docker']
  },
  {
    id: 'comp-2',
    name: 'QuantumScale AI',
    tagline: 'Autonomous agent networks and foundation model acceleration infrastructure.',
    description: 'QuantumScale powers enterprise-grade AI execution environments, multi-agent reasoning topologies, and ultra-fast inference caching.',
    logoUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=200&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1400&q=80',
    industry: 'Artificial Intelligence & Machine Learning',
    employeesCount: '100-250 employees',
    website: 'https://quantumscale.ai',
    locations: ['New York, NY', 'San Francisco, CA', 'London, UK'],
    foundedYear: 2022,
    openJobsCount: 6,
    techStack: ['Python', 'PyTorch', 'CUDA', 'FastAPI', 'Rust', 'Kubernetes']
  },
  {
    id: 'comp-3',
    name: 'Synapse Security',
    tagline: 'Zero-trust runtime verification and hardware-enforced cryptographic boundaries.',
    description: 'Protecting next-generation distributed applications against unauthorized data exfiltration using confidential computing enclaves.',
    logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80',
    industry: 'Cybersecurity & Infrastructure',
    employeesCount: '50-100 employees',
    website: 'https://synapse-sec.io',
    locations: ['Boston, MA', 'Zurich, Switzerland', 'Remote'],
    foundedYear: 2021,
    openJobsCount: 3,
    techStack: ['Rust', 'WebAssembly', 'Linux Kernel', 'gRPC', 'PostgreSQL']
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Distributed Systems Architect',
    company: 'Nexora Labs',
    companyId: 'comp-1',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    location: 'San Francisco, CA',
    isRemote: true,
    employmentType: 'Full-time',
    salaryRange: '$190,000 - $265,000 · 0.15% - 0.35% Equity',
    experienceLevel: 'Senior',
    skills: ['Java 21', 'Spring Boot 3', 'Kafka', 'PostgreSQL', 'Redis'],
    description: 'Lead the design of Nexora high-throughput event fabric and real-time distributed messaging tier. You will architect multi-region event pipelines, manage schema validation, and optimize virtual thread concurrency.',
    requirements: [
      '5+ years building and scaling production backend services in Java, Go, or Rust',
      'Extensive hands-on experience with Apache Kafka partition design and consumer group fault tolerance',
      'Strong understanding of ACID transactional semantics vs eventual consistency in distributed systems',
      'Track record of optimizing relational databases (PostgreSQL) with advanced indexing and query planning'
    ],
    applicantsCount: 38,
    postedAt: '2 days ago',
    recruiterId: 'user-marcus',
    deadline: '2026-10-30'
  },
  {
    id: 'job-2',
    title: 'Staff AI Infrastructure Engineer',
    company: 'QuantumScale AI',
    companyId: 'comp-2',
    companyLogo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=200&q=80',
    location: 'New York, NY',
    isRemote: true,
    employmentType: 'Full-time',
    salaryRange: '$220,000 - $290,000 · Equity Package',
    experienceLevel: 'Lead / Staff',
    skills: ['Python', 'PyTorch', 'CUDA', 'FastAPI', 'Kubernetes'],
    description: 'Join the team building autonomous agent orchestration pipelines. You will optimize inference serving latency, implement speculative decoding kernels, and create distributed vector cache systems.',
    requirements: [
      'Deep expertise in deep learning model inference (vLLM, TensorRT-LLM, Triton Inference Server)',
      'Experience optimizing GPU cluster utilization and model weights sharding',
      'Strong software engineering fundamentals in Python and C++/Rust'
    ],
    applicantsCount: 52,
    postedAt: '3 days ago',
    recruiterId: 'user-marcus'
  },
  {
    id: 'job-3',
    title: 'Principal Rust Systems Engineer',
    company: 'Synapse Security',
    companyId: 'comp-3',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200&q=80',
    location: 'Boston, MA',
    isRemote: false,
    employmentType: 'Full-time',
    salaryRange: '$210,000 - $270,000',
    experienceLevel: 'Lead / Staff',
    skills: ['Rust', 'Confidential Computing', 'Cryptography', 'Linux Kernel'],
    description: 'Architect enclave-backed microservice credential brokers. Implement zero-knowledge verification proofs and low-level Linux memory management protocols.',
    requirements: [
      '6+ years of systems programming in Rust or C/C++',
      'Solid foundation in modern cryptographic primitives and key management',
      'Experience with hardware security modules (HSM) or enclave environments (SGX / SEV)'
    ],
    applicantsCount: 19,
    postedAt: '1 week ago',
    recruiterId: 'user-david'
  },
  {
    id: 'job-4',
    title: 'Frontend Platform & Design Engineer',
    company: 'Nexora Labs',
    companyId: 'comp-1',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    location: 'Remote · Global',
    isRemote: true,
    employmentType: 'Full-time',
    salaryRange: '$160,000 - $210,000',
    experienceLevel: 'Mid-Level',
    skills: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    description: 'Craft ultra-responsive, zero-slop web experiences across Nexora core web app, developer portfolio, and real-time collaboration canvas.',
    requirements: [
      'Proven expertise with modern React, TypeScript, and Tailwind CSS design systems',
      'Obsessive attention to visual hierarchy, typography math, and WCAG accessibility standards',
      'Experience with state machines and optimistic UI mutations'
    ],
    applicantsCount: 76,
    postedAt: '4 days ago',
    recruiterId: 'user-marcus'
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Distributed Systems Architect',
    company: 'Nexora Labs',
    applicantId: 'user-vamsi',
    applicantName: 'Vamsi Koyya',
    applicantAvatar: '/src/assets/images/nexora_avatar_vamsi_1790680583296.jpg',
    applicantHeadline: 'Founding Engineer @ Nexora · Distributed Systems',
    applicantEmail: 'udayphanindravamsikoyya@gmail.com',
    resumeUrl: 'https://vamsikoyya.dev/resume.pdf',
    note: 'Excited to contribute to Nexora event streaming architecture and virtual thread optimization.',
    portfolioUrl: 'https://vamsikoyya.dev',
    status: 'Interview',
    appliedAt: '2024-03-24T10:00:00Z'
  },
  {
    id: 'app-2',
    jobId: 'job-3',
    jobTitle: 'Principal Rust Systems Engineer',
    company: 'Synapse Security',
    applicantId: 'user-vamsi',
    applicantName: 'Vamsi Koyya',
    applicantAvatar: '/src/assets/images/nexora_avatar_vamsi_1790680583296.jpg',
    applicantHeadline: 'Founding Engineer @ Nexora · Distributed Systems',
    applicantEmail: 'udayphanindravamsikoyya@gmail.com',
    resumeUrl: 'https://vamsikoyya.dev/resume.pdf',
    note: 'Passionate about zero-knowledge infrastructure and memory safety.',
    portfolioUrl: 'https://vamsikoyya.dev',
    status: 'Viewed',
    appliedAt: '2024-03-20T15:30:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'connection_accepted',
    actorId: 'user-priya',
    actorName: 'Priya Sharma',
    actorAvatar: '/src/assets/images/nexora_avatar_priya_1790680596233.jpg',
    message: 'accepted your connection request.',
    detail: 'You are now connected in the Nexora professional network.',
    targetId: 'user-priya',
    targetType: 'profile',
    isRead: false,
    createdAt: '15 mins ago'
  },
  {
    id: 'notif-2',
    type: 'post_reaction',
    actorId: 'user-alex',
    actorName: 'Alex Rivera',
    actorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    message: 'reacted to your post on Virtual Threads and Kafka architecture.',
    detail: 'Alex Rivera and 24 others found your post insightful.',
    targetId: 'post-1',
    targetType: 'post',
    isRead: false,
    createdAt: '1 hour ago'
  },
  {
    id: 'notif-3',
    type: 'streak_milestone',
    actorId: 'user-vamsi',
    actorName: 'Nexora Coding Hub',
    actorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    message: 'Consistency Milestone unlocked: 42-Day Coding Streak!',
    detail: 'Your CONSISTENCY badge has been updated to Diamond tier.',
    targetId: 'user-vamsi',
    targetType: 'profile',
    isRead: true,
    createdAt: 'Yesterday'
  },
  {
    id: 'notif-4',
    type: 'job_recommendation',
    actorId: 'user-marcus',
    actorName: 'Marcus Vance',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    message: 'invited you to review your application for Senior Distributed Systems Architect.',
    detail: 'Status advanced to Technical Interview round.',
    targetId: 'job-1',
    targetType: 'job',
    isRead: true,
    createdAt: '2 days ago'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-priya',
    participantId: 'user-priya',
    participantName: 'Priya Sharma',
    participantAvatar: '/src/assets/images/nexora_avatar_priya_1790680596233.jpg',
    participantHeadline: 'Staff AI/ML Engineer @ QuantumScale AI',
    isOnline: true,
    lastMessage: 'Let’s benchmark the virtual threads vs asyncio on the multi-agent token stream tomorrow!',
    lastMessageTimestamp: '10:42 AM',
    unreadCount: 1
  },
  {
    id: 'conv-alex',
    participantId: 'user-alex',
    participantName: 'Alex Rivera',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    participantHeadline: 'Principal Cloud Architect @ Vertex',
    isOnline: false,
    lastMessage: 'Sent over the Postgres partition rebalancing script for your review.',
    lastMessageTimestamp: 'Yesterday',
    unreadCount: 0
  },
  {
    id: 'conv-marcus',
    participantId: 'user-marcus',
    participantName: 'Marcus Vance',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    participantHeadline: 'Senior Talent Partner @ Nexora Labs',
    isOnline: true,
    lastMessage: 'The founding team loved your AetherFlow open-source project demo.',
    lastMessageTimestamp: 'Sep 27',
    unreadCount: 0
  }
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  'conv-priya': [
    {
      id: 'm-1',
      conversationId: 'conv-priya',
      senderId: 'user-priya',
      receiverId: 'user-vamsi',
      content: 'Hey Vamsi! Saw your post on the Kafka virtual threads integration. Incredible throughput numbers.',
      timestamp: '10:30 AM',
      isRead: true
    },
    {
      id: 'm-2',
      conversationId: 'conv-priya',
      senderId: 'user-vamsi',
      receiverId: 'user-priya',
      content: 'Thanks Priya! We eliminated connection saturation completely once we switched carrier thread pools.',
      timestamp: '10:35 AM',
      isRead: true
    },
    {
      id: 'm-3',
      conversationId: 'conv-priya',
      senderId: 'user-priya',
      receiverId: 'user-vamsi',
      content: 'Let’s benchmark the virtual threads vs asyncio on the multi-agent token stream tomorrow!',
      timestamp: '10:42 AM',
      isRead: false
    }
  ],
  'conv-alex': [
    {
      id: 'm-4',
      conversationId: 'conv-alex',
      senderId: 'user-alex',
      receiverId: 'user-vamsi',
      content: 'Hey Vamsi, do you have 10 mins to check the Postgres failover telemetry?',
      timestamp: 'Yesterday',
      isRead: true
    },
    {
      id: 'm-5',
      conversationId: 'conv-alex',
      senderId: 'user-alex',
      receiverId: 'user-vamsi',
      content: 'Sent over the Postgres partition rebalancing script for your review.',
      timestamp: 'Yesterday',
      isRead: true
    }
  ]
};

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'ch-1',
    title: 'High-Concurrency Event Stream Deduplication',
    difficulty: 'Medium',
    category: 'Distributed Systems & Data Structures',
    description: 'Given a continuous stream of events with UUIDs and ingestion timestamps, implement an in-memory windowed deduplicator that identifies duplicate event IDs within a sliding 60-second window while keeping space complexity strictly bounded.',
    starterCode: `// Java 21 / TypeScript Stream Deduplicator
function deduplicateEvents(stream: Array<{ id: string; timestamp: number }>, windowMs = 60000): string[] {
  const seen = new Map<string, number>();
  const uniqueIds: string[] = [];

  for (const event of stream) {
    const prevTime = seen.get(event.id);
    if (prevTime === undefined || (event.timestamp - prevTime) > windowMs) {
      seen.set(event.id, event.timestamp);
      uniqueIds.push(event.id);
    }
  }

  return uniqueIds;
}`,
    testCases: [
      { input: 'Stream with 1000 events, 120 duplicates', expected: '880 Unique Events verified' },
      { input: 'Events outside 60s sliding window', expected: 'Window expired, permitted re-ingestion' }
    ],
    hint: 'Use a monotonic sliding queue or LinkedHashMap with LRU eviction to prevent unbounded memory growth during high event spikes.'
  },
  {
    id: 'ch-2',
    title: 'Lock-Free Ring Buffer Queue',
    difficulty: 'Hard',
    category: 'Concurrency & Low Latency',
    description: 'Implement a lock-free single-producer single-consumer ring buffer queue using atomic sequence pointers. The queue must support wrap-around indexing and zero allocation during steady-state enqueue and dequeue.',
    starterCode: `class LockFreeRingBuffer<T> {
  private buffer: (T | null)[];
  private capacity: number;
  private head: number = 0;
  private tail: number = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new Array(capacity).fill(null);
  }

  offer(item: T): boolean {
    if (this.tail - this.head >= this.capacity) return false;
    this.buffer[this.tail % this.capacity] = item;
    this.tail++;
    return true;
  }

  poll(): T | null {
    if (this.head >= this.tail) return null;
    const item = this.buffer[this.head % this.capacity];
    this.buffer[this.head % this.capacity] = null;
    this.head++;
    return item;
  }
}`,
    testCases: [
      { input: '1,000,000 operations concurrent throughput', expected: 'P99 Latency < 45ns' }
    ],
    hint: 'Pad sequence variables to avoid CPU cache line false sharing (64-byte alignment).'
  },
  {
    id: 'ch-3',
    title: 'Reverse Polish Notation Evaluator',
    difficulty: 'Easy',
    category: 'Stacks & Algorithms',
    description: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, and /. Each operand may be an integer or another expression.',
    starterCode: `function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  for (const token of tokens) {
    if (['+', '-', '*', '/'].includes(token)) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      if (token === '+') stack.push(a + b);
      if (token === '-') stack.push(a - b);
      if (token === '*') stack.push(a * b);
      if (token === '/') stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(token));
    }
  }
  return stack[0];
}`,
    testCases: [
      { input: '["2", "1", "+", "3", "*"]', expected: '9' },
      { input: '["4", "13", "5", "/", "+"]', expected: '6' }
    ],
    hint: 'Use a standard stack array; remember division truncates toward zero.'
  }
];

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-1',
    targetType: 'post',
    targetId: 'post-promo-spam',
    targetSnippet: 'Buy crypto signals now 500% profit guaranteed...',
    reportedBy: 'user-alex',
    reason: 'Spam',
    status: 'pending',
    createdAt: '2 hours ago'
  },
  {
    id: 'rep-2',
    targetType: 'user',
    targetId: 'user-bot-49',
    targetSnippet: 'Profile with automated unsolicited connection messages',
    reportedBy: 'user-priya',
    reason: 'Fake Account',
    status: 'pending',
    createdAt: '5 hours ago'
  }
];
