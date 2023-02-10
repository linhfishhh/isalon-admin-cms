/*
 *
 * KeywordSearch actions
 *
 */
import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_LIST,
  GET_TOP_KEYWORD_SEARCH,
  ADD,
  UPDATE_ORDER,
  DELETE,
  UPDATE_DATA_FIELD,
  CLEAN_DATA,
} from './constants';

export const [
  getListRequest,
  getListSuccess,
  getListFail,
] = createSideEffectAction(GET_LIST);

export const [
  getTopKeywordSearchRequest,
  getTopKeywordSearchSuccess,
  getTopKeywordSearchFail,
] = createSideEffectAction(GET_TOP_KEYWORD_SEARCH);

export const [addRequest, addSuccess, addFail] = createSideEffectAction(ADD);

export const [
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
] = createSideEffectAction(UPDATE_ORDER);

export const [
  deleteRequest,
  deleteSuccess,
  deleteFail,
] = createSideEffectAction(DELETE);

export const cleanDataAction = createSingleAction(CLEAN_DATA);
export const updateDataField = createSingleAction(UPDATE_DATA_FIELD);
