
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'adm', email: 'adm@adm.com', password: '123456'},
      ]);
    });
};
