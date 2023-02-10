/**
 *
 * ComboBox
 *
 */

import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { intersection, differenceBy } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Select,
  OutlinedInput,
  Checkbox,
  Chip,
} from '@material-ui/core';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(0.4),
  },
}));

const ComboBox = props => {
  const {
    intl,
    nameLabel,
    dataSource,
    dataTextField,
    dataValueField,
    selectedValue,
    onSelectedChange,
    addMoreOption,
    error,
    helperText,
    multiple,
    disabledPadding,
    showOptionNone,
    withoutValue,
  } = props;

  const classes = useStyles();

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (inputLabel.current && !labelWidth) {
      setLabelWidth(inputLabel.current.offsetWidth);
    }
  });

  const hasSelected = () => {
    if (multiple) {
      const dataField = dataSource.map(item => `${item[dataValueField]}`);
      const result = intersection(dataField, selectedValue);
      return result.length;
    }
    return selectedValue.length;
  };

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  const handleSelected = (event, child) => {
    if (addMoreOption && child.props.id === 'more-option') {
      addMoreOption();
      handleClose();
    } else if (onSelectedChange) {
      if (multiple) {
        const result = dataSource.filter(item =>
          event.target.value.includes(`${item[dataValueField]}`),
        );
        const unCheck = differenceBy(dataSource, result, dataValueField);
        onSelectedChange(result, unCheck);
      } else {
        const result = dataSource.find(
          item => `${item[dataValueField]}` === event.target.value,
        );
        onSelectedChange(result);
      }
    }
  };

  const handleRenderSelected = selected => {
    if (dataSource.length > 0 && hasSelected()) {
      if (multiple) {
        return (
          <div className={classes.chips}>
            {selected.map(value => {
              const data = dataSource.find(
                item => `${item[dataValueField]}` === value,
              );
              return (
                data && (
                  <Chip
                    key={data[dataValueField]}
                    label={data[dataTextField]}
                    className={classes.chip}
                  />
                )
              );
            })}
          </div>
        );
      }
      const data = dataSource.find(
        item => `${item[dataValueField]}` === selected,
      );
      return data ? data[dataTextField] : '';
    }
    return '';
  };

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={error}
      margin={disabledPadding ? 'dense' : 'none'}
      fullWidth
    >
      <InputLabel ref={inputLabel} htmlFor="outlined-combobox-simple">
        {nameLabel}
      </InputLabel>
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        multiple={multiple}
        value={selectedValue || (multiple ? [] : '')}
        onChange={handleSelected}
        input={
          <OutlinedInput
            labelWidth={labelWidth}
            margin={
              (multiple && hasSelected()) || disabledPadding ? 'dense' : 'none'
            }
            id="outlined-combobox-simple"
          />
        }
        renderValue={handleRenderSelected}
      >
        {!multiple && showOptionNone && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {dataSource.map(
          data =>
            `${data[dataValueField]}` !== withoutValue && (
              <MenuItem
                value={`${data[dataValueField]}`}
                key={data[dataValueField]}
              >
                {multiple && (
                  <Checkbox
                    checked={
                      selectedValue
                        ? selectedValue.indexOf(`${data[dataValueField]}`) > -1
                        : false
                    }
                  />
                )}
                {data[dataTextField]}
              </MenuItem>
            ),
        )}
        {addMoreOption ? <hr /> : null}
        {addMoreOption ? (
          <MenuItem value="more-option" id="more-option">
            {intl.formatMessage(messages.addNewOption)}
          </MenuItem>
        ) : null}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

ComboBox.defaultProps = {
  dataSource: [],
  error: false,
  multiple: false,
  disabledPadding: false,
  showOptionNone: true,
};

ComboBox.propTypes = {
  intl: intlShape,
  nameLabel: PropTypes.string,
  dataSource: PropTypes.array,
  dataTextField: PropTypes.string,
  dataValueField: PropTypes.string,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onSelectedChange: PropTypes.func,
  addMoreOption: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  multiple: PropTypes.bool,
  disabledPadding: PropTypes.bool,
  showOptionNone: PropTypes.bool,
  withoutValue: PropTypes.string,
};

export default memo(injectIntl(ComboBox));
