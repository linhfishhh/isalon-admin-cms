/* eslint-disable no-param-reassign */
/*
 *
 * SignIn reducer
 *
 */
import produce from 'immer';
import { handleActions } from 'redux-actions';
import { get } from 'lodash';
import { isAuthenticated } from 'utils/auth';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
} from './constants';

export const initialState = {
  loginStatus: isAuthenticated(),
  profile: {},
  error: {},
};

const authReducer = {
  [LOGIN_REQUEST]: state =>
    produce(state, draft => {
      draft.loginStatus = false;
    }),
  [LOGIN_SUCCESS]: state =>
    produce(state, draft => {
      draft.error = {};
    }),
  [LOGIN_FAIL]: (state, action) =>
    produce(state, draft => {
      draft.error = get(action, 'payload', '');
    }),
  [GET_PROFILE_SUCCESS]: (state, action) =>
    produce(state, draft => {
      draft.profile = get(action, 'payload', {});
      draft.error = {};
      draft.loginStatus = true;
    }),
  [GET_PROFILE_FAIL]: state =>
    produce(state, draft => {
      draft.profile = {};
    }),
};

export default handleActions(
  {
    ...authReducer,
  },
  initialState,
);
