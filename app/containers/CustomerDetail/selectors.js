import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectCustomerDetailDomain = state => state[CONTEXT] || initialState;

const makeSelectOrderList = () =>
  createSelector(
    selectCustomerDetailDomain,
    substate => substate.orderList,
  );

const makeSelectOrderPaging = () =>
  createSelector(
    selectCustomerDetailDomain,
    subState => subState.orderPaging,
  );

const makeSelectProfile = () =>
  createSelector(
    selectCustomerDetailDomain,
    substate => substate.profile,
  );

const makeSelectWallet = () =>
  createSelector(
    selectCustomerDetailDomain,
    substate => substate.wallet,
  );

const makeSelectWalletTransactions = () =>
  createSelector(
    selectCustomerDetailDomain,
    substate => substate.transactions,
  );

const makeSelectTransactionsPaging = () =>
  createSelector(
    selectCustomerDetailDomain,
    subState => subState.transactionsPaging,
  );

const makeSelectAddresses = () =>
  createSelector(
    selectCustomerDetailDomain,
    subState => subState.addresses,
  );

const makeSelectAddressDetail = () =>
  createSelector(
    selectCustomerDetailDomain,
    subState => subState.addressDetail,
  );

export {
  makeSelectOrderList,
  makeSelectOrderPaging,
  makeSelectProfile,
  makeSelectWallet,
  makeSelectWalletTransactions,
  makeSelectTransactionsPaging,
  makeSelectAddresses,
  makeSelectAddressDetail,
};
