import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectBrandDomain = state => state[CONTEXT] || initialState;

const makeSelectBrand = () =>
  createSelector(
    selectBrandDomain,
    subState => subState.brand,
  );

const makeSelectBrandList = () =>
  createSelector(
    selectBrandDomain,
    subState => subState.brandList,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectBrandDomain,
    subState => subState.refreshData,
  );

const makeSelectPaging = () =>
  createSelector(
    selectBrandDomain,
    subState => subState.paging,
  );

export {
  makeSelectBrand,
  makeSelectBrandList,
  makeSelectRefreshData,
  makeSelectPaging,
};
