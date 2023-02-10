/* eslint-disable react/no-danger */
/**
 *
 * ProductDetail
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
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
} from '@material-ui/core';
import { Done as DoneIcon } from '@material-ui/icons';
import styled from 'styled-components';

import AlertDialog from 'components/AlertDialog';
import ProductVariantList from 'containers/ProductVariantList';
import Header from 'components/Header';
import Button from 'components/Button';
import Img from 'components/Img';
import ProductRelated from 'containers/ProductRelated';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectToast } from 'utils/injectToast';
import { useInjectLoading } from 'utils/injectLoading';
import { numberFormat } from 'utils/stringFormat';

import { getRequest, deleteRequest } from './actions';
import { makeSelectProductDetail, makeSelectDeleteSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

const Label = props => {
  const { variant, text } = props;
  return (
    <Typography variant={variant || 'body2'} display="inline">
      {text}
    </Typography>
  );
};

Label.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.string,
};

const ImageListWrapper = styled.div`
  img {
    width: 150px;
    height: 150px;
    margin: 3px;
    border: solid 1px #ddd;
  }
`;

export function ProductDetail(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    match,
    dispatch,
    intl,
    product,
    deleteSuccess,
    getProduct,
    deleteProduct,
  } = props;

  const [showDialogConfirm, setShowDialogConfirm] = useState(false);

  const productId = get(match, 'params.productId');

  useEffect(() => {
    if (productId) {
      getProduct({ id: productId });
    }
  }, []);

  if (deleteSuccess) {
    dispatch(push('/admin/product'));
  }

  const editProduct = () => {
    if (productId) {
      dispatch(push(`/admin/product/edit/${productId}`));
    }
  };

  const deleteConfirmProduct = () => {
    if (productId) {
      setShowDialogConfirm(true);
    }
  };

  const onConfirmCancelRemove = () => {
    setShowDialogConfirm(false);
  };

  const onConfirmRemove = () => {
    if (productId) {
      deleteProduct({ id: productId });
    }
    setShowDialogConfirm(false);
  };

  const getCategories = () => {
    if (product.categories) {
      return product.categories.map(item => item.name).join(', ');
    }
    return '';
  };

  const getProductTags = type => {
    if (product.productTags) {
      const tags = product.productTags.filter(item => item.type === type);
      return tags.map(item => item.tag).join(', ');
    }
    return '';
  };

  const getProductImages = () => {
    if (product.images) {
      return product.images.map(item => (
        <Img key={item.imageId} src={item.imageSource} />
      ));
    }
    return '';
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of ProductDetail" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)}>
        <Button icon="edit" onClick={editProduct} />
        <Button icon="delete" color="default" onClick={deleteConfirmProduct} />
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<Typography variant="h6">Thông tin sản phẩm</Typography>}
            />
            <CardContent>
              <Grid container spacing={3} alignItems="flex-start">
                <Grid container item xs={12}>
                  <Grid item xs={4} md={2}>
                    <Label text="Tên sản phẩm:" />
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <Label variant="h6" text={product.name} />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={4} md={2}>
                    <Label text="Thương hiệu:" />
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <Label
                      variant="h6"
                      text={product.brand && product.brand.name}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={4} md={2}>
                    <Label text="Nhóm sản phẩm:" />
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <Label variant="h6" text={getCategories()} />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={4} md={2}>
                    <Label text="Xuất xứ:" />
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <Label variant="h6" text={getProductTags('origin')} />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={4} md={2}>
                    <Label text="Công dụng:" />
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <Label variant="h6" text={getProductTags('uses')} />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={4} md={2}>
                    <Label text="Sẵn sàng bán:" />
                  </Grid>
                  <Grid item xs={8} md={10}>
                    {product.isAvailable ? <DoneIcon color="primary" /> : ''}
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
              <Grid container spacing={3} alignItems="flex-start">
                <Grid container item xs={12}>
                  <Grid item xs={4} md={2}>
                    <Label text="Giá bán lẻ:" />
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <Label
                      variant="h6"
                      text={
                        product.price && numberFormat(product.price.retailPrice)
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={4} md={2}>
                    <Label text="Giá bán lẻ niêm yết:" />
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <Label
                      variant="h6"
                      text={
                        product.price &&
                        numberFormat(product.price.originRetailPrice)
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={4} md={2}>
                    <Label text="Giá bán buôn:" />
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <Label
                      variant="h6"
                      text={
                        product.price &&
                        numberFormat(product.price.wholesalePrice)
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={4} md={2}>
                    <Label text="Giá bán buôn niêm yết:" />
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <Label
                      variant="h6"
                      text={
                        product.price &&
                        numberFormat(product.price.originWholesalePrice)
                      }
                    />
                  </Grid>
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
              <ImageListWrapper>{getProductImages()}</ImageListWrapper>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Typography variant="h6">Mô tả</Typography>} />
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {!isEmpty(product) && (
            <ProductVariantList
              productId={product.productId}
              productPrice={product.price}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {!isEmpty(product) && (
            <ProductRelated
              productId={product.productId}
              productRelated={product.relatedProducts}
            />
          )}
        </Grid>
      </Grid>

      <AlertDialog
        open={showDialogConfirm}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </div>
  );
}

ProductDetail.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  match: PropTypes.any,
  product: PropTypes.object,
  deleteSuccess: PropTypes.bool,
  getProduct: PropTypes.func,
  deleteProduct: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  product: makeSelectProductDetail(),
  deleteSuccess: makeSelectDeleteSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProduct: payload => dispatch(getRequest(payload)),
    deleteProduct: payload => dispatch(deleteRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(ProductDetail));
