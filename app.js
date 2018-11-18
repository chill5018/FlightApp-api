const fs = require('fs');
const path = require('path');

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
const defaults = require('lodash/defaults');
const cors = require('cors');

// Default environment is development to prevent "accidents"
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Reads in the needed config file from config/
const env = dotenv.parse(fs.readFileSync(path.resolve(
  __dirname,
  'config',
  `${process.env.NODE_ENV}.env`
)));

// Sets all values from the config file
defaults(process.env, env);

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./server/routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
