const fs = require('fs/promises');
const path = require('path');

const uploadsRoot = path.join(__dirname, '..', 'uploads');
const docsRoot = path.join(uploadsRoot, 'docs');

async function ensureDocsDirectory() {
  await fs.mkdir(docsRoot, { recursive: true });
}

function buildStoredFileName(originalName) {
  const extension = path.extname(originalName || '').toLowerCase() || '.pdf';
  return `cv-${Date.now()}${extension}`;
}

exports.savePdf = async (file) => {
  if (!file || !file.buffer) {
    throw new Error('INVALID_DOCUMENT_FILE');
  }

  if (file.mimetype !== 'application/pdf') {
    throw new Error('INVALID_DOCUMENT_TYPE');
  }

  await ensureDocsDirectory();

  const storedFileName = buildStoredFileName(file.originalname);
  const absolutePath = path.join(docsRoot, storedFileName);

  await fs.writeFile(absolutePath, file.buffer);

  return {
    storedFileName,
    absolutePath,
    pathname: `/uploads/docs/${storedFileName}`,
  };
};

exports.deleteFileByPathname = async (pathname) => {
  if (!pathname) return;

  const normalizedPath = pathname.replace(/^\/+/, '');
  const absolutePath = path.join(__dirname, '..', normalizedPath);

  try {
    await fs.unlink(absolutePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
};
