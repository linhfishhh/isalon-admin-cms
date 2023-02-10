/**
 *
 * Asynchronously loads the component for LegacyPushNotification
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
