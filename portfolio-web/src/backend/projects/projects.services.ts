import { ProjectQueries } from './projects.queries';
import { ProjectSchema, ReorderSchema } from './projects.schemaValidation';
import { ProjectType } from './projects.types';

export const ProjectService = {
  getAll: () => ProjectQueries.getAll(),

  getById: (id: string) => ProjectQueries.getById(id),

  create: (data: ProjectType) => {
    ProjectSchema.parse(data);
    return ProjectQueries.create(data);
  },

  update: (id: string, data: ProjectType) => {
    ProjectSchema.parse(data);
    return ProjectQueries.update(id, data);
  },

  delete: (id: string) => ProjectQueries.delete(id),

  reorder: (data: { id: string; order: number }[]) => {
    ReorderSchema.parse(data);
    return ProjectQueries.reorder(data);
  },
};
