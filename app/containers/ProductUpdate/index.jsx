/**
 *
 * ProductUpdate
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty, unionBy, remove } from 'lodash';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
} from '@material-ui/core';
import CKEditor from 'ckeditor4-react';

import ComboBox from 'components/ComboBox';
import ImagesUpload from 'components/ImagesUpload';
import AlertDialog from 'components/AlertDialog';
import NumberFormatInput from 'components/NumberFormatInput';
import Header from 'components/Header';
import Button from 'components/Button';
import ProductVariantList from 'containers/ProductVariantList';
import ProductTags from 'containers/Tags';
import ProductRelated from 'containers/ProductRelated';

import validation from 'utils/validation';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectToast } from 'utils/injectToast';
import { useInjectLoading } from 'utils/injectLoading';

import {
  makeSelectCategoryList,
  makeSelectBrandList,
  makeSelectProduct,
  makeSelectShouldUpdate,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getCategoryListRequest,
  getBrandListRequest,
  addRequest,
  updateDataField,
  getRequest,
  editRequest,
  cleanDataAction,
} from './actions';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export const ProductUpdate = props => {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    match,
    dispatch,
    intl,
    getBrandList,
    getCategoryList,
    product,
    brandList,
    categoryList,
    setDataField,
    addProduct,
    getProduct,
    editProduct,
    cleanData,
    shouldUpdate,
  } = props;

  const [validate, setValidate] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [typeSave, setTypeSave] = useState('normal');
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);

  const productId = get(match, 'params.productId');

  useEffect(() => {
    getCategoryList({ limit: 100 });
    getBrandList({ limit: 100 });
    if (productId) {
      getProduct({ id: productId });
      setTypeSave('edit');
    }
    return () => {
      cleanData();
    };
  }, []);

  useEffect(() => {
    if (shouldUpdate) {
      if (typeSave === 'createNew' || typeSave === 'normal') {
        cleanData();
      } else {
        setEditMode(true);
      }
    }
  }, [shouldUpdate]);

  const goToListProduct = () => {
    dispatch(push('/admin/product'));
  };

  const validateField = () => {
    const option = [
      {
        type: 'empty',
        model: product,
        keys: ['name', 'sku'],
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
      case 'brandId': {
        if (event) {
          dataField = {
            brand: { [name]: event[name] },
          };
        } else {
          removeField = ['brand'];
        }
        break;
      }
      case 'categoryId': {
        const categories = event.map(category => ({ [name]: category[name] }));
        dataField = { categories };
        break;
      }
      case 'description': {
        dataField = { [name]: event.editor.getData() };
        break;
      }
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
              ...product.price,
              ...{
                [name]: Number(value),
              },
            },
          };
        }
        break;
      }
      case 'isAvailable': {
        dataField = { [name]: event.target.checked };
        break;
      }
      case 'images': {
        dataField = { [name]: event };
        break;
      }
      case 'origin':
      case 'uses': {
        const checkedTags = event.map(tag => tag.productTagId);
        const productTags = unionBy(product.productTags, event, 'productTagId');
        remove(
          productTags,
          item =>
            !checkedTags.includes(item.productTagId) && item.type === name,
        );
        dataField = { productTags };
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

  const onSaveProduct = type => {
    const noValidate = validateField();
    if (noValidate) {
      if (editMode) {
        editProduct();
      } else {
        addProduct();
      }
      setTypeSave(type);
      setValidate({});
    }
  };

  const onConfirmCancelCancelProduct = () => {
    setOpenCancelConfirm(false);
  };

  const onConfirmCancelProduct = () => {
    setOpenCancelConfirm(false);
    goToListProduct();
  };

  const onBeforeLoadEditor = editor => {
    const instanceEditor = editor;
    instanceEditor.config.height = 400;
    instanceEditor.disableAutoInline = true;
  };

  return (
    <div>
      <Helmet>
        <title>
          {editMode || productId
            ? intl.formatMessage(messages.editHeader)
            : intl.formatMessage(messages.addHeader)}
        </title>
        <meta name="description" content="Description of ProductUpdate" />
      </Helmet>

      <Header
        title={
          editMode || productId
            ? intl.formatMessage(messages.editHeader)
            : intl.formatMessage(messages.addHeader)
        }
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<Typography variant="h6">Thông tin sản phẩm</Typography>}
            />
            <CardContent>
              <Grid container spacing={3} alignItems="flex-start">
                <Grid container item xs spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      variant="outlined"
                      fullWidth
                      value={product.name}
                      id="product-name"
                      label={intl.formatMessage(messages.name)}
                      onChange={handleOnChangeDataField('name')}
                      error={validate.name && validate.name.error}
                      helperText={
                        validate.name &&
                        intl.formatMessage(messages[validate.name.helperText])
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      variant="outlined"
                      fullWidth
                      id="product-sku"
                      label="SKU"
                      value={product.sku && product.sku}
                      onChange={handleOnChangeDataField('sku')}
                      error={validate.sku && validate.sku.error}
                      helperText={
                        validate.sku &&
                        intl.formatMessage(messages[validate.sku.helperText])
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ComboBox
                      nameLabel="Thương hiệu"
                      dataSource={brandList}
                      dataTextField="name"
                      dataValueField="brandId"
                      selectedValue={
                        product.brand ? `${product.brand.brandId}` : ''
                      }
                      onSelectedChange={handleOnChangeDataField('brandId')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="quantity"
                      label="Số lượng"
                      value={product.quantity}
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
                </Grid>
                <Grid container item xs spacing={3}>
                  <Grid item xs={12}>
                    <ComboBox
                      multiple
                      nameLabel="Nhóm sản phẩm"
                      dataSource={categoryList}
                      dataTextField="name"
                      dataValueField="categoryId"
                      selectedValue={
                        product.categories &&
                        product.categories.map(
                          category => `${category.categoryId}`,
                        )
                      }
                      onSelectedChange={handleOnChangeDataField('categoryId')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ProductTags
                      type="origin"
                      nameLabel="Xuất xứ"
                      selectedTags={
                        product.productTags &&
                        product.productTags.map(tag => `${tag.productTagId}`)
                      }
                      onChange={handleOnChangeDataField('origin')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ProductTags
                      type="uses"
                      nameLabel="Công dụng"
                      selectedTags={
                        product.productTags &&
                        product.productTags.map(tag => `${tag.productTagId}`)
                      }
                      onChange={handleOnChangeDataField('uses')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box m={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={product.isAvailable}
                            onChange={handleOnChangeDataField('isAvailable')}
                            color="primary"
                          />
                        }
                        label="Sản phẩm sẵn sàng bán"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Typography variant="h6">Giá bán</Typography>} />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="retailPrice"
                    label="Giá bán lẻ"
                    value={
                      product.price && product.price.retailPrice
                        ? product.price.retailPrice
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
                      product.price && product.price.originRetailPrice
                        ? product.price.originRetailPrice
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
                      product.price && product.price.wholesalePrice
                        ? product.price.wholesalePrice
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
                      product.price && product.price.originWholesalePrice
                        ? product.price.originWholesalePrice
                        : ''
                    }
                    onChange={handleOnChangeDataField('originWholesalePrice')}
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
              title={<Typography variant="h6">Hình ảnh</Typography>}
            />
            <CardContent>
              <ImagesUpload
                multiple
                onChangeImage={handleOnChangeDataField('images')}
                images={product.images}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Typography variant="h6">Mô tả</Typography>} />
            <CardContent>
              <CKEditor
                data={product.description}
                onBeforeLoad={onBeforeLoadEditor}
                onChange={handleOnChangeDataField('description')}
              />
            </CardContent>
          </Card>
        </Grid>
        {editMode && (
          <Grid item xs={12}>
            <ProductVariantList
              productId={product.productId}
              firstOpen={typeSave === 'addVariant'}
              productPrice={product.price}
            />
          </Grid>
        )}
        {editMode && (
          <Grid item xs={12}>
            <ProductRelated
              productId={product.productId}
              productRelated={product.relatedProducts}
            />
          </Grid>
        )}
        <Grid item container xs={12} justify="center">
          <Grid item>
            <Button icon="save" onClick={() => onSaveProduct('normal')} />
            {!editMode && !productId && (
              <>
                <Button
                  name="Lưu và thêm biến thể"
                  icon="save"
                  onClick={() => onSaveProduct('addVariant')}
                />
                <Button
                  name="Lưu và tạo mới"
                  icon="save"
                  onClick={() => onSaveProduct('createNew')}
                />
              </>
            )}
            <Button
              icon="cancel"
              color="default"
              onClick={() => setOpenCancelConfirm(true)}
            />
          </Grid>
        </Grid>
      </Grid>

      <AlertDialog
        open={openCancelConfirm}
        description="Hủy lưu thông tin sản phẩm ?"
        onCancel={onConfirmCancelCancelProduct}
        onConfirm={onConfirmCancelProduct}
      />
    </div>
  );
};

ProductUpdate.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.any,
  match: PropTypes.any,
  brandList: PropTypes.array,
  categoryList: PropTypes.array,
  product: PropTypes.object,
  getCategoryList: PropTypes.func,
  getBrandList: PropTypes.func,
  setDataField: PropTypes.func,
  addProduct: PropTypes.func,
  getProduct: PropTypes.func,
  editProduct: PropTypes.func,
  cleanData: PropTypes.func,
  shouldUpdate: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  product: makeSelectProduct(),
  brandList: makeSelectBrandList(),
  categoryList: makeSelectCategoryList(),
  shouldUpdate: makeSelectShouldUpdate(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCategoryList: payload => dispatch(getCategoryListRequest(payload)),
    getBrandList: payload => dispatch(getBrandListRequest(payload)),
    addProduct: () => dispatch(addRequest()),
    setDataField: payload => dispatch(updateDataField(payload)),
    getProduct: payload => dispatch(getRequest(payload)),
    editProduct: () => dispatch(editRequest()),
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
)(injectIntl(ProductUpdate));
