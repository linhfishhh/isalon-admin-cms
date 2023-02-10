/**
 *
 * Update Dialog
 *
 */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';

import TableAdvance from 'components/TableAdvance';
import Button from 'components/Button';
import messages from './messages';

function TopKeywordSearch(props) {
  const { intl, open, dataList, onCancel, onAgree } = props;

  const [selectedItem, setSelectedItem] = useState([]);

  const headerRows = [
    {
      id: 'name',
      type: 'text',
      label: 'Tên',
    },
  ];

  const handleSelectedItemChange = selected => {
    setSelectedItem(selected);
  };

  const handleCancelEdit = () => {
    onCancel();
    setSelectedItem([]);
  };

  const handleAgreeAction = () => {
    onAgree([...selectedItem]);
    setSelectedItem([]);
  };

  return (
    <Dialog
      open={open}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="scroll-dialog-title">
        {intl.formatMessage(messages.topKeywordSearchList)}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableAdvance
              columnKey="id"
              rows={dataList}
              headerRows={headerRows}
              options={{
                size: 'medium',
                allowSelection: true,
                showPaging: false,
                showToolbar: false,
                clickRowToSelect: true,
              }}
              selectedList={selectedItem}
              onSelectionChange={handleSelectedItemChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          icon="cancel"
          options={{ showIcon: false }}
          onClick={handleCancelEdit}
          color="default"
        />
        <Button
          disabled={!selectedItem.length}
          icon="agree"
          options={{ showIcon: false }}
          onClick={handleAgreeAction}
        />
      </DialogActions>
    </Dialog>
  );
}

TopKeywordSearch.propTypes = {
  intl: intlShape,
  open: PropTypes.bool,
  dataList: PropTypes.array,
  onCancel: PropTypes.func,
  onAgree: PropTypes.func,
};

export default memo(TopKeywordSearch);
