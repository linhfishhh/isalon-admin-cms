/*
 * OrderUpdate Messages
 *
 * This contains all the text for the OrderUpdate container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.OrderUpdate';

export default defineMessages({
  addHeader: {
    id: `${scope}.addHeader`,
    defaultMessage: 'Add new order',
  },
  editHeader: {
    id: `${scope}.editHeader`,
    defaultMessage: 'Edit order',
  },
});
