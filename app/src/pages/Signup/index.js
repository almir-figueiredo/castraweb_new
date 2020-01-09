import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import { signUpRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  cpf: Yup.string().required('O cpf é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  registration: Yup.string().required('O número de matrícula é obrigatório'),
  type: Yup.string().required('É obrigatório indicar o tipo de acesso'),
  password: Yup.string()
    .min(6, 'Senha com no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});
export default function SignUp() {
  const dispatch = useDispatch();

  const options = [
    { id: 'Operador', title: 'Operador' },
    { id: 'Analista', title: 'Analista' },
    { id: 'Executor de contrato', title: 'Executor de contrato' },
  ];

  function handleSubmit({ name, cpf, email, registration, type, password }) {
    dispatch(signUpRequest(name, cpf, email, registration, type, password));
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="cpf" placeholder="CPF" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="registration" placeholder="nº de matrícula" />
        <span>Tipo de acesso:</span>
        <Select name="type" options={options} />
        <br />
        <Input
          name="password"
          type="password"
          placeholder="Senha primária (6 primeiros números do CPF)"
        />

        <button type="submit">Cadastrar</button>
      </Form>
    </>
  );
}
