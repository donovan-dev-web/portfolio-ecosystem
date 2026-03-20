import { Doc } from './docs.models';
import { DocType } from './docs.types';

export const DocsQueries = {
  create: (data: DocType) => new Doc(data).save(),

  getCv: () => Doc.findOne({ kind: 'cv' }),

  updateCv: (id: string, data: Partial<DocType>) =>
    Doc.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
    }),

  recordDownload: (id: string) =>
    Doc.findByIdAndUpdate(
      id,
      {
        $inc: { downloadCount: 1 },
        $set: { lastDownloadedAt: new Date() },
      },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    ),

  deleteCv: (id: string) => Doc.findByIdAndDelete(id),
};
