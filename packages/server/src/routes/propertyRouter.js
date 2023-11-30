const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const upload = require('../middleware/multer');

router.post(
  '/property',
  upload.array('images', 6),
  propertyController.createProperty,
);

router.get('/property', propertyController.getProperties);

module.exports = router;
