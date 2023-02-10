/*
 *
 * LegacyPushNotification constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/LEGACY_NOTIFICATION';

export const PUSHNOTIFICATION = `${CONTEXT}/PUSHNOTIFICATION`;

export const [
  PUSHNOTIFICATION_REQUEST,
  PUSHNOTIFICATION_SUCCESS,
  PUSHNOTIFICATION_FAIL,
] = createActionType(PUSHNOTIFICATION);

export const TOAST_ACTION_TYPES = [PUSHNOTIFICATION];
