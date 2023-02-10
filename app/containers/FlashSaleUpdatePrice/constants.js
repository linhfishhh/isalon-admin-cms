/*
 *
 * FlashSaleUpdatePrice constants
 *
 */
import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/FLASH_SALE_PRICE_UPDATE';

export const GET_LIST_PRODUCT_VARIANT = `${CONTEXT}/GET_LIST_PRODUCT_VARIANT`;
export const GET = `${CONTEXT}/GET`;
export const ADD = `${CONTEXT}/ADD`;
export const EDIT = `${CONTEXT}/EDIT`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
export const UPDATE_DATA_FIELD = `${CONTEXT}/UPDATE_DATA_FIELD`;

export const [
  GET_LIST_PRODUCT_VARIANT_REQUEST,
  GET_LIST_PRODUCT_VARIANT_SUCCESS,
  GET_LIST_PRODUCT_VARIANT_FAIL,
] = createActionType(GET_LIST_PRODUCT_VARIANT);

export const [GET_REQUEST, GET_SUCCESS, GET_FAIL] = createActionType(GET);
export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL] = createActionType(ADD);
export const [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAIL] = createActionType(EDIT);

export const LOADING_ACTION_TYPES = [GET_LIST_PRODUCT_VARIANT, ADD, EDIT];
export const TOAST_ACTION_TYPES = [ADD, EDIT];
