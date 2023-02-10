/*
 *
 * ProductInCategory actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_LIST,
  GET_LIST_CATEGORY,
  GET_LIST_PRODUCT,
  ADD,
  DELETE,
  UPDATE_SUB_CATEGORY_ORDER,
  GET_CATEGORY_INFO,
} from './constants';

export const [
  getListRequest,
  getListSuccess,
  getListFail,
] = createSideEffectAction(GET_LIST);

export const [
  getListCategoryRequest,
  getListCategorySuccess,
  getListCategoryFail,
] = createSideEffectAction(GET_LIST_CATEGORY);

export const [
  getListProductRequest,
  getListProductSuccess,
  getListProductFail,
] = createSideEffectAction(GET_LIST_PRODUCT);

export const [addRequest, addSuccess, addFail] = createSideEffectAction(ADD);

export const [
  deleteRequest,
  deleteSuccess,
  deleteFail,
] = createSideEffectAction(DELETE);

export const [
  updateSubCategoryOrderRequest,
  updateSubCategoryOrderSuccess,
  updateSubCategoryOrderFail,
] = createSideEffectAction(UPDATE_SUB_CATEGORY_ORDER);

export const [
  getCategoryInfoRequest,
  getCategoryInfoSuccess,
  getCategoryInfoFail,
] = createSideEffectAction(GET_CATEGORY_INFO);
