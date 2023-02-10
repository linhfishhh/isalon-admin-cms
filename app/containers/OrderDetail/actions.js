/*
 *
 * OrderDetail actions
 *
 */

import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  GET,
  UPDATE_STATUS,
  UPDATE_DATA_FIELD,
  GET_STATUS_HISTORY,
} from './constants';

export const [getRequest, getSuccess, getFail] = createSideEffectAction(GET);

export const [
  updateStatusRequest,
  updateStatusSuccess,
  updateStatusFail,
] = createSideEffectAction(UPDATE_STATUS);

export const [
  getStatusHistoryRequest,
  getStatusHistorySuccess,
  getStatusHistoryFail,
] = createSideEffectAction(GET_STATUS_HISTORY);

export const updateDataField = createSingleAction(UPDATE_DATA_FIELD);
