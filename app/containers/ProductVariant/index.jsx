/**
 *
 * ProductVariant
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { isEmpty } from 'lodash';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import ImagesUpload from 'components/ImagesUpload';
import ComboBox from 'components/ComboBox';
import NumberFormatInput from 'components/NumberFormatInput';
import Button from 'components/Button';
import validation from 'utils/validation';
import VariantDialog from 'containers/VariantDialog';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import {
  makeSelectVariantList,
  makeSelectProductVariant,
  makeSelectVariantSelectedList,
  makeSelectRefresh,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  getVariantListRequest,
  getProductVariantRequest,
  updateDataField,
  cleanData as cleanDataAction,
  setVariantSelected as setVariantSelectedAction,
  setRefreshData as setRefreshDataAction,
  removeVariantValue as removeVariantValueAction,
} from './actions';
import { CONTEXT, LOADING_ACTION_TYPES } from './constants';

export function ProductVariant(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);

  const {
    intl,
    open,
    editMode,
    copyMode,
    productVariantId,
    getProductVariant,
    productVariant,
    getVariantList,
    setDataField,
    variantSelectedList,
    variantList,
    onCancel,
    onChange,
    cleanData,
    setVariantSelected,
    removeVariantValue,
    refresh,
    setRefreshData,
    productPrice,
  } = props;
  const [validate, setValidate] = useState({});
  const [openVariantValueDialog, setOpenVariantValueDialog] = useState(false);
  const [variantAddValue, setVariantAddValue] = useState({});

  useEffect(() => {
    if (refresh) {
      getVariantList();
    }
  }, [refresh]);

  useEffect(() => {
    if (open) {
      cleanData();
      if (editMode || copyMode) {
        getProductVariant({ id: productVariantId, copyMode });
      } else {
        const dataField = { price: productPrice };
        setDataField({ dataField, removeField: [] });
      }
    }
  }, [open]);

  const validateField = () => {
    const option = [
      {
        type: 'empty',
        model: productVariant,
        keys: ['sku'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  const handleOnChangeDataField = name => event => {
    let dataField;
    let removeField = [];

    switch (name) {
      case 'quantity': {
        const { value } = event.target;
        dataField = {
          [name]: isEmpty(value) ? value : Number(value),
        };
        break;
      }
      case 'retailPrice':
      case 'originRetailPrice':
      case 'wholesalePrice':
      case 'originWholesalePrice': {
        const { value } = event.target;
        if (isEmpty(value)) {
          removeField = [`price.${name}`];
        } else {
          dataField = {
            price: {
              ...productVariant.price,
              ...{
                [name]: Number(value),
              },
            },
          };
        }
        break;
      }
      case 'isDefault': {
        dataField = { [name]: event.target.checked };
        break;
      }
      case 'images': {
        dataField = { [name]: event };
        break;
      }
      case 'variantValues': {
        const variantValues = productVariant[name].filter(
          value => value.variantId !== event.variantId,
        );
        variantValues.push(event);
        dataField = { variantValues };
        break;
      }
      case 'sku': {
        dataField = {
          [name]: event.target.value.replace(/[^A-Za-z0-9]/g, ''),
        };
        break;
      }
      default:
        dataField = { [name]: event.target.value };
        break;
    }
    setDataField({ dataField, removeField });
  };

  const handleAgreeAction = () => {
    const noValidate = validateField();
    if (noValidate) {
      onChange(productVariant);
      setValidate({});
    }
  };

  const handleCancelEdit = () => {
    setValidate({});
    onCancel();
  };

  const handleAddVariantValue = variants => {
    setVariantSelected(variants);
    setOpenVariantValueDialog(false);
  };

  const hanleRemoveVariantValue = id => {
    removeVariantValue({ id });
  };

  const openVarianValueDialog = variant => {
    setVariantAddValue(variant);
    setOpenVariantValueDialog(true);
  };

  return (
    <>
      <Dialog
        open={open}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="scroll-dialog-title">
          {editMode ? 'Chỉnh sửa biến thể' : 'Thêm biến thể sản phẩm'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={<Typography variant="h6">Hình ảnh</Typography>}
                />
                <CardContent>
                  <ImagesUpload
                    id="variant"
                    multiple
                    onChangeImage={handleOnChangeDataField('images')}
                    images={productVariant.images}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={
                    <Typography variant="h6">Thông tin sản phẩm</Typography>
                  }
                />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        required
                        variant="outlined"
                        fullWidth
                        id="product-sku"
                        label="SKU"
                        value={productVariant.sku && productVariant.sku}
                        onChange={handleOnChangeDataField('sku')}
                        error={validate.sku && validate.sku.error}
                        helperText={
                          validate.sku &&
                          intl.formatMessage(messages[validate.sku.helperText])
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="quantity"
                        label="Số lượng"
                        value={productVariant.quantity}
                        onChange={handleOnChangeDataField('quantity')}
                        InputProps={{
                          inputComponent: NumberFormatInput,
                          inputProps: {
                            maxLength: '11',
                            style: { textAlign: 'right' },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="color"
                        label="Mã màu"
                        value={productVariant.color}
                        onChange={handleOnChangeDataField('color')}
                        InputProps={{
                          inputProps: {
                            maxLength: '32',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={productVariant.isDefault}
                            onChange={handleOnChangeDataField('isDefault')}
                            color="primary"
                          />
                        }
                        label="Đặt làm mặc định"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={<Typography variant="h6">Giá bán</Typography>}
                />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="retailPrice"
                        label="Giá bán lẻ"
                        value={
                          productVariant.price &&
                          productVariant.price.retailPrice
                            ? productVariant.price.retailPrice
                            : ''
                        }
                        onChange={handleOnChangeDataField('retailPrice')}
                        InputProps={{
                          inputComponent: NumberFormatInput,
                          inputProps: {
                            maxLength: '13',
                            style: { textAlign: 'right' },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="originRetailPrice"
                        label="Giá bán lẻ niêm yết"
                        value={
                          productVariant.price &&
                          productVariant.price.originRetailPrice
                            ? productVariant.price.originRetailPrice
                            : ''
                        }
                        onChange={handleOnChangeDataField('originRetailPrice')}
                        InputProps={{
                          inputComponent: NumberFormatInput,
                          inputProps: {
                            maxLength: '13',
                            style: { textAlign: 'right' },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="wholesalePrice"
                        label="Giá bán buôn"
                        value={
                          productVariant.price &&
                          productVariant.price.wholesalePrice
                            ? productVariant.price.wholesalePrice
                            : ''
                        }
                        onChange={handleOnChangeDataField('wholesalePrice')}
                        InputProps={{
                          inputComponent: NumberFormatInput,
                          inputProps: {
                            maxLength: '13',
                            style: { textAlign: 'right' },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="originWholesalePrice"
                        label="Giá bán buôn niêm yết"
                        value={
                          productVariant.price &&
                          productVariant.price.originWholesalePrice
                            ? productVariant.price.originWholesalePrice
                            : ''
                        }
                        onChange={handleOnChangeDataField(
                          'originWholesalePrice',
                        )}
                        InputProps={{
                          inputComponent: NumberFormatInput,
                          inputProps: {
                            maxLength: '13',
                            style: { textAlign: 'right' },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={<Typography variant="h6">Thuộc tính</Typography>}
                  action={
                    <Button
                      icon="add"
                      fontSize="small"
                      onClick={() => {
                        openVarianValueDialog({});
                      }}
                    />
                  }
                />
                <CardContent>
                  <Grid container spacing={3}>
                    {variantSelectedList.map(item => {
                      const selected = productVariant.variantValues.find(
                        value => value.variantId === item.variantId,
                      );
                      return (
                        <Grid container item xs={6} key={item.variantId}>
                          <Grid item xs>
                            <ComboBox
                              nameLabel={item.name}
                              dataSource={item.variantValues}
                              dataTextField="name"
                              dataValueField="variantValueId"
                              selectedValue={
                                selected && `${selected.variantValueId}`
                              }
                              onSelectedChange={handleOnChangeDataField(
                                'variantValues',
                              )}
                              showOptionNone={false}
                              addMoreOption={() => openVarianValueDialog(item)}
                            />
                          </Grid>
                          <Grid item>
                            <Button
                              icon="clean"
                              type="iconButton"
                              onClick={() =>
                                hanleRemoveVariantValue(item.variantId)
                              }
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </CardContent>
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
      <VariantDialog
        open={openVariantValueDialog}
        onCancel={() => setOpenVariantValueDialog(false)}
        variantList={variantList}
        variantSelectedList={variantSelectedList}
        onAgree={handleAddVariantValue}
        refreshData={setRefreshData}
        variantAddValue={variantAddValue}
      />
    </>
  );
}

ProductVariant.defaultProps = {
  open: false,
};

ProductVariant.propTypes = {
  intl: intlShape,
  open: PropTypes.bool,
  editMode: PropTypes.bool,
  copyMode: PropTypes.bool,
  productVariantId: PropTypes.number,
  getProductVariant: PropTypes.func,
  productVariant: PropTypes.object,
  getVariantList: PropTypes.func,
  setDataField: PropTypes.func,
  variantList: PropTypes.array,
  variantSelectedList: PropTypes.array,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  cleanData: PropTypes.func,
  setVariantSelected: PropTypes.func,
  refresh: PropTypes.bool,
  setRefreshData: PropTypes.func,
  removeVariantValue: PropTypes.func,
  productPrice: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  productVariant: makeSelectProductVariant(),
  variantList: makeSelectVariantList(),
  variantSelectedList: makeSelectVariantSelectedList(),
  refresh: makeSelectRefresh(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getVariantList: () => dispatch(getVariantListRequest()),
    getProductVariant: payload => dispatch(getProductVariantRequest(payload)),
    setDataField: payload => dispatch(updateDataField(payload)),
    cleanData: () => dispatch(cleanDataAction()),
    setVariantSelected: payload => dispatch(setVariantSelectedAction(payload)),
    setRefreshData: () => dispatch(setRefreshDataAction()),
    removeVariantValue: payload => dispatch(removeVariantValueAction(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(ProductVariant));
