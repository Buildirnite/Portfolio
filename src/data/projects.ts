import type { Project } from "@/types/index"

export const projects: Project[] = [
  {
    id: 1,
    type: "full stack",
    name: "BarberBook",
    description: "Sistema de reservas online para barberías. Los clientes reservan citas y los admins gestionan el calendario. Auth con Sanctum, roles y lógica de disponibilidad real.",
    tags: ["Laravel", "React", "React Query", "MySQL", "Docker"],
    github: "https://github.com/Buildirnite/barberbook",
    featured: true
  },
  {
    id: 2,
    type: "admin panel",
    name: "Tienda Admin Panel",
    description: "Panel de administración full stack para gestión de inventario de una tienda de ropa. API REST con Service Layer, Form Requests y CRUD completo.",
    tags: ["Laravel", "React", "MySQL", "Docker", "Swagger"],
    github: "https://github.com/Buildirnite/tienda-admin-panel",
    featured: true
  },
  {
    id: 3,
    type: "mobile",
    name: "HabitTracker",
    description: "App móvil para tracking de hábitos diarios. Rachas, estadísticas, calendario mensual con notas y persistencia total con AsyncStorage.",
    tags: ["React Native", "Expo", "AsyncStorage", "Ionicons"],
    github: "https://github.com/Buildirnite/habit-tracker",
    featured: true
  },
  {
    id: 4,
    type: "inteligencia artificial",
    name: "LegalAI Chile",
    description: "Analizador de contratos chilenos con IA. Sube un PDF y obtén un análisis legal estructurado basado en el Código Civil chileno y Ley 19.496.",
    tags: ["React", "FastAPI", "Claude AI", "PyMuPDF", "Python"],
    github: "https://github.com/Buildirnite/contrato-analyzer",
    featured: true
  },
  {
    id: 5,
    type: "data analytics",
    name: "Dashboard Criminalidad Chile",
    description: "Dashboard interactivo de estadísticas de criminalidad por región y tipo de delito. Filtros dinámicos, métricas y visualizaciones con Plotly.",
    tags: ["Python", "Streamlit", "Pandas", "Plotly", "NumPy"],
    github: "https://github.com/Buildirnite/criminalidad-chile",
    featured: true
  }
]
