import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const UPLOAD_DIRS = [
  './uploads/images',
  './uploads/videos',
  './uploads/audios',
  './uploads/documents',
];

// Ensure upload directories exist
UPLOAD_DIRS.forEach((dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

const getDestination = (mimeType: string): string => {
  if (mimeType.startsWith('image/')) {
    return './uploads/images';
  }
  if (mimeType.startsWith('video/')) {
    return './uploads/videos';
  }
  if (mimeType.startsWith('audio/')) {
    return './uploads/audios';
  }
  return './uploads/documents';
};

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const dest = getDestination(file.mimetype);
      callback(null, dest);
    },
    filename: (req, file, callback) => {
      const ext = extname(file.originalname);
      const filename = `${uuidv4()}${ext}`;
      callback(null, filename);
    },
  }),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype) {
      callback(new BadRequestException('Invalid file type'), false);
      return;
    }
    callback(null, true);
  },
};
