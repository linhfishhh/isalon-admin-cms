/*
 *
 * LegacyPushNotification actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { PUSHNOTIFICATION } from './constants';

export const [
  pushNotificationRequest,
  pushNotificationSuccess,
  pushNotificationFail,
] = createSideEffectAction(PUSHNOTIFICATION);
