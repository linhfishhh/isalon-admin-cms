import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { CalendarTodayOutlined as CalendarIcon } from '@material-ui/icons';
import viLocale from 'date-fns/locale/vi';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
function DatePicker(props) {
  const {
    label,
    value,
    onChange,
    format = 'dd/MM/yyyy',
    margin = 'dense',
  } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
      <KeyboardDatePicker
        margin={margin}
        inputVariant="outlined"
        fullWidth
        ampm={false}
        label={label}
        value={value === undefined ? null : value}
        onChange={onChange}
        showTodayButton
        format={format}
        InputProps={{
          style: { paddingRight: 0 },
        }}
        okLabel="Đồng ý"
        cancelLabel="Huỷ"
        todayLabel="Hôm nay"
        placeholder="__/__/____"
        keyboardIcon={<CalendarIcon />}
        invalidDateMessage="Ngày tháng nhập vào không đúng định dạng"
      />
    </MuiPickersUtilsProvider>
  );
}

DatePicker.defaultProps = {
  format: 'dd/MM/yyyy',
  margin: 'dense',
};

DatePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  format: PropTypes.string,
  margin: PropTypes.string,
};

export default memo(DatePicker);
