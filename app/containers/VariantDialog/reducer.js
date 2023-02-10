/*
 *
 * VariantDialog reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import {
  ADD_SUCCESS,
  ADD_FAIL,
  EDIT_SUCCESS,
  EDIT_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  ADD_VALUE_SUCCESS,
  ADD_VALUE_FAIL,
  EDIT_VALUE_SUCCESS,
  EDIT_VALUE_FAIL,
  DELETE_VALUE_SUCCESS,
  DELETE_VALUE_FAIL,
  DID_REFRESH,
} from './constants';

export const initialState = {
  refresh: false,
  error: {},
};

const variantDialogReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_SUCCESS:
      case EDIT_SUCCESS:
      case DELETE_SUCCESS:
      case ADD_VALUE_SUCCESS:
      case EDIT_VALUE_SUCCESS:
      case DELETE_VALUE_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refresh = true;
        break;
      }
      case ADD_FAIL:
      case EDIT_FAIL:
      case DELETE_FAIL:
      case ADD_VALUE_FAIL:
      case EDIT_VALUE_FAIL:
      case DELETE_VALUE_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case DID_REFRESH: {
        const cloneDraft = draft;
        cloneDraft.refresh = false;
        break;
      }
      default:
        break;
    }
  });

export default variantDialogReducer;
