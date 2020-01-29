import React from 'react';
import { Input, Select } from '@rocketseat/unform';

import PropTypes from 'prop-types';
import { MdCheck } from 'react-icons/md';

import { Container, ModalForm } from './styles';

export default function FormModal(props) {
  const {
    target,
    backTarget,
    buttonTitle,
    name,
    schema,
    edit,
    onSubmit,
    id,
    initialData,
    formTitles,
  } = props;

  return (
    <Container>
      <a href={`#${target}`}>
        <button type="button">
          <MdCheck size={24} />
          {buttonTitle || target}
        </button>
      </a>
      <div id={target} className="modalDialog">
        <div>
          <strong>
            {edit === true ? `Edição de ${name}` : `Cadastro de ${name}`}
          </strong>
          <a href={`#${backTarget}`} title={backTarget} className={backTarget}>
            X
          </a>
          <ModalForm
            schema={schema}
            id={id}
            onSubmit={onSubmit}
            initialData={initialData}
          >
            {formTitles.map(item => (
              <div key={item.id}>
                <div className={item.className}>
                  <strong>{item.title}</strong>
                  {item.type === 'Input' ? (
                    <Input name={item.name} />
                  ) : (
                    <Select name={item.name} options={item.options} />
                  )}
                </div>
              </div>
            ))}
            <button type="submit">
              <MdCheck size={24} />
              SALVAR
            </button>
          </ModalForm>
        </div>
      </div>
    </Container>
  );
}

FormModal.defaultProps = {
  id: null,
  edit: false,
  initialData: null,
};

FormModal.propTypes = {
  target: PropTypes.string.isRequired,
  backTarget: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  schema: PropTypes.any.isRequired,
  edit: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.string,
  initialData: PropTypes.arrayOf(PropTypes.string),
  formTitles: PropTypes.arrayOf(PropTypes.object).isRequired,
};
