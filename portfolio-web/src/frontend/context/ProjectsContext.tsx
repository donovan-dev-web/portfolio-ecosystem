'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { ProjectType } from '@/backend/projects/projects.types';
import { ProjectAPI } from '../api/project.api';

type ProjectsContextType = {
  projects: ProjectType[];
  refresh: () => Promise<void>;
};

export const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const refresh = async () => {
    const data = await ProjectAPI.getAll();
    setProjects(data);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, refresh }}>
      {children}
    </ProjectsContext.Provider>
  );
}
