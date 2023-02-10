/*
 *
 * Setting actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_CFG,
  UPDATE_CFG,
  GET_SHOP_CFG,
  UPDATE_SHOP_CFG,
} from './constants';

export const [
  getCfgRequest,
  getCfgSuccess,
  getCfgFail,
] = createSideEffectAction(GET_CFG);

export const [
  updateCfgRequest,
  updateCfgSuccess,
  updateCfgFail,
] = createSideEffectAction(UPDATE_CFG);

export const [
  getShopCfgRequest,
  getShopCfgSuccess,
  getShopCfgFail,
] = createSideEffectAction(GET_SHOP_CFG);

export const [
  updateShopCfgRequest,
  updateShopCfgSuccess,
  updateShopCfgFail,
] = createSideEffectAction(UPDATE_SHOP_CFG);
