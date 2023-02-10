/*
 *
 * ProductDetail actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET, DELETE } from './constants';

export const [getRequest, getSuccess, getFail] = createSideEffectAction(GET);
export const [
  deleteRequest,
  deleteSuccess,
  deleteFail,
] = createSideEffectAction(DELETE);
