/*
 * ComboList Messages
 *
 * This contains all the text for the ComboList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ComboList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Combo list',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this combo?',
  },
});
