/*
 *
 * ComboUpdate constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/COMBO_UPDATE';

export const GET_PRODUCT_LIST = `${CONTEXT}/GET_PRODUCT_LIST`;
export const GET_PRODUCT_COMBO_LIST = `${CONTEXT}/GET_PRODUCT_COMBO_LIST`;

export const ADD = `${CONTEXT}/ADD`;
export const GET = `${CONTEXT}/GET`;
export const EDIT = `${CONTEXT}/EDIT`;

export const ADD_PRODUCT = `${CONTEXT}/ADD_PRODUCT`;
export const REMOVE_PRODUCT = `${CONTEXT}/REMOVE_PRODUCT`;

export const [
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
] = createActionType(GET_PRODUCT_LIST);

export const [
  GET_PRODUCT_COMBO_LIST_REQUEST,
  GET_PRODUCT_COMBO_LIST_SUCCESS,
  GET_PRODUCT_COMBO_LIST_FAIL,
] = createActionType(GET_PRODUCT_COMBO_LIST);

export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL] = createActionType(ADD);
export const [GET_REQUEST, GET_SUCCESS, GET_FAIL] = createActionType(GET);
export const [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAIL] = createActionType(EDIT);

export const [
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
] = createActionType(ADD_PRODUCT);

export const [
  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAIL,
] = createActionType(REMOVE_PRODUCT);

export const LOADING_ACTION_TYPES = [GET, ADD, EDIT, GET_PRODUCT_LIST];
export const TOAST_ACTION_TYPES = [ADD, EDIT];

export const UPDATE_DATA_FIELD = `${CONTEXT}/UPDATE_DATA_FIELD`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
