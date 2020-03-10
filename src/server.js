require('dotenv/config');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const petsRoute = require('./routes/pets');
const { notFound, errorHandler } = require('./middlewares/error');
const { dbConnectionUrl, dbConnectionOptions } = require('./config/db');

const app = express();

mongoose.connect(dbConnectionUrl, dbConnectionOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(petsRoute);
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
);

app.use(notFound);
app.use(errorHandler);

app.listen(3333);
