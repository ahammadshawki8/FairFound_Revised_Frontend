
export enum View {
  LANDING = 'LANDING',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  ROADMAP = 'ROADMAP',
  MENTORS = 'MENTORS',
  INSIGHTS = 'INSIGHTS',
  PORTFOLIO = 'PORTFOLIO',
  PROPOSALS = 'PROPOSALS',
  COMMUNITY = 'COMMUNITY',
  PRICING = 'PRICING',
  PROFILE = 'PROFILE',
  CHECKOUT = 'CHECKOUT',
  // Mentor Views
  MENTOR_DASHBOARD = 'MENTOR_DASHBOARD',
  MENTOR_CLIENTS = 'MENTOR_CLIENTS',
  MENTOR_CHAT = 'MENTOR_CHAT',
  MENTOR_PROFILE = 'MENTOR_PROFILE'
}

export enum UserRole {
  FREELANCER = 'FREELANCER',
  MENTOR = 'MENTOR'
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface FreelancerProfile {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experienceYears: number;
  hourlyRate: number;
  githubUsername?: string;
  portfolioUrl?: string;
  email?: string;
  location?: string;
  avatarUrl?: string;
}

export interface AnalysisData {
  globalReadinessScore: number;
  marketPercentile: number;
  projectedEarnings: number;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  skillGaps: string[];
  pricingSuggestion: {
    current: number;
    recommended: number;
    reasoning: string;
  };
  metrics: {
    portfolioScore: number;
    githubScore: number;
    communicationScore: number;
    techStackScore: number;
  };
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'pending' | 'in-progress' | 'completed';
  type: 'skill' | 'project' | 'branding';
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  imageUrl: string;
  specialties: string[];
  rate: number;
  rating: number;
  available: boolean;
}

export interface GamificationState {
  xp: number;
  level: number;
  streak: number;
  badges: string[];
}

export interface PortfolioContent {
  tagline: string;
  about: string;
  projects: {
    title: string;
    description: string;
    tags: string[];
  }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Chat {
  id: string;
  participant: {
    id: string;
    name: string;
    avatarUrl: string;
    role: string;
  };
  lastMessage: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'review' | 'completed';
  feedback?: string;
}

export interface Mentee {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  progress: number;
  nextSession: string;
  status: 'active' | 'paused';
  roadmap: RoadmapStep[];
  tasks: Task[];
}
