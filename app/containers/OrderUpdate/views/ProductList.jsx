import React, { memo, useState, useMemo, useCallback } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Button from 'components/Button';
import NumberFormatInput from 'components/NumberFormatInput';
import TableAdvance from 'components/TableAdvance';
import ProductPrice from 'components/ProductPrice';
import OrderProductSelect from 'containers/OrderProductSelect';

import { numberFormat, currencyFormat } from 'utils/stringFormat';
import { getProductPrice } from 'utils/helper';

import { createOrderItem } from '../helper';

function ProductList(props) {
  const {
    data,
    onUpdateOrderItem,
    subTotal,
    discount,
    total,
    amountCoin,
    shippingFee,
  } = props;

  const [open, setOpen] = useState(false);

  const handleChangeQuantity = useCallback(
    event => {
      const { value, name } = event.target;
      onUpdateOrderItem('quantity', isEmpty(value) ? 1 : value, name);
    },
    [data],
  );

  const handleDeleteItem = useCallback(
    id => {
      onUpdateOrderItem('deleteItem', id);
    },
    [data],
  );

  const inputQuantity = useCallback(
    dataRow => (
      <TextField
        required
        margin="dense"
        variant="outlined"
        label="Số lượng"
        onChange={handleChangeQuantity}
        value={dataRow.quantity}
        name={`${dataRow.orderItemId}`}
        InputProps={{
          inputComponent: NumberFormatInput,
          inputProps: {
            maxLength: '13',
            style: { textAlign: 'right' },
          },
        }}
      />
    ),
    [data],
  );

  const customizeTotal = dataRow => {
    const { price } = getProductPrice(dataRow.product, dataRow.productVariant);
    return currencyFormat(dataRow.quantity * price);
  };

  const customizeAttribute = useCallback(
    dataRow => {
      const variantValues = get(dataRow, 'productVariant.variantValues');
      if (variantValues) {
        const values = variantValues.map(item => item.name);
        return values.join(' , ');
      }
      return '';
    },
    [data],
  );

  const deleteAction = useCallback(
    id => (
      <Button
        key={`delete-${id}`}
        icon="delete"
        type="iconButton"
        onClick={() => handleDeleteItem(id)}
      />
    ),
    [data],
  );

  const priceCell = dataRow => (
    <ProductPrice product={dataRow.product} variant={dataRow.productVariant} />
  );

  const headerRows = useMemo(
    () => [
      {
        id: 'productVariant.imageSource',
        type: 'image',
        label: 'Ảnh đại diện',
        subId: 'product.imageSource',
      },
      {
        id: 'product.name',
        type: 'text',
        label: 'Tên',
        width: 250,
      },
      {
        id: 'productVariant.sku',
        type: 'text',
        label: 'SKU',
        subId: 'product.sku',
      },
      {
        id: 'attribute',
        type: 'customize',
        label: 'Thuộc tính',
        customize: customizeAttribute,
      },
      {
        id: 'quantity',
        type: 'customize',
        label: 'Số lượng',
        customize: inputQuantity,
        align: 'right',
        width: 120,
      },
      {
        id: 'pricePerProduct',
        type: 'customize',
        label: 'Đơn giá',
        align: 'right',
        customize: priceCell,
      },
      {
        id: 'total',
        type: 'customize',
        label: 'Thành tiền',
        customize: customizeTotal,
        align: 'right',
      },
      {
        id: 'action',
        type: 'actions',
        actions: [deleteAction],
        align: 'right',
      },
    ],
    [data],
  );

  const handleOpenProductSelect = useCallback(() => setOpen(true), []);
  const handleCloseProductSelect = useCallback(() => setOpen(false), []);

  const handleAddProduct = useCallback(
    (product, quantity, productVariant) => {
      const orderItem = createOrderItem(product, quantity, productVariant);
      onUpdateOrderItem('product', orderItem);
    },
    [data],
  );

  const handleChangeTotal = event => {
    const { value } = event.target;
    onUpdateOrderItem('total', isEmpty(value) ? 0 : parseInt(value, 10));
  };

  const handleChangeShippingFee = event => {
    const { value } = event.target;
    onUpdateOrderItem('shippingFee', isEmpty(value) ? 0 : parseInt(value, 10));
  };

  const spanningRows = useMemo(
    () => (
      <>
        <TableRow>
          <TableCell size="medium" rowSpan={5} colSpan={3} />
          <TableCell size="medium" colSpan={3}>
            Tổng tiền
          </TableCell>
          <TableCell size="medium" align="right">
            {numberFormat(subTotal)}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell size="medium" colSpan={3}>
            Chiết khấu
          </TableCell>
          <TableCell size="medium" align="right">
            {numberFormat(discount)}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell size="medium" colSpan={3}>
            Xu
          </TableCell>
          <TableCell size="medium" align="right">
            {numberFormat(amountCoin)}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell size="medium" colSpan={3}>
            Phí vận chuyển
          </TableCell>
          <TableCell size="medium" align="right">
            <TextField
              margin="dense"
              variant="outlined"
              onChange={handleChangeShippingFee}
              value={shippingFee}
              InputProps={{
                inputComponent: NumberFormatInput,
                inputProps: {
                  maxLength: '13',
                  style: { textAlign: 'right' },
                },
              }}
            />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell size="medium" colSpan={3}>
            Thành tiền
          </TableCell>
          <TableCell size="medium" align="right">
            <TextField
              required
              margin="dense"
              variant="outlined"
              onChange={handleChangeTotal}
              value={total}
              InputProps={{
                inputComponent: NumberFormatInput,
                inputProps: {
                  maxLength: '13',
                  style: { textAlign: 'right' },
                },
              }}
            />
          </TableCell>
        </TableRow>
      </>
    ),
    [subTotal, discount, total, shippingFee],
  );

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Chi tiết đơn hàng</Typography>}
        action={
          <Button
            icon="add"
            name="Thêm sản phẩm"
            onClick={handleOpenProductSelect}
          />
        }
      />
      <CardContent>
        <TableAdvance
          columnKey="orderItemId"
          rows={data}
          headerRows={headerRows}
          options={{ showPaging: false }}
          spanningRows={spanningRows}
        />
        <OrderProductSelect
          open={open}
          onClose={handleCloseProductSelect}
          onAgree={handleAddProduct}
        />
      </CardContent>
    </Card>
  );
}

ProductList.defaultProps = {
  data: [],
};

ProductList.propTypes = {
  data: PropTypes.array,
  subTotal: PropTypes.number,
  discount: PropTypes.number,
  total: PropTypes.number,
  onUpdateOrderItem: PropTypes.func,
  amountCoin: PropTypes.number,
  shippingFee: PropTypes.number,
};

export default memo(ProductList);
