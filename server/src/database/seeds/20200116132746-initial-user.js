const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Usuário Inicial',
          cpf: '99999999999',
          birthday: '2013-11-20',
          email: 'inicial@castraweb.com',
          phone: '987654321',
          address: 'Quadra do usuário teste nº 1',
          district: 'Brasília',
          zipcode: '7000000',
          group_mantainer: false,
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
