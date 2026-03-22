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

export type ProjectType = {
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

export type ProjectRecordType = {
  _id?: string;
  slug?: string;
  title: string;
  order: number;
  projectType: string;
  technologies: string[];
  languages: string[];
  shortDescription: string;
  coverImage: {
    small: string;
    medium: string;
    large: string;
  };
  stack?: string[];
  presentation: {
    description: string;
    context: string;
    objectives: string;
    skills: string;
    results: string;
    improvements: string;
  };
  gallery?: {
    desktop: {
      small: string;
      medium: string;
      large: string;
    };
    mobile: {
      small: string;
      medium: string;
      large: string;
    };
    alt: string;
  }[];
  githubUrl?: string;
  isLive?: boolean;
  liveUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};
