/*
 *
 * OrderList actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_LIST, EXPORT } from './constants';

export const [
  getListRequest,
  getListSuccess,
  getListFail,
] = createSideEffectAction(GET_LIST);

export const [
  exportRequest,
  exportSuccess,
  exportFail,
] = createSideEffectAction(EXPORT);
