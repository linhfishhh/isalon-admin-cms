/*
 *
 * SignIn actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';

import { LOGIN, GET_PROFILE } from './constants';

export const [loginRequest, loginSuccess, loginFail] = createSideEffectAction(
  LOGIN,
);

export const [
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
] = createSideEffectAction(GET_PROFILE);
