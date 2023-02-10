/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotFoundPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Page not found.',
  },
  pageRemove: {
    id: `${scope}.pageRemove`,
    defaultMessage: 'The page you are looking for might have been removed.',
  },
  returnToWebsite: {
    id: `${scope}.returnToWebsite`,
    defaultMessage: 'Return to website',
  },
});
