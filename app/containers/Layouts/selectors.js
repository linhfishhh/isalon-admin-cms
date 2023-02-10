import { createSelector } from 'reselect';
import { initialState } from './reducer';

import { CONTEXT } from './constants';

const selectLayoutsDomain = state => state[CONTEXT] || initialState;

const makeSelectToast = () =>
  createSelector(
    selectLayoutsDomain,
    substate => substate.toast,
  );

export { makeSelectToast };
