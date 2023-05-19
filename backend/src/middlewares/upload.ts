import multer from 'multer';
import path from 'path';
import logging from '../config/logging';

const NAMESPACE = 'upload_file';
export const FILE_PATH = '/app/src/public';

const storage = multer.diskStorage({
  destination: (request_, file, callback) => {
    callback(null, path.join(FILE_PATH, '/documents/'));
  },
  filename: (request_, file, callback) => {
    const filename = Date.now() + path.extname(file.originalname);
    callback(null, filename);
    logging.info(NAMESPACE, 'filename', filename);
  },
});

export const upload = multer({ storage });
