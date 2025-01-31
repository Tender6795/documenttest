const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const uploadFile = async (file) => {
  const fileRecord = await prisma.file.create({
    data: {
      name: file.originalname,
      filePath: file.path,
    },
  });
  return fileRecord;
};

const getAllFiles = async () => {
  const files = await prisma.file.findMany();
  return files;
};

const getFileById = async (id) => {
  const file = await prisma.file.findUnique({
    where: { id },
  });
  return file;
};

module.exports = {
  uploadFile,
  getAllFiles,
  getFileById,
};
