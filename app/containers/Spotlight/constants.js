/*
 *
 * Spotlight constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/SPOTLIGHT';

export const GET_LIST = `${CONTEXT}/GET_LIST`;
export const GET_CATEGORY_LIST = `${CONTEXT}/GET_CATEGORY_LIST`;
export const GET_ITEM_LIST = `${CONTEXT}/GET_ITEM_LIST`;
export const DELETE = `${CONTEXT}/DELETE`;
export const CHANGE_ORDER = `${CONTEXT}/CHANGE_ORDER`;

export const [
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
] = createActionType(GET_LIST);

export const [
  GET_CATEGORY_LIST_REQUEST,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_FAIL,
] = createActionType(GET_CATEGORY_LIST);

export const [
  GET_ITEM_LIST_REQUEST,
  GET_ITEM_LIST_SUCCESS,
  GET_ITEM_LIST_FAIL,
] = createActionType(GET_ITEM_LIST);

export const [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL] = createActionType(
  DELETE,
);

export const [
  CHANGE_ORDER_REQUEST,
  CHANGE_ORDER_SUCCESS,
  CHANGE_ORDER_FAIL,
] = createActionType(CHANGE_ORDER);

export const LOADING_ACTION_TYPES = [GET_LIST, DELETE, CHANGE_ORDER];
export const TOAST_ACTION_TYPES = [DELETE];
