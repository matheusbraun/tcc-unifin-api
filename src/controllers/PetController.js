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

    const { path } = req.file;

    try {
      let pet = await Pet.findById(userId);

      if (!pet) {
        pet = await Pet.create({
          title,
          description,
          pet_description: petDescription,
          user_id: userId,
          image: path,
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
