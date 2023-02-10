/*
 *
 * OrderDetail constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/ORDERS_DETAIL';

export const GET = `${CONTEXT}/GET`;
export const UPDATE_STATUS = `${CONTEXT}/UPDATE_STATUS`;
export const GET_STATUS_HISTORY = `${CONTEXT}/GET_STATUS_HISTORY`;

export const [GET_REQUEST, GET_SUCCESS, GET_FAIL] = createActionType(GET);
export const [
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAIL,
] = createActionType(UPDATE_STATUS);
export const [
  GET_STATUS_HISTORY_REQUEST,
  GET_STATUS_HISTORY_SUCCESS,
  GET_STATUS_HISTORY_FAIL,
] = createActionType(GET_STATUS_HISTORY);

export const UPDATE_DATA_FIELD = `${CONTEXT}/UPDATE_DATA_FIELD`;

export const LOADING_ACTION_TYPES = [GET, UPDATE_STATUS];
export const TOAST_ACTION_TYPES = [UPDATE_STATUS];
