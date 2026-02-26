export type GalleryItemType = {
  desktopUrl: string;
  mobileUrl: string;
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
  title: string;
  order: number;
  projectType: string;
  technologies: string[];
  languages: string[];
  shortDescription: string;
  coverImage: string;
  stack?: string[];
  presentation: PresentationType;
  gallery?: GalleryItemType[];
  githubUrl?: string;
  isLive?: boolean;
  liveUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};
