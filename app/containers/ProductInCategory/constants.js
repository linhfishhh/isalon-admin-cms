/*
 *
 * ProductInCategory constants
 *
 */
import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/PRODUCT_IN_CATEGORY';

export const GET_LIST = `${CONTEXT}/GET_LIST`;
export const GET_LIST_CATEGORY = `${CONTEXT}/GET_LIST_CATEGORY`;
export const GET_LIST_PRODUCT = `${CONTEXT}/GET_LIST_PRODUCT`;

export const ADD = `${CONTEXT}/ADD`;
export const DELETE = `${CONTEXT}/DELETE`;

export const UPDATE_SUB_CATEGORY_ORDER = `${CONTEXT}/UPDATE_SUB_CATEGORY_ORDER`;
export const GET_CATEGORY_INFO = `${CONTEXT}/GET_CATEGORY_INFO`;

export const [
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
] = createActionType(GET_LIST);

export const [
  GET_LIST_CATEGORY_REQUEST,
  GET_LIST_CATEGORY_SUCCESS,
  GET_LIST_CATEGORY_FAIL,
] = createActionType(GET_LIST_CATEGORY);

export const [
  GET_LIST_PRODUCT_REQUEST,
  GET_LIST_PRODUCT_SUCCESS,
  GET_LIST_PRODUCT_FAIL,
] = createActionType(GET_LIST_PRODUCT);

export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL] = createActionType(ADD);

export const [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL] = createActionType(
  DELETE,
);

export const [
  UPDATE_SUB_CATEGORY_ORDER_REQUEST,
  UPDATE_SUB_CATEGORY_ORDER_SUCCESS,
  UPDATE_SUB_CATEGORY_ORDER_FAIL,
] = createActionType(UPDATE_SUB_CATEGORY_ORDER);

export const [
  GET_CATEGORY_INFO_REQUEST,
  GET_CATEGORY_INFO_SUCCESS,
  GET_CATEGORY_INFO_FAIL,
] = createActionType(GET_CATEGORY_INFO);

export const LOADING_ACTION_TYPES = [GET_LIST, GET_LIST_PRODUCT, ADD, DELETE];
