const knexFile = require('../../knexfile');

//usa as funções do Development
const knex = require('knex')(knexFile.development);

module.exports = knex;