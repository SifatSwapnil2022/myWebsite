export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  venueType: 'journal' | 'conference' | 'dataset';
  link?: string;
  highlight: string;
  year: string;
}

export interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  longDescription: string;
  features: string[];
  tech: string[];
  metric: string;
  github: string;
  website?: string;
  paperLink?: string;
  image: string;
  iconName: 'Cpu' | 'Layers' | 'CheckCircle2' | 'HeartPulse' | 'Database' | 'GraduationCap';
  videoSrc?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  supervisor?: {
    name: string;
    title: string;
    email: string;
    profileUrl?: string;
  };
}

export interface NewsItem {
  id: string;
  date: string;
  category?: 'Publication' | 'Event' | 'Academic' | 'Award' |'Career';
  content: string;
  longContent?: string;
  image?: string;
  link?: string;
  linkText?: string;
}

export interface Hobby {
  name: string;
  category: string;
  description: string;
  iconName: string;
}

export interface ExtraActivity {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  bullets?: string[];
  badge?: string;
}

export interface Award {
  icon: string;
  title: string;
  sub: string;
}

export interface Language {
  label: string;
  level: string;
  width: string;
}
