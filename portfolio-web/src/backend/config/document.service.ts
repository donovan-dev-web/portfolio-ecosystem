import { del, put } from '@vercel/blob';
import { randomUUID } from 'crypto';

type UploadedDocument = {
  name: string;
  url: string;
  pathname: string;
  size: number;
  contentType: string;
};

function sanitizeFileName(fileName: string) {
  return fileName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

export const DocumentService = {
  async uploadPdf(file: File, folder: string): Promise<UploadedDocument> {
    if (!file || file.size <= 0) {
      throw new Error('INVALID_DOCUMENT_FILE');
    }

    if (file.type !== 'application/pdf') {
      throw new Error('INVALID_DOCUMENT_TYPE');
    }

    const originalName = file.name?.trim() || 'cv.pdf';
    const safeName = sanitizeFileName(originalName.replace(/\.pdf$/i, ''));
    const pathname = `${folder}/${randomUUID()}-${safeName || 'cv'}.pdf`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const blob = await put(pathname, buffer, {
      access: 'public',
      contentType: 'application/pdf',
      addRandomSuffix: false,
    });

    return {
      name: originalName.toLowerCase().endsWith('.pdf')
        ? originalName
        : `${originalName}.pdf`,
      url: blob.url,
      pathname: blob.pathname,
      size: file.size,
      contentType: 'application/pdf',
    };
  },

  async deleteFile(url?: string | null) {
    if (!url) return;
    await del(url);
  },
};
