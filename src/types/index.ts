export interface Project {
  id: number
  type: string
  name: string
  description: string
  tags: string[]
  github: string
  demo?: string
  featured: boolean
}
