const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const FILE_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const validFileType = FILE_TYPES[file.mimetype];
    if (!validFileType) {
      const error = new Error('Invalid file format type.');
      return cb(error, './src/public/property');
    }
    cb(null, './src/public/property');
  },
  filename(req, file, cb) {
    const extension = FILE_TYPES[file.mimetype];
    const uniqueFileImage = `${uuidv4()}.${extension}`;
    cb(null, uniqueFileImage);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
