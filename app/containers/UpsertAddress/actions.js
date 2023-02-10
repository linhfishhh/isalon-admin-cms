/*
 *
 * EditProfile actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { ADD_MY_ADDRESS, UPDATE_MY_ADDRESS } from './constants';

export const [
  addMyAddressRequest,
  addMyAddressSuccess,
  addMyAddressFail,
] = createSideEffectAction(ADD_MY_ADDRESS);

export const [
  updateMyAddressRequest,
  updateMyAddressSuccess,
  updateMyAddressFail,
] = createSideEffectAction(UPDATE_MY_ADDRESS);
