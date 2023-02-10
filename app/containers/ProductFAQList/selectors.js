import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectProductFAQListDomain = state => state[CONTEXT] || initialState;

const makeSelectProductFAQList = () =>
  createSelector(
    selectProductFAQListDomain,
    substate => substate.productFAQList,
  );

const makeSelectProductFAQ = () =>
  createSelector(
    selectProductFAQListDomain,
    subState => subState.productFAQ,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectProductFAQListDomain,
    subState => subState.refreshData,
  );

const makeSelectPaging = () =>
  createSelector(
    selectProductFAQListDomain,
    subState => subState.paging,
  );

const makeSelectProduct = () =>
  createSelector(
    selectProductFAQListDomain,
    subState => subState.product,
  );

export {
  makeSelectProductFAQList,
  makeSelectProductFAQ,
  makeSelectRefreshData,
  makeSelectPaging,
  makeSelectProduct,
};
