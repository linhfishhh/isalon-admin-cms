/*
 *
 * EditProfile constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'ISALON/UPSERT_ADDRESS';

export const ADD_MY_ADDRESS = `${CONTEXT}/ADD_MY_ADDRESS`;
export const UPDATE_MY_ADDRESS = `${CONTEXT}/UPDATE_MY_ADDRESS`;

export const [
  ADD_MY_ADDRESS_REQUEST,
  ADD_MY_ADDRESS_SUCCESS,
  ADD_MY_ADDRESS_FAIL,
] = createActionType(ADD_MY_ADDRESS);

export const [
  UPDATE_MY_ADDRESS_REQUEST,
  UPDATE_MY_ADDRESS_SUCCESS,
  UPDATE_MY_ADDRESS_FAIL,
] = createActionType(UPDATE_MY_ADDRESS);
