/*
 *
 * CustomerDetail actions
 *
 */

import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_ORDER_LIST,
  GET_PROFILE,
  CLEAN_DATA,
  GET_WALLET,
  UPDATE_WALLET,
  GET_WALLET_TRANSACTIONS,
  GET_USER_ADDRESS,
  GET_ADDRESS_DETAIL,
  CLEAR_ADDRESS_DETAIL,
} from './constants';

export const [
  getOrderListRequest,
  getOrderListSuccess,
  getOrderListFail,
] = createSideEffectAction(GET_ORDER_LIST);

export const [
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
] = createSideEffectAction(GET_PROFILE);

export const [
  getUserWalletRequest,
  getUserWalletSuccess,
  getUserWalletFail,
] = createSideEffectAction(GET_WALLET);

export const [
  updateUserWalletRequest,
  updateUserWalletSuccess,
  updateUserWalletFail,
] = createSideEffectAction(UPDATE_WALLET);

export const [
  getWalletTransactionsRequest,
  getWalletTransactionsSuccess,
  getWalletTransactionsFail,
] = createSideEffectAction(GET_WALLET_TRANSACTIONS);

export const [
  getUserAddressRequest,
  getUserAddressSuccess,
  getUserAddressFail,
] = createSideEffectAction(GET_USER_ADDRESS);

export const [
  getAddressDetailRequest,
  getAddressDetailSuccess,
  getAddressDetailFail,
] = createSideEffectAction(GET_ADDRESS_DETAIL);

export const cleanDataAction = createSingleAction(CLEAN_DATA);
export const clearAddressDetailRequest = createSingleAction(
  CLEAR_ADDRESS_DETAIL,
);
