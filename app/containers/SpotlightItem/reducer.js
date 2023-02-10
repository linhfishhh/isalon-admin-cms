/*
 *
 * SpotlightItem reducer
 *
 */
import produce from 'immer';
import { get, unset, forEach } from 'lodash';
import {
  GET_SUCCESS,
  GET_FAIL,
  ADD_SUCCESS,
  ADD_FAIL,
  EDIT_SUCCESS,
  EDIT_FAIL,
  UPDATE_DATA_FIELD,
  CLEAN_DATA_EDIT,
} from './constants';

export const initialState = {
  spotlightItem: {
    name: '',
    type: '',
    banners: [],
  },
  refreshData: false,
  error: {},
};

const spotlightItemReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.spotlightItem = get(action, 'payload.data');
        break;
      }
      case ADD_SUCCESS:
      case EDIT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refreshData = true;
        break;
      }

      case GET_FAIL:
      case ADD_FAIL:
      case EDIT_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        cloneDraft.refreshData = false;
        break;
      }
      case CLEAN_DATA_EDIT: {
        const cloneDraft = draft;
        cloneDraft.spotlightItem = initialState.spotlightItem;
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        const removeField = get(action, 'payload.removeField');
        const dataField = get(action, 'payload.dataField');
        if (removeField.length) {
          forEach(removeField, field => unset(cloneDraft.spotlightItem, field));
        }
        if (dataField) {
          cloneDraft.spotlightItem = {
            ...cloneDraft.spotlightItem,
            ...dataField,
          };
        }
        break;
      }
      default:
        break;
    }
  });

export default spotlightItemReducer;
