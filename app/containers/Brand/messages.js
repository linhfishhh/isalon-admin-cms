/*
 * Brand Messages
 *
 * This contains all the text for the Brand container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Brand';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Brand',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Brand name',
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: 'Add brand',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit brand',
  },
  list: {
    id: `${scope}.list`,
    defaultMessage: 'Brand List',
  },
  nameIsRequired: {
    id: `${scope}.nameIsRequired`,
    defaultMessage: 'Please enter brand name',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this brand?',
  },
});
