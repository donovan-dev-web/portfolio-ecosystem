// src/types/newProjectForm.ts

export interface ImageVariant {
  small: File | null
  medium: File | null
  large: File | null
}

export interface GalleryItemForm {
  desktop: ImageVariant
  mobile: ImageVariant
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
  coverImage: ImageVariant
  githubUrl?: string
  isLive: boolean
  liveUrl?: string
  stack: string[]
  presentation: PresentationForm
  gallery: GalleryItemForm[]
}
