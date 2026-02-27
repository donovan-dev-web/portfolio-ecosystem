import { ProjectType } from '@/backend/projects/projects.types';

const BASE_URL = '/api/projects';

export const ProjectAPI = {
  getAll: async (): Promise<ProjectType[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Erreur récupération projets');
    return res.json();
  },

  getById: async (id: string): Promise<ProjectType> => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Projet introuvable');
    return res.json();
  },

  create: async (
    data: ProjectType,
    files: {
      cover: File;
      galleryDesktop: File[];
      galleryMobile: File[];
    },
    token: string
  ) => {
    const formData = new FormData();

    formData.append('data', JSON.stringify(data));
    formData.append('coverImage', files.cover);

    files.galleryDesktop.forEach((file) =>
      formData.append('galleryDesktop', file)
    );

    files.galleryMobile.forEach((file) =>
      formData.append('galleryMobile', file)
    );

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error('Erreur création projet');

    return res.json();
  },
};
