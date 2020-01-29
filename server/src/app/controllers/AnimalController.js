import * as Yup from 'yup';
import Animal from '../models/Animal';
import User from '../models/User';

class AnimalController {
  async store(req, res) {
    const schema = Yup.object().shape({
      auth_number: Yup.string().required(),
      name: Yup.string().required(),
      specie: Yup.string().required(),
      gender: Yup.string().required(),
      race: Yup.string().required(),
      size: Yup.string().required(),
      age: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const numberOfAnimals = await Animal.findAndCountAll({
      where: {
        user_id: req.params.userId,
      },
    });

    if (numberOfAnimals.count >= 3) {
      return res.status(400).json({
        error:
          'O número de animais cadastrados atingiu o limite autorizado pelo termo.',
      });
    }
    const { auth_number, name, specie, gender, race, size, age } = req.body;
    const animalSave = await Animal.create({
      user_id: req.params.userId,
      auth_number,
      name,
      specie,
      gender,
      race,
      size,
      age,
    });

    const animal = await Animal.findByPk(animalSave.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'cpf', 'email', 'phone', 'district'],
        },
      ],
    });

    return res.json(animal);
  }

  async list(req, res) {
    // const cacheKey = `user:${req.userId}:appointments:${page}`;

    // const cached = await Cache.get(cacheKey);

    // if (cached) {
    //  return res.json(cached);
    // }

    const animals = await Animal.findAll({
      where: { user_id: req.params.userId },
      order: ['id'],
      attributes: ['id', 'name', 'specie', 'gender', 'race', 'size', 'age'],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'cpf', 'email', 'phone'],
        },
      ],
    });

    // await Cache.set(cacheKey, appointments);

    return res.json(animals);
  }

  async details(req, res) {
    const { id } = req.params;

    const animal = await Animal.findByPk(id);

    return res.status(200).json(animal);
  }

  async all(_, res) {
    const animal = await Animal.findAll();

    return res.status(200).json(animal);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      auth_number: Yup.string(),
      name: Yup.string(),
      specie: Yup.string(),
      gender: Yup.string(),
      race: Yup.string(),
      size: Yup.string(),
      age: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    let animal = await Animal.findByPk(id);

    animal = await animal.update(req.body);

    return res.status(200).json(animal);
  }

  async delete(req, res) {
    const { id } = req.params;
    Animal.destroy({ where: { id } });
    return res.status(200).json({ message: 'Deleted.' });
  }
}

export default new AnimalController();
