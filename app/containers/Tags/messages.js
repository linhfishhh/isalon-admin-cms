/*
 * Tags Messages
 *
 * This contains all the text for the Tags container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Tags';

export default defineMessages({
  tagIsRequired: {
    id: `${scope}.tagIsRequired`,
    defaultMessage: 'Please enter name',
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure delete this tag?',
  },
});
