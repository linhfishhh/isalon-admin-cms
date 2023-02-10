/**
 *
 * OrderUpdate
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import get from 'lodash/get';
import set from 'lodash/set';
import isEmpty from 'lodash/isEmpty';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';

import Button from 'components/Button';
import Header from 'components/Header';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import {
  getProfileRequest,
  cleanDataAction as clearUserProfileRequest,
  getUserAddressRequest,
  getAddressDetailRequest,
  clearAddressDetailRequest,
} from 'containers/CustomerDetail/actions';
import { CONTEXT as CUSTOMER_DETAIL_CTX } from 'containers/CustomerDetail/constants';
import {
  makeSelectProfile,
  makeSelectAddresses,
  makeSelectAddressDetail,
} from 'containers/CustomerDetail/selectors';
import profileReducer from 'containers/CustomerDetail/reducer';
import profileSaga from 'containers/CustomerDetail/saga';

import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';
import {
  getOrderRequest,
  addOrderRequest,
  editOrderRequest,
  calculateOrderRequest,
  updateOrderDataAction,
  cleanDataAction,
} from './actions';
import { makeSelectOrder } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { SelectAddress, ProductList, SelectUser } from './views';

export function OrderUpdate(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectReducer({ key: CUSTOMER_DETAIL_CTX, reducer: profileReducer });
  useInjectSaga({ key: CUSTOMER_DETAIL_CTX, saga: profileSaga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    intl,
    match,
    order,
    getOrder,
    addOrder,
    editOrder,
    cleanData,
    calculateOrder,
    updateOrderData,
    selectedUser,
    getSelectedUserProfile,
    addresses,
    getUserAddresses,
    clearUserProfile,
    selectedAddress,
    getAddress,
    clearAddressDetail,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const [shouldCalculateOrder] = useState([
    'product',
    'productVariant',
    'quantity',
    'deleteItem',
    'shippingFee',
  ]);

  const orderId = get(match, 'params.orderId');

  useEffect(() => {
    if (orderId) {
      getOrder({ id: orderId });
      setEditMode(true);
    }
    return () => {
      cleanData();
      clearUserProfile();
      clearAddressDetail();
    };
  }, []);

  const saveOrder = useCallback(() => {
    if (editMode) {
      editOrder();
    } else {
      addOrder();
    }
  }, [editMode]);

  const handleUpdateOrderData = useCallback(
    (type, value, id) => {
      const dataUpdate = {};
      const { items = [] } = order;
      switch (type) {
        case 'user': {
          dataUpdate.profileId = value;
          break;
        }
        case 'address': {
          dataUpdate.addressId = value;
          break;
        }
        case 'product': {
          const itemExit = items.find(
            item =>
              item.productId === value.productId &&
              item.productVariantId === value.productVariantId,
          );
          if (itemExit) {
            dataUpdate.items = items.map(item => {
              if (
                item.productId === value.productId &&
                item.productVariantId === value.productVariantId
              ) {
                set(item, 'quantity', item.quantity + value.quantity);
              }
              return item;
            });
          } else {
            dataUpdate.items = [...items, value];
          }
          break;
        }
        case 'quantity': {
          dataUpdate.items = items.map(item => {
            if (`${item.orderItemId}` === `${id}`) {
              return {
                ...item,
                quantity: Number(value),
              };
            }
            return item;
          });
          break;
        }
        case 'deleteItem': {
          dataUpdate.items = items.filter(
            item => `${item.orderItemId}` !== `${value}`,
          );
          break;
        }
        case 'total': {
          dataUpdate.total = value;
          break;
        }
        case 'shippingFee': {
          dataUpdate.shippingFee = value;
          break;
        }
        default:
          break;
      }
      if (dataUpdate.items === undefined) {
        dataUpdate.items = items;
      }
      if (
        dataUpdate.shippingFee === undefined &&
        order.shippingFee !== undefined
      ) {
        dataUpdate.shippingFee = order.shippingFee;
      }
      if (order.amountCoin !== undefined)
        dataUpdate.amountCoin = order.amountCoin;
      if (order.discount !== undefined) dataUpdate.discount = order.discount;
      if (order.profileId !== undefined) dataUpdate.profileId = order.profileId;
      if (shouldCalculateOrder.includes(type)) {
        calculateOrder(dataUpdate);
      }
      updateOrderData({ dataUpdate });
    },
    [order],
  );

  const handleOnSelectUser = customerId => {
    if (get(selectedUser, 'profileId') !== customerId) {
      clearAddressDetail();
      clearUserProfile();
      // getSelectedUserProfile(customerId);
      // getUserAddresses(customerId);
      handleUpdateOrderData('address', undefined);
      handleUpdateOrderData('user', customerId);
    }
  };

  const handleOnSelectAddress = address => {
    // getAddress(address.addressId);
    handleUpdateOrderData('address', address.addressId);
  };

  React.useEffect(() => {
    if (order) {
      if (
        order.profileId &&
        order.profileId !== get(selectedUser, 'profileId')
      ) {
        const { profileId } = order;
        getSelectedUserProfile(profileId);
        getUserAddresses(profileId);
      }
      if (
        order.addressId &&
        order.addressId !== get(selectedAddress, 'addressId')
      ) {
        getAddress(order.addressId);
      }
    }
  }, [order]);

  return (
    <>
      <Helmet>
        <title>
          {editMode || orderId
            ? intl.formatMessage(messages.editHeader)
            : intl.formatMessage(messages.addHeader)}
        </title>
        <meta name="description" content="Description of OrderUpdate" />
      </Helmet>

      <Header
        title={
          editMode || orderId
            ? intl.formatMessage(messages.editHeader)
            : intl.formatMessage(messages.addHeader)
        }
      >
        <Button icon="save" onClick={saveOrder} />
      </Header>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SelectUser onSelectUser={handleOnSelectUser} user={selectedUser} />
        </Grid>
        {!isEmpty(selectedUser) && (
          <Grid item xs={12}>
            <SelectAddress
              profileId={get(selectedUser, 'profileId')}
              selectedAddress={selectedAddress}
              addresses={addresses}
              onSelectAddress={handleOnSelectAddress}
              getUserAddresses={getUserAddresses}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <ProductList
            data={order.items}
            onUpdateOrderItem={handleUpdateOrderData}
            subTotal={order.subTotal}
            discount={order.discount}
            total={order.total}
            amountCoin={order.amountCoin}
            shippingFee={order.shippingFee}
          />
        </Grid>
      </Grid>
    </>
  );
}

OrderUpdate.propTypes = {
  intl: intlShape,
  match: PropTypes.any,
  order: PropTypes.object,
  getOrder: PropTypes.func,
  addOrder: PropTypes.func,
  editOrder: PropTypes.func,
  cleanData: PropTypes.func,
  calculateOrder: PropTypes.func,
  updateOrderData: PropTypes.func,
  selectedUser: PropTypes.object,
  getSelectedUserProfile: PropTypes.func,
  addresses: PropTypes.array,
  getUserAddresses: PropTypes.func,
  clearUserProfile: PropTypes.func,
  selectedAddress: PropTypes.object,
  getAddress: PropTypes.func,
  clearAddressDetail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  order: makeSelectOrder(),
  selectedUser: makeSelectProfile(),
  addresses: makeSelectAddresses(),
  selectedAddress: makeSelectAddressDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getOrder: payload => dispatch(getOrderRequest(payload)),
    addOrder: () => dispatch(addOrderRequest()),
    editOrder: () => dispatch(editOrderRequest()),
    cleanData: () => dispatch(cleanDataAction()),
    calculateOrder: payload => dispatch(calculateOrderRequest(payload)),
    updateOrderData: payload => dispatch(updateOrderDataAction(payload)),
    getSelectedUserProfile: profileId =>
      dispatch(getProfileRequest({ profileId })),
    clearUserProfile: () => dispatch(clearUserProfileRequest()),
    getUserAddresses: profileId =>
      dispatch(getUserAddressRequest({ profileId })),
    getAddress: addressId => dispatch(getAddressDetailRequest({ addressId })),
    clearAddressDetail: () => dispatch(clearAddressDetailRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(OrderUpdate));
