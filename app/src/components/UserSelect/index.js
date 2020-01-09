/* eslint-disable jsx-a11y/label-has-for */
import React, { useRef, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import api from '../../services/api';

export default function UserSelect({ name, label, setChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    return selectRef.select.state.value;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function loadOptions(inputValue) {
    return api
      .get(`users?q=${inputValue}`)
      .then(r => r.data)
      .then(r =>
        r.map(user => ({
          label: user.name,
          value: user.id,
        }))
      );
  }

  function handleOnChange(user) {
    if (setChange) {
      setChange(user);
    }
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <AsyncSelect
        name={fieldName}
        aria-label={fieldName}
        defaultValue
        value={defaultValue}
        ref={ref}
        placeholder="Buscar dono do animal"
        loadOptions={loadOptions}
        defaultOptions
        onChange={user => handleOnChange(user)}
      />

      {error && <span>{error}</span>}
    </>
  );
}

UserSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setChange: PropTypes.func,
};

UserSelect.defaultProps = {
  setChange: PropTypes.null,
};
