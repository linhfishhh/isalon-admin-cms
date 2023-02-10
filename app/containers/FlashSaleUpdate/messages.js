/*
 * FlashSaleUpdate Messages
 *
 * This contains all the text for the FlashSaleUpdate container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FlashSaleUpdate';

export default defineMessages({
  addHeader: {
    id: `${scope}.addHeader`,
    defaultMessage: 'Add new flash sale',
  },
  editHeader: {
    id: `${scope}.editHeader`,
    defaultMessage: 'Edit flash sale',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Flash sale name',
  },
  nameIsRequired: {
    id: `${scope}.nameIsRequired`,
    defaultMessage: 'Please enter flash sale name',
  },
  startAt: {
    id: `${scope}.startAt`,
    defaultMessage: 'Start at',
  },
  expiredAt: {
    id: `${scope}.expiredAt`,
    defaultMessage: 'Expired at',
  },
  minDate: {
    id: `${scope}.minDate`,
    defaultMessage: 'Date should not be before minimal date',
  },
});
