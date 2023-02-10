/*
 *
 * Layouts actions
 *
 */
import { createSideEffectAction } from 'utils/reduxHelper';
import { LOGOUT } from './constants';

export const [
  logoutRequest,
  logoutSuccess,
  logoutFail,
] = createSideEffectAction(LOGOUT);
