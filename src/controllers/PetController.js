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
      description,
      petDescription,
      userId,
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
          description,
          pet_description: petDescription,
          user_id: userId,
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
