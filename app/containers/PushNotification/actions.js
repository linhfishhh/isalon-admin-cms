/*
 *
 * PushNotification actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_NOTIFICATION_LIST,
  DELETE_NOTIFICATION,
  PUSH_SYSTEM_NOTIFICATION,
} from './constants';

export const [
  getNotificationListRequest,
  getNotificationListSuccess,
  getNotificationListFail,
] = createSideEffectAction(GET_NOTIFICATION_LIST);

export const [
  deleteNotificationRequest,
  deleteNotificationSuccess,
  deleteNotificationFail,
] = createSideEffectAction(DELETE_NOTIFICATION);

export const [
  pushSystemNotificationRequest,
  pushSystemNotificationSuccess,
  pushSystemNotificationFail,
] = createSideEffectAction(PUSH_SYSTEM_NOTIFICATION);
