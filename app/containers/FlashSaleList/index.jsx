/**
 *
 * FlashSaleList
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { Grid } from '@material-ui/core';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TableAdvance from 'components/TableAdvance';
import AlertDialog from 'components/AlertDialog';
import Button from 'components/Button';
import Header from 'components/Header';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import {
  makeSelectFlashSaleList,
  makeSelectPaging,
  makeSelectRefreshData,
} from './selectors';
import { getListRequest, deleteRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function FlashSaleList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    dispatch,
    flashSaleList,
    paging,
    getFlashSaleList,
    deleteFlashSale,
    refreshData,
  } = props;

  const [flashSaleRemove, setFlashSaleRemove] = useState(0);

  useEffect(() => {
    getFlashSaleList({});
  }, []);

  const editAction = id => (
    <Button
      key={`edit-${id}`}
      icon="edit"
      type="iconButton"
      onClick={() => editFlashSale(id)}
    />
  );

  const deleteAction = id => (
    <Button
      key={`delete-${id}`}
      icon="delete"
      type="iconButton"
      onClick={() => setFlashSaleRemove(id)}
    />
  );

  const headerRows = [
    {
      id: 'flashSaleId',
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
      id: 'startAt',
      type: 'dateTime',
      label: 'Bắt đầu',
    },
    {
      id: 'expiredAt',
      type: 'dateTime',
      label: 'Kết thúc',
    },
    {
      id: 'action',
      type: 'actions',
      actions: [editAction, deleteAction],
      align: 'right',
    },
  ];

  const createFlashSale = () => {
    dispatch(push('/admin/flash-sale/create'));
  };

  const editFlashSale = flashSaleId => {
    dispatch(push(`/admin/flash-sale/edit/${flashSaleId}`));
  };

  const onConfirmCancelRemove = () => {
    setFlashSaleRemove(0);
  };

  const onConfirmRemove = () => {
    deleteFlashSale({ id: flashSaleRemove });
    setFlashSaleRemove(0);
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of flash sale list" />
      </Helmet>
      <Header title={intl.formatMessage(messages.header)}>
        <Button icon="add" onClick={createFlashSale} />
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableAdvance
            columnKey="flashSaleId"
            rows={flashSaleList}
            headerRows={headerRows}
            paging={paging}
            fetchDataForPage={getFlashSaleList}
            refreshData={refreshData}
          />
        </Grid>
      </Grid>
      <AlertDialog
        open={flashSaleRemove !== 0}
        description={intl.formatMessage(messages.confirmDelete)}
        onCancel={onConfirmCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </div>
  );
}

FlashSaleList.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  flashSaleList: PropTypes.array,
  paging: PropTypes.object,
  getFlashSaleList: PropTypes.func,
  deleteFlashSale: PropTypes.func,
  refreshData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  flashSaleList: makeSelectFlashSaleList(),
  paging: makeSelectPaging(),
  refreshData: makeSelectRefreshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getFlashSaleList: payload => dispatch(getListRequest(payload)),
    deleteFlashSale: payload => dispatch(deleteRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(FlashSaleList));
