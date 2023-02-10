/*
 * FlashSaleList Messages
 *
 * This contains all the text for the FlashSaleList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FlashSaleList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Flash sale list',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this flash sale?',
  },
});
