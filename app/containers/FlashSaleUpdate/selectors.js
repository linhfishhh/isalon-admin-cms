import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectFlashSaleUpdateDomain = state => state[CONTEXT] || initialState;

const makeSelectFlashSale = () =>
  createSelector(
    selectFlashSaleUpdateDomain,
    subState => subState.flashSale,
  );

const makeSelectShouldUpdate = () =>
  createSelector(
    selectFlashSaleUpdateDomain,
    subState => subState.shouldUpdate,
  );

export { makeSelectFlashSale, makeSelectShouldUpdate };
