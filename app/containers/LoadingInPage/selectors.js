import { createSelector } from 'reselect';

import { CONTEXT } from './constants';
import { initialState } from './reducer';

const selectLoadingInPage = state => state[CONTEXT] || initialState;

const isLoadingSelector = () =>
  createSelector(
    selectLoadingInPage,
    state => state.isLoading || false,
  );

export { selectLoadingInPage, isLoadingSelector };
