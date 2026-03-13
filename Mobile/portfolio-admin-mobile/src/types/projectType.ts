export interface CoverImage {
  small: string
  medium: string
  large: string
}

export interface Project {
  _id: string
  title: string
  shortDescription: string
  coverImage: CoverImage
  order: number
}
