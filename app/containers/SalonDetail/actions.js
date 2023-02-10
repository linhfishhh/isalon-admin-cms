/*
 *
 * CustomerDetail actions
 *
 */

import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_PROFILE,
  CLEAR_DATA,
  GET_WALLET,
  UPDATE_WALLET,
  GET_WALLET_TRANSACTIONS,
} from './constants';

export const [
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
] = createSideEffectAction(GET_PROFILE);

export const clearDataAction = createSingleAction(CLEAR_DATA);

export const [
  getSalonWalletRequest,
  getSalonWalletSuccess,
  getSalonWalletFail,
] = createSideEffectAction(GET_WALLET);

export const [
  updateSalonWalletRequest,
  updateSalonWalletSuccess,
  updateSalonWalletFail,
] = createSideEffectAction(UPDATE_WALLET);

export const [
  getWalletTransactionsRequest,
  getWalletTransactionsSuccess,
  getWalletTransactionsFail,
] = createSideEffectAction(GET_WALLET_TRANSACTIONS);
