/*
 *
 * ProductReviewList actions
 *
 */

import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_LIST,
  ADD,
  GET,
  EDIT,
  APPROVE,
  DELETE,
  CLEAN_DATA,
  UPDATE_DATA_FIELD,
  GET_PRODUCT,
} from './constants';

export const [
  getListRequest,
  getListSuccess,
  getListFail,
] = createSideEffectAction(GET_LIST);
export const [addRequest, addSuccess, addFail] = createSideEffectAction(ADD);
export const [getRequest, getSuccess, getFail] = createSideEffectAction(GET);
export const [editRequest, editSuccess, editFail] = createSideEffectAction(
  EDIT,
);
export const [
  approveRequest,
  approveSuccess,
  approveFail,
] = createSideEffectAction(APPROVE);
export const [
  deleteRequest,
  deleteSuccess,
  deleteFail,
] = createSideEffectAction(DELETE);
export const [
  getProductRequest,
  getProductSuccess,
  getProductFail,
] = createSideEffectAction(GET_PRODUCT);
export const cleanDataAction = createSingleAction(CLEAN_DATA);
export const updateDataField = createSingleAction(UPDATE_DATA_FIELD);
