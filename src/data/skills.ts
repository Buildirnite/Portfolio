import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiVuedotjs,
  SiLaravel,
  SiPython,
  SiFastapi,
  SiMysql,
  SiPostman,
  SiGit,
  SiDocker,
  SiLinux,
  SiAnthropic,
  SiGithub,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

export type SkillLevel = 'Avanzado' | 'Intermedio' | 'Básico';

export interface Skill {
  name: string;
  icon: IconType;
  level: SkillLevel;
  category: 'frontend' | 'backend' | 'devops';
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: SiReact, level: 'Avanzado', category: 'frontend' },
  { name: 'React Native', icon: SiReact, level: 'Avanzado', category: 'frontend' },
  { name: 'JavaScript', icon: SiJavascript, level: 'Avanzado', category: 'frontend' },
  { name: 'TypeScript', icon: SiTypescript, level: 'Intermedio', category: 'frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, level: 'Avanzado', category: 'frontend' },
  { name: 'Vue 3', icon: SiVuedotjs, level: 'Intermedio', category: 'frontend' },

  // Backend
  { name: 'Laravel / PHP', icon: SiLaravel, level: 'Avanzado', category: 'backend' },
  { name: 'Python', icon: SiPython, level: 'Intermedio', category: 'backend' },
  { name: 'FastAPI', icon: SiFastapi, level: 'Intermedio', category: 'backend' },
  { name: 'MySQL', icon: SiMysql, level: 'Avanzado', category: 'backend' },
  { name: 'REST APIs', icon: SiPostman, level: 'Avanzado', category: 'backend' },
  { name: 'Git', icon: SiGit, level: 'Avanzado', category: 'backend' },

  // DevOps & IA
  { name: 'Docker', icon: SiDocker, level: 'Intermedio', category: 'devops' },
  { name: 'Linux / WSL', icon: SiLinux, level: 'Intermedio', category: 'devops' },
  { name: 'Claude AI API', icon: SiAnthropic, level: 'Intermedio', category: 'devops' },
  { name: 'GitHub', icon: SiGithub, level: 'Avanzado', category: 'devops' },
];
