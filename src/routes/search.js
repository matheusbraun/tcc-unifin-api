const { Router } = require('express');
const SearchController = require('../controllers/SearchController');

const searchRouter = Router();

searchRouter.get('/search', SearchController.index);

module.exports = searchRouter;
