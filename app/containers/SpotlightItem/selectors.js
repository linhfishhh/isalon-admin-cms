import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectSpotlightItemDomain = state => state[CONTEXT] || initialState;

const makeSelectSpotlightItemList = () =>
  createSelector(
    selectSpotlightItemDomain,
    substate => substate.spotlightItemList,
  );

const makeSelectSpotlightItem = () =>
  createSelector(
    selectSpotlightItemDomain,
    subState => subState.spotlightItem,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectSpotlightItemDomain,
    subState => subState.refreshData,
  );

export {
  makeSelectSpotlightItemList,
  makeSelectSpotlightItem,
  makeSelectRefreshData,
};
