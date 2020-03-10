/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const PointSchema = require('./utils/PointSchema');

const s3 = new aws.S3();

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
    image_url: stringRequiredOptions,
    image_key: stringRequiredOptions,
    location: {
      type: PointSchema,
      index: '2dsphere',
    },
  },
  {
    timestamps: true,
  },
);

PetSchema.pre('save', function() {
  if (!this.image_url) {
    this.image_url = `${process.env.APP_URL}/files/${this.image_key}`;
  }
});

PetSchema.pre('remove', function() {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: this.key,
      })
      .promise()
      .then(response => {
        console.log(response.status);
      })
      .catch(response => {
        console.log(response.status);
      });
  }
  return promisify(fs.unlink)(
    path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key),
  );
});

module.exports = mongoose.model('Pet', PetSchema);
