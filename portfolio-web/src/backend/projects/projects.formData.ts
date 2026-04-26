import { z } from 'zod';
import { zfd } from 'zod-form-data';

const optionalText = zfd.text(z.string().optional());

const ImageFileSchema = z.object({
  small: zfd.file(),
  medium: zfd.file(),
  large: zfd.file(),
});

const PresentationFormSchema = z.object({
  description: zfd.text(),
  context: zfd.text(),
  objectives: zfd.text(),
  skills: zfd.text(),
  results: zfd.text(),
  improvements: zfd.text(),
});

const GalleryFormItemSchema = z.object({
  desktop: ImageFileSchema,
  mobile: ImageFileSchema,
  alt: zfd.text(),
});

export const ProjectCreateFormSchema = zfd.formData({
  title: zfd.text(),
  projectType: zfd.text(),
  shortDescription: zfd.text(),
  githubUrl: optionalText,
  isLive: zfd.checkbox({ trueValue: 'true' }),
  liveUrl: optionalText,
  presentation: PresentationFormSchema,
  coverImage: ImageFileSchema,
  gallery: z.array(GalleryFormItemSchema).optional().default([]),
});

export type ProjectCreateFormData = z.infer<typeof ProjectCreateFormSchema>;
