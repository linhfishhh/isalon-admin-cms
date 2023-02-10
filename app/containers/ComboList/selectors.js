import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectComboListDomain = state => state[CONTEXT] || initialState;

const makeSelectComboList = () =>
  createSelector(
    selectComboListDomain,
    substate => substate.comboList,
  );

const makeSelectPaging = () =>
  createSelector(
    selectComboListDomain,
    subState => subState.paging,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectComboListDomain,
    subState => subState.refreshData,
  );

export { makeSelectComboList, makeSelectPaging, makeSelectRefreshData };
