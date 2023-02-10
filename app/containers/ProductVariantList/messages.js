/*
 * ProductVariantList Messages
 *
 * This contains all the text for the ProductVariantList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductVariantList';

export default defineMessages({
  thumbnail: {
    id: `${scope}.thumbnail`,
    defaultMessage: 'Thumbnail',
  },
  quantity: {
    id: `${scope}.quantity`,
    defaultMessage: 'Quantity',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this product variant?',
  },
});
