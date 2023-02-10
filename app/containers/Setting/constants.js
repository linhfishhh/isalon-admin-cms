/*
 *
 * Setting constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/SETTINGS';

export const GET_CFG = `${CONTEXT}/GET_CFG`;
export const UPDATE_CFG = `${CONTEXT}/UPDATE_CFG`;
export const GET_SHOP_CFG = `${CONTEXT}/GET_SHOP_CFG`;
export const UPDATE_SHOP_CFG = `${CONTEXT}/UPDATE_SHOP_CFG`;

export const [
  GET_CFG_REQUEST,
  GET_CFG_SUCCESS,
  GET_CFG_FAIL,
] = createActionType(GET_CFG);

export const [
  UPDATE_CFG_REQUEST,
  UPDATE_CFG_SUCCESS,
  UPDATE_CFG_FAIL,
] = createActionType(UPDATE_CFG);

export const [
  GET_SHOP_CFG_REQUEST,
  GET_SHOP_CFG_SUCCESS,
  GET_SHOP_CFG_FAIL,
] = createActionType(GET_SHOP_CFG);

export const [
  UPDATE_SHOP_CFG_REQUEST,
  UPDATE_SHOP_CFG_SUCCESS,
  UPDATE_SHOP_CFG_FAIL,
] = createActionType(UPDATE_SHOP_CFG);

export const TOAST_ACTION_TYPES = [UPDATE_CFG, UPDATE_SHOP_CFG];
