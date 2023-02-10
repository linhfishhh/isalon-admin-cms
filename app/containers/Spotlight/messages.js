/*
 * Spotlight Messages
 *
 * This contains all the text for the Spotlight container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Spotlight';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Spotlight container!',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this widget?',
  },
});
