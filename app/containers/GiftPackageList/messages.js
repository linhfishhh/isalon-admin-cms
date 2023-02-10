/*
 * GiftPackageList Messages
 *
 * This contains all the text for the GiftPackage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.GiftPackageList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Gift package list',
  },
  thumbnail: {
    id: `${scope}.thumbnail`,
    defaultMessage: 'Thumbnail',
  },
  percent: {
    id: `${scope}.percent`,
    defaultMessage: 'Percent',
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
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this gift package?',
  },
});
