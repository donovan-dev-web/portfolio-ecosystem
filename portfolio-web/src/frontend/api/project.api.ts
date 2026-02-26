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

  create: async (data: ProjectType, token: string) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Erreur création projet');
    return res.json();
  },
};
