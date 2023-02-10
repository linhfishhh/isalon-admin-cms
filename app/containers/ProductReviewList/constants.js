/*
 *
 * ProductList constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/PRODUCT_REVIEW_LIST';

export const GET_LIST = `${CONTEXT}/GET_LIST`;
export const GET = `${CONTEXT}/GET`;
export const ADD = `${CONTEXT}/ADD`;
export const EDIT = `${CONTEXT}/EDIT`;
export const APPROVE = `${CONTEXT}/APPROVE`;
export const DELETE = `${CONTEXT}/DELETE`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
export const UPDATE_DATA_FIELD = `${CONTEXT}/UPDATE_DATA_FIELD`;
export const GET_PRODUCT = `${CONTEXT}/GET_PRODUCT`;

export const [
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
] = createActionType(GET_LIST);
export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL] = createActionType(ADD);
export const [GET_REQUEST, GET_SUCCESS, GET_FAIL] = createActionType(GET);
export const [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAIL] = createActionType(EDIT);
export const [
  APPROVE_REQUEST,
  APPROVE_SUCCESS,
  APPROVE_FAIL,
] = createActionType(APPROVE);
export const [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL] = createActionType(
  DELETE,
);

export const [
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
] = createActionType(GET_PRODUCT);

export const LOADING_ACTION_TYPES = [GET_LIST, GET];
export const TOAST_ACTION_TYPES = [ADD, EDIT, DELETE];
