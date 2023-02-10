/*
 *
 * LegacyPushNotification reducer
 *
 */
import produce from 'immer';
import { PUSHNOTIFICATION_SUCCESS } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const legacyPushNotificationReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case PUSHNOTIFICATION_SUCCESS:
        break;
    }
  });

export default legacyPushNotificationReducer;
