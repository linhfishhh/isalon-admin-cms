import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the editProfile state domain
 */

const selectEditProfileDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditProfile
 */

const makeSelectUpsertAddress = () =>
  createSelector(
    selectEditProfileDomain,
    substate => substate,
  );

export { makeSelectUpsertAddress };
