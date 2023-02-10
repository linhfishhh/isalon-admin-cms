import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectProductVariantListDomain = state => state[CONTEXT] || initialState;

const makeSelectProductVariantList = () =>
  createSelector(
    selectProductVariantListDomain,
    subState => subState.productVariantList,
  );

const makeSelectPaging = () =>
  createSelector(
    selectProductVariantListDomain,
    subState => subState.paging,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectProductVariantListDomain,
    subState => subState.refreshData,
  );

export {
  makeSelectProductVariantList,
  makeSelectPaging,
  makeSelectRefreshData,
};
