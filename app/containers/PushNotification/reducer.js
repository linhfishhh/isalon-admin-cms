/*
 *
 * PushNotification reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import unset from 'lodash/set';
import {
  GET_NOTIFICATION_LIST_SUCCESS,
  DELETE_NOTIFICATION_SUCCESS,
  PUSH_SYSTEM_NOTIFICATION_SUCCESS,
} from './constants';

export const initialState = {
  notificationList: [],
  paging: {},
  refreshData: false,
};

/* eslint-disable default-case, no-param-reassign */
const pushNotificationReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_NOTIFICATION_LIST_SUCCESS: {
        cloneDraft.notificationList = get(action, 'payload.data.content');
        cloneDraft.paging = get(action, 'payload.data');
        unset(cloneDraft.paging, 'content');
        cloneDraft.refreshData = false;
        break;
      }
      case DELETE_NOTIFICATION_SUCCESS: {
        cloneDraft.refreshData = true;
        break;
      }
      case PUSH_SYSTEM_NOTIFICATION_SUCCESS: {
        cloneDraft.refreshData = true;
        break;
      }
    }
  });

export default pushNotificationReducer;
