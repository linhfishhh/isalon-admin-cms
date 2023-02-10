import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectGiftCodeDomain = state => state[CONTEXT] || initialState;

const makeSelectGiftCode = () =>
  createSelector(
    selectGiftCodeDomain,
    subState => subState.giftCode,
  );

const makeSelectGiftCodeList = () =>
  createSelector(
    selectGiftCodeDomain,
    subState => subState.giftCodeList,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectGiftCodeDomain,
    subState => subState.refreshData,
  );

const makeSelectPaging = () =>
  createSelector(
    selectGiftCodeDomain,
    subState => subState.paging,
  );

export {
  makeSelectGiftCode,
  makeSelectGiftCodeList,
  makeSelectRefreshData,
  makeSelectPaging,
};
