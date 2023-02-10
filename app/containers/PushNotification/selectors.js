import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the pushNotification state domain
 */

const selectPushNotificationDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PushNotification
 */

const makeSelectNotificationList = () =>
  createSelector(
    selectPushNotificationDomain,
    substate => substate.notificationList,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectPushNotificationDomain,
    subState => subState.refreshData,
  );

const makeSelectPaging = () =>
  createSelector(
    selectPushNotificationDomain,
    subState => subState.paging,
  );

export { makeSelectNotificationList, makeSelectRefreshData, makeSelectPaging };
