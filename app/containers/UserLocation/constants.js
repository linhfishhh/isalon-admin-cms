/*
 *
 * UserLocation constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/USER_LOCATION';

export const GET_ALL_UNITS = `${CONTEXT}/GET_ALL_UNITS`;
export const GET_PROVINCE_LIST = `${CONTEXT}/GET_PROVINCE_LIST`;
export const GET_DISTRICT_LIST = `${CONTEXT}/GET_DISTRICT_LIST`;
export const GET_WARD_LIST = `${CONTEXT}/GET_WARD_LIST`;

export const [
  GET_ALL_UNITS_REQUEST,
  GET_ALL_UNITS_SUCCESS,
  GET_ALL_UNITS_FAIL,
] = createActionType(GET_ALL_UNITS);

export const [
  GET_PROVINCE_LIST_REQUEST,
  GET_PROVINCE_LIST_SUCCESS,
  GET_PROVINCE_LIST_FAIL,
] = createActionType(GET_PROVINCE_LIST);

export const [
  GET_DISTRICT_LIST_REQUEST,
  GET_DISTRICT_LIST_SUCCESS,
  GET_DISTRICT_LIST_FAIL,
] = createActionType(GET_DISTRICT_LIST);

export const [
  GET_WARD_LIST_REQUEST,
  GET_WARD_LIST_SUCCESS,
  GET_WARD_LIST_FAIL,
] = createActionType(GET_WARD_LIST);
