import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';

// import Cache from '../../lib/Cache';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      cpf: Yup.string(),
      birthday: Yup.string(),
      email: Yup.string().email(),
      phone: Yup.string(),
      address: Yup.string(),
      district: Yup.string(),
      zipcode: Yup.string(),
      password: Yup.string().min(6),
      group_mantainer: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const cpfExists = await User.findOne({ where: { cpf: req.body.cpf } });

    if (cpfExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const {
      id,
      name,
      cpf,
      birthday,
      email,
      phone,
      address,
      district,
      zipcode,
      group_mantainer,
    } = await User.create(req.body);

    /* if (clinic) {
      await Cache.invalidate('clinics');
    } */

    return res.json({
      id,
      name,
      cpf,
      birthday,
      email,
      phone,
      address,
      district,
      zipcode,
      group_mantainer,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      cpf: Yup.string(),
      birthday: Yup.string(),
      email: Yup.string().email(),
      phone: Yup.string(),
      address: Yup.string(),
      district: Yup.string(),
      zipcode: Yup.string(),
      group_mantainer: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    let user = await User.findByPk(id);

    user = await user.update(req.body);

    return res.status(200).json(user);
  }

  async list(req, res) {
    const { name } = req.query;

    if (name) {
      const users = await User.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      return res.status(200).json(users);
    }

    const users = await User.findAll();

    return res.status(200).json(users);
  }

  async details(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    return res.status(200).json(user);
  }

  async delete(req, res) {
    const { id } = req.params;
    User.destroy({ where: { id } });
    return res.status(200).json({ message: 'Deleted.' });
  }
}

export default new UserController();
