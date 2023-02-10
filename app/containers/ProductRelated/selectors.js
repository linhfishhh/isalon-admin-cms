import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectProductRelatedDomain = state => state[CONTEXT] || initialState;

const makeSelectProductRelated = () =>
  createSelector(
    selectProductRelatedDomain,
    subState => subState.productRelated,
  );

const makeSelectProductNoRelated = () =>
  createSelector(
    selectProductRelatedDomain,
    subState => subState.productNoRelated,
  );

const makeSelectPaging = () =>
  createSelector(
    selectProductRelatedDomain,
    subState => subState.paging,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectProductRelatedDomain,
    subState => subState.refreshData,
  );

export {
  makeSelectProductRelated,
  makeSelectProductNoRelated,
  makeSelectPaging,
  makeSelectRefreshData,
};
