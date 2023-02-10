/*
 * SignIn Messages
 *
 * This contains all the text for the SignIn container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SignIn';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'SignIn',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Signin to your account to continue',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  signin: {
    id: `${scope}.signin`,
    defaultMessage: 'Sign in',
  },
  remember: {
    id: `${scope}.remember`,
    defaultMessage: 'Remember me',
  },
  forgot: {
    id: `${scope}.forgot`,
    defaultMessage: 'Forgot password',
  },
  usernameIsRequired: {
    id: `${scope}.usernameIsRequired`,
    defaultMessage: 'Please enter username',
  },
  passwordIsRequired: {
    id: `${scope}.passwordIsRequired`,
    defaultMessage: 'Please enter password',
  },
});
