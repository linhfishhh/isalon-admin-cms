/**
 *
 * ProductInCategory
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Toolbar, Paper, Typography } from '@material-ui/core';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { getImageObject } from 'utils/images';

import Button from 'components/Button';
import Header from 'components/Header';
import ComboBox from 'components/ComboBox';
import TableAdvance from 'components/TableAdvance';
import AlertDialog from 'components/AlertDialog';
import DnDListItem from 'components/DnDListItem';
import Img from 'components/Img';

import UpdateProductDialog from './UpdateProductDialog';
import {
  makeSelectProductInCategoryList,
  makeSelectPaging,
  makeSelectRefreshData,
  makeSelectProductList,
  makeSelectProductPaging,
  makeSelectCategoryList,
  makeSelectCategoryInfo,
} from './selectors';
import {
  getListRequest,
  addRequest,
  deleteRequest,
  getListCategoryRequest,
  getListProductRequest,
  getCategoryInfoRequest,
  updateSubCategoryOrderRequest,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES } from './constants';

const useStyles = makeStyles(theme => ({
  subCategoryImage: {
    width: 80,
    height: 80,
  },
  categoryName: {
    marginLeft: theme.spacing(4),
  },
}));

export function ProductInCategory(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);

  const classes = useStyles();

  const {
    intl,
    dispatch,
    match,
    productInCategory,
    paging,
    refreshData,
    productList,
    productPaging,
    categoryList,
    getProductList,
    getProductInCategoryList,
    getCategoryList,
    addProduct,
    deleteProduct,
    getCategoryInfo,
    categoryInfo,
    updateSubCategoriesOrder,
  } = props;

  const [productRemove, setProductRemove] = useState(0);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [categorySelect, setCategorySelect] = useState();
  const [subCategories, setSubCategories] = useState([]);

  const categoryId = get(match, 'params.categoryId');

  useEffect(() => {
    getCategoryList({ limit: 100 });
  }, []);

  useEffect(() => {
    if (categorySelect) {
      getProductInCategoryList({
        categoryId: categorySelect.categoryId,
      });
      getProductList({
        categoryId: categorySelect.categoryId,
      });
      getCategoryInfo(categorySelect.categoryId);
    }
  }, [categorySelect]);

  useEffect(() => {
    setSubCategories(get(categoryInfo, 'subCategories', []));
  }, [categoryInfo]);

  useEffect(() => {
    if (categoryId && categoryList.length) {
      const category = categoryList.find(
        item => `${item.categoryId}` === categoryId,
      );
      setCategorySelect(category);
    }
  }, [categoryList]);

  useEffect(() => {
    if (refreshData) {
      handleCancelAddProduct();
      getProductList({
        categoryId: categorySelect.categoryId,
      });
    }
  }, [refreshData]);

  const deleteAction = id => (
    <Button
      key={`delete-${id}`}
      name="Xoá khỏi nhóm sản phẩm"
      icon="delete"
      type="iconButton"
      onClick={() => setProductRemove(id)}
    />
  );

  const editAction = id => (
    <Button
      key={`edit-${id}`}
      name="Chỉnh sửa sản phẩm"
      icon="edit"
      type="iconButton"
      onClick={() => editProduct(id)}
    />
  );

  const editProduct = productId => {
    dispatch(push(`/admin/product/edit/${productId}`));
  };

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
    {
      id: 'action',
      type: 'actions',
      actions: [editAction, deleteAction],
      align: 'right',
    },
  ];

  const handleOnApplyOrder = () => {
    if (subCategories) {
      const params = subCategories.map((cat, index) => ({
        categoryId: cat.categoryId,
        categoryOrder: index,
      }));
      updateSubCategoriesOrder(params);
    }
  };

  const handleCancelApplyOrder = () => {
    setSubCategories(get(categoryInfo, 'subCategories', []));
  };

  const actions = [
    <Grid container key={1}>
      <Grid item sm={4}>
        <ComboBox
          key={1}
          nameLabel=" Nhóm sản phẩm"
          dataSource={categoryList}
          dataTextField="name"
          dataValueField="categoryId"
          selectedValue={categorySelect && `${categorySelect.categoryId}`}
          onSelectedChange={item => setCategorySelect(item)}
          disabledPadding
        />
      </Grid>
      <Grid item xs />
      {subCategories && subCategories.length > 0 ? (
        <Grid item>
          <Grid container>
            <Grid item>
              <Button
                icon="cancel"
                name="Hủy"
                key={1}
                onClick={handleCancelApplyOrder}
              />
            </Grid>
            <Grid item>
              <Button
                icon="sort"
                name="Lưu thay đổi"
                key={2}
                onClick={handleOnApplyOrder}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item>
          <Button
            icon="add"
            name="Thêm sản phẩm vào nhóm"
            key={2}
            onClick={() => setOpenDialogUpdate(true)}
          />
        </Grid>
      )}
    </Grid>,
  ];

  const fetchDataProductInCategoryForPage = payload => {
    const { page, limit } = payload;
    if (categorySelect) {
      getProductInCategoryList({
        page,
        limit,
        categoryId: categorySelect.categoryId,
      });
    }
  };

  const fetchDataProductForPage = payload => {
    const { page, limit } = payload;
    if (categorySelect) {
      getProductList({ page, limit, categoryId: categorySelect.categoryId });
    }
  };

  const onConfirmCancelRemove = () => {
    setProductRemove(0);
  };

  const onConfirmRemove = () => {
    deleteProduct({
      categoryId: categorySelect.categoryId,
      data: { products: [productRemove] },
    });
    setProductRemove(0);
  };

  const handleOnAddProduct = productSelect => {
    addProduct({
      categoryId: categorySelect.categoryId,
      data: { products: productSelect },
    });
  };

  const handleCancelAddProduct = () => {
    setOpenDialogUpdate(false);
  };

  const renderSubCategoryItem = item => (
    <Grid container alignItems="center">
      <Grid item>
        <Img
          src={get(getImageObject(item.imageId), 'imageSource')}
          className={classes.subCategoryImage}
        />
      </Grid>
      <Grid item>
        <Typography className={classes.categoryName}>{item.name}</Typography>
      </Grid>
    </Grid>
  );

  const onSubCategoriesOrderChange = newOrderList => {
    setSubCategories(newOrderList);
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of ProductInCategory" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {subCategories && subCategories.length > 0 ? (
            <Grid container>
              <Grid item xs={12}>
                <Toolbar variant="regular">
                  {actions && actions.map(action => action)}
                </Toolbar>
              </Grid>
              <Grid item xs={12}>
                <Paper>
                  <DnDListItem
                    items={subCategories}
                    renderChild={renderSubCategoryItem}
                    onOrderChange={onSubCategoriesOrderChange}
                  />
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <TableAdvance
              columnKey="productId"
              rows={productInCategory}
              headerRows={headerRows}
              paging={paging}
              fetchDataForPage={fetchDataProductInCategoryForPage}
              refreshData={refreshData}
              actions={actions}
            />
          )}
        </Grid>
      </Grid>

      <AlertDialog
        open={productRemove !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
      <UpdateProductDialog
        open={openDialogUpdate}
        getProductList={fetchDataProductForPage}
        paging={productPaging}
        productList={productList}
        onCancel={handleCancelAddProduct}
        onAgree={handleOnAddProduct}
      />
    </div>
  );
}

ProductInCategory.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  match: PropTypes.object,
  productInCategory: PropTypes.array,
  paging: PropTypes.object,
  refreshData: PropTypes.bool,
  productList: PropTypes.array,
  productPaging: PropTypes.object,
  categoryList: PropTypes.array,
  getProductList: PropTypes.func,
  getProductInCategoryList: PropTypes.func,
  getCategoryList: PropTypes.func,
  addProduct: PropTypes.func,
  deleteProduct: PropTypes.func,
  getCategoryInfo: PropTypes.func,
  categoryInfo: PropTypes.object,
  updateSubCategoriesOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  productInCategory: makeSelectProductInCategoryList(),
  paging: makeSelectPaging(),
  refreshData: makeSelectRefreshData(),
  productList: makeSelectProductList(),
  productPaging: makeSelectProductPaging(),
  categoryList: makeSelectCategoryList(),
  categoryInfo: makeSelectCategoryInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductInCategoryList: payload => dispatch(getListRequest(payload)),
    addProduct: payload => dispatch(addRequest(payload)),
    deleteProduct: payload => dispatch(deleteRequest(payload)),
    getProductList: payload => dispatch(getListProductRequest(payload)),
    getCategoryList: payload => dispatch(getListCategoryRequest(payload)),
    getCategoryInfo: id => dispatch(getCategoryInfoRequest({ id })),
    updateSubCategoriesOrder: orders =>
      dispatch(updateSubCategoryOrderRequest({ orders })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(ProductInCategory));
