'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import { TagsAPI } from '../api/tags.api';

type TagCategory = 'project-types' | 'technologies' | 'languages';

type TagsContextType = {
  tags: Record<TagCategory, any[]>;
  refresh: (category: TagCategory) => Promise<void>;
};

export const TagsContext = createContext<TagsContextType | null>(null);

export function TagsProvider({ children }: { children: ReactNode }) {
  const [tags, setTags] = useState<Record<TagCategory, any[]>>({
    'project-types': [],
    technologies: [],
    languages: [],
  });

  const refresh = async (category: TagCategory) => {
    const data = await TagsAPI.getAll(category);
    setTags((prev) => ({ ...prev, [category]: data }));
  };

  useEffect(() => {
    refresh('project-types');
    refresh('technologies');
    refresh('languages');
  }, []);

  return (
    <TagsContext.Provider value={{ tags, refresh }}>
      {children}
    </TagsContext.Provider>
  );
}
