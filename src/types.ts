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

export interface ProjectVideo {
  /** 1280×720 file, used in the showreel and in lists */
  src: string;
  /** 1920×1080 file, used in the project detail view */
  srcHd: string;
  poster: string;
  /** Short line shown under the video in the showreel */
  caption: string;
}

export type ProjectGroup = 'research' | 'product';

export interface Project {
  id: string;
  title: string;
  tag: string;
  group: ProjectGroup;
  role?: string;
  description: string;
  longDescription: string;
  features: string[];
  tech: string[];
  metric: string;
  github?: string;
  /** Further links shown in the detail view, e.g. a thesis repository */
  extraLinks?: { label: string; href: string }[];
  website?: string;
  /** Button text for `website`, when "Open the site" doesn't fit (e.g. a game) */
  websiteLabel?: string;
  paperLink?: string;
  image: string;
  video?: ProjectVideo;
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
  category?: 'Publication' | 'Event' | 'Academic' | 'Award' | 'Career';
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
  title: string;
  sub: string;
}

export interface Language {
  label: string;
  level: string;
}

export interface EducationItem {
  id: string;
  date: string;
  credential: string;
  institution: string;
  location: string;
  logo: string;
  details?: string;
}
