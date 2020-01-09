const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'operators',
      [
        {
          name: 'Administrador',
          cpf: '99999999999',
          registration: '1',
          email: 'admin@castraweb.com',
          type: 'Executor do Contrato',
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
