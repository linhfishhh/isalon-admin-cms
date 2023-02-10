/*
 *
 * Layouts constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/LAYOUTS';

export const LOGOUT = `${CONTEXT}/LOGOUT`;

export const [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL] = createActionType(
  LOGOUT,
);
