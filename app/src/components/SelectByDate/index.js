/* eslint-disable jsx-a11y/label-has-for */
import React, { useRef, useEffect } from 'react';
import { startOfDay } from 'date-fns';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import api from '../../services/api';

export default function DateSelect({ date, label, setChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(date);
  const defaultValue = startOfDay(new Date());
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
      .get(`schedules?q=${inputValue}`)
      .then(r => r.data)
      .then(r =>
        r.map(schedule => ({
          label: schedule.name,
          value: schedule.id,
        }))
      );
  }

  function handleOnChange(schedule) {
    if (setChange) {
      setChange(schedule);
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
        placeholder="Buscar data"
        loadOptions={loadOptions}
        defaultOptions
        onChange={schedule => handleOnChange(schedule)}
      />

      {error && <span>{error}</span>}
    </>
  );
}

DateSelect.propTypes = {
  date: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setChange: PropTypes.func,
};

DateSelect.defaultProps = {
  setChange: PropTypes.null,
};
