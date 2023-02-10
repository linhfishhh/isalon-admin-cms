/*
 *
 * Category constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/CATEGORY';

export const GET_LIST = `${CONTEXT}/GET_LIST`;
export const GET_LIST_PARENT = `${CONTEXT}/GET_LIST_PARENT`;
export const GET = `${CONTEXT}/GET`;
export const ADD = `${CONTEXT}/ADD`;
export const EDIT = `${CONTEXT}/EDIT`;
export const DELETE = `${CONTEXT}/DELETE`;

export const [
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
] = createActionType(GET_LIST);

export const [
  GET_LIST_PARENT_REQUEST,
  GET_LIST_PARENT_SUCCESS,
  GET_LIST_PARENT_FAIL,
] = createActionType(GET_LIST_PARENT);

export const [GET_REQUEST, GET_SUCCESS, GET_FAIL] = createActionType(GET);

export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL] = createActionType(ADD);

export const [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAIL] = createActionType(EDIT);

export const [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL] = createActionType(
  DELETE,
);

export const LOADING_ACTION_TYPES = [GET_LIST, GET, ADD, EDIT, DELETE];
export const TOAST_ACTION_TYPES = [ADD, EDIT, DELETE];

export const CLEAN_DATA_EDIT = `${CONTEXT}/CLEAN_DATA_EDIT`;
export const UPDATE_DATA_FIELD = `${CONTEXT}/UPDATE_DATA_FIELD`;
