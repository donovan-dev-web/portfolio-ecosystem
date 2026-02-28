export interface ImageVariants {
  small: string
  medium: string
  large: string
}

export interface Project {
  _id: string
  title: string
  shortDescription: string
  coverImage: ImageVariants | string
  order: number
}
