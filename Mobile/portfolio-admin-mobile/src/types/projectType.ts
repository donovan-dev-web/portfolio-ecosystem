export interface CoverImage {
  small: string
  medium: string
  large: string
}

export interface TagReference {
  _id?: string
  name?: string
  icon?: string
}

export interface Presentation {
  description?: string
  context?: string
  objectives?: string
  skills?: string
  results?: string
  improvements?: string
}

export interface Project {
  _id: string
  slug?: string
  title: string
  shortDescription: string
  coverImage: CoverImage
  order: number
  projectType?: string | TagReference
  technologies?: Array<string | TagReference>
  languages?: Array<string | TagReference>
  stack?: string[]
  presentation?: Presentation
  githubUrl?: string
  isLive?: boolean
  liveUrl?: string
  createdAt?: string
  updatedAt?: string
}
