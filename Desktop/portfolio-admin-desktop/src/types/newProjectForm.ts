// src/types/newProjectForm.ts

export interface GalleryItemForm {
  desktopUrl: string
  mobileUrl: string
  alt: string
}

export interface PresentationForm {
  description: string
  context: string
  objectives: string
  skills: string
  results: string
  improvements: string
}

export interface NewProjectForm {
  title: string
  projectType: string
  technologies: string[]
  languages: string[]
  shortDescription: string
  coverImage: string
  githubUrl?: string
  isLive: boolean
  liveUrl?: string
  stack: string[]
  presentation: PresentationForm
  gallery: GalleryItemForm[]
}
