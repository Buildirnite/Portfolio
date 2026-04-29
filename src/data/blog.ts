export interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Cómo construí un analizador de contratos chilenos con IA",
    excerpt: "El proceso de integrar Claude API en una aplicación real: prompts, contexto legal y las decisiones técnicas que tomé en el camino.",
    date: "Abril 2026",
    readTime: "8 min",
    tags: ["IA", "FastAPI", "Python"],
    slug: "analizador-contratos-ia"
  },
  {
    id: 2,
    title: "Por qué elegí React Query sobre useEffect para BarberBook",
    excerpt: "Comparativa práctica entre manejar estado del servidor con useEffect vs React Query. Lo que aprendí construyendo un sistema de reservas real.",
    date: "Marzo 2026",
    readTime: "6 min",
    tags: ["React", "React Query", "Laravel"],
    slug: "react-query-vs-useeffect"
  },
  {
    id: 3,
    title: "Docker para desarrolladores PHP: setup que realmente funciona",
    excerpt: "Mi configuración de Docker Compose para proyectos Laravel con MySQL y phpMyAdmin. Sin dolores de cabeza en WSL2.",
    date: "Febrero 2026",
    readTime: "5 min",
    tags: ["Docker", "Laravel", "WSL2"],
    slug: "docker-laravel-wsl2"
  }
]
