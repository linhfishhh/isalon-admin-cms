/**
 *
 * OrderList
 *
 */

import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import { injectIntl, intlShape } from 'react-intl';
import { push } from 'connected-react-router';

import TableAdvance from 'components/TableAdvance';
import Button from 'components/Button';
import Header from 'components/Header';
import { path, createPath } from 'routers/path';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { orderStatus, paymentType } from 'utils/enums';
import { numberFormat, currencyFormat } from 'utils/stringFormat';

import ExportDialog from './Views/ExportDialog';
import {
  makeSelectOrderList,
  makeSelectPaging,
  makeSelectRefreshData,
} from './selectors';
import { getListRequest, exportRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES } from './constants';

export function OrderList(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);

  const {
    dispatch,
    intl,
    orderList,
    paging,
    getOrderList,
    exportData,
    refreshData,
  } = props;

  const [openExportDialog, setOpenExportDialog] = useState(false);

  useEffect(() => {
    getOrderList({});
  }, []);

  const editAction = id => (
    <Button
      key={`edit-${id}`}
      icon="edit"
      type="iconButton"
      onClick={() => editOrder(id)}
    />
  );

  const detailAction = id => (
    <Button
      variant="outlined"
      key={`detail-${id}`}
      icon="detail"
      type="iconButton"
      onClick={() => detailOrder(id)}
    />
  );

  const editOrder = useCallback(orderId => {
    dispatch(push(createPath(path.orderEdit, { orderId })));
  }, []);

  const detailOrder = useCallback(orderId => {
    dispatch(push(createPath(path.orderDetail, { orderId })));
  }, []);

  const amountCell = dataRow => {
    const xu = dataRow.amountCoin || 0;
    const money = dataRow.amountMoney || 0;
    return (
      <Grid container>
        {xu > 0 && <Grid item xs={12}>{`${numberFormat(xu)} xu`}</Grid>}
        {money > 0 && (
          <Grid item xs={12}>
            {currencyFormat(money)}
          </Grid>
        )}
      </Grid>
    );
  };

  const headerRows = useMemo(
    () => [
      {
        id: 'orderId',
        type: 'text',
        label: 'ID',
      },
      {
        id: 'profile.fullName',
        type: 'text',
        label: 'Khách hàng',
      },
      {
        id: 'createdAt',
        type: 'dateTime',
        label: 'Ngày tạo',
      },
      {
        id: 'shippedAt',
        type: 'dateTime',
        label: 'Ngày giao hàng',
      },
      {
        id: 'total',
        type: 'currency',
        label: 'Giá trị đơn hàng',
        align: 'right',
      },
      {
        id: 'amount',
        type: 'customize',
        label: 'Thanh toán',
        align: 'right',
        customize: amountCell,
      },
      {
        id: 'status',
        type: 'typeOf',
        label: 'Trạng thái',
        typeList: orderStatus,
        align: 'right',
      },
      {
        id: 'action',
        type: 'actions',
        actions: [detailAction, editAction],
        align: 'right',
      },
    ],
    [],
  );

  const handleOnCancel = () => {
    setOpenExportDialog(false);
  };

  const handleOnAgree = filter => {
    exportData({ filter });
    setOpenExportDialog(false);
  };

  const createOrder = () => {
    dispatch(push(path.orderCreate));
  };

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of OrderList" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)}>
        <Button icon="excel" onClick={() => setOpenExportDialog(true)} />
        <Button icon="add" onClick={createOrder} />
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableAdvance
            columnKey="orderId"
            rows={orderList}
            headerRows={headerRows}
            paging={paging}
            fetchDataForPage={getOrderList}
            refreshData={refreshData}
          />
        </Grid>
      </Grid>
      <ExportDialog
        open={openExportDialog}
        onCancel={handleOnCancel}
        onAgree={handleOnAgree}
      />
    </>
  );
}

OrderList.propTypes = {
  dispatch: PropTypes.func,
  intl: intlShape,
  orderList: PropTypes.array,
  paging: PropTypes.object,
  getOrderList: PropTypes.func,
  exportData: PropTypes.func,
  refreshData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  orderList: makeSelectOrderList(),
  paging: makeSelectPaging(),
  refreshData: makeSelectRefreshData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getOrderList: payload => dispatch(getListRequest(payload)),
    exportData: payload => dispatch(exportRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(OrderList));
