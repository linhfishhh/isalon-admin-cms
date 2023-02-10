/*
 *
 * ProductUpdate actions
 *
 */

import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_CATEGORY_LIST,
  GET_BRAND_LIST,
  ADD,
  GET,
  EDIT,
  UPDATE_DATA_FIELD,
  CLEAN_DATA,
} from './constants';

export const [
  getCategoryListRequest,
  getCategoryListSuccess,
  getCategoryListFail,
] = createSideEffectAction(GET_CATEGORY_LIST);

export const [
  getBrandListRequest,
  getBrandListSuccess,
  getBrandListFail,
] = createSideEffectAction(GET_BRAND_LIST);

export const [addRequest, addSuccess, addFail] = createSideEffectAction(ADD);
export const [getRequest, getSuccess, getFail] = createSideEffectAction(GET);
export const [editRequest, editSuccess, editFail] = createSideEffectAction(
  EDIT,
);

export const updateDataField = createSingleAction(UPDATE_DATA_FIELD);
export const cleanDataAction = createSingleAction(CLEAN_DATA);
