import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectSpotlightDomain = state => state[CONTEXT] || initialState;

const makeSelectSpotlightList = () =>
  createSelector(
    selectSpotlightDomain,
    substate => substate.spotlightList,
  );

const makeSelectCategoryList = () =>
  createSelector(
    selectSpotlightDomain,
    substate => substate.categoryList,
  );

const makeSelectSpotlightItemList = () =>
  createSelector(
    selectSpotlightDomain,
    substate => substate.spotlightItemList,
  );

const makeSelectRefeshData = () =>
  createSelector(
    selectSpotlightDomain,
    substate => substate.refreshData,
  );

export {
  makeSelectSpotlightList,
  makeSelectCategoryList,
  makeSelectSpotlightItemList,
  makeSelectRefeshData,
};
