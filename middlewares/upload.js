import multer from 'multer';
import path from 'path';
import * as crypto from 'crypto';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'temp'));
  },
  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extName);
    const sufix = crypto.randomUUID();
    cb(null, `${baseName}_${sufix}${extName}`);
  },
  //   limits: {
  //     fileSize: 2048,
  //   },
});

const upload = multer({ storage: storage });
export default upload;
