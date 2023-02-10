/**
 *
 * Asynchronously loads the component for PushNotification
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
