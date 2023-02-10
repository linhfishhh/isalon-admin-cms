import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectComboUpdateDomain = state => state[CONTEXT] || initialState;

const makeSelectCombo = () =>
  createSelector(
    selectComboUpdateDomain,
    subState => subState.combo,
  );

const makeSelectShouldUpdate = () =>
  createSelector(
    selectComboUpdateDomain,
    subState => subState.shouldUpdate,
  );

const makeSelectProductList = () =>
  createSelector(
    selectComboUpdateDomain,
    substate => substate.productList,
  );

const makeSelectPaging = () =>
  createSelector(
    selectComboUpdateDomain,
    subState => subState.paging,
  );

const makeSelectProductComboList = () =>
  createSelector(
    selectComboUpdateDomain,
    substate => substate.productComboList,
  );

const makeSelectProductComboPaging = () =>
  createSelector(
    selectComboUpdateDomain,
    subState => subState.productComboPaging,
  );

const makeSelectRefresh = () =>
  createSelector(
    selectComboUpdateDomain,
    subState => subState.refreshData,
  );

export {
  makeSelectCombo,
  makeSelectShouldUpdate,
  makeSelectProductList,
  makeSelectPaging,
  makeSelectProductComboList,
  makeSelectProductComboPaging,
  makeSelectRefresh,
};
