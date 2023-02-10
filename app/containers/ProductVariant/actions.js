/*
 *
 * ProductVariant actions
 *
 */

import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_VARIANT_LIST,
  GET_PRODUCT_VARIANT,
  UPDATE_DATA_FIELD,
  SET_VARIANT_SELECTED,
  REMOVE_VARIANT_VALUE,
  CLEAN_DATA,
  REFRESH_DATA,
} from './constants';

export const [
  getVariantListRequest,
  getVariantListSuccess,
  getVariantListFail,
] = createSideEffectAction(GET_VARIANT_LIST);

export const [
  getProductVariantRequest,
  getProductVariantListSuccess,
  getProductVariantListFail,
] = createSideEffectAction(GET_PRODUCT_VARIANT);

export const updateDataField = createSingleAction(UPDATE_DATA_FIELD);

export const setVariantSelected = createSingleAction(SET_VARIANT_SELECTED);

export const removeVariantValue = createSingleAction(REMOVE_VARIANT_VALUE);

export const cleanData = createSingleAction(CLEAN_DATA);

export const setRefreshData = createSingleAction(REFRESH_DATA);
