/*
 *
 * ProductDetail constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/PRODUCT_DETAIL';

export const GET = `${CONTEXT}/GET`;
export const DELETE = `${CONTEXT}/DELETE`;

export const [GET_REQUEST, GET_SUCCESS, GET_FAIL] = createActionType(GET);
export const [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL] = createActionType(
  DELETE,
);

export const LOADING_ACTION_TYPES = [GET, DELETE];
export const TOAST_ACTION_TYPES = [DELETE];
