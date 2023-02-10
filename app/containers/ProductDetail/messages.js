/*
 * ProductDetail Messages
 *
 * This contains all the text for the ProductDetail container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductDetail';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Product detail',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this product?',
  },
});
