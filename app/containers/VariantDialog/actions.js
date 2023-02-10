/*
 *
 * VariantDialog actions
 *
 */

import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  ADD,
  EDIT,
  DELETE,
  ADD_VALUE,
  EDIT_VALUE,
  DELETE_VALUE,
  DID_REFRESH,
} from './constants';

export const [addRequest, addSuccess, addFail] = createSideEffectAction(ADD);

export const [editRequest, editSuccess, editFail] = createSideEffectAction(
  EDIT,
);

export const [
  deleteRequest,
  deleteSuccess,
  deleteFail,
] = createSideEffectAction(DELETE);

export const [
  addValueRequest,
  addValueSuccess,
  addValueFail,
] = createSideEffectAction(ADD_VALUE);

export const [
  editValueRequest,
  editValueSuccess,
  editValueFail,
] = createSideEffectAction(EDIT_VALUE);

export const [
  deleteValueRequest,
  deleteValueSuccess,
  deleteValueFail,
] = createSideEffectAction(DELETE_VALUE);

export const didRefresh = createSingleAction(DID_REFRESH);
