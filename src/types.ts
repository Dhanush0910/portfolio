export interface Project {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  tags: string[];
  category: string;
  link?: string;
  github?: string;
  image: string;
  features: string[];
  metrics: string[];
}

export interface Experience {
  year: string;
  company: string;
  role: string;
  desc: string;
  tags: string[];
  duration: string;
  metrics: string[];
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend/Cloud' | 'Architecture' | 'Tools';
  level: number; // 0-100
  iconName: string;
}

export interface HUDNode {
  id: string;
  label: string;
  value: string;
  x: number; // 0-100 percentage layout x
  y: number; // 0-100 percentage layout y
  status: 'online' | 'encrypted' | 'active';
}
