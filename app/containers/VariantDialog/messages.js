/*
 * VariantDialog Messages
 *
 * This contains all the text for the VariantDialog container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.VariantDialog';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Attributes',
  },
  nameIsRequired: {
    id: `${scope}.nameIsRequired`,
    defaultMessage: 'Please enter attribute name',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this variant?',
  },
});
