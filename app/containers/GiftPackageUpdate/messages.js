/*
 * GiftPackageUpdate Messages
 *
 * This contains all the text for the GiftPackageUpdate container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.GiftPackageUpdate';

export default defineMessages({
  addHeader: {
    id: `${scope}.addHeader`,
    defaultMessage: 'Add new gift package',
  },
  editHeader: {
    id: `${scope}.editHeader`,
    defaultMessage: 'Edit gift package',
  },
  percent: {
    id: `${scope}.percent`,
    defaultMessage: 'Percent',
  },
  percentIsRequired: {
    id: `${scope}.percentIsRequired`,
    defaultMessage: 'Please enter percent or cash',
  },
  cash: {
    id: `${scope}.cash`,
    defaultMessage: 'Cash',
  },
  appliedCash: {
    id: `${scope}.appliedCash`,
    defaultMessage: 'Applied cash',
  },
  maxCash: {
    id: `${scope}.maxCash`,
    defaultMessage: 'Max cash',
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
