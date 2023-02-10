import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectProductInCategoryDomain = state => state[CONTEXT] || initialState;

const makeSelectProductInCategoryList = () =>
  createSelector(
    selectProductInCategoryDomain,
    substate => substate.productInCategoryList,
  );

const makeSelectPaging = () =>
  createSelector(
    selectProductInCategoryDomain,
    subState => subState.paging,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectProductInCategoryDomain,
    subState => subState.refreshData,
  );

const makeSelectProductList = () =>
  createSelector(
    selectProductInCategoryDomain,
    substate => substate.productList,
  );

const makeSelectProductPaging = () =>
  createSelector(
    selectProductInCategoryDomain,
    subState => subState.productPaging,
  );

const makeSelectCategoryList = () =>
  createSelector(
    selectProductInCategoryDomain,
    substate => substate.categoryList,
  );

const makeSelectCategoryInfo = () =>
  createSelector(
    selectProductInCategoryDomain,
    substate => substate.categoryInfo,
  );

export {
  makeSelectProductInCategoryList,
  makeSelectPaging,
  makeSelectRefreshData,
  makeSelectProductList,
  makeSelectProductPaging,
  makeSelectCategoryList,
  makeSelectCategoryInfo,
};
