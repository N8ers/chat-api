const { development, production } = require('../knexfile');

// at some point make prod as well, and pass in based on env
const knex = require('knex')(development)
module.exports = knex;