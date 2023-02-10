/**
 *
 * FlashSaleUpdatePrice
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { set } from 'lodash';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';

import TableAdvance from 'components/TableAdvance';
import Button from 'components/Button';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import FlashSaleProductVariant from './FlashSaleProductVariant';
import {
  getListProductVariantRequest,
  getRequest,
  addRequest,
  editRequest,
  cleanDataAction,
  updateDataField,
} from './actions';
import {
  makeSelectFlashSaleProductVariant,
  makeSelectFlashSaleUpdated,
  makeSelectFlashSalePrice,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function FlashSaleUpdatePrice(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    open,
    editMode,
    flashSaleId,
    flashSalePrice,
    flashSaleProduct,
    productList,
    getProductList,
    productVariant,
    getProductVariant,
    paging,
    onCancel,
    setDataField,
    cleanData,
    getFlashSalePrice,
    editFlashSalePrice,
    addFlashSalePrice,
    updated,
    didUpdate,
  } = props;

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    if (editMode) {
      const { productId } = flashSaleProduct.product;
      getFlashSalePrice({
        flashSaleProductId: flashSaleProduct.flashSaleProductId,
      });
      getProductVariant({ productId });
    }
  }, [editMode]);

  useEffect(() => {
    if (selectedProduct.length) {
      const { productId } = selectedProduct[0];
      getProductVariant({ productId });
      setDataField({ productId });
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (updated) {
      didUpdate();
      handleCancelAction();
    }
  }, [updated]);

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

  const handleOnChangeDataField = (name, type, id) => event => {
    let dataField;

    switch (name) {
      case 'retailPrice': {
        const { value } = event.target;
        if (type === 'product') {
          dataField = {
            price: { [name]: Number(value) },
          };
        } else if (type === 'productVariant') {
          const productVariants = flashSalePrice.productVariants || [];
          const variantCurrent = productVariants.find(
            item => item.productVariantId === id,
          );
          if (variantCurrent) {
            productVariants.forEach(item => {
              if (item.productVariantId === id) {
                set(item, 'price.retailPrice', Number(value));
              }
              return item;
            });
          } else {
            productVariants.push({
              productVariantId: id,
              price: { [name]: Number(value) },
            });
          }
          dataField = { productVariants };
        }
        break;
      }
      default:
        break;
    }
    setDataField(dataField);
  };

  const handleSelectedProductChange = selected => {
    setSelectedProduct(selected);
  };

  const handleCancelAction = () => {
    onCancel();
    cleanData();
    setSelectedProduct([]);
    setValidate(false);
  };

  const validateField = () => {
    let result = false;
    if (flashSalePrice.price && flashSalePrice.price.retailPrice) {
      if (
        flashSalePrice.productVariants &&
        flashSalePrice.productVariants.length === productVariant.length
      ) {
        const itemEmpty = flashSalePrice.productVariants.find(
          item => !item.price || !item.price.retailPrice,
        );
        if (itemEmpty) {
          result = true;
        }
      } else if (productVariant.length) {
        result = true;
      }
    } else {
      result = true;
    }
    setValidate(result);
    return !result;
  };

  const handleAgreeAction = () => {
    const noValidate = validateField();
    if (noValidate) {
      if (editMode) {
        editFlashSalePrice();
      } else {
        setDataField({ flashSaleId });
        addFlashSalePrice();
      }
    }
  };

  return (
    <Dialog
      open={open}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      fullWidth
      maxWidth="md"
    >
      {open && (
        <>
          <DialogTitle id="scroll-dialog-title">
            {editMode
              ? intl.formatMessage(messages.editHeader)
              : intl.formatMessage(messages.addHeader)}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {editMode || selectedProduct.length ? (
                  <FlashSaleProductVariant
                    intl={intl}
                    product={
                      editMode ? flashSaleProduct.product : selectedProduct[0]
                    }
                    productVariant={productVariant}
                    onChangePrice={handleOnChangeDataField}
                    flashSalePrice={flashSalePrice}
                    validate={validate}
                  />
                ) : (
                  <TableAdvance
                    columnKey="productId"
                    rows={productList}
                    headerRows={headerRows}
                    paging={paging}
                    fetchDataForPage={getProductList}
                    options={{
                      multipleSelection: false,
                      allowSelection: true,
                      clickRowToSelect: true,
                    }}
                    selectedList={selectedProduct}
                    onSelectionChange={handleSelectedProductChange}
                  />
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              icon="cancel"
              options={{ showIcon: false }}
              onClick={handleCancelAction}
              color="default"
            />
            <Button
              disabled={!selectedProduct.length && !editMode}
              icon="agree"
              options={{ showIcon: false }}
              onClick={handleAgreeAction}
            />
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

FlashSaleUpdatePrice.propTypes = {
  intl: intlShape,
  open: PropTypes.bool,
  editMode: PropTypes.bool,
  flashSaleId: PropTypes.number,
  flashSalePrice: PropTypes.object,
  flashSaleProduct: PropTypes.object,
  productList: PropTypes.array,
  productVariant: PropTypes.array,
  paging: PropTypes.object,
  updated: PropTypes.bool,
  getProductList: PropTypes.func,
  getProductVariant: PropTypes.func,
  didUpdate: PropTypes.func,
  onCancel: PropTypes.func,
  setDataField: PropTypes.func,
  getFlashSalePrice: PropTypes.func,
  addFlashSalePrice: PropTypes.func,
  editFlashSalePrice: PropTypes.func,
  cleanData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  productVariant: makeSelectFlashSaleProductVariant(),
  updated: makeSelectFlashSaleUpdated(),
  flashSalePrice: makeSelectFlashSalePrice(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductVariant: payload =>
      dispatch(getListProductVariantRequest(payload)),
    getFlashSalePrice: payload => dispatch(getRequest(payload)),
    addFlashSalePrice: () => dispatch(addRequest()),
    editFlashSalePrice: () => dispatch(editRequest()),
    setDataField: payload => dispatch(updateDataField(payload)),
    cleanData: () => dispatch(cleanDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(FlashSaleUpdatePrice));
