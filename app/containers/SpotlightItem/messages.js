/*
 * SpotlightItem Messages
 *
 * This contains all the text for the SpotlightItem container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SpotlightItem';

export default defineMessages({
  add: {
    id: `${scope}.add`,
    defaultMessage: 'Add widget',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit widget',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  url: {
    id: `${scope}.url`,
    defaultMessage: 'Link',
  },
  nameIsRequired: {
    id: `${scope}.nameIsRequired`,
    defaultMessage: 'Please enter name',
  },
  typeIsRequired: {
    id: `${scope}.typeIsRequired`,
    defaultMessage: 'Please select type',
  },
  categoryIsRequired: {
    id: `${scope}.categoryIsRequired`,
    defaultMessage: 'Please select category',
  },
  urlIsRequired: {
    id: `${scope}.urlIsRequired`,
    defaultMessage: 'Please enter link',
  },
});
