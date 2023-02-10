import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the legacyPushNotification state domain
 */

const selectLegacyPushNotificationDomain = state =>
  state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LegacyPushNotification
 */

const makeSelectLegacyPushNotification = () =>
  createSelector(
    selectLegacyPushNotificationDomain,
    substate => substate,
  );

export default makeSelectLegacyPushNotification;
export { selectLegacyPushNotificationDomain };
