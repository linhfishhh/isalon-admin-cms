/*
 *
 * FlashSaleUpdatePrice actions
 *
 */

import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_LIST_PRODUCT_VARIANT,
  GET,
  ADD,
  EDIT,
  CLEAN_DATA,
  UPDATE_DATA_FIELD,
} from './constants';

export const [
  getListProductVariantRequest,
  getListProductVariantSuccess,
  getListProductVariantFail,
] = createSideEffectAction(GET_LIST_PRODUCT_VARIANT);
export const [getRequest, getSuccess, getFail] = createSideEffectAction(GET);
export const [addRequest, addSuccess, addFail] = createSideEffectAction(ADD);
export const [editRequest, editSuccess, editFail] = createSideEffectAction(
  EDIT,
);

export const updateDataField = createSingleAction(UPDATE_DATA_FIELD);
export const cleanDataAction = createSingleAction(CLEAN_DATA);
