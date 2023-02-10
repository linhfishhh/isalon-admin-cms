/*
 *
 * FlashSaleProductList constants
 *
 */
import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/FLASH_SALE_PRODUCT';

export const GET_LIST_PRODUCT = `${CONTEXT}/GET_LIST_PRODUCT`;
export const GET_LIST_PRODUCT_NOT_IN = `${CONTEXT}/GET_LIST_PRODUCT_NOT_IN`;

export const DELETE = `${CONTEXT}/DELETE`;

export const [
  GET_LIST_PRODUCT_REQUEST,
  GET_LIST_PRODUCT_SUCCESS,
  GET_LIST_PRODUCT_FAIL,
] = createActionType(GET_LIST_PRODUCT);

export const [
  GET_LIST_PRODUCT_NOT_IN_REQUEST,
  GET_LIST_PRODUCT_NOT_IN_SUCCESS,
  GET_LIST_PRODUCT_NOT_IN_FAIL,
] = createActionType(GET_LIST_PRODUCT_NOT_IN);

export const [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL] = createActionType(
  DELETE,
);

export const LOADING_ACTION_TYPES = [GET_LIST_PRODUCT, DELETE];
export const TOAST_ACTION_TYPES = [DELETE];
