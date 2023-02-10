/*
 *
 * ProductVariantList reducer
 *
 */
import produce from 'immer';
import { get, unset, forEach, keysIn } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
  ADD_SUCCESS,
  // ADD_FAIL,
  EDIT_SUCCESS,
  // EDIT_FAIL,
  DELETE_SUCCESS,
  // DELETE_FAIL,
} from './constants';

export const initialState = {
  productVariantList: [],
  paging: {},
  refreshData: false,
  error: {},
};

const productVariantListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.productVariantList = get(action, 'payload.data.content');
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

      case ADD_SUCCESS:
      case EDIT_SUCCESS:
      case DELETE_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refreshData = true;
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

export default productVariantListReducer;
