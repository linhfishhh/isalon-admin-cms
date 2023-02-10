/**
 *
 * Asynchronously loads the component for ComboList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
