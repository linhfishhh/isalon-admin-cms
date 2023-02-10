/*
 *
 * Spotlight actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';

import {
  GET_LIST,
  GET_CATEGORY_LIST,
  GET_ITEM_LIST,
  CHANGE_ORDER,
  DELETE,
} from './constants';

export const [
  getListRequest,
  getListSuccess,
  getListFail,
] = createSideEffectAction(GET_LIST);

export const [
  getCategoryListRequest,
  getCategoryListSuccess,
  getCategoryListFail,
] = createSideEffectAction(GET_CATEGORY_LIST);

export const [
  getItemListRequest,
  getItemListSuccess,
  getItemListFail,
] = createSideEffectAction(GET_ITEM_LIST);

export const [
  deleteRequest,
  deleteSuccess,
  deleteFail,
] = createSideEffectAction(DELETE);

export const [
  changeOrderRequest,
  changeOrderSuccess,
  changeOrderFail,
] = createSideEffectAction(CHANGE_ORDER);
