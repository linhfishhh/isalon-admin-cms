/*
 *
 * SpotlightItem actions
 *
 */

import { createSingleAction, createSideEffectAction } from 'utils/reduxHelper';
import {
  GET,
  ADD,
  EDIT,
  UPDATE_DATA_FIELD,
  CLEAN_DATA_EDIT,
} from './constants';

export const [getRequest, getSuccess, getFail] = createSideEffectAction(GET);

export const [addRequest, addSuccess, addFail] = createSideEffectAction(ADD);

export const [editRequest, editSuccess, editFail] = createSideEffectAction(
  EDIT,
);

export const cleanDataEditAction = createSingleAction(CLEAN_DATA_EDIT);
export const updateDataField = createSingleAction(UPDATE_DATA_FIELD);
