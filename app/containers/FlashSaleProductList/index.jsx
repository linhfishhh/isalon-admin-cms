/**
 *
 * FlashSaleProduct
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AlertDialog from 'components/AlertDialog';
import Button from 'components/Button';
import TableAdvance from 'components/TableAdvance';
import FlashSaleUpdatePrice from 'containers/FlashSaleUpdatePrice';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import {
  getListProductRequest,
  getListProductNotInRequest,
  deleteRequest,
} from './actions';
import {
  makeSelectFlashSaleProduct,
  makeSelectFlashSalePaging,
  makeSelectFlashSaleProductNotIn,
  makeSelectFlashSaleNotInPaging,
  makeSelectFlashSaleRefreshData,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function FlashSaleProductList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    flashSaleId,
    productList,
    paging,
    productNotInList,
    pagingNotIn,
    getProductList,
    getProductListNotIn,
    deleteProductFlashSale,
    refreshData,
  } = props;

  const [flashSaleProductRemove, setFlashSaleProductRemove] = useState(0);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [flashSaleProduct, setFlashSaleProduct] = useState();

  useEffect(() => {
    if (flashSaleId) {
      fetchProductData({});
      fetchProductDataNotIn({});
    }
  }, [flashSaleId]);

  const fetchProductData = payload => {
    getProductList({ flashSaleId, ...payload });
  };

  const fetchProductDataNotIn = payload => {
    getProductListNotIn({ flashSaleId, ...payload });
  };

  const deleteAction = id => (
    <Button
      key={`delete-${id}`}
      name="Xoá khỏi flash sale"
      icon="delete"
      type="iconButton"
      onClick={() => setFlashSaleProductRemove(id)}
    />
  );

  const editAction = id => (
    <Button
      key={`edit-${id}`}
      name="Chỉnh sửa giá"
      icon="edit"
      type="iconButton"
      onClick={() => handleEditAction(id)}
    />
  );

  const headerRows = [
    {
      id: 'flashSaleProductId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'product.imageSource',
      type: 'image',
      label: 'Ảnh đại diện',
    },
    {
      id: 'product.name',
      type: 'text',
      label: 'Tên',
    },
    {
      id: 'product.brand.name',
      type: 'text',
      label: 'Thương hiệu',
    },
    {
      id: 'product.defaultProductVariant.price.retailPrice',
      type: 'number',
      label: 'Giá bán lẻ',
      align: 'right',
      subId: 'product.price.retailPrice',
    },
    {
      id: 'price.retailPrice',
      type: 'number',
      label: 'Giá flash sale',
      align: 'right',
    },
    {
      id: 'product.isAvailable',
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

  const actions = [
    <div key={2} style={{ flexGrow: 1 }} />,
    <Button
      key={1}
      icon="add"
      name="Thêm sản phẩm"
      onClick={() => handleAddAction()}
    />,
  ];

  const handleAddAction = () => {
    setOpenUpdateDialog(true);
  };

  const handleEditAction = id => {
    const productFlashSale = productList.find(
      item => item.flashSaleProductId === id,
    );
    setFlashSaleProduct(productFlashSale);
    setEditMode(true);
    setOpenUpdateDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenUpdateDialog(false);
    setEditMode(false);
    setFlashSaleProduct();
  };

  const handleDidUpdate = () => {
    handleCloseDialog();
    setFlashSaleProduct();
    fetchProductData({});
    fetchProductDataNotIn({});
  };

  const onConfirmCancelRemove = () => {
    setFlashSaleProductRemove(0);
  };

  const onConfirmRemove = () => {
    deleteProductFlashSale({ flashSaleProductId: flashSaleProductRemove });
    setFlashSaleProductRemove(0);
  };

  return (
    <div>
      <TableAdvance
        name="Danh sách sản phẩm"
        columnKey="flashSaleProductId"
        headerRows={headerRows}
        rows={productList}
        paging={paging}
        fetchDataForPage={fetchProductData}
        refreshData={refreshData}
        actions={actions}
      />
      <AlertDialog
        open={flashSaleProductRemove !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
      <FlashSaleUpdatePrice
        open={openUpdateDialog}
        editMode={editMode}
        productList={productNotInList}
        paging={pagingNotIn}
        getProductList={fetchProductDataNotIn}
        onCancel={handleCloseDialog}
        flashSaleProduct={flashSaleProduct}
        didUpdate={handleDidUpdate}
        flashSaleId={flashSaleId}
      />
    </div>
  );
}

FlashSaleProductList.propTypes = {
  intl: intlShape,
  flashSaleId: PropTypes.number,
  productList: PropTypes.array,
  paging: PropTypes.object,
  productNotInList: PropTypes.array,
  pagingNotIn: PropTypes.object,
  getProductList: PropTypes.func,
  getProductListNotIn: PropTypes.func,
  deleteProductFlashSale: PropTypes.func,
  refreshData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  productList: makeSelectFlashSaleProduct(),
  paging: makeSelectFlashSalePaging(),
  productNotInList: makeSelectFlashSaleProductNotIn(),
  pagingNotIn: makeSelectFlashSaleNotInPaging(),
  refreshData: makeSelectFlashSaleRefreshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductList: payload => dispatch(getListProductRequest(payload)),
    getProductListNotIn: payload =>
      dispatch(getListProductNotInRequest(payload)),
    deleteProductFlashSale: payload => dispatch(deleteRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(FlashSaleProductList));
