/**
 *
 * Export Dialog
 *
 */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, unset } from 'lodash';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import { CalendarTodayOutlined as CalendarIcon } from '@material-ui/icons';
import viLocale from 'date-fns/locale/vi';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import Button from 'components/Button';
import ComboBox from 'components/ComboBox';

import { orderStatus } from 'utils/enums';
import { datetimeFormat } from 'utils/datetime';

function ExportDialog(props) {
  const { open, onCancel, onAgree } = props;

  const [filter, setFilter] = useState({
    start: datetimeFormat(Date.now(), 'YYYY-MM-DD'),
    end: datetimeFormat(Date.now(), 'YYYY-MM-DD'),
  });

  const onChangeDataField = name => event => {
    let newFilter;
    switch (name) {
      case 'start':
      case 'end':
        newFilter = { ...filter, [name]: datetimeFormat(event, 'YYYY-MM-DD') };
        break;
      default: {
        if (isEmpty(event)) {
          newFilter = { ...filter };
          unset(newFilter, 'status');
        } else {
          newFilter = { ...filter, [name]: event.id };
        }
        break;
      }
    }
    setFilter(newFilter);
  };

  const handleOnCancel = () => {
    onCancel();
  };

  const handleOnAgree = () => {
    onAgree(filter);
  };

  return (
    <Dialog
      open={open}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="scroll-dialog-title">Bộ lọc</DialogTitle>
      <DialogContent dividers>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <DatePicker
                    inputVariant="outlined"
                    fullWidth
                    ampm={false}
                    label="Từ"
                    value={filter.start}
                    onChange={onChangeDataField('start')}
                    showTodayButton
                    format="dd/MM/yyyy"
                    InputProps={{
                      style: { paddingRight: 0 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <CalendarIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    okLabel="Đồng ý"
                    cancelLabel="Huỷ"
                    todayLabel="Hôm nay"
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    inputVariant="outlined"
                    fullWidth
                    ampm={false}
                    label="Đến"
                    value={filter.end}
                    onChange={onChangeDataField('end')}
                    showTodayButton
                    format="dd/MM/yyyy"
                    InputProps={{
                      style: { paddingRight: 0 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <CalendarIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    okLabel="Đồng ý"
                    cancelLabel="Huỷ"
                    todayLabel="Hôm nay"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ComboBox
                    nameLabel={orderStatus.name}
                    dataSource={orderStatus.type}
                    dataTextField="name"
                    dataValueField="id"
                    selectedValue={filter.status}
                    onSelectedChange={onChangeDataField('status')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button
          icon="cancel"
          options={{ showIcon: false }}
          onClick={handleOnCancel}
          color="default"
        />
        <Button
          icon="agree"
          options={{ showIcon: false }}
          onClick={handleOnAgree}
        />
      </DialogActions>
    </Dialog>
  );
}

ExportDialog.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onAgree: PropTypes.func,
};

export default memo(ExportDialog);
