const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');
const PetController = require('../controllers/PetController');

const petsRouter = Router();

petsRouter.get('/pets', PetController.index);
petsRouter.post(
  '/pets',
  multer(multerConfig).single('petImage'),
  PetController.store,
);

module.exports = petsRouter;
