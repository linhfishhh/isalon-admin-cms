/*
 *
 * Tags actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_LIST, ADD, EDIT, DELETE } from './constants';

export const [
  getListRequest,
  getListSuccess,
  getListFail,
] = createSideEffectAction(GET_LIST);

export const [addRequest, addSuccess, addFail] = createSideEffectAction(ADD);

export const [editRequest, editSuccess, editFail] = createSideEffectAction(
  EDIT,
);

export const [
  deleteRequest,
  deleteSuccess,
  deleteFail,
] = createSideEffectAction(DELETE);
