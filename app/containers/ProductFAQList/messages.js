/*
 * ProductFAQList Messages
 *
 * This contains all the text for the ProductFAQList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductFAQList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Product FAQ list',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this question?',
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: 'Add reply',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit reply',
  },
});
