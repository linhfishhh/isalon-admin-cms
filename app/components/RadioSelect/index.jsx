/**
 *
 * RadioSelect
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(0),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

function RadioSelect(props) {
  const {
    nameLabel,
    dataSource,
    dataTextField,
    dataValueField,
    selectedItem,
    onSeletedChange,
  } = props;

  const classes = useStyles();

  function handleChange(event) {
    const selected = dataSource.find(
      item => item[dataValueField] === event.target.value,
    );
    onSeletedChange(selected);
  }
  const value = selectedItem ? selectedItem[dataValueField] : '0';

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        {nameLabel && <FormLabel component="legend">{nameLabel}</FormLabel>}
        <RadioGroup
          aria-label="gender"
          name="gender1"
          className={classes.group}
          value={value}
          onChange={handleChange}
        >
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <FormControlLabel value="0" control={<Radio />} label="none" />
            </Grid>
            {dataSource.map(item => (
              <Grid item xs={4} key={item[dataValueField]}>
                <FormControlLabel
                  value={item[dataValueField]}
                  control={<Radio />}
                  label={item[dataTextField]}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

RadioSelect.propTypes = {
  nameLabel: PropTypes.string,
  dataSource: PropTypes.array,
  dataTextField: PropTypes.string,
  dataValueField: PropTypes.string,
  selectedItem: PropTypes.object,
  onSeletedChange: PropTypes.func,
};

export default memo(RadioSelect);
