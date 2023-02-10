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
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Typography, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NUMBER_PAGE_SIZE } from 'utils/constants';

import TabsAdvance from 'components/TabsAdvance';
import TableAdvance from 'components/TableAdvance';
import Img from 'components/Img';

import { salonTransactionTypes } from 'utils/enums';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { currencyFormat, numberFormat } from 'utils/stringFormat';

import EditCoin from 'components/EditCoin';
import LegacyPushNotification from 'containers/LegacyPushNotification';

import {
  getProfileRequest,
  clearDataAction,
  getSalonWalletRequest,
  updateSalonWalletRequest,
  getWalletTransactionsRequest,
} from './actions';
import {
  makeSelectPaging,
  makeSelectProfile,
  makeSelectWallet,
  makeSelectWalletTransactions,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES } from './constants';

const tabList = [
  { id: 'profile', name: 'Thông tin' },
  { id: 'transaction', name: 'Lịch sử giao dịch' },
];

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    height: '250px !important',
    width: '100%',
  },
  editButton: {
    marginTop: 20,
  },
  salonName: {
    marginTop: 16,
    marginBottom: 16,
  },
  afterChangeText: {
    color: theme.palette.primary.main,
  },
}));

export function SalonDetail(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);

  const {
    intl,
    match,
    paging,
    profile,
    getSalonDetail,
    clearData,
    getSalonWallet,
    wallet,
    updateSalonWallet,
    transactions,
    getWalletTransactions,
  } = props;

  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(tabList[0]);

  const salonId = get(match, 'params.salonId');

  useEffect(() => {
    if (salonId) {
      getSalonDetail(salonId);
      getSalonWallet(salonId);
    }
    return () => {
      clearData();
    };
  }, []);

  const fetchTransacionList = payload => {
    const { page = 0, limit = NUMBER_PAGE_SIZE } = payload;
    getWalletTransactions({ salonId, pageNumber: page, pageSize: limit });
  };

  const onChangeTab = React.useCallback(
    tab => {
      setActiveTab(tab);
      if (tab.id === 'transaction') {
        getWalletTransactions({ salonId });
      }
    },
    [salonId],
  );

  const beforeChangeCell = React.useCallback(
    dataRow => (
      <Grid container>
        <Grid item xs={12}>
          <Typography>{`${numberFormat(
            dataRow.beforeAmountCoin,
          )} xu`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{`${currencyFormat(
            dataRow.beforeAmountMoney,
          )}`}</Typography>
        </Grid>
      </Grid>
    ),
    [],
  );

  const changeCell = React.useCallback(
    dataRow => (
      <Grid container>
        <Grid item xs={12}>
          <Typography>{`${numberFormat(dataRow.amountCoin)} xu`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{`${currencyFormat(dataRow.amountMoney)}`}</Typography>
        </Grid>
      </Grid>
    ),
    [],
  );

  const afterChangeCell = React.useCallback(
    dataRow => (
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.afterChangeText}>{`${numberFormat(
            dataRow.afterAmountCoin,
          )} xu`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.afterChangeText}>{`${currencyFormat(
            dataRow.afterAmountMoney,
          )}`}</Typography>
        </Grid>
      </Grid>
    ),
    [],
  );

  const headerRows = [
    {
      id: 'salonTransactionId',
      type: 'text',
      label: 'ID',
    },
    {
      id: 'orderId',
      type: 'text',
      label: 'Order ID',
    },
    {
      id: 'createdDate',
      type: 'dateTime',
      label: 'Thời gian',
    },
    {
      id: 'beforeChange',
      type: 'customize',
      label: 'Trước thay đổi',
      customize: beforeChangeCell,
      align: 'right',
    },
    {
      id: 'amountCoin',
      type: 'customize',
      label: 'Giao dịch',
      customize: changeCell,
      align: 'right',
    },
    {
      id: 'totalAmount',
      type: 'currency',
      label: 'Tổng',
      align: 'right',
    },
    {
      id: 'commissionMoney',
      type: 'currency',
      label: 'Chiết khấu',
      align: 'right',
    },
    {
      id: 'afterChange',
      type: 'customize',
      label: 'Sau thay đổi',
      customize: afterChangeCell,
      align: 'right',
    },
    {
      id: 'type',
      type: 'typeOf',
      label: 'Loại hình',
      typeList: salonTransactionTypes,
    },
    {
      id: 'description',
      type: 'text',
      label: 'Lý do thay đổi',
      width: 250,
    },
  ];

  const onUpdateCoin = React.useCallback(params => {
    const { id, reason, amountCoin = 0, amountMoney = 0, ...rest } = params;
    const updateParams = {
      salonId: id,
      description: reason,
      amountCoin: parseInt(amountCoin, 10),
      amountMoney: parseInt(amountMoney, 10),
      ...rest,
    };
    if (updateSalonWallet) {
      updateSalonWallet(updateParams);
    }
  }, []);

  const renderContentTab = itemData => {
    if (itemData.id === 'profile') {
      return (
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={4} md={2}>
                <Typography>Địa chỉ</Typography>
              </Grid>
              <Grid item xs={8} md={10}>
                <Typography variant="subtitle1">{profile.address}</Typography>
              </Grid>
              <Grid item xs={4} md={2}>
                <Typography>Số xu</Typography>
              </Grid>
              <Grid item xs={8} md={10}>
                <Typography variant="subtitle1">{`${numberFormat(
                  get(wallet, 'amountCoin', 0),
                )} xu`}</Typography>
              </Grid>
              <Grid item xs={4} md={2}>
                <Typography>Số tiền</Typography>
              </Grid>
              <Grid item xs={8} md={10}>
                <Typography variant="subtitle1">
                  {currencyFormat(get(wallet, 'amountMoney', 0))}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.editButton}>
              <Grid item>
                <EditCoin
                  data={{
                    type: 'salon',
                    name: profile.name,
                    id: salonId,
                    currentCoin: get(wallet, 'amountCoin', 0),
                  }}
                  onUpdateCoin={onUpdateCoin}
                />
              </Grid>
              <Grid item>
                <LegacyPushNotification salonId={salonId} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
    }
    return (
      <TableAdvance
        columnKey="salonTransactionId"
        rows={transactions}
        headerRows={headerRows}
        paging={paging}
        fetchDataForPage={fetchTransacionList}
      />
    );
  };

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of Salon Detail" />
      </Helmet>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Img src={profile.cover} className={classes.bigAvatar} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2" className={classes.salonName}>
                {profile.name}
              </Typography>
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

SalonDetail.propTypes = {
  intl: intlShape,
  match: PropTypes.any,
  paging: PropTypes.object,
  getSalonDetail: PropTypes.func,
  profile: PropTypes.object,
  clearData: PropTypes.func,
  getSalonWallet: PropTypes.func,
  wallet: PropTypes.object,
  updateSalonWallet: PropTypes.func,
  getWalletTransactions: PropTypes.func,
  transactions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  paging: makeSelectPaging(),
  profile: makeSelectProfile(),
  wallet: makeSelectWallet(),
  transactions: makeSelectWalletTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSalonDetail: salonId => dispatch(getProfileRequest({ salonId })),
    getSalonWallet: salonId => dispatch(getSalonWalletRequest({ salonId })),
    updateSalonWallet: params => dispatch(updateSalonWalletRequest(params)),
    getWalletTransactions: params =>
      dispatch(getWalletTransactionsRequest(params)),
    clearData: () => dispatch(clearDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(SalonDetail));
