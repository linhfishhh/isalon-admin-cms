/*
 *
 * ProductList actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_LIST, DELETE } from './constants';

export const [
  getListRequest,
  getListSuccess,
  getListFail,
] = createSideEffectAction(GET_LIST);

export const [
  deleteRequest,
  deleteSuccess,
  deleteFail,
] = createSideEffectAction(DELETE);
