/*
 *
 * CustomerList constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/SALON_LIST';

export const GET_LIST = `${CONTEXT}/GET_LIST`;
export const SEARCH = `${CONTEXT}/SEARCH`;

export const [
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
] = createActionType(GET_LIST);

export const [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAIL] = createActionType(
  SEARCH,
);

export const LOADING_ACTION_TYPES = [GET_LIST, SEARCH];
