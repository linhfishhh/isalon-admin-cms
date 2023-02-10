import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectGiftPackageUpdateDomain = state => state[CONTEXT] || initialState;

const makeSelectGiftPackage = () =>
  createSelector(
    selectGiftPackageUpdateDomain,
    subState => subState.giftPackage,
  );
const makeSelectShouldUpdate = () =>
  createSelector(
    selectGiftPackageUpdateDomain,
    subState => subState.shouldUpdate,
  );

export { makeSelectGiftPackage, makeSelectShouldUpdate };
