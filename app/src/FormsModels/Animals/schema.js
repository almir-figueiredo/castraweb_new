import * as Yup from 'yup';

export default function AnimalNew() {
  const schema = Yup.object().shape({
    auth_number: Yup.string(),
    name: Yup.string(),
    specie: Yup.string(),
    gender: Yup.string(),
    race: Yup.string(),
    size: Yup.string(),
    age: Yup.string(),
  }),
};
