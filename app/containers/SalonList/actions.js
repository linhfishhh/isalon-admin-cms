/*
 *
 * CustomerList actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_LIST, SEARCH } from './constants';

export const [
  getListRequest,
  getListSuccess,
  getListFail,
] = createSideEffectAction(GET_LIST);

export const [
  searchRequest,
  searchSuccess,
  searchFail,
] = createSideEffectAction(SEARCH);
