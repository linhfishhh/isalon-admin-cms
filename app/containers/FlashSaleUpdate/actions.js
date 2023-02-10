/*
 *
 * FlashSaleUpdate actions
 *
 */

import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import { ADD, GET, EDIT, UPDATE_DATA_FIELD, CLEAN_DATA } from './constants';

export const [addRequest, addSuccess, addFail] = createSideEffectAction(ADD);
export const [getRequest, getSuccess, getFail] = createSideEffectAction(GET);
export const [editRequest, editSuccess, editFail] = createSideEffectAction(
  EDIT,
);

export const updateDataField = createSingleAction(UPDATE_DATA_FIELD);
export const cleanDataAction = createSingleAction(CLEAN_DATA);
