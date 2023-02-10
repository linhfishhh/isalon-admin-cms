/**
 *
 * Asynchronously loads the component for Spotlight
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
