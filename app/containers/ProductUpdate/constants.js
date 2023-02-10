/*
 *
 * ProductUpdate constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/PRODUCT_UPDATE';

export const GET_CATEGORY_LIST = `${CONTEXT}/GET_CATEGORY_LIST`;
export const GET_BRAND_LIST = `${CONTEXT}/GET_BRAND_LIST`;
export const ADD = `${CONTEXT}/ADD`;
export const GET = `${CONTEXT}/GET`;
export const EDIT = `${CONTEXT}/EDIT`;

export const [
  GET_CATEGORY_LIST_REQUEST,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_FAIL,
] = createActionType(GET_CATEGORY_LIST);

export const [
  GET_BRAND_LIST_REQUEST,
  GET_BRAND_LIST_SUCCESS,
  GET_BRAND_LIST_FAIL,
] = createActionType(GET_BRAND_LIST);

export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL] = createActionType(ADD);
export const [GET_REQUEST, GET_SUCCESS, GET_FAIL] = createActionType(GET);
export const [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAIL] = createActionType(EDIT);

export const LOADING_ACTION_TYPES = [
  GET_CATEGORY_LIST,
  GET_BRAND_LIST,
  GET,
  ADD,
  EDIT,
];
export const TOAST_ACTION_TYPES = [ADD, EDIT];

export const UPDATE_DATA_FIELD = `${CONTEXT}/UPDATE_DATA_FIELD`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
