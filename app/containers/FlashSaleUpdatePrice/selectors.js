import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectFlashSaleUpdatePriceDomain = state =>
  state[CONTEXT] || initialState;

const makeSelectFlashSaleProductVariant = () =>
  createSelector(
    selectFlashSaleUpdatePriceDomain,
    substate => substate.productVariant,
  );

const makeSelectFlashSaleUpdated = () =>
  createSelector(
    selectFlashSaleUpdatePriceDomain,
    substate => substate.updated,
  );

const makeSelectFlashSalePrice = () =>
  createSelector(
    selectFlashSaleUpdatePriceDomain,
    substate => substate.flashSalePrice,
  );

export {
  makeSelectFlashSaleProductVariant,
  makeSelectFlashSaleUpdated,
  makeSelectFlashSalePrice,
};
