/* eslint-disable consistent-return */
import axios from 'axios';
import Holiday from '../models/Holiday';

class HolidayController {
  async store(req, res) {
    try {
      const year = req.body;
      const dates = await axios.get(
        `https://api.calendario.com.br/?json=true&ano=${year}&ibge=5300108&token=YWxtaXIuaWJyYW1AZ21haWwuY29tJmhhc2g9MTI4NDY2OTg3`
      );

      const datesList = dates.data.map(e => {
        const { date } = e;
        const { type } = e;
        const { type_code } = e;
        return {
          date,
          type,
          type_code,
        };
      });

      const holidays = datesList.map(async e => {
        const holDates = await Holiday.create(e);
        return holDates;
      });
      console.log(holidays);
      return res.json(holidays);
    } catch (error) {
      console.error(error);
    }
  }

  async list(_, res) {
    const dates = await axios.get(
      `https://api.calendario.com.br/?json=true&ano=2020&ibge=5300108&token=YWxtaXIuaWJyYW1AZ21haWwuY29tJmhhc2g9MTI4NDY2OTg3`
    );

    const datesList = dates.data.map(e => {
      const { date } = e;
      const { type } = e;
      const { type_code } = e;
      return {
        date,
        type,
        type_code,
      };
    });

    console.log(datesList.filter(f => f.type_code !== '9'));
    return res.json(datesList.filter(f => f.type_code !== '9'));
  }
}

export default new HolidayController();
