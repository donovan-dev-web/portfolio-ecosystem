const Document = require('../models/DocumentModel');
const documentStorageService = require('../services/documentStorageService');
const pushService = require('../services/pushNotificationService');

function buildDocumentUrl(req, pathname) {
  return `${req.protocol}://${req.get('host')}${pathname}`;
}

function buildContentDisposition(fileName) {
  const fallback = (fileName || 'cv.pdf').replace(/[^\x20-\x7E]+/g, '_');
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encodeURIComponent(fileName || 'cv.pdf')}`;
}

function buildDocumentPayload(req, file, storageResult) {
  return {
    kind: 'cv',
    name: file.originalname || 'cv.pdf',
    url: buildDocumentUrl(req, storageResult.pathname),
    pathname: storageResult.pathname,
    contentType: file.mimetype,
    size: file.size,
  };
}

exports.getDocumentMeta = async (_req, res) => {
  try {
    const doc = await Document.findOne({ kind: 'cv' });

    if (!doc) {
      return res.status(404).json({ message: 'Document non trouvé' });
    }

    return res.status(200).json(doc);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Impossible de récupérer les métadonnées du document', error: error.message });
  }
};

exports.downloadCv = async (req, res) => {
  try {
    const doc = await Document.findOne({ kind: 'cv' });

    if (!doc) {
      return res.status(404).json({ message: 'Document non trouvé' });
    }

    doc.downloadCount += 1;
    doc.lastDownloadedAt = new Date();
    await doc.save();

    await pushService.sendNotification(
      'CV telecharge',
      `Le CV a ete telecharge ${doc.downloadCount} fois`,
      {
        notificationType: 'document',
        kind: 'cv',
        docId: doc._id.toString(),
        downloadCount: doc.downloadCount,
      }
    );

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Disposition', buildContentDisposition(doc.name));

    return res.redirect(307, doc.url);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Impossible de récupérer le document', error: error.message });
  }
};

exports.createCv = async (req, res) => {
  try {
    const existing = await Document.findOne({ kind: 'cv' });

    if (existing) {
      return res.status(409).json({
        message: 'Un document est deja present, utilisez PUT pour le remplacer',
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Le fichier PDF est requis' });
    }

    const storageResult = await documentStorageService.savePdf(req.file);
    const payload = buildDocumentPayload(req, req.file, storageResult);

    try {
      const created = await Document.create(payload);
      return res.status(201).json(created);
    } catch (error) {
      await documentStorageService.deleteFileByPathname(storageResult.pathname);
      throw error;
    }
  } catch (error) {
    const status =
      error.message === 'INVALID_DOCUMENT_FILE' ||
      error.message === 'INVALID_DOCUMENT_TYPE'
        ? 400
        : 500;

    return res
      .status(status)
      .json({ message: "Impossible d'ajouter le document", error: error.message });
  }
};

exports.updateCv = async (req, res) => {
  try {
    const existing = await Document.findOne({ kind: 'cv' });

    if (!existing) {
      return res.status(404).json({ message: 'Document non trouvé' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Le fichier PDF est requis' });
    }

    const storageResult = await documentStorageService.savePdf(req.file);
    const payload = buildDocumentPayload(req, req.file, storageResult);
    const previousPathname = existing.pathname;

    try {
      existing.name = payload.name;
      existing.url = payload.url;
      existing.pathname = payload.pathname;
      existing.contentType = payload.contentType;
      existing.size = payload.size;
      await existing.save();

      await documentStorageService.deleteFileByPathname(previousPathname);

      return res.status(200).json(existing);
    } catch (error) {
      await documentStorageService.deleteFileByPathname(storageResult.pathname);
      throw error;
    }
  } catch (error) {
    const status =
      error.message === 'INVALID_DOCUMENT_FILE' ||
      error.message === 'INVALID_DOCUMENT_TYPE'
        ? 400
        : 500;

    return res
      .status(status)
      .json({ message: 'Impossible de mettre à jour le document', error: error.message });
  }
};

exports.deleteCv = async (_req, res) => {
  try {
    const existing = await Document.findOne({ kind: 'cv' });

    if (!existing) {
      return res.status(404).json({ message: 'Document non trouvé' });
    }

    await Document.findByIdAndDelete(existing._id);
    await documentStorageService.deleteFileByPathname(existing.pathname);

    return res.status(200).json({ message: 'Document supprimé' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Impossible de supprimer le document', error: error.message });
  }
};
