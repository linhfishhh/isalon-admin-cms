/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectAppDomain = state => state[CONTEXT] || initialState;

const makeSelectCurrentTheme = () =>
  createSelector(
    selectAppDomain,
    subState => subState.currentTheme,
  );

export { makeSelectCurrentTheme };
