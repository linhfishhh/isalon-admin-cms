import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectGiftPackageDomain = state => state[CONTEXT] || initialState;

const makeSelectGiftPackage = () =>
  createSelector(
    selectGiftPackageDomain,
    subState => subState.giftPackage,
  );

const makeSelectGiftPackageList = () =>
  createSelector(
    selectGiftPackageDomain,
    subState => subState.giftPackageList,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectGiftPackageDomain,
    subState => subState.refreshData,
  );

const makeSelectPaging = () =>
  createSelector(
    selectGiftPackageDomain,
    subState => subState.paging,
  );

export {
  makeSelectGiftPackage,
  makeSelectGiftPackageList,
  makeSelectRefreshData,
  makeSelectPaging,
};
