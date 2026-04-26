const express = require('express');
const multer = require('multer');
const auth = require('../middlesware/auth');
const docsController = require('../controller/docsController');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.get('/', docsController.downloadCv);
router.get('/meta', auth, docsController.getDocumentMeta);
router.post('/', auth, upload.single('file'), docsController.createCv);
router.put('/', auth, upload.single('file'), docsController.updateCv);
router.delete('/', auth, docsController.deleteCv);

module.exports = router;
