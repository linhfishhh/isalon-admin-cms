/*
 *
 * Brand constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/GIFT_CODE';

export const GET_LIST = `${CONTEXT}/GET_LIST`;
export const GET = `${CONTEXT}/GET`;
export const ADD = `${CONTEXT}/ADD`;
export const EDIT = `${CONTEXT}/EDIT`;
export const DELETE = `${CONTEXT}/DELETE`;
export const GENERATE = `${CONTEXT}/GENERATE`;

export const [
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
] = createActionType(GET_LIST);

export const [GET_REQUEST, GET_SUCCESS, GET_FAIL] = createActionType(GET);

export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL] = createActionType(ADD);

export const [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAIL] = createActionType(EDIT);

export const [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL] = createActionType(
  DELETE,
);

export const [
  GENERATE_REQUEST,
  GENERATE_SUCCESS,
  GENERATE_FAIL,
] = createActionType(GENERATE);

export const LOADING_ACTION_TYPES = [
  GET_LIST,
  GET,
  ADD,
  EDIT,
  DELETE,
  GENERATE,
];
export const TOAST_ACTION_TYPES = [ADD, EDIT, DELETE];

export const CLEAN_DATA_EDIT = `${CONTEXT}/CLEAN_DATA_EDIT`;
export const UPDATE_DATA_FIELD = `${CONTEXT}/UPDATE_DATA_FIELD`;
