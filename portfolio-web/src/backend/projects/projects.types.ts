export type ImageVariants = {
  small: string;
  medium: string;
  large: string;
};

export type GalleryItemType = {
  desktop: ImageVariants;
  mobile: ImageVariants;
  alt: string;
};

export type PresentationType = {
  description: string;
  context: string;
  objectives: string;
  skills: string;
  results: string;
  improvements: string;
};

export type ProjectBaseType = {
  _id?: string;
  slug?: string;
  title: string;
  order: number;
  projectType: string;
  technologies: string[];
  languages: string[];
  shortDescription: string;
  coverImage: ImageVariants;
  stack?: string[];
  presentation: PresentationType;
  gallery?: GalleryItemType[];
  githubUrl?: string;
  isLive?: boolean;
  liveUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProjectType = ProjectBaseType;

export type ProjectRecordType = ProjectBaseType;
