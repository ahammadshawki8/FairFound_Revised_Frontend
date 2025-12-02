import { Mentor, RoadmapStep } from './types';

export const MOCK_MENTORS: Mentor[] = [
  {
    id: '1',
    name: 'Elena Rostova',
    role: 'Senior Product Designer',
    company: 'Adobe',
    imageUrl: 'https://picsum.photos/200/200?random=1',
    specialties: ['UI/UX', 'Design Systems', 'Figma'],
    rate: 120,
    rating: 4.9,
    available: true,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Staff Engineer',
    company: 'Vercel',
    imageUrl: 'https://picsum.photos/200/200?random=2',
    specialties: ['React', 'Next.js', 'System Design'],
    rate: 150,
    rating: 5.0,
    available: true,
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    role: 'Freelance Architect',
    company: 'Self-Employed',
    imageUrl: 'https://picsum.photos/200/200?random=3',
    specialties: ['Upwork Strategy', 'Pricing', 'Negotiation'],
    rate: 90,
    rating: 4.8,
    available: false,
  },
];

export const INITIAL_ROADMAP: RoadmapStep[] = [
  {
    id: '1',
    title: 'Optimize GitHub Profile',
    description: 'Pin your best 3 repositories and write a comprehensive README for each.',
    duration: '2 days',
    status: 'in-progress',
    type: 'branding'
  },
  {
    id: '2',
    title: 'Learn TypeScript Generics',
    description: 'Deep dive into advanced generic patterns to improve code reusability.',
    duration: '1 week',
    status: 'pending',
    type: 'skill'
  },
  {
    id: '3',
    title: 'Build a SaaS Dashboard Case Study',
    description: 'Create a complex dashboard showing data visualization skills.',
    duration: '2 weeks',
    status: 'pending',
    type: 'project'
  }
];

export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2500, 5000];
