const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then( async () => {
      // Inserts seed entries
      const password = await bcrypt.hash('admtestdatabase', 10);

      return knex('users').insert([
        {name: 'adm', email: 'adm@adm.com', password: password},
      ]);
    });
};
