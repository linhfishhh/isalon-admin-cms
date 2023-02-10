import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const NumberFormatInput = props => {
  const { inputRef, onChange, name, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
            name,
          },
        });
      }}
      thousandSeparator
      allowNegative={false}
    />
  );
};

NumberFormatInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default NumberFormatInput;
