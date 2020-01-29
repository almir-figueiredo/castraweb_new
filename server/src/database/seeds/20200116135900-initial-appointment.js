module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'appointments',
      [
        {
          date: '2020-01-17T03:00:00.000Z',
          user_id: 1,
          clinic_id: 1,
          animal_id: 1,
          canceled_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
