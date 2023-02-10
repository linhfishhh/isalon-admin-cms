import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectOrderDomain = state => state[CONTEXT] || initialState;

const makeSelectOrderList = () =>
  createSelector(
    selectOrderDomain,
    substate => substate.orderList,
  );

const makeSelectPaging = () =>
  createSelector(
    selectOrderDomain,
    subState => subState.paging,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectOrderDomain,
    subState => subState.refreshData,
  );

export { makeSelectOrderList, makeSelectPaging, makeSelectRefreshData };
