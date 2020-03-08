const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const stringRequiredOptions = {
  type: String,
  required: true,
};

const PetSchema = new mongoose.Schema(
  {
    title: stringRequiredOptions,
    description: stringRequiredOptions,
    pet_description: stringRequiredOptions,
    user_id: stringRequiredOptions,
    image: stringRequiredOptions,
    location: {
      type: PointSchema,
      index: '2dsphere',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Pet', PetSchema);
