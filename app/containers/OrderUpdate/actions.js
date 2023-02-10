/*
 *
 * OrderUpdate actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import {
  GET_ORDER,
  ADD_ORDER,
  EDIT_ORDER,
  CLEAN_DATA,
  UPDATE_ORDER_DATA,
  CALCULATE_ORDER,
} from './constants';

export const [
  getOrderRequest,
  getOrderSuccess,
  getOrderFail,
] = createSideEffectAction(GET_ORDER);

export const [
  addOrderRequest,
  addOrderSuccess,
  addOrderFail,
] = createSideEffectAction(ADD_ORDER);

export const [
  editOrderRequest,
  editOrderSuccess,
  editOrderFail,
] = createSideEffectAction(EDIT_ORDER);

export const [
  calculateOrderRequest,
  calculateOrderSuccess,
  calculateOrderFail,
] = createSideEffectAction(CALCULATE_ORDER);

export const updateOrderDataAction = createSingleAction(UPDATE_ORDER_DATA);
export const cleanDataAction = createSingleAction(CLEAN_DATA);
