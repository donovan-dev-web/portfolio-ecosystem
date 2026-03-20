import { DocumentService } from '../config/document.service';
import { PushNotificationService } from '../config/pushNotification.service';
import { DocsQueries } from './docs.queries';
import { DocSchema } from './docs.schemaValidation';
import { DocType } from './docs.types';

type UploadedPdfPayload = {
  name: string;
  url: string;
  pathname: string;
  contentType: string;
  size: number;
};

function buildCvDocument(data: UploadedPdfPayload): DocType {
  return DocSchema.parse({
    kind: 'cv',
    ...data,
    downloadCount: 0,
  });
}

export const DocsServices = {
  getCv: () => DocsQueries.getCv(),

  async createCv(file: File) {
    const existingCv = await DocsQueries.getCv();

    if (existingCv) {
      throw new Error('DOC_ALREADY_EXISTS');
    }

    const uploadedFile = await DocumentService.uploadPdf(file, 'docs');
    const payload = buildCvDocument(uploadedFile);

    try {
      return await DocsQueries.create(payload);
    } catch (error) {
      await DocumentService.deleteFile(uploadedFile.url);
      throw error;
    }
  },

  async updateCv(file: File) {
    const existingCv = await DocsQueries.getCv();

    if (!existingCv) {
      return null;
    }

    const uploadedFile = await DocumentService.uploadPdf(file, 'docs');
    const payload = buildCvDocument(uploadedFile);

    try {
      const updatedCv = await DocsQueries.updateCv(existingCv._id.toString(), {
        ...payload,
        downloadCount: existingCv.downloadCount ?? 0,
      });

      if (!updatedCv) {
        await DocumentService.deleteFile(uploadedFile.url);
        return null;
      }

      await DocumentService.deleteFile(existingCv.url);

      return updatedCv;
    } catch (error) {
      await DocumentService.deleteFile(uploadedFile.url);
      throw error;
    }
  },

  async deleteCv() {
    const existingCv = await DocsQueries.getCv();

    if (!existingCv) {
      return null;
    }

    const deleted = await DocsQueries.deleteCv(existingCv._id.toString());

    if (!deleted) {
      return null;
    }

    await DocumentService.deleteFile(existingCv.url);

    return deleted;
  },

  async handleCvDownload(docId: string) {
    const [updatedDoc] = await Promise.allSettled([
      DocsQueries.recordDownload(docId),
      PushNotificationService.sendNotification(
        'CV telecharge',
        'Le CV a ete telecharge',
        {
          kind: 'cv',
          docId,
        }
      ),
    ]);

    if (updatedDoc.status === 'fulfilled') {
      return updatedDoc.value;
    }

    return null;
  },
};
