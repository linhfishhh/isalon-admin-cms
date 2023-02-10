import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectProductDomain = state => state[CONTEXT] || initialState;

const makeSelectProduct = () =>
  createSelector(
    selectProductDomain,
    subState => subState.product,
  );

const makeSelectCategoryList = () =>
  createSelector(
    selectProductDomain,
    subState => subState.categoryList,
  );

const makeSelectBrandList = () =>
  createSelector(
    selectProductDomain,
    subState => subState.brandList,
  );

const makeSelectShouldUpdate = () =>
  createSelector(
    selectProductDomain,
    subState => subState.shouldUpdate,
  );

export {
  makeSelectProduct,
  makeSelectCategoryList,
  makeSelectBrandList,
  makeSelectShouldUpdate,
};
