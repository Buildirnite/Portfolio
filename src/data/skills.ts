export interface Skill {
  name: string
  level: number
  category: "frontend" | "backend" | "devops"
}

export const skills: Skill[] = [
  { name: "React", level: 90, category: "frontend" },
  { name: "React Native", level: 80, category: "frontend" },
  { name: "JavaScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 82, category: "frontend" },
  { name: "TypeScript", level: 75, category: "frontend" },
  { name: "Laravel / PHP", level: 88, category: "backend" },
  { name: "Python / FastAPI", level: 80, category: "backend" },
  { name: "MySQL", level: 82, category: "backend" },
  { name: "REST APIs", level: 90, category: "backend" },
  { name: "Docker", level: 78, category: "devops" },
  { name: "Git / GitHub", level: 88, category: "devops" },
  { name: "Claude AI API", level: 75, category: "devops" },
  { name: "Linux / WSL", level: 80, category: "devops" },
]
