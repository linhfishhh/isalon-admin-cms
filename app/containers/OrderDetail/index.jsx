/**
 *
 * OrderDetail
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
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
  TableCell,
  TableRow,
  Divider,
  TextField,
} from '@material-ui/core';

import Header from 'components/Header';
import Button from 'components/Button';
import TableAdvance from 'components/TableAdvance';
import ComboBox from 'components/ComboBox';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectToast } from 'utils/injectToast';
import { useInjectLoading } from 'utils/injectLoading';
import { currencyFormat, phoneNumberFormat } from 'utils/stringFormat';
import { orderStatus, paymentType, shippingType } from 'utils/enums';

import { path, createPath } from 'routers/path';

import {
  getRequest,
  updateStatusRequest,
  updateDataField,
  getStatusHistoryRequest,
} from './actions';
import {
  makeSelectOrderDetail,
  makeSelectDataOrderUpdate,
  makeSelectRefreshData,
  makeSelectStatusHistory,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

const TypeLabel = props => {
  const { type } = props;
  return type ? (
    <Typography
      variant="body1"
      display="inline"
      style={{
        borderRadius: 3,
        color: type.color,
        border: `solid 1px ${type.color}`,
        padding: '3px 8px 4px 8px',
      }}
    >
      {type.name}
    </Typography>
  ) : (
    <></>
  );
};
TypeLabel.propTypes = {
  type: PropTypes.object,
};

export function OrderDetail(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    dispatch,
    intl,
    match,
    orderDetail,
    getOrder,
    updateStatusOrder,
    setDataField,
    orderUpdate,
    refreshData,
    getStatusHistory,
    statusHistory,
  } = props;

  const [changeStatus, setChangeStatus] = useState(false);

  const orderId = get(match, 'params.orderId');

  useEffect(() => {
    if (orderId) {
      getOrder({ id: orderId });
      getStatusHistory({ id: orderId });
    }
  }, []);

  useEffect(() => {
    if (orderId && refreshData) {
      getOrder({ id: orderId });
      getStatusHistory({ id: orderId });
    }
  }, [refreshData]);

  const customizeTotal = dataRow =>
    currencyFormat(get(dataRow, 'quantity') * get(dataRow, 'pricePerProduct'));

  const customizeAttribute = dataRow => {
    const { variantValues } = dataRow.productVariant;
    if (variantValues) {
      const values = variantValues.map(item => item.name);
      return values.join(' , ');
    }
    return '';
  };

  const headerRows = [
    {
      id: 'productVariant.imageSource',
      type: 'image',
      label: '???nh ?????i di???n',
      subId: 'product.imageSource',
    },
    {
      id: 'product.name',
      type: 'text',
      label: 'T??n',
    },
    {
      id: 'productVariant.sku',
      type: 'text',
      label: 'SKU',
      subId: 'product.sku',
    },
    {
      id: 'attribute',
      type: 'customize',
      label: 'Thu???c t??nh',
      customize: customizeAttribute,
    },
    {
      id: 'quantity',
      type: 'number',
      label: 'S??? l?????ng',
      align: 'right',
    },
    {
      id: 'pricePerProduct',
      type: 'number',
      label: '????n gi??',
      align: 'right',
    },
    {
      id: 'total',
      type: 'customize',
      label: 'Th??nh ti???n',
      customize: customizeTotal,
      align: 'right',
    },
  ];

  const onChangeDataField = name => event => {
    let dataField;
    switch (name) {
      case 'status': {
        dataField = {
          status: event.id,
        };
        break;
      }
      default:
        dataField = { [name]: event.target.value };
        break;
    }
    setDataField(dataField);
  };

  const changeStatusOrder = () => {
    updateStatusOrder();
    setChangeStatus(false);
  };

  const spanningRows = (
    <>
      <TableRow>
        <TableCell size="medium" rowSpan={5} colSpan={3} />
        <TableCell size="medium" colSpan={3}>
          T???ng ti???n
        </TableCell>
        <TableCell size="medium" align="right">
          {currencyFormat(orderDetail.subTotal)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell size="medium" colSpan={3}>
          Ph?? v???n chuy???n
        </TableCell>
        <TableCell size="medium" align="right">
          {currencyFormat(orderDetail.shippingFee)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell size="medium" colSpan={3}>
          Chi???t kh???u
        </TableCell>
        <TableCell size="medium" align="right">
          {currencyFormat(orderDetail.discount)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell size="medium" colSpan={3}>
          Xu
        </TableCell>
        <TableCell size="medium" align="right">
          {orderDetail.amountCoin} xu
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell size="medium" colSpan={3}>
          Th??nh ti???n
        </TableCell>
        <TableCell size="medium" align="right">
          <b>{currencyFormat(orderDetail.amountMoney !== undefined ? orderDetail.amountMoney : orderDetail.total)}</b>
        </TableCell>
      </TableRow>
    </>
  );

  const historyHeaderRows = [
    {
      id: 'profile.avatar',
      type: 'avatar',
      label: '???nh ?????i di???n',
    },
    {
      id: 'profile.fullName',
      type: 'text',
      label: 'T??n',
    },
    {
      id: 'createdAt',
      type: 'dateTime',
      label: 'Ng??y thay ?????i',
      format: 'DD-MM-YYYY | HH:mm:ss',
    },
    {
      id: 'toStatus',
      type: 'typeOf',
      label: 'Tr???ng th??i',
      typeList: orderStatus,
      align: 'right',
    },
  ];

  const handerOnEdit = useCallback(() => {
    dispatch(push(createPath(path.orderEdit, { orderId })));
  }, []);

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of OrderDetail" />
      </Helmet>

      <Header title={intl.formatMessage(messages.header)}>
        <Button icon="edit" onClick={handerOnEdit} />
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<Typography variant="h6">Th??ng tin ????n h??ng</Typography>}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={4} md={2}>
                  <Typography>Ng?????i nh???n:</Typography>
                </Grid>
                <Grid item xs={8} md={10}>
                  <Typography variant="h6">
                    {orderDetail.receiverName}
                  </Typography>
                </Grid>
                <Grid item xs={4} md={2}>
                  <Typography>S??? ??i???n tho???i:</Typography>
                </Grid>
                <Grid item xs={8} md={10}>
                  <Typography variant="h6">
                    {phoneNumberFormat(orderDetail.receiverPhone)}
                  </Typography>
                </Grid>
                <Grid item xs={4} md={2}>
                  <Typography>?????a ch??? nh???n h??ng:</Typography>
                </Grid>
                <Grid item xs={8} md={10}>
                  <Typography variant="h6">
                    {orderDetail.receiverAddress}
                  </Typography>
                </Grid>
                {orderDetail.includeBill && (
                  <>
                    <Grid item xs={12}>
                      <Divider my={4} light />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" color="primary">
                        Th??ng tin xu???t ho?? ????n
                      </Typography>
                    </Grid>
                    <Grid item xs={4} md={2}>
                      <Typography>T??n:</Typography>
                    </Grid>
                    <Grid item xs={8} md={10}>
                      <Typography variant="h6">
                        {orderDetail.billName}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} md={2}>
                      <Typography>M?? s??? thu???:</Typography>
                    </Grid>
                    <Grid item xs={8} md={10}>
                      <Typography variant="h6">
                        {orderDetail.billTaxNumber}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} md={2}>
                      <Typography>?????a ch???:</Typography>
                    </Grid>
                    <Grid item xs={8} md={10}>
                      <Typography variant="h6">
                        {orderDetail.billAddress}
                      </Typography>
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <Divider my={4} light />
                </Grid>
                <Grid item xs={4} md={2}>
                  <Typography>H??nh th???c thanh to??n:</Typography>
                </Grid>
                <Grid item xs={8} md={10}>
                  <TypeLabel
                    type={paymentType.typeFromString(orderDetail.paymentType)}
                  />
                </Grid>
                <Grid item xs={4} md={2}>
                  <Typography>Lo???i giao h??ng:</Typography>
                </Grid>
                <Grid item xs={8} md={10}>
                  <TypeLabel
                    type={shippingType.typeFromString(orderDetail.shippingType)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider my={4} light />
                </Grid>
                <Grid item xs={4} md={2}>
                  <Typography>Tr???ng th??i ????n h??ng:</Typography>
                </Grid>
                <Grid container item xs={8} md={10}>
                  <Grid item xs={12} md={6}>
                    {changeStatus ? (
                      <ComboBox
                        nameLabel={orderStatus.name}
                        dataSource={orderStatus.type}
                        dataTextField="name"
                        dataValueField="id"
                        selectedValue={orderUpdate.status}
                        onSelectedChange={onChangeDataField('status')}
                        showOptionNone={false}
                        disabledPadding
                      />
                    ) : (
                      <TypeLabel
                        type={orderStatus.typeFromString(orderDetail.status)}
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={4} md={2}>
                  <Typography>Ghi ch??:</Typography>
                </Grid>
                <Grid container item xs={8} md={10}>
                  {changeStatus ? (
                    <TextField
                      fullWidth
                      required
                      id="note"
                      variant="outlined"
                      value={orderUpdate.note && orderUpdate.note}
                      onChange={onChangeDataField('note')}
                    />
                  ) : (
                    <Typography>{orderDetail.note}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {!changeStatus ? (
                    <Button
                      icon="add"
                      name="Thay ?????i tr???ng th??i"
                      options={{ showIcon: false }}
                      onClick={() => setChangeStatus(true)}
                    />
                  ) : (
                    <>
                      <Button
                        icon="save"
                        options={{ showIcon: false }}
                        onClick={changeStatusOrder}
                      />
                      <Button
                        icon="cancel"
                        color="default"
                        options={{ showIcon: false }}
                        onClick={() => setChangeStatus(false)}
                      />
                    </>
                  )}
                  {changeStatus && (
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={6} />
                      <Grid item xs={6} />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<Typography variant="h6">Chi ti???t ????n h??ng</Typography>}
            />
            <CardContent>
              <TableAdvance
                columnKey="orderItemId"
                rows={orderDetail.items}
                headerRows={headerRows}
                options={{ showPaging: false }}
                spanningRows={spanningRows}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<Typography variant="h6">L???ch s??? tr???ng th??i</Typography>}
            />
            <CardContent>
              <TableAdvance
                columnKey="orderHistoryId"
                rows={statusHistory}
                headerRows={historyHeaderRows}
                options={{ showPaging: false }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

OrderDetail.propTypes = {
  dispatch: PropTypes.func,
  intl: intlShape,
  match: PropTypes.any,
  orderDetail: PropTypes.object,
  getOrder: PropTypes.func,
  updateStatusOrder: PropTypes.func,
  setDataField: PropTypes.func,
  orderUpdate: PropTypes.object,
  refreshData: PropTypes.bool,
  getStatusHistory: PropTypes.func,
  statusHistory: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  orderDetail: makeSelectOrderDetail(),
  orderUpdate: makeSelectDataOrderUpdate(),
  refreshData: makeSelectRefreshData(),
  statusHistory: makeSelectStatusHistory(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getOrder: payload => dispatch(getRequest(payload)),
    updateStatusOrder: () => dispatch(updateStatusRequest()),
    setDataField: payload => dispatch(updateDataField(payload)),
    getStatusHistory: payload => dispatch(getStatusHistoryRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(OrderDetail));
