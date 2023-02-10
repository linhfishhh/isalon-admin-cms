/**
 *
 * CustomerDetail
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Typography, Card, CardContent, Avatar } from '@material-ui/core';
import { AccountCircle as AvatarIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { NUMBER_PAGE_SIZE } from 'utils/constants';

import TabsAdvance from 'components/TabsAdvance';
import TableAdvance from 'components/TableAdvance';
import Button from 'components/Button';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
// import { numberFormat, phoneNumberFormat } from 'utils/stringFormat';
import { orderStatus, paymentType, userTransactionTypes } from 'utils/enums';
import { numberFormat } from 'utils/stringFormat';
import EditCoin from 'components/EditCoin';

import {
  getOrderListRequest,
  getProfileRequest,
  cleanDataAction,
  getUserWalletRequest,
  updateUserWalletRequest,
  getWalletTransactionsRequest,
} from './actions';
import {
  makeSelectOrderList,
  makeSelectOrderPaging,
  makeSelectProfile,
  makeSelectWallet,
  makeSelectWalletTransactions,
  makeSelectTransactionsPaging,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES } from './constants';

const tabList = [
  { id: 'profile', name: 'Thông tin' },
  { id: 'ordered', name: 'Đơn đặt hàng' },
  { id: 'transaction', name: 'Lịch sử xu' },
];

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

export function CustomerDetail(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);

  const {
    intl,
    dispatch,
    match,
    orderList,
    orderPaging,
    getOrderList,
    profile,
    getProfile,
    cleanData,
    wallet,
    getUserWallet,
    updateUserWallet,
    getWalletTransactions,
    transactions,
    transactionsPaging,
  } = props;
  console.log('CustomerDetail -> transactions', transactions);
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(tabList[0]);

  const profileId = get(match, 'params.profileId');

  useEffect(() => {
    if (profileId) {
      getProfile({ profileId });
      getUserWallet(profileId);
    }
    return () => {
      cleanData();
    };
  }, []);

  const fetchOrderList = payload => {
    if (profileId) {
      getOrderList({ ...payload, profileId });
    }
  };

  const detailAction = id => (
    <Button
      variant="outlined"
      key={`detail-${id}`}
      icon="detail"
      fontSize="small"
      options={{ showIcon: false }}
      onClick={() => detailOrder(id)}
    />
  );

  const headerRows = [
    {
      id: 'orderId',
      type: 'text',
      label: 'ID',
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
      id: 'paymentType',
      type: 'typeOf',
      label: 'Thanh toán',
      typeList: paymentType,
      align: 'right',
    },
    {
      id: 'total',
      type: 'number',
      label: 'Thành tiền',
      align: 'right',
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
      actions: [detailAction],
      align: 'right',
    },
  ];

  const headerTransactionsRows = [
    {
      id: 'userTransactionId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'productOrderId',
      type: 'text',
      label: 'Shopping order ID',
      align: 'center',
    },
    {
      id: 'serviceOrderId',
      type: 'text',
      label: 'Booking order ID',
      align: 'center',
    },
    {
      id: 'createdDate',
      type: 'dateTime',
      label: 'Thời gian',
    },
    {
      id: 'beforeAmountCoin',
      type: 'number',
      label: 'Số xu trước thay đổi',
    },
    {
      id: 'amountCoin',
      type: 'number',
      label: 'Số xu thay đổi',
    },
    {
      id: 'type',
      type: 'typeOf',
      label: 'Loại hình',
      typeList: userTransactionTypes,
    },
    {
      id: 'description',
      type: 'text',
      label: 'Lý do thay đổi',
    },
  ];

  const detailOrder = orderId => {
    dispatch(push(`/admin/order/detail/${orderId}`));
  };

  const onChangeTab = React.useCallback(
    tab => {
      setActiveTab(tab);
      if (tab.id === 'transaction') {
        getWalletTransactions({ profileId });
      } else if (tab.id === 'ordered') {
        getOrderList({ profileId });
      }
    },
    [profileId],
  );

  const fetchTransacionList = React.useCallback(
    payload => {
      const { page = 0, limit = NUMBER_PAGE_SIZE } = payload;
      getWalletTransactions({ profileId, pageNumber: page, pageSize: limit });
    },
    [profileId],
  );

  const onUpdateCoin = React.useCallback(params => {
    const { id, reason, amountCoin = 0 } = params;
    const updateParams = {
      profileId: id,
      description: reason,
      amount: parseInt(amountCoin, 10),
    };
    if (updateUserWallet) {
      updateUserWallet(updateParams);
    }
  }, []);

  const renderContentTab = itemData => {
    if (itemData.id === 'profile') {
      return (
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={4} md={2}>
                <Typography>Điện thoại</Typography>
              </Grid>
              <Grid item xs={8} md={10}>
                <Typography variant="subtitle1">{profile.phone}</Typography>
              </Grid>
              <Grid item xs={4} md={2}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item xs={8} md={10}>
                <Typography variant="subtitle1">{profile.email}</Typography>
              </Grid>
              <Grid item xs={4} md={2}>
                <Typography>Số xu</Typography>
              </Grid>
              <Grid item xs={8} md={10}>
                <Typography variant="subtitle1">{`${numberFormat(
                  get(wallet, 'amountCoin', 0),
                )} xu`}</Typography>
              </Grid>
            </Grid>
            <EditCoin
              className={classes.editButton}
              data={{
                name: profile.fullName,
                id: profileId,
                currentCoin: get(wallet, 'amountCoin', 0),
              }}
              onUpdateCoin={onUpdateCoin}
            />
          </CardContent>
        </Card>
      );
    }
    if (itemData.id === 'ordered') {
      return (
        <TableAdvance
          columnKey="orderId"
          rows={orderList}
          headerRows={headerRows}
          paging={orderPaging}
          fetchDataForPage={fetchOrderList}
        />
      );
    }
    return (
      <TableAdvance
        columnKey="userTransactionId"
        rows={transactions}
        headerRows={headerTransactionsRows}
        paging={transactionsPaging}
        fetchDataForPage={fetchTransacionList}
      />
    );
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of CustomerDetail" />
      </Helmet>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              {profile.avatar ? (
                <Avatar src={profile.avatar} className={classes.bigAvatar} />
              ) : (
                <Avatar className={classes.bigAvatar}>
                  <AvatarIcon />
                </Avatar>
              )}
            </Grid>
            <Grid item xs container alignContent="center">
              <Typography variant="h5">{profile.fullName}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TabsAdvance
            dataSource={tabList}
            dataTextField="name"
            dataValueField="id"
            contentTab={renderContentTab}
            selectedTab={activeTab}
            onSelectedTabChange={onChangeTab}
          />
        </Grid>
      </Grid>
    </div>
  );
}

CustomerDetail.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  match: PropTypes.any,
  getOrderList: PropTypes.func,
  orderList: PropTypes.array,
  orderPaging: PropTypes.object,
  getProfile: PropTypes.func,
  profile: PropTypes.object,
  cleanData: PropTypes.func,
  wallet: PropTypes.object,
  getUserWallet: PropTypes.func,
  updateUserWallet: PropTypes.func,
  getWalletTransactions: PropTypes.func,
  transactions: PropTypes.array,
  transactionsPaging: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  orderList: makeSelectOrderList(),
  orderPaging: makeSelectOrderPaging(),
  profile: makeSelectProfile(),
  wallet: makeSelectWallet(),
  transactions: makeSelectWalletTransactions(),
  transactionsPaging: makeSelectTransactionsPaging(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getOrderList: payload => dispatch(getOrderListRequest(payload)),
    getProfile: payload => dispatch(getProfileRequest(payload)),
    cleanData: () => dispatch(cleanDataAction()),
    getUserWallet: profileId => dispatch(getUserWalletRequest({ profileId })),
    updateUserWallet: params => dispatch(updateUserWalletRequest(params)),
    getWalletTransactions: params =>
      dispatch(getWalletTransactionsRequest(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(CustomerDetail));
