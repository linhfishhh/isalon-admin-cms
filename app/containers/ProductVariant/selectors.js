import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectProductVariantDomain = state => state[CONTEXT] || initialState;

const makeSelectVariantList = () =>
  createSelector(
    selectProductVariantDomain,
    subState => subState.variantList,
  );

const makeSelectProductVariant = () =>
  createSelector(
    selectProductVariantDomain,
    subState => subState.productVariant,
  );

const makeSelectVariantSelectedList = () =>
  createSelector(
    selectProductVariantDomain,
    subState => subState.variantSelectedList,
  );

const makeSelectRefresh = () =>
  createSelector(
    selectProductVariantDomain,
    subState => subState.refresh,
  );

export {
  makeSelectVariantList,
  makeSelectProductVariant,
  makeSelectVariantSelectedList,
  makeSelectRefresh,
};
