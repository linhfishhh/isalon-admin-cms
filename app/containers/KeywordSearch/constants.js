/*
 *
 * KeywordSearch constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/KEYWORD_SEARCH';

export const GET_LIST = `${CONTEXT}/GET_LIST`;
export const GET_TOP_KEYWORD_SEARCH = `${CONTEXT}/GET_TOP_KEYWORD_SEARCH`;
export const ADD = `${CONTEXT}/ADD`;
export const UPDATE_ORDER = `${CONTEXT}/UPDATE_ORDER`;
export const DELETE = `${CONTEXT}/DELETE`;

export const [
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
] = createActionType(GET_LIST);

export const [
  GET_TOP_KEYWORD_SEARCH_REQUEST,
  GET_TOP_KEYWORD_SEARCH_SUCCESS,
  GET_TOP_KEYWORD_SEARCH_FAIL,
] = createActionType(GET_TOP_KEYWORD_SEARCH);

export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL] = createActionType(ADD);

export const [
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
] = createActionType(UPDATE_ORDER);

export const [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL] = createActionType(
  DELETE,
);

export const LOADING_ACTION_TYPES = [GET_LIST];
export const TOAST_ACTION_TYPES = [ADD, DELETE, UPDATE_ORDER];

export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
export const UPDATE_DATA_FIELD = `${CONTEXT}/UPDATE_DATA_FIELD`;
