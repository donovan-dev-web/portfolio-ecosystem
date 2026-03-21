import { ProjectQueries } from './projects.queries';
import { ProjectSchema, ReorderSchema } from './projects.schemaValidation';
import { ProjectType } from './projects.types';
import { buildProjectSlug, slugifyProjectTitle } from '@/utils/projectSlug';

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

async function ensureProjectSlug<T extends { _id?: string; title?: string; slug?: string }>(
  project: T | null
) {
  if (!project) return project;

  if (project.slug || !project._id || !project.title) {
    return project;
  }

  const slug = await generateUniqueProjectSlug(project.title, project._id);
  const updated = await ProjectQueries.updateSlug(project._id, slug);

  return updated as typeof project;
}

export const ProjectService = {
  getAll: async () => {
    const projects = await ProjectQueries.getAll();

    return Promise.all(projects.map((project) => ensureProjectSlug(project)));
  },

  getById: async (id: string) => {
    const project = await ProjectQueries.getById(id);
    return ensureProjectSlug(project);
  },

  getBySlug: async (slug: string) => {
    const project = await ProjectQueries.getBySlug(slug);

    if (project) {
      return ensureProjectSlug(project);
    }

    const projects = await ProjectQueries.getAllBasic();
    const matchingProject = projects.find((item) => {
      if (!item.title) return false;
      return slugifyProjectTitle(item.title) === slug;
    });

    if (!matchingProject?._id || !matchingProject.title) {
      return null;
    }

    const ensuredSlug = await generateUniqueProjectSlug(
      matchingProject.title,
      matchingProject._id.toString()
    );

    await ProjectQueries.updateSlug(matchingProject._id.toString(), ensuredSlug);

    return ProjectQueries.getBySlug(ensuredSlug);
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
