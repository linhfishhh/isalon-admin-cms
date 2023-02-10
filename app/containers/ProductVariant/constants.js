/*
 *
 * ProductVariant constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/PRODUCT_VARIANT';

export const GET_VARIANT_LIST = `${CONTEXT}/GET_VARIANT_LIST`;
export const GET_PRODUCT_VARIANT = `${CONTEXT}/GET_PRODUCT_VARIANT`;

export const [
  GET_VARIANT_LIST_REQUEST,
  GET_VARIANT_LIST_SUCCESS,
  GET_VARIANT_LIST_FAIL,
] = createActionType(GET_VARIANT_LIST);

export const [
  GET_PRODUCT_VARIANT_REQUEST,
  GET_PRODUCT_VARIANT_SUCCESS,
  GET_PRODUCT_VARIANT_FAIL,
] = createActionType(GET_PRODUCT_VARIANT);

export const LOADING_ACTION_TYPES = [GET_PRODUCT_VARIANT];

export const UPDATE_DATA_FIELD = `${CONTEXT}/UPDATE_DATA_FIELD`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
export const SET_PRODUCT_VARIANT_EDIT = `${CONTEXT}/SET_PRODUCT_VARIANT_EDIT`;
export const SET_VARIANT_SELECTED = `${CONTEXT}/SET_VARIANT_SELECTED`;
export const REMOVE_VARIANT_VALUE = `${CONTEXT}/REMOVE_VARIANT_VALUE`;
export const REFRESH_DATA = `${CONTEXT}/REFRESH_DATA`;
