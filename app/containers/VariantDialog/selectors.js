import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectVariantDialogDomain = state => state[CONTEXT] || initialState;

const makeSelectRefresh = () =>
  createSelector(
    selectVariantDialogDomain,
    subState => subState.refresh,
  );

export { makeSelectRefresh };
