import {
  ProjectTypeType,
  TechnologyType,
  ProgrammingLanguageType,
} from '@/backend/tags/tags.types';

type TagCategory = 'project-types' | 'technologies' | 'languages';

const base = (category: TagCategory) => `/api/${category}`;

export const TagsAPI = {
  getAll: async <T>(category: TagCategory): Promise<T[]> => {
    const res = await fetch(base(category));

    console.log('STATUS:', res.status);

    if (!res.ok) {
      const text = await res.text();
      console.log('ERROR BODY:', text);
      throw new Error('Erreur récupération tags');
    }

    return res.json();
  },

  getOne: async <T>(category: TagCategory, id: string): Promise<T> => {
    const res = await fetch(`${base(category)}/${id}`);
    if (!res.ok) throw new Error('Tag introuvable');
    return res.json();
  },

  create: async <T>(
    category: TagCategory,
    data: T,
    token: string
  ): Promise<T> => {
    const res = await fetch(base(category), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Erreur création tag');
    return res.json();
  },

  update: async <T>(
    category: TagCategory,
    id: string,
    data: T,
    token: string
  ): Promise<T> => {
    const res = await fetch(`${base(category)}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Erreur modification tag');
    return res.json();
  },
};
