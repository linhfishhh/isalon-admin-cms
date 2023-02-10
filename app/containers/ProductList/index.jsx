/**
 *
 * ProductList
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { Grid, TextField } from '@material-ui/core';

import TableAdvance from 'components/TableAdvance';
import AlertDialog from 'components/AlertDialog';
import Button from 'components/Button';
import Header from 'components/Header';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import {
  makeSelectProductList,
  makeSelectRefreshData,
  makeSelectPaging,
} from './selectors';
import { getListRequest, deleteRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function ProductList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    dispatch,
    productList,
    paging,
    getProductList,
    deleteProduct,
    refreshData,
  } = props;

  const [productRemove, setProductRemove] = useState(0);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    getProductList({});
  }, []);

  const editAction = id => (
    <Button
      key={`edit-${id}`}
      icon="edit"
      type="iconButton"
      onClick={() => editProduct(id)}
    />
  );

  const detailAction = id => (
    <Button
      variant="outlined"
      key={`detail-${id}`}
      icon="detail"
      type="iconButton"
      onClick={() => detailProduct(id)}
    />
  );

  const deleteAction = id => (
    <Button
      key={`delete-${id}`}
      icon="delete"
      type="iconButton"
      onClick={() => setProductRemove(id)}
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
      width: 300,
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
      actions: [detailAction, editAction, deleteAction],
      align: 'right',
    },
  ];

  const actions = [
    <div key={1} style={{ flexGrow: 1 }} />,
    <TextField
      key={2}
      style={{ width: 300 }}
      margin="dense"
      value={searchKey}
      variant="outlined"
      id="product-search"
      label="Tìm kiếm sản phẩm"
      onChange={event => handleOnSearchProduct(event)}
    />,
  ];

  const fetchDataForPage = payload => {
    const { page, limit } = payload;
    getProductList({ page, limit, search: searchKey });
  };

  const createProduct = () => {
    dispatch(push('/admin/product-create'));
  };

  const editProduct = productId => {
    dispatch(push(`/admin/product/edit/${productId}`));
  };

  const detailProduct = productId => {
    dispatch(push(`/admin/product/detail/${productId}`));
  };

  const onConfirmCancelRemove = () => {
    setProductRemove(0);
  };

  const onConfirmRemove = () => {
    deleteProduct({ id: productRemove });
    setProductRemove(0);
  };

  const getListProductDebound = useCallback(
    debounce(textSearch => {
      getProductList({ search: textSearch });
    }, 2000),
    [],
  );

  const handleOnSearchProduct = event => {
    const textSearch = event.target.value;
    setSearchKey(textSearch);
    getListProductDebound(textSearch);
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of ProductList" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)}>
        <Button icon="add" onClick={createProduct} />
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableAdvance
            columnKey="productId"
            rows={productList}
            headerRows={headerRows}
            paging={paging}
            fetchDataForPage={fetchDataForPage}
            refreshData={refreshData}
            actions={actions}
          />
        </Grid>
      </Grid>

      <AlertDialog
        open={productRemove !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </div>
  );
}

ProductList.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  productList: PropTypes.array,
  getProductList: PropTypes.func,
  deleteProduct: PropTypes.func,
  refreshData: PropTypes.bool,
  paging: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  productList: makeSelectProductList(),
  refreshData: makeSelectRefreshData(),
  paging: makeSelectPaging(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductList: payload => dispatch(getListRequest(payload)),
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
)(injectIntl(ProductList));
