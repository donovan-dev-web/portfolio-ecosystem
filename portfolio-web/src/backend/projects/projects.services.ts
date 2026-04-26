import { ProjectQueries } from './projects.queries';
import { ProjectSchema, ReorderSchema } from './projects.schemaValidation';
import { ProjectType } from './projects.types';
import { buildProjectSlug } from '@/utils/projectSlug';

async function generateUniqueProjectSlug(title: string, excludeId?: string) {
  const baseSlug = buildProjectSlug(title, 'project');
  let candidate = baseSlug;
  let suffix = 2;

  while (await ProjectQueries.slugExists(candidate, excludeId)) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

function withProjectSlug<T extends { title?: string; slug?: string }>(project: T | null) {
  if (!project) return project;

  if (project.slug || !project.title) {
    return project;
  }

  return {
    ...project,
    slug: buildProjectSlug(project.title, 'project'),
  };
}

export const ProjectService = {
  getAll: async () => {
    const projects = await ProjectQueries.getAll();

    return projects.map((project) => withProjectSlug(project));
  },

  getById: async (id: string) => {
    const project = await ProjectQueries.getById(id);
    return withProjectSlug(project);
  },

  getBySlug: async (slug: string) => {
    const project = await ProjectQueries.getBySlug(slug);

    if (project) {
      return withProjectSlug(project);
    }

    const projects = await ProjectQueries.getAllBasic();
    const matchingProject = projects.find((item) => {
      if (!item.title) return false;
      return buildProjectSlug(item.title, 'project') === slug;
    });

    if (!matchingProject?._id) {
      return null;
    }

    return ProjectService.getById(matchingProject._id.toString());
  },

  create: async (data: ProjectType) => {
    const payload = {
      ...data,
      slug: await generateUniqueProjectSlug(data.title),
    };

    ProjectSchema.parse(payload);
    return ProjectQueries.create(payload);
  },

  update: async (id: string, data: ProjectType) => {
    const existingProject = await ProjectQueries.getOneById(id);

    if (!existingProject) {
      return null;
    }

    const shouldRegenerateSlug =
      !existingProject.slug || existingProject.title !== data.title;

    const payload = {
      ...data,
      slug: shouldRegenerateSlug
        ? await generateUniqueProjectSlug(data.title, id)
        : existingProject.slug,
    };

    ProjectSchema.parse(payload);
    return ProjectQueries.update(id, payload);
  },

  delete: (id: string) => ProjectQueries.delete(id),

  reorder: (data: { id: string; order: number }[]) => {
    ReorderSchema.parse(data);
    return ProjectQueries.reorder(data);
  },
};
