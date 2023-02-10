/**
 *
 * ProductVariantList
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { set } from 'lodash';
import { compose } from 'redux';

import AlertDialog from 'components/AlertDialog';
import Button from 'components/Button';
import TableAdvance from 'components/TableAdvance';
import ProductVariant from 'containers/ProductVariant';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import {
  makeSelectProductVariantList,
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
  editRequest,
  deleteRequest,
} from './actions';

export function ProductVariantList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    productId,
    firstOpen,
    productVariantList,
    paging,
    getProductVariantList,
    addProductVariant,
    editProductVariant,
    deleteProductVariant,
    refreshData,
    productPrice,
  } = props;

  const [productVariantId, setProductVariantId] = useState(0);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [copyMode, setCopyMode] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchData({});
    }
  }, [productId]);

  useEffect(() => {
    if (refreshData) {
      handleOnCancel();
    }
  }, [refreshData]);

  useEffect(() => {
    if (firstOpen) {
      setOpenDialogUpdate(true);
    }
  }, [firstOpen]);

  const copyAction = id => (
    <Button
      key={`copy-${id}`}
      icon="copy"
      type="iconButton"
      onClick={() => {
        setProductVariantId(id);
        setOpenDialogUpdate(true);
        setCopyMode(true);
      }}
    />
  );

  const editAction = id => (
    <Button
      key={`edit-${id}`}
      icon="edit"
      type="iconButton"
      onClick={() => {
        setProductVariantId(id);
        setOpenDialogUpdate(true);
        setEditMode(true);
      }}
    />
  );

  const deleteAction = id => (
    <Button
      key={`delete-${id}`}
      icon="delete"
      type="iconButton"
      onClick={() => {
        setProductVariantId(id);
      }}
    />
  );

  const customizeCell = dataRow => {
    const { variantValues } = dataRow;
    if (variantValues) {
      const values = variantValues.map(item => item.name);
      return values.join(' , ');
    }
    return '';
  };

  const headerRows = [
    {
      id: 'productVariantId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'imageSource',
      type: 'image',
      label: `${intl.formatMessage(messages.thumbnail)}`,
    },
    {
      id: 'sku',
      type: 'text',
      label: 'SKU',
    },
    {
      id: 'quantity',
      type: 'number',
      label: `${intl.formatMessage(messages.quantity)}`,
      align: 'right',
    },
    {
      id: 'attribute',
      type: 'customize',
      label: 'Thuộc tính',
      customize: customizeCell,
    },
    {
      id: 'isDefault',
      type: 'checked',
      label: 'Mặc định',
      align: 'center',
      hidden: 0,
    },
    {
      id: 'color',
      type: 'text',
      label: 'Mã màu',
    },
    {
      id: 'price.retailPrice',
      type: 'number',
      label: 'Giá',
    },
    {
      id: 'action',
      type: 'actions',
      actions: [copyAction, editAction, deleteAction],
      align: 'right',
    },
  ];

  const fetchData = payload => {
    getProductVariantList({ productId, ...payload });
  };

  const onConfirmCancelRemove = () => {
    setProductVariantId(0);
  };

  const onConfirmRemove = () => {
    deleteProductVariant({ id: productVariantId });
    setProductVariantId(0);
  };

  const handleOnChange = variant => {
    if (editMode) {
      editProductVariant({ data: variant });
    } else {
      addProductVariant({ data: set(variant, 'productId', productId) });
    }
  };

  const handleOnCancel = () => {
    setOpenDialogUpdate(false);
    setProductVariantId(0);
    setEditMode(false);
    setCopyMode(false);
  };

  const actions = [
    <div key={2} style={{ flexGrow: 1 }} />,
    <Button
      key={1}
      icon="add"
      name="Thêm biến thể"
      onClick={() => setOpenDialogUpdate(true)}
    />,
  ];

  return (
    <>
      <TableAdvance
        name="Biến thể"
        columnKey="productVariantId"
        headerRows={headerRows}
        rows={productVariantList}
        paging={paging}
        fetchDataForPage={fetchData}
        refreshData={refreshData}
        actions={actions}
      />
      <ProductVariant
        open={openDialogUpdate}
        editMode={editMode}
        copyMode={copyMode}
        productVariantId={productVariantId}
        onCancel={handleOnCancel}
        onChange={handleOnChange}
        productPrice={productPrice}
      />
      <AlertDialog
        open={productVariantId !== 0 && !editMode && !copyMode}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </>
  );
}

ProductVariantList.propTypes = {
  intl: intlShape,
  firstOpen: PropTypes.bool,
  productId: PropTypes.number,
  productVariantList: PropTypes.array,
  paging: PropTypes.object,
  getProductVariantList: PropTypes.func,
  addProductVariant: PropTypes.func,
  editProductVariant: PropTypes.func,
  deleteProductVariant: PropTypes.func,
  productPrice: PropTypes.object,
  refreshData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  productVariantList: makeSelectProductVariantList(),
  paging: makeSelectPaging(),
  refreshData: makeSelectRefreshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductVariantList: payload => dispatch(getListRequest(payload)),
    addProductVariant: payload => dispatch(addRequest(payload)),
    editProductVariant: payload => dispatch(editRequest(payload)),
    deleteProductVariant: payload => dispatch(deleteRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(ProductVariantList));
