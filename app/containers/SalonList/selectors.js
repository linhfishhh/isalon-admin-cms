import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectSalonDomain = state => state[CONTEXT] || initialState;

const makeSelectSalonList = () =>
  createSelector(
    selectSalonDomain,
    substate => substate.salonList,
  );

const makeSelectPaging = () =>
  createSelector(
    selectSalonDomain,
    subState => subState.paging,
  );

export { makeSelectSalonList, makeSelectPaging };
