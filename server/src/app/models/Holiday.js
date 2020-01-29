import Sequelize, { Model } from 'sequelize';

class Holiday extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.STRING,
        type: Sequelize.STRING,
        type_code: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Holiday;
