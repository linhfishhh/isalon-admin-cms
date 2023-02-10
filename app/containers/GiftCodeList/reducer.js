/*
 *
 * Brand reducer
 *
 */
import produce from 'immer';
import { get, unset, forEach, keysIn } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
  GET_SUCCESS,
  GET_FAIL,
  ADD_SUCCESS,
  ADD_FAIL,
  EDIT_SUCCESS,
  EDIT_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  GENERATE_SUCCESS,
  GENERATE_FAIL,
  UPDATE_DATA_FIELD,
  CLEAN_DATA_EDIT,
} from './constants';

export const initialState = {
  giftCode: { code: '', isPublic: false },
  giftCodeList: [],
  paging: {},
  refreshData: false,
  error: {},
};

const giftCodeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.giftCodeList = get(action, 'payload.data.content');
        cloneDraft.paging = get(action, 'payload.data');
        unset(cloneDraft.paging, 'content');
        cloneDraft.refreshData = false;
        break;
      }
      case GET_LIST_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        cloneDraft.refreshData = false;
        break;
      }
      case GET_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.giftCode = get(action, 'payload.data');
        break;
      }
      case GET_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case ADD_SUCCESS:
      case EDIT_SUCCESS:
      case DELETE_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refreshData = true;
        break;
      }
      case ADD_FAIL:
      case EDIT_FAIL:
      case DELETE_FAIL:
      case GENERATE_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case GENERATE_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.giftCode.code = get(action, 'payload.data.code');
        break;
      }
      case CLEAN_DATA_EDIT: {
        const cloneDraft = draft;
        cloneDraft.giftCode = initialState.giftCode;
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        const removeField = get(action, 'payload.removeField');
        const dataField = get(action, 'payload.dataField');
        if (removeField.length) {
          forEach(removeField, field => unset(cloneDraft.giftCode, field));
        }
        if (dataField) {
          cloneDraft.giftCode = {
            ...cloneDraft.giftCode,
            ...dataField,
          };
        }
        break;
      }
      case LOCATION_CHANGE: {
        const cloneDraft = draft;
        forEach(keysIn(cloneDraft), key => {
          cloneDraft[key] = initialState[key];
        });
        break;
      }
      default:
        break;
    }
  });

export default giftCodeReducer;
