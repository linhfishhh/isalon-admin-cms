/**
 *
 * Update Product Dialog
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  Grid,
} from '@material-ui/core';

import TableAdvance from 'components/TableAdvance';
import Button from 'components/Button';
import messages from './messages';

function UpdateProductDialog(props) {
  const {
    intl,
    open,
    productList,
    getProductList,
    paging,
    onCancel,
    onAgree,
  } = props;

  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    if (open) {
      setSelectedProduct([]);
    }
  }, [open]);

  const headerRows = [
    {
      id: 'productId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'imageSource',
      type: 'image',
      label: 'Ảnh đại diện',
    },
    {
      id: 'name',
      type: 'text',
      label: 'Tên',
    },
    {
      id: 'brand.name',
      type: 'text',
      label: 'Thương hiệu',
    },
    {
      id: 'isAvailable',
      type: 'checked',
      label: 'Sẵn sàng bán',
      align: 'center',
    },
  ];

  const handleSelectedProductChange = selected => {
    setSelectedProduct(selected);
  };

  const handleCancelEdit = () => {
    onCancel();
  };

  const handleAgreeAction = () => {
    onAgree(selectedProduct);
  };

  return (
    <Dialog
      open={open}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="scroll-dialog-title">
        {intl.formatMessage(messages.addProduct)}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <TableAdvance
                columnKey="productId"
                rows={productList}
                headerRows={headerRows}
                paging={paging}
                fetchDataForPage={getProductList}
                options={{ allowSelection: true, clickRowToSelect: true }}
                selectedList={selectedProduct}
                onSelectionChange={handleSelectedProductChange}
              />
            </Card>
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
          icon="agree"
          options={{ showIcon: false }}
          onClick={handleAgreeAction}
        />
      </DialogActions>
    </Dialog>
  );
}

UpdateProductDialog.propTypes = {
  intl: intlShape,
  open: PropTypes.bool,
  productList: PropTypes.array,
  getProductList: PropTypes.func,
  paging: PropTypes.object,
  onCancel: PropTypes.func,
  onAgree: PropTypes.func,
};

export default memo(UpdateProductDialog);
