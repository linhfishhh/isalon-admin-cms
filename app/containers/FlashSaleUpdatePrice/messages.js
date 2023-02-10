/*
 * FlashSaleUpdatePrice Messages
 *
 * This contains all the text for the FlashSaleUpdatePrice container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FlashSaleUpdatePrice';

export default defineMessages({
  addHeader: {
    id: `${scope}.addHeader`,
    defaultMessage: 'Add new price flash sale for product',
  },
  editHeader: {
    id: `${scope}.editHeader`,
    defaultMessage: 'Update price flash sale for product',
  },
  priceFlashSaleIsRequired: {
    id: `${scope}.priceFlashSaleIsRequired`,
    defaultMessage: 'Please enter price flash sale',
  },
});
