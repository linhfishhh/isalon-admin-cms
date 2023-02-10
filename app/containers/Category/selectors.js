import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectCategoryDomain = state => state[CONTEXT] || initialState;

const makeSelectCategory = () =>
  createSelector(
    selectCategoryDomain,
    subState => subState.category,
  );

const makeSelectCategoryList = () =>
  createSelector(
    selectCategoryDomain,
    subState => subState.categoryList,
  );

const makeSelectPaging = () =>
  createSelector(
    selectCategoryDomain,
    subState => subState.paging,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectCategoryDomain,
    subState => subState.refreshData,
  );

const makeSelectCategoryParentList = () =>
  createSelector(
    selectCategoryDomain,
    subState => subState.parentList,
  );

export {
  makeSelectCategory,
  makeSelectCategoryList,
  makeSelectCategoryParentList,
  makeSelectPaging,
  makeSelectRefreshData,
};
