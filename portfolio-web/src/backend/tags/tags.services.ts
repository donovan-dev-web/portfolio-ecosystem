import { TagQueries } from './tags.queries';
import {
  ProjectTypeSchema,
  TechnologySchema,
  ProgrammingLanguageSchema,
} from './tags.schema';
import {
  ProjectTypeType,
  TechnologyType,
  ProgrammingLanguageType,
} from './tags.types';

export const TagService = {
  // ProjectType
  getAllProjectTypes: () => TagQueries.getAllProjectTypes(),
  getProjectTypeById: (id: string) => TagQueries.getProjectTypeById(id),
  createProjectType: (data: ProjectTypeType) => {
    ProjectTypeSchema.parse(data);
    return TagQueries.createProjectType(data);
  },
  updateProjectType: (id: string, data: ProjectTypeType) => {
    ProjectTypeSchema.parse(data);
    return TagQueries.updateProjectType(id, data);
  },
  deleteProjectType: (id: string) => TagQueries.deleteProjectType(id),

  // Technology
  getAllTechnologies: () => TagQueries.getAllTechnologies(),
  getTechnologyById: (id: string) => TagQueries.getTechnologyById(id),
  createTechnology: (data: TechnologyType) => {
    TechnologySchema.parse(data);
    return TagQueries.createTechnology(data);
  },
  updateTechnology: (id: string, data: TechnologyType) => {
    TechnologySchema.parse(data);
    return TagQueries.updateTechnology(id, data);
  },
  deleteTechnology: (id: string) => TagQueries.deleteTechnology(id),

  // ProgrammingLanguage
  getAllLanguages: () => TagQueries.getAllLanguages(),
  getLanguageById: (id: string) => TagQueries.getLanguageById(id),
  createLanguage: (data: ProgrammingLanguageType) => {
    ProgrammingLanguageSchema.parse(data);
    return TagQueries.createLanguage(data);
  },
  updateLanguage: (id: string, data: ProgrammingLanguageType) => {
    ProgrammingLanguageSchema.parse(data);
    return TagQueries.updateLanguage(id, data);
  },
  deleteLanguage: (id: string) => TagQueries.deleteLanguage(id),
};
