/*
 *
 * Category actions
 *
 */
import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_LIST,
  GET_LIST_PARENT,
  GET,
  ADD,
  EDIT,
  DELETE,
  CLEAN_DATA_EDIT,
  UPDATE_DATA_FIELD,
} from './constants';

export const [
  getListRequest,
  getListSuccess,
  getListFail,
] = createSideEffectAction(GET_LIST);

export const [
  getListParentRequest,
  getListParentSuccess,
  getListParentFail,
] = createSideEffectAction(GET_LIST_PARENT);

export const [getRequest, getSuccess, getFail] = createSideEffectAction(GET);

export const [addRequest, addSuccess, addFail] = createSideEffectAction(ADD);

export const [editRequest, editSuccess, editFail] = createSideEffectAction(
  EDIT,
);

export const [
  deleteRequest,
  deleteSuccess,
  deleteFail,
] = createSideEffectAction(DELETE);

export const cleanDataEdit = createSingleAction(CLEAN_DATA_EDIT);
export const updateDataField = createSingleAction(UPDATE_DATA_FIELD);
