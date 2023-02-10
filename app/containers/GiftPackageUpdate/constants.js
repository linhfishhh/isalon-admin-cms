/*
 *
 * GiftPackageUpdate constants
 *
 */

import { createActionType } from 'utils/reduxHelper';

export const CONTEXT = 'STG/GIFT_PACKAGE_UPDATE';

export const ADD = `${CONTEXT}/ADD`;
export const GET = `${CONTEXT}/GET`;
export const EDIT = `${CONTEXT}/EDIT`;

export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAIL] = createActionType(ADD);
export const [GET_REQUEST, GET_SUCCESS, GET_FAIL] = createActionType(GET);
export const [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAIL] = createActionType(EDIT);

export const LOADING_ACTION_TYPES = [GET, ADD, EDIT];
export const TOAST_ACTION_TYPES = [ADD, EDIT];

export const UPDATE_DATA_FIELD = `${CONTEXT}/UPDATE_DATA_FIELD`;
export const CLEAN_DATA = `${CONTEXT}/CLEAN_DATA`;
