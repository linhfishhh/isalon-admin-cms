/*
 *
 * OrderUpdate constants
 *
 */
import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/ORDER_UPDATE';

export const ADD_ORDER = `${CONTEXT}/ADD_ORDER`;
export const GET_ORDER = `${CONTEXT}/GET_ORDER`;
export const EDIT_ORDER = `${CONTEXT}/EDIT_ORDER`;
export const CALCULATE_ORDER = `${CONTEXT}/CALCULATE_ORDER`;

export const [
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
] = createActionType(ADD_ORDER);
export const [
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
] = createActionType(GET_ORDER);
export const [
  EDIT_ORDER_REQUEST,
  EDIT_ORDER_SUCCESS,
  EDIT_ORDER_FAIL,
] = createActionType(EDIT_ORDER);
export const [
  CALCULATE_ORDER_REQUEST,
  CALCULATE_ORDER_SUCCESS,
  CALCULATE_ORDER_FAIL,
] = createActionType(CALCULATE_ORDER);

export const LOADING_ACTION_TYPES = [GET_ORDER, ADD_ORDER, EDIT_ORDER];
export const TOAST_ACTION_TYPES = [ADD_ORDER, EDIT_ORDER];

export const UPDATE_ORDER_DATA = `${CONTEXT}/UPDATE_ORDER_DATA`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
