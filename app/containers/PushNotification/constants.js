/*
 *
 * PushNotification constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/NOTIFICATION';

export const GET_NOTIFICATION_LIST = `${CONTEXT}/GET_NOTIFICATION_LIST`;
export const DELETE_NOTIFICATION = `${CONTEXT}/DELETE_NOTIFICATION`;
export const PUSH_SYSTEM_NOTIFICATION = `${CONTEXT}/PUSH_SYSTEM_NOTIFICATION`;

export const [
  GET_NOTIFICATION_LIST_REQUEST,
  GET_NOTIFICATION_LIST_SUCCESS,
  GET_NOTIFICATION_LIST_FAIL,
] = createActionType(GET_NOTIFICATION_LIST);

export const [
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAIL,
] = createActionType(DELETE_NOTIFICATION);

export const [
  PUSH_SYSTEM_NOTIFICATION_REQUEST,
  PUSH_SYSTEM_NOTIFICATION_SUCCESS,
  PUSH_SYSTEM_NOTIFICATION_FAIL,
] = createActionType(PUSH_SYSTEM_NOTIFICATION);

export const LOADING_ACTION_TYPES = [GET_NOTIFICATION_LIST];
export const TOAST_ACTION_TYPES = [];
