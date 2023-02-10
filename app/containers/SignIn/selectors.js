import { createSelector } from 'reselect';

import { getLoggedInUser } from 'utils/auth';
import { CONTEXT } from './constants';
import { initialState } from './reducer';

const selectAuth = state => state[CONTEXT] || initialState;

const profileSelector = () => () => getLoggedInUser() || {};

const errorSelector = () =>
  createSelector(
    selectAuth,
    state => state.error || {},
  );

const loginStatusSelector = () =>
  createSelector(
    selectAuth,
    state => state.loginStatus || false,
  );

export { selectAuth, profileSelector, errorSelector, loginStatusSelector };
