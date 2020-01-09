/* eslint-disable jsx-a11y/label-has-for */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export default function SetStateInput({
  name,
  label,
  disabled,
  setChange,
  getChange,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  function handleOnChange(data) {
    setSelected(data);
    setChange(data);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  useEffect(() => {
    setSelected(getChange);
  }, [getChange]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input
        name={fieldName}
        selected={selected}
        onChange={data => handleOnChange(data)}
        disabled={!!disabled}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

SetStateInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  getChange: PropTypes.objectOf(PropTypes.string),
  setChange: PropTypes.func,
  disabled: PropTypes.bool,
};

SetStateInput.defaultProps = {
  disabled: PropTypes.false,
  setChange: PropTypes.null,
  getChange: PropTypes.null,
};
