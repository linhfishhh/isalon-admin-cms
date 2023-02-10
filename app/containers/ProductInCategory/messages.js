/*
 * ProductInCategory Messages
 *
 * This contains all the text for the ProductInCategory container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductInCategory';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Product list in category',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this product from category?',
  },
  addProduct: {
    id: `${scope}.addProduct`,
    defaultMessage: 'Add product to category',
  },
});
