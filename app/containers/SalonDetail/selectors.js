import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectCustomerDetailDomain = state => state[CONTEXT] || initialState;

const makeSelectPaging = () =>
  createSelector(
    selectCustomerDetailDomain,
    subState => subState.paging,
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

export {
  makeSelectPaging,
  makeSelectProfile,
  makeSelectWallet,
  makeSelectWalletTransactions,
};
