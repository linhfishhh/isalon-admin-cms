/*
 * Category Messages
 *
 * This contains all the text for the Category container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Category';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Product Category',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Product category name',
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: 'Add product category',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit product category',
  },
  parents: {
    id: `${scope}.parents`,
    defaultMessage: 'Category parents',
  },
  list: {
    id: `${scope}.list`,
    defaultMessage: 'List category ',
  },
  nameIsRequired: {
    id: `${scope}.nameIsRequired`,
    defaultMessage: 'Please enter category name',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this category?',
  },
});
