/*
 *
 * Brand actions
 *
 */
import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_LIST,
  GET,
  ADD,
  EDIT,
  DELETE,
  UPDATE_DATA_FIELD,
  CLEAN_DATA_EDIT,
} from './constants';

export const [
  getListRequest,
  getListSuccess,
  getListFail,
] = createSideEffectAction(GET_LIST);

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
