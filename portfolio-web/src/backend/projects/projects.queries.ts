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

  create: (data: ProjectType) => new Project(data).save(),

  update: (id: string, data: ProjectType) =>
    Project.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
    }),

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
