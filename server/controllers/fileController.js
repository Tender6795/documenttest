const fileService = require('../services/fileService');
const path = require('path');
const fs = require('fs');

const uploadFileController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileRecord = await fileService.uploadFile(req.file);
    res.json(fileRecord);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

const getAllFilesController = async (req, res) => {
  try {
    const files = await fileService.getAllFiles();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
};

const downloadFileController = async (req, res) => {
  const { documentId } = req.params;

  try {
    const file = await fileService.getFileById(documentId);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.sendFile(file.filePath, { root: '.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to download file' });
  }
};

module.exports = {
  uploadFileController,
  getAllFilesController,
  downloadFileController,
};
