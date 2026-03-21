import { Project } from './projects.models';
import { ProjectType } from './projects.types';

export const ProjectQueries = {
  getAll: () =>
    Project.find()
      .populate('projectType')
      .populate('technologies')
      .populate('languages')
      .sort({ order: 1 }),

  getById: (id: string) =>
    Project.findById(id)
      .populate('projectType')
      .populate('technologies')
      .populate('languages'),

  getBySlug: (slug: string) =>
    Project.findOne({ slug })
      .populate('projectType')
      .populate('technologies')
      .populate('languages'),

  getOneBySlug: (slug: string) => Project.findOne({ slug }),

  getOneById: (id: string) => Project.findById(id),

  getAllBasic: () => Project.find().select('_id title slug'),

  getOneByTitle: (title: string) => Project.findOne({ title }),

  slugExists: async (slug: string, excludeId?: string) => {
    const existing = await Project.findOne(
      excludeId ? { slug, _id: { $ne: excludeId } } : { slug }
    )
      .select('_id')
      .lean();

    return Boolean(existing);
  },

  create: (data: ProjectType) => new Project(data).save(),

  update: (id: string, data: ProjectType) =>
    Project.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
    }),

  updateSlug: (id: string, slug: string) =>
    Project.findByIdAndUpdate(
      id,
      { $set: { slug } },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    )
      .populate('projectType')
      .populate('technologies')
      .populate('languages'),

  delete: (id: string) => Project.findByIdAndDelete(id),

  reorder: (updates: { id: string; order: number }[]) => {
    const bulkOps = updates.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } },
      },
    }));

    return Project.bulkWrite(bulkOps);
  },
};
