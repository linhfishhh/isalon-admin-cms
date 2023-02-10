/*
 *
 * SignIn constants
 *
 */
import { createActionType } from 'utils/reduxHelper';
export const CONTEXT = 'STG/Auth';

export const LOGIN = `${CONTEXT}/LOGIN`;
export const GET_PROFILE = `${CONTEXT}/GET_PROFILE`;

export const [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL] = createActionType(
  LOGIN,
);

export const [
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
] = createActionType(GET_PROFILE);

export const LOADING_ACTION_TYPES = [LOGIN];
