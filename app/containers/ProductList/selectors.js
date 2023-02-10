import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectProductListDomain = state => state[CONTEXT] || initialState;

const makeSelectProductList = () =>
  createSelector(
    selectProductListDomain,
    substate => substate.productList,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectProductListDomain,
    subState => subState.refreshData,
  );

const makeSelectPaging = () =>
  createSelector(
    selectProductListDomain,
    subState => subState.paging,
  );

export { makeSelectProductList, makeSelectRefreshData, makeSelectPaging };
