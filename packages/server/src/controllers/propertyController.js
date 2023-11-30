const { Property } = require('../models');

exports.createProperty = async (req, res, next) => {
  try {
    const { name, address, description } = req.body;

    const pictures = req.files ? req.files.map((file) => file.path) : [];
    const property = await Property.create({
      name,
      address,
      description,
      pictures,
    });

    return res.status(201).json({
      status: 'success',
      data: {
        property,
      },
    });
  } catch (error) {
    console.error('Error creating property:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error creating propert',
    });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json({
      status: 'success',
      data: {
        properties,
      },
    });
  } catch (error) {
    console.error('Error getting properties:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error getting properties',
    });
  }
};
