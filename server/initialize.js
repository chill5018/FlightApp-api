const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');
const defaults = require('lodash/defaults');

// Default environment is development to prevent "accidents"
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Reads in the needed config file from config/
const env = dotenv.parse(fs.readFileSync(path.resolve(
  __dirname,
  '..',
  'config',
  `${process.env.NODE_ENV}.env`
)));

// Sets all values from the config file
defaults(process.env, env);
