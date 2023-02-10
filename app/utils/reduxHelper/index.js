import { createAction } from 'redux-actions';

// Suffix for redux action base on flow REQUEST -> SUCCESS | FAIL
const [REQUEST_SUFFIX, SUCCESS_SUFFIX, FAIL_SUFFIX] = [
  'REQUEST',
  'SUCCESS',
  'FAIL',
];

export const [
  ACTION_TYPE_REQUEST_SUFFIX,
  ACTION_TYPE_SUCCESS_SUFFIX,
  ACTION_TYPE_FAIL_SUFFIX,
] = [
  REQUEST_SUFFIX,
  `${REQUEST_SUFFIX}_${SUCCESS_SUFFIX}`,
  `${REQUEST_SUFFIX}_${FAIL_SUFFIX}`,
];

function createActionType(type) {
  return [
    `${type}_${ACTION_TYPE_REQUEST_SUFFIX}`,
    `${type}_${ACTION_TYPE_SUCCESS_SUFFIX}`,
    `${type}_${ACTION_TYPE_FAIL_SUFFIX}`,
  ];
}

function createSingleAction(type) {
  return createAction(type);
}

function createSideEffectAction(type) {
  return [
    createAction(`${type}_${ACTION_TYPE_REQUEST_SUFFIX}`),
    createAction(`${type}_${ACTION_TYPE_SUCCESS_SUFFIX}`),
    createAction(`${type}_${ACTION_TYPE_FAIL_SUFFIX}`),
  ];
}

export { createActionType, createSingleAction, createSideEffectAction };
