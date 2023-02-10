import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectTagsDomain = state => state[CONTEXT] || initialState;

const makeSelectTagsList = type =>
  createSelector(
    selectTagsDomain,
    substate => substate[type] || [],
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectTagsDomain,
    substate => substate.refresh,
  );

export { makeSelectTagsList, makeSelectRefreshData };
