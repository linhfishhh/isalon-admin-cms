import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectFlashSaleListDomain = state => state[CONTEXT] || initialState;

const makeSelectFlashSaleList = () =>
  createSelector(
    selectFlashSaleListDomain,
    substate => substate.comboList,
  );

const makeSelectPaging = () =>
  createSelector(
    selectFlashSaleListDomain,
    subState => subState.paging,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectFlashSaleListDomain,
    subState => subState.refreshData,
  );

export { makeSelectFlashSaleList, makeSelectPaging, makeSelectRefreshData };
