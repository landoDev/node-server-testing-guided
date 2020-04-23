const knex = require('knex');
const config = require('../knexfile.js');

const environment = process.env.DB_ENV || 'development'; // grabbing DB_ENV

module.exports = knex(config[environment]);
