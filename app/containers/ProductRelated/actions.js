/*
 *
 * ProductVariantList actions
 *
 */

import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import { GET_LIST, ADD, SET_PRODUCT_RELATED, DELETE } from './constants';

export const [
  getListRequest,
  getListSuccess,
  getListFail,
] = createSideEffectAction(GET_LIST);

export const [addRequest, addSuccess, addFail] = createSideEffectAction(ADD);

export const [
  deleteRequest,
  deleteSuccess,
  deleteFail,
] = createSideEffectAction(DELETE);

export const setProductRelatedAction = createSingleAction(SET_PRODUCT_RELATED);
