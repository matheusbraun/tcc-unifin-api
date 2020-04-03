/* eslint-disable object-curly-newline */
const Pet = require('../models/Pet');
const { findConnections, sendMessage } = require('../websocket');

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
      specie,
      description,
      latitude,
      longitude,
      filter,
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
          specie,
          description,
          image_url,
          image_key: key,
          location,
        });
      }

      const sendSocketMessageTo = findConnections(filter);

      sendMessage(sendSocketMessageTo, 'new-pet', pet);

      return res.json(pet);
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(422);
      }
      return next(err);
    }
  },
};
