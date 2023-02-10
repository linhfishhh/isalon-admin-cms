import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectFlashSaleProductDomain = state => state[CONTEXT] || initialState;

const makeSelectFlashSaleProduct = () =>
  createSelector(
    selectFlashSaleProductDomain,
    substate => substate.productList,
  );

const makeSelectFlashSalePaging = () =>
  createSelector(
    selectFlashSaleProductDomain,
    subState => subState.paging,
  );

const makeSelectFlashSaleProductNotIn = () =>
  createSelector(
    selectFlashSaleProductDomain,
    substate => substate.productListNotIn,
  );

const makeSelectFlashSaleNotInPaging = () =>
  createSelector(
    selectFlashSaleProductDomain,
    subState => subState.pagingNotIn,
  );

const makeSelectFlashSaleRefreshData = () =>
  createSelector(
    selectFlashSaleProductDomain,
    subState => subState.refreshData,
  );
export {
  makeSelectFlashSaleProduct,
  makeSelectFlashSalePaging,
  makeSelectFlashSaleProductNotIn,
  makeSelectFlashSaleNotInPaging,
  makeSelectFlashSaleRefreshData,
};
