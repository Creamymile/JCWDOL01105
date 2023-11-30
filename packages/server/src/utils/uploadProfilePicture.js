const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const FILE_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storageFile = multer.diskStorage({
  destination: function (req, file, cb) {
    const validFileType = FILE_TYPES[file.mimetype];
    if (!validFileType) {
      const error = new Error('Invalid file format type.');
      return cb(error, './src/public/profile');
    }
    cb(null, './src/public/profile');
  },
  filename: function (req, file, cb) {
    const extension = FILE_TYPES[file.mimetype];

    const uniqueFileImage = `${file.fieldname}_${Date.now()}.${extension}`;

    cb(null, uniqueFileImage);
  },
});

exports.uploadOptions = multer({ storage: storageFile });
