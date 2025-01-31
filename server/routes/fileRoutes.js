const express = require('express');
const multer = require('multer');
const path = require('path');
const fileController = require('../controllers/fileController');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true); 
  };
const upload = multer({ storage, fileFilter });

const router = express.Router();

router.post('/upload', upload.single('file'), fileController.uploadFileController);
router.get('/files', fileController.getAllFilesController);
router.get('/extractions/:documentId', fileController.downloadFileController);

module.exports = router;
