/*
 * ProductList Messages
 *
 * This contains all the text for the ProductList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Product list',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this product?',
  },
});
