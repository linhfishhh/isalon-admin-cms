import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectProductListDomain = state => state[CONTEXT] || initialState;

const makeSelectProductList = () =>
  createSelector(
    selectProductListDomain,
    substate => substate.productList,
  );

const makeSelectPaging = () =>
  createSelector(
    selectProductListDomain,
    subState => subState.paging,
  );

const makeSelectProductVariantList = () =>
  createSelector(
    selectProductListDomain,
    substate => substate.productVariantList,
  );

export {
  makeSelectProductList,
  makeSelectPaging,
  makeSelectProductVariantList,
};
