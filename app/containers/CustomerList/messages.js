/*
 * Customer Messages
 *
 * This contains all the text for the Customer container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CustomerList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Customer list!',
  },
});
