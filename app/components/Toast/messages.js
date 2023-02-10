/*
 * Toast Messages
 *
 * This contains all the text for the Toaster component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Toast';

export default defineMessages({
  success: {
    id: `${scope}.success`,
    defaultMessage: 'successful',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'Error',
  },
  fail: {
    id: `${scope}.fail`,
    defaultMessage: 'Failure',
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: 'Add new',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
  userOrPasswordIncorrect: {
    id: `${scope}.invalidUserOrPassword`,
    defaultMessage: 'The user or password is incorrect',
  },
  networkError: {
    id: `${scope}.networkError`,
    defaultMessage: 'Network error, please check your connection',
  },
  internalServerError: {
    id: `${scope}.internalServerError`,
    defaultMessage: 'Internal server error',
  },
  pushnotification: {
    id: `${scope}.pushnotification`,
    defaultMessage: 'Push notification',
  },
});
