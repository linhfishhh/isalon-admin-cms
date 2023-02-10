/**
 *
 * EditProfile
 *
 */

import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Autocomplete from 'components/Autocomplete';

const useStyles = makeStyles(theme => ({
  detailText: {
    color: '#808285',
    textAlign: 'left',
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  label: {
    width: 120,
  },
  input: {
    maxWidth: 400,
  },
}));

function SelectField(props) {
  const classes = useStyles();
  const {
    title,
    columnKey,
    options,
    onChange,
    currentValue,
    error,
    helperText,
  } = props;

  const getOptionsLabel = useCallback(option => option.name || '', []);
  const getOptionSelected = useCallback(
    (option, value) => option[columnKey] === value[columnKey],
    [],
  );

  return (
    <Grid container className={classes.inputRow} direction="row" wrap="nowrap">
      <Grid item className={classes.label}>
        <Typography className={classes.detailText} display="inline">
          {title}
        </Typography>
      </Grid>
      <Grid item xs className={classes.input}>
        <Autocomplete
          placeholder=""
          options={options}
          onChange={onChange}
          value={currentValue}
          getOptionLabel={getOptionsLabel}
          getOptionSelected={getOptionSelected}
          error={error}
          helperText={helperText}
        />
      </Grid>
    </Grid>
  );
}

SelectField.propTypes = {
  title: PropTypes.string.isRequired,
  columnKey: PropTypes.string.isRequired,
  options: PropTypes.array,
  onChange: PropTypes.func,
  currentValue: PropTypes.object,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default memo(SelectField);
