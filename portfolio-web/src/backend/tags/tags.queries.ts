import { ProjectType } from './models/projectType.model';
import { Technology } from './models/technology.model';
import { ProgrammingLanguage } from './models/programmingLanguage.model';
import {
  ProjectTypeType,
  TechnologyType,
  ProgrammingLanguageType,
} from './tags.types';

export const TagQueries = {
  // ProjectType
  getAllProjectTypes: () => ProjectType.find(),
  getProjectTypeById: (id: string) => ProjectType.findById(id),
  createProjectType: (data: ProjectTypeType) => new ProjectType(data).save(),
  updateProjectType: (id: string, data: ProjectTypeType) =>
    ProjectType.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
    }),
  deleteProjectType: (id: string) => ProjectType.findByIdAndDelete(id),

  // Technology
  getAllTechnologies: () => Technology.find(),
  getTechnologyById: (id: string) => Technology.findById(id),
  createTechnology: (data: TechnologyType) => new Technology(data).save(),
  updateTechnology: (id: string, data: TechnologyType) =>
    Technology.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
    }),
  deleteTechnology: (id: string) => Technology.findByIdAndDelete(id),

  // ProgrammingLanguage
  getAllLanguages: () => ProgrammingLanguage.find(),
  getLanguageById: (id: string) => ProgrammingLanguage.findById(id),
  createLanguage: (data: ProgrammingLanguageType) =>
    new ProgrammingLanguage(data).save(),
  updateLanguage: (id: string, data: ProgrammingLanguageType) =>
    ProgrammingLanguage.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
    }),
  deleteLanguage: (id: string) => ProgrammingLanguage.findByIdAndDelete(id),
};
