/*
 *
 * ComboList constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/COMBO_LIST';

export const GET_LIST = `${CONTEXT}/GET_LIST`;
export const DELETE = `${CONTEXT}/DELETE`;

export const [
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
] = createActionType(GET_LIST);

export const [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL] = createActionType(
  DELETE,
);

export const LOADING_ACTION_TYPES = [GET_LIST];
export const TOAST_ACTION_TYPES = [DELETE];
