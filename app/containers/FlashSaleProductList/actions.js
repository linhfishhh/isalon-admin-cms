/*
 *
 * FlashSaleProductList actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_LIST_PRODUCT, GET_LIST_PRODUCT_NOT_IN, DELETE } from './constants';

export const [
  getListProductRequest,
  getListProductSuccess,
  getListProductFail,
] = createSideEffectAction(GET_LIST_PRODUCT);

export const [
  getListProductNotInRequest,
  getListProductNotInSuccess,
  getListProductNotInFail,
] = createSideEffectAction(GET_LIST_PRODUCT_NOT_IN);

export const [
  deleteRequest,
  deleteSuccess,
  deleteFail,
] = createSideEffectAction(DELETE);
