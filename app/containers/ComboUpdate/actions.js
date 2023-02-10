/*
 *
 * ComboUpdate actions
 *
 */

import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_COMBO_LIST,
  ADD,
  GET,
  EDIT,
  UPDATE_DATA_FIELD,
  CLEAN_DATA,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
} from './constants';

export const [addRequest, addSuccess, addFail] = createSideEffectAction(ADD);
export const [getRequest, getSuccess, getFail] = createSideEffectAction(GET);
export const [editRequest, editSuccess, editFail] = createSideEffectAction(
  EDIT,
);

export const [
  getProductListRequest,
  getProductListSuccess,
  getProductListFail,
] = createSideEffectAction(GET_PRODUCT_LIST);

export const [
  getProductComboListRequest,
  getProductComboListSuccess,
  getProductComboListFail,
] = createSideEffectAction(GET_PRODUCT_COMBO_LIST);

export const [
  addProductRequest,
  addProductSuccess,
  addProductFail,
] = createSideEffectAction(ADD_PRODUCT);

export const [
  removeProductRequest,
  removeProductSuccess,
  removeProductFail,
] = createSideEffectAction(REMOVE_PRODUCT);

export const updateDataField = createSingleAction(UPDATE_DATA_FIELD);
export const cleanDataAction = createSingleAction(CLEAN_DATA);
