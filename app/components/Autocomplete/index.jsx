/**
 *
 * Select
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  wrapper: {},
  input: {
    padding: theme.spacing(1.5, 3),
    backgroundColor: '#f2f2f2',
    borderRadius: theme.spacing(1),
  },
  textfield: {
    '& .MuiAutocomplete-endAdornment': {
      right: theme.spacing(2),
    },
  },
}));

function Autocomplete(props) {
  const {
    className,
    options,
    placeholder,
    startAdornment,
    noOptionsText,
    error,
    helperText,
    ...rest
  } = props;
  const classes = useStyle();

  return (
    <MuiAutocomplete
      className={`${className} ${classes.wrapper}`}
      options={options}
      noOptionsText={noOptionsText}
      renderInput={params => {
        const { InputProps, ...other } = params;
        return (
          <TextField
            {...other}
            fullWidth
            className={classes.textfield}
            placeholder={placeholder}
            InputProps={{
              ...InputProps,
              disableUnderline: true,
              startAdornment,
              className: classes.input,
            }}
            error={error}
            helperText={helperText}
          />
        );
      }}
      {...rest}
    />
  );
}

Autocomplete.defaultProps = {
  className: '',
  noOptionsText: 'Không có lựa chọn',
};

Autocomplete.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  noOptionsText: PropTypes.string,
  startAdornment: PropTypes.node,
  getOptionLabel: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default memo(Autocomplete);
