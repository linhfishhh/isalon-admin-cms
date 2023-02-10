/**
 *
 * EditProfile
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  detailText: {
    color: '#808285',
    textAlign: 'left',
  },
  textField: {
    minHeight: 30,
    minWidth: 100,
    color: '#222222',
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    width: 120,
  },
  input: {
    maxWidth: 400,
  },
}));

function InputField(props) {
  const classes = useStyles();
  const {
    title,
    defaultValue = '',
    inputType = 'text',
    onChange,
    name,
    error = false,
    helperText,
    editable = true,
  } = props;

  return (
    <Grid container className={classes.inputRow} direction="row" wrap="nowrap">
      <Grid item className={classes.label}>
        <Typography className={classes.detailText} display="inline">
          {title}
        </Typography>
      </Grid>
      <Grid item className={classes.input} xs>
        <TextField
          className={classes.textField}
          value={defaultValue}
          variant="outlined"
          margin="dense"
          type={inputType}
          fullWidth
          onChange={onChange}
          name={name}
          error={error}
          helperText={helperText}
          disabled={!editable}
        />
      </Grid>
    </Grid>
  );
}

InputField.propTypes = {
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  inputType: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  editable: PropTypes.bool,
};

export default memo(InputField);
