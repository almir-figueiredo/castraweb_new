import axios from 'axios';

class HolidayController {
  async index(res) {
    try {
      // const year = req.body;
      const holidays = await axios.get(
        'https://api.calendario.com.br/?json=true&ano=2020&ibge=5300108&token=YWxtaXIuaWJyYW1AZ21haWwuY29tJmhhc2g9MTI4NDY2OTg3'
      );
      return res.json(holidays);
    } catch (err) {
      console.log(err.response);
      return res.json({ err });
    }
  }
}

export default new HolidayController();
