/*
 * GiftCodeList Messages
 *
 * This contains all the text for the GiftCodeList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.GiftCodeList';

export default defineMessages({
  list: {
    id: `${scope}.list`,
    defaultMessage: 'Gift code List',
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: 'Add gift code',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit gift code',
  },
  code: {
    id: `${scope}.code`,
    defaultMessage: 'Gift code',
  },
  codeIsRequired: {
    id: `${scope}.codeIsRequired`,
    defaultMessage: 'Please enter gift code',
  },
  quantity: {
    id: `${scope}.quantity`,
    defaultMessage: 'Quantity',
  },
  maxUsedPerUser: {
    id: `${scope}.maxUsedPerUser`,
    defaultMessage: 'Max used per user',
  },
  isPublic: {
    id: `${scope}.isPublic`,
    defaultMessage: 'Public',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this gift code?',
  },
  prefix: {
    id: `${scope}.prefix`,
    defaultMessage: 'Prefix',
  },
});
