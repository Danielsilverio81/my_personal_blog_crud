const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath =('./public/uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext === '.jpg' || ext === '.png' || ext === '.jpeg') {
      cb(null, `${uniqueSuffix}${ext}`);
    } else {
      cb(new Error('Somente arquivos jpg, jpeg ou png são permitidos!'), null);
    }
  },
});

const upload = multer({ storage });

module.exports = upload;