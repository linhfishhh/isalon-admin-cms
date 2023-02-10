/*
 * ProductUpdate Messages
 *
 * This contains all the text for the ProductUpdate container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductUpdate';

export default defineMessages({
  addHeader: {
    id: `${scope}.addHeader`,
    defaultMessage: 'Add new product',
  },
  editHeader: {
    id: `${scope}.editHeader`,
    defaultMessage: 'Edit product',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Product Name',
  },
  nameIsRequired: {
    id: `${scope}.nameIsRequired`,
    defaultMessage: 'Please enter product name',
  },
  skuIsRequired: {
    id: `${scope}.skuIsRequired`,
    defaultMessage: 'Please enter product SUK',
  },
});
