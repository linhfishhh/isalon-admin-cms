/*
 * Table Messages
 *
 * This contains all the text for the Table component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Table';

export default defineMessages({
  selected: {
    id: `${scope}.selected`,
    defaultMessage: 'selected',
  },
  rowsPerPage: {
    id: `${scope}.rowsPerPage`,
    defaultMessage: 'selected',
  },
  of: {
    id: `${scope}.of`,
    defaultMessage: 'of',
  },
  noData: {
    id: `${scope}.noData`,
    defaultMessage: 'No data',
  },
});
