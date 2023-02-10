/**
 *
 * ProductRelated
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AlertDialog from 'components/AlertDialog';
import Button from 'components/Button';
import TableAdvance from 'components/TableAdvance';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';
import { appendImageObject } from 'utils/images';

import UpdateProductDialog from './UpdateProductDialog';
import {
  makeSelectProductRelated,
  makeSelectProductNoRelated,
  makeSelectPaging,
  makeSelectRefreshData,
} from './selectors';
import saga from './saga';
import reducer from './reducer';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';
import {
  getListRequest,
  addRequest,
  deleteRequest,
  setProductRelatedAction,
} from './actions';

export function ProductRelated(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    productId,
    productRelatedList,
    productNoRelatedList,
    paging,
    getProductNoRelated,
    addProductRelated,
    deleteProductRelated,
    refreshData,
    productRelated,
    setProductRelated,
  } = props;

  const [productRelatedId, setProductRelatedId] = useState(0);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchData({});
    }
  }, [productId]);

  useEffect(() => {
    setProductRelated(appendImageObject(productRelated, 'mainImageId'));
  }, [productRelated]);

  useEffect(() => {
    if (refreshData) {
      setOpenDialogUpdate(false);
      fetchData({});
    }
  }, [refreshData]);

  const deleteAction = id => (
    <Button
      key={`delete-${id}`}
      icon="delete"
      type="iconButton"
      onClick={() => {
        setProductRelatedId(id);
      }}
    />
  );

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
      actions: [deleteAction],
      align: 'right',
    },
  ];

  const fetchData = payload => {
    getProductNoRelated({ productId, ...payload });
  };

  const onConfirmCancelRemove = () => {
    setProductRelatedId(0);
  };

  const onConfirmRemove = () => {
    deleteProductRelated({ productId, id: productRelatedId });
    setProductRelatedId(0);
  };

  const handleOnAddProduct = productSelect => {
    if (productSelect.length > 0) {
      const relatedProducts = productSelect.map(item => ({
        productId,
        relatedProductId: item.productId,
      }));
      const data = { relatedProducts };
      addProductRelated({ data, productSelect });
    }
  };

  const handleCancelAddProduct = () => {
    setOpenDialogUpdate(false);
  };

  const actions = [
    <div key={2} style={{ flexGrow: 1 }} />,
    <Button
      key={1}
      icon="add"
      name="Thêm sản phẩm"
      onClick={() => setOpenDialogUpdate(true)}
    />,
  ];

  return (
    <>
      <TableAdvance
        name="Sản phẩm liên quan"
        columnKey="productId"
        headerRows={headerRows}
        rows={productRelatedList}
        actions={actions}
        options={{ showPaging: false }}
      />
      <UpdateProductDialog
        intl={intl}
        open={openDialogUpdate}
        getProductList={fetchData}
        paging={paging}
        productList={productNoRelatedList}
        onCancel={handleCancelAddProduct}
        onAgree={handleOnAddProduct}
      />
      <AlertDialog
        open={productRelatedId !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </>
  );
}

ProductRelated.propTypes = {
  intl: intlShape,
  productId: PropTypes.number,
  productRelatedList: PropTypes.array,
  productNoRelatedList: PropTypes.array,
  paging: PropTypes.object,
  getProductNoRelated: PropTypes.func,
  addProductRelated: PropTypes.func,
  deleteProductRelated: PropTypes.func,
  refreshData: PropTypes.bool,
  productRelated: PropTypes.array,
  setProductRelated: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  productRelatedList: makeSelectProductRelated(),
  productNoRelatedList: makeSelectProductNoRelated(),
  paging: makeSelectPaging(),
  refreshData: makeSelectRefreshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductNoRelated: payload => dispatch(getListRequest(payload)),
    addProductRelated: payload => dispatch(addRequest(payload)),
    deleteProductRelated: payload => dispatch(deleteRequest(payload)),
    setProductRelated: payload => dispatch(setProductRelatedAction(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(ProductRelated));
