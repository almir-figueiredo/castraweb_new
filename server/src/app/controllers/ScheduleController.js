import { subHours, startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import Appointment from '../models/Appointment';
import User from '../models/User';
import Animal from '../models/Animal';

class ScheduleController {
  async list(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);
    if (date) {
      const appointments = await Appointment.findAll({
        where: {
          canceled_at: null,
          date: {
            [Op.between]: [
              subHours(startOfDay(parsedDate), 2),
              subHours(endOfDay(parsedDate), 2),
            ],
          },
        },
        attributes: ['id', 'date', 'cancelable', 'situation', 'clinic_id'],
        include: [
          {
            model: User,
            attributes: ['name', 'cpf', 'email', 'phone', 'district'],
            order: ['name'],
          },
          {
            model: Animal,
            attributes: ['name', 'specie', 'gender', 'race', 'age', 'size'],
          },
        ],
      });

      return res.json(appointments);
    }
    const schedule = await Appointment.findAll({
      // where: clinic_id,
      attributes: ['id', 'date', 'cancelable', 'situation', 'clinic_id'],
      include: [
        {
          model: User,
          attributes: ['name', 'cpf', 'email', 'phone', 'district'],
          order: ['name'],
        },
        {
          model: Animal,
          attributes: ['name', 'specie', 'gender', 'race', 'age', 'size'],
        },
      ],
    });

    return res.status(200).json(schedule);
  }

  async details(req, res) {
    const { id } = req.params;

    const schedule = await Appointment.findByPk(id);

    return res.status(200).json(schedule);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      cpf: Yup.string(),
      email: Yup.string(),
      phone: Yup.string(),
      district: Yup.string(),
      animal_name: Yup.string(),
      specie: Yup.string(),
      gender: Yup.string(),
      race: Yup.string(),
      age: Yup.string(),
      size: Yup.string(),
      situation: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { id } = req.params;

    const schedule = await Appointment.findByPk(id);

    const {
      name,
      cpf,
      email,
      phone,
      district,
      animal_name,
      specie,
      gender,
      race,
      age,
      size,
      situation,
    } = await schedule.update(req.body);

    return res.status(200).json({
      situation,
      User: {
        name,
        cpf,
        email,
        phone,
        district,
      },
      Animal: {
        name: animal_name,
        specie,
        gender,
        race,
        age,
        size,
      },
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    Appointment.destroy({ where: { id } });
    return res.status(200).json({ message: 'Deleted.' });
  }
}

export default new ScheduleController();
