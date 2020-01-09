const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'clinics',
      [
        {
          name: 'Clínica Teste',
          cnpj: '99999999999',
          technical_legal: 'Responsável Técnico',
          email: 'rt@clinica.com',
          phone: '999999999',
          phone_24h: '999999999',
          address: 'endereço de teste',
          zipcode: '70000000',
          district: 'Brasília',
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
