/*
 * ProductRelated Messages
 *
 * This contains all the text for the ProductRelated container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductRelated';

export default defineMessages({
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this product variant?',
  },
  addProduct: {
    id: `${scope}.addProduct`,
    defaultMessage: 'Add product to category',
  },
});
