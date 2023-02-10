import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { intlShape } from 'react-intl';

import NumberFormatInput from 'components/NumberFormatInput';
import TableAdvance from 'components/TableAdvance';
import Img from 'components/Img';

import { numberFormat } from 'utils/stringFormat';

import messages from './messages';

const Image = styled(Img)`
  width: 150px;
  height: 150px;
  margin: 3px;
  border: solid 1px #ddd;
`;

const Label = styled(Typography)`
  padding-left: 10px;
`;

function FlashSaleProductVariant(props) {
  const {
    intl,
    product,
    productVariant,
    flashSalePrice,
    validate,
    onChangePrice,
  } = props;

  const inputPrice = dataRow => {
    const productVariants = flashSalePrice.productVariants || [];
    const variantFlashSale =
      productVariants.find(
        item => item.productVariantId === dataRow.productVariantId,
      ) || {};
    const emptyValue = !(
      variantFlashSale.price && variantFlashSale.price.retailPrice
    );
    return (
      <TextField
        required
        margin="dense"
        variant="outlined"
        label="Giá flash sale"
        value={
          variantFlashSale.price && variantFlashSale.price.retailPrice
            ? variantFlashSale.price.retailPrice
            : ''
        }
        onChange={onChangePrice(
          'retailPrice',
          'productVariant',
          dataRow.productVariantId,
        )}
        InputProps={{
          inputComponent: NumberFormatInput,
          inputProps: {
            maxLength: '13',
            style: { textAlign: 'right' },
          },
        }}
        error={validate && emptyValue}
        helperText={
          validate &&
          emptyValue &&
          intl.formatMessage(messages.priceFlashSaleIsRequired)
        }
      />
    );
  };

  const customizeCell = dataRow => {
    const { variantValues } = dataRow;
    if (variantValues) {
      const values = variantValues.map(item => item.name);
      return values.join(' , ');
    }
    return '';
  };

  const VariantListHeaderRows = [
    {
      id: 'productVariantId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'imageSource',
      type: 'image',
      label: 'Ảnh đại diện',
    },
    {
      id: 'attribute',
      type: 'customize',
      label: 'Thuộc tính',
      customize: customizeCell,
    },
    {
      id: 'color',
      type: 'text',
      label: 'Mã màu',
    },
    {
      id: 'isDefault',
      type: 'checked',
      label: 'Mặc định',
      align: 'center',
      hidden: 0,
    },
    {
      id: 'price.retailPrice',
      type: 'number',
      label: 'Giá bán lẻ',
      align: 'right',
    },
    {
      id: 'inputPrice',
      type: 'customize',
      customize: inputPrice,
      align: 'right',
    },
  ];

  const priceEmpty = !(
    flashSalePrice.price && flashSalePrice.price.retailPrice
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={9}>
        <Grid container spacing={3}>
          <Grid item xs={4} md={2}>
            <Label>Tên sản phẩm:</Label>
          </Grid>
          <Grid item xs={8} md={10}>
            <Typography variant="h6">{product.name}</Typography>
          </Grid>
          <Grid item xs={4} md={2}>
            <Label>Thương hiệu:</Label>
          </Grid>
          <Grid item xs={8} md={10}>
            <Typography variant="h6">
              {product.brand && product.brand.name}
            </Typography>
          </Grid>
          <Grid item xs={4} md={2}>
            <Label>Giá bán lẻ:</Label>
          </Grid>
          <Grid item xs={8} md={10}>
            <Typography variant="h6">
              {product.price && numberFormat(product.price.retailPrice)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              margin="dense"
              variant="outlined"
              label="Giá flash sale"
              value={
                flashSalePrice.price && flashSalePrice.price.retailPrice
                  ? flashSalePrice.price.retailPrice
                  : ''
              }
              onChange={onChangePrice(
                'retailPrice',
                'product',
                product.productId,
              )}
              InputProps={{
                inputComponent: NumberFormatInput,
                inputProps: {
                  maxLength: '13',
                  style: { textAlign: 'right' },
                },
              }}
              error={validate && priceEmpty}
              helperText={
                validate &&
                priceEmpty &&
                intl.formatMessage(messages.priceFlashSaleIsRequired)
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Image src={product.imageSource} />
      </Grid>
      <Grid item xs={12}>
        <TableAdvance
          columnKey="productVariantId"
          rows={productVariant}
          headerRows={VariantListHeaderRows}
          options={{ showPaging: false }}
        />
      </Grid>
    </Grid>
  );
}

FlashSaleProductVariant.propTypes = {
  intl: intlShape,
  product: PropTypes.object,
  productVariant: PropTypes.array,
  flashSalePrice: PropTypes.object,
  validate: PropTypes.bool,
  onChangePrice: PropTypes.func,
};

export default memo(FlashSaleProductVariant);
