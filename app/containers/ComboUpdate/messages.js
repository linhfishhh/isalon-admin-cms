/*
 * ComboUpdate Messages
 *
 * This contains all the text for the ComboUpdate container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ComboUpdate';

export default defineMessages({
  addHeader: {
    id: `${scope}.addHeader`,
    defaultMessage: 'Add new combo',
  },
  editHeader: {
    id: `${scope}.editHeader`,
    defaultMessage: 'Edit combo',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Combo Name',
  },
  nameIsRequired: {
    id: `${scope}.nameIsRequired`,
    defaultMessage: 'Please enter combo name',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this product combo?',
  },
  addProduct: {
    id: `${scope}.addProduct`,
    defaultMessage: 'Add product',
  },
});
