/*
 *
 * OrderList constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/ORDERS_LIST';

export const GET_LIST = `${CONTEXT}/GET_LIST`;
export const EXPORT = `${CONTEXT}/EXPORT`;

export const [
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
] = createActionType(GET_LIST);

export const [EXPORT_REQUEST, EXPORT_SUCCESS, EXPORT_FAIL] = createActionType(
  EXPORT,
);

export const LOADING_ACTION_TYPES = [GET_LIST, EXPORT];
