import * as Yup from 'yup';
import { Op } from 'sequelize';
import Clinic from '../models/Clinic';

// import Cache from '../../lib/Cache';

class ClinicController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cnpj: Yup.string().required(),
      technical_legal: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.string().required(),
      phone_24h: Yup.string().required(),
      address: Yup.string().required(),
      zipcode: Yup.string().required(),
      district: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const cnpjExists = await Clinic.findOne({ where: { cnpj: req.body.cnpj } });

    if (cnpjExists) {
      return res.status(400).json({ error: 'clinic already exists.' });
    }
    const clinicExists = await Clinic.findOne({
      where: { email: req.body.email },
    });

    if (clinicExists) {
      return res.status(400).json({ error: 'clinic already exists.' });
    }

    const {
      id,
      name,
      cnpj,
      technical_legal,
      email,
      phone,
      phone_24h,
      address,
      zipCode,
      district,
    } = await Clinic.create(req.body);

    /* if (clinic) {
      await Cache.invalidate('clinics');
    } */

    return res.json({
      id,
      name,
      cnpj,
      technical_legal,
      email,
      phone,
      phone_24h,
      address,
      zipCode,
      district,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      cnpj: Yup.string(),
      technical_legal: Yup.string(),
      email: Yup.string().email(),
      phone: Yup.string(),
      phone_24h: Yup.string(),
      address: Yup.string(),
      district: Yup.string(),
      zipCode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }
    const { id } = req.params;

    const clinic = await Clinic.findByPk(id);

    const {
      name,
      cnpj,
      technical_legal,
      email,
      phone,
      phone_24h,
      address,
      district,
      zipCode,
    } = await clinic.update(req.body);

    return res.json({
      id,
      name,
      cnpj,
      technical_legal,
      email,
      phone,
      phone_24h,
      address,
      district,
      zipCode,
    });
  }

  async list(req, res) {
    const { name } = req.query;

    if (name) {
      const clinics = await Clinic.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      return res.status(200).json(clinics);
    }

    const clinics = await Clinic.findAll();

    return res.status(200).json(clinics);
  }

  async details(req, res) {
    const { id } = req.params;

    const clinic = await Clinic.findByPk(id);

    return res.status(200).json(clinic);
  }

  async delete(req, res) {
    const { id } = req.params;
    Clinic.destroy({ where: { id } });
    return res.status(200).json({ message: 'Deleted.' });
  }
}

export default new ClinicController();
