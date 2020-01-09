import * as Yup from 'yup';
import { Op } from 'sequelize';
import Operator from '../models/Operator';

class OperatorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      cpf: Yup.string(),
      email: Yup.string().email(),
      registration: Yup.string(),
      type: Yup.string(),
      password: Yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const cpfExists = await Operator.findOne({ where: { cpf: req.body.cpf } });

    if (cpfExists) {
      return res.status(400).json({ error: 'Operator already exists.' });
    }
    const operatorExists = await Operator.findOne({
      where: { email: req.body.email },
    });

    if (operatorExists) {
      return res.status(400).json({ error: 'Operator already exists.' });
    }

    const { id, name, cpf, email, registration, type } = await Operator.create(
      req.body
    );

    /* if (clinic) {
      await Cache.invalidate('clinics');
    } */

    return res.json({
      id,
      name,
      cpf,
      email,
      registration,
      type,
    });
  }

  async list(req, res) {
    const { name } = req.query;

    if (name) {
      const operators = await Operator.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      return res.status(200).json(operators);
    }

    const operators = await Operator.findAll();

    return res.status(200).json(operators);
  }

  async details(req, res) {
    const { id } = req.params;

    const operator = await Operator.findByPk(id);

    return res.status(200).json(operator);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      cpf: Yup.string(),
      email: Yup.string().email(),
      registration: Yup.string(),
      type: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { id } = req.params;

    let operator = await Operator.findByPk(id);

    operator = await operator.update(req.body);

    return res.status(200).json(operator);
  }

  async delete(req, res) {
    const { id } = req.params;
    Operator.destroy({ where: { id } });
    return res.status(200).json({ message: 'Deleted.' });
  }
}

export default new OperatorController();
