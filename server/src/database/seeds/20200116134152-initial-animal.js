module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'animals',
      [
        {
          user_id: '1',
          name: 'Animal inicial',
          auth_number: '0',
          specie: 'canina',
          gender: 'M',
          race: 'srd',
          size: 'P',
          age: '1',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
