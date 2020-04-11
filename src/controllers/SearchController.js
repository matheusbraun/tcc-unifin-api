const Pet = require('../models/Pet');

module.exports = {
  async index(req, res, next) {
    try {
      // eslint-disable-next-line object-curly-newline
      const { distance, specie, latitude, longitude } = req.query;

      if (!latitude || !longitude) {
        return res.json([]);
      }

      let specieQuery = {};

      if (specie) {
        specieQuery = {
          $eq: specie,
        };
      } else {
        specieQuery = {
          $in: ['cat', 'dog'],
        };
      }

      const pets = await Pet.find({
        specie: specieQuery,
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: parseInt(distance, 10) * 1000,
          },
        },
      });

      return res.json(pets);
    } catch (err) {
      return next(err);
    }
  },
};
