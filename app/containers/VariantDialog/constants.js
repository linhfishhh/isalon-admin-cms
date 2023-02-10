/*
 *
 * VariantDialog constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/VARIANT';

export const ADD = `${CONTEXT}/ADD`;
export const EDIT = `${CONTEXT}/EDIT`;
export const DELETE = `${CONTEXT}/DELETE`;

export const ADD_VALUE = `${CONTEXT}/ADD_VALUE`;
export const EDIT_VALUE = `${CONTEXT}/EDIT_VALUE`;
export const DELETE_VALUE = `${CONTEXT}/DELETE_VALUE`;

export const DID_REFRESH = `${CONTEXT}/DID_REFRESH`;

export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL] = createActionType(ADD);

export const [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAIL] = createActionType(EDIT);

export const [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAIL] = createActionType(
  DELETE,
);

export const [
  ADD_VALUE_REQUEST,
  ADD_VALUE_SUCCESS,
  ADD_VALUE_FAIL,
] = createActionType(ADD_VALUE);

export const [
  EDIT_VALUE_REQUEST,
  EDIT_VALUE_SUCCESS,
  EDIT_VALUE_FAIL,
] = createActionType(EDIT_VALUE);

export const [
  DELETE_VALUE_REQUEST,
  DELETE_VALUE_SUCCESS,
  DELETE_VALUE_FAIL,
] = createActionType(DELETE_VALUE);

export const LOADING_ACTION_TYPES = [
  ADD,
  EDIT,
  DELETE,
  ADD_VALUE,
  EDIT_VALUE,
  DELETE_VALUE,
];

export const TOAST_ACTION_TYPES = [
  ADD,
  EDIT,
  DELETE,
  ADD_VALUE,
  EDIT_VALUE,
  DELETE_VALUE,
];
