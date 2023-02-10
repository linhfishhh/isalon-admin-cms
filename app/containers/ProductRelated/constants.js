/*
 *
 * ProductVariantList constants
 *
 */
import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/PRODUCT_RELATED';

export const GET_LIST = `${CONTEXT}/GET_LIST`;
export const ADD = `${CONTEXT}/ADD`;
export const DELETE = `${CONTEXT}/DELETE`;
export const SET_PRODUCT_RELATED = `${CONTEXT}/SET_PRODUCT_RELATED`;

export const [
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
] = createActionType(GET_LIST);

export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL] = createActionType(ADD);
export const [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL] = createActionType(
  DELETE,
);

export const LOADING_ACTION_TYPES = [ADD, DELETE];
export const TOAST_ACTION_TYPES = [ADD, DELETE];
