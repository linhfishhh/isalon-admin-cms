/*
 *
 * ProductList actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_VARIANT_LIST,
  CLEAN_DATA,
} from './constants';

export const [
  getProductListRequest,
  getProductListSuccess,
  getProductListFail,
] = createSideEffectAction(GET_PRODUCT_LIST);

export const [
  getProductVariantListRequest,
  getProductVariantListSuccess,
  getProductVariantListFail,
] = createSideEffectAction(GET_PRODUCT_VARIANT_LIST);

export const cleanDataAction = createSingleAction(CLEAN_DATA);
