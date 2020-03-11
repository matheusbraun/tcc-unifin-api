const Pet = require('../models/Pet');

module.exports = {
  async index(req, res, next) {
    try {
      const pets = await Pet.find();

      return res.json(pets);
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    const {
      title,
      size,
      color,
      petType,
      description,
      latitude,
      longitude,
    } = req.body;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const { key, location: image_url = '' } = req.file;

    try {
      let pet = '';

      if (!pet) {
        pet = await Pet.create({
          title,
          size,
          color,
          pet_type: petType,
          description,
          image_url,
          image_key: key,
          location,
        });
      }

      return res.json(pet);
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(422);
      }
      return next(err);
    }
  },
};
