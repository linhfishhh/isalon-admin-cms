/*
 * ProductVariant Messages
 *
 * This contains all the text for the ProductVariant container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProductVariant';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ProductVariant container!',
  },
  skuIsRequired: {
    id: `${scope}.skuIsRequired`,
    defaultMessage: 'Please enter product SUK',
  },
});
