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
  UPDATE_DATA_FIELD,
  CLEAN_DATA_EDIT,
} from './constants';

export const initialState = {
  brand: { name: '', images: [] },
  brandList: [],
  paging: {},
  refreshData: false,
  error: {},
};

const responseToBrand = data => {
  const brand = {};
  brand.brandId = data.brandId;
  brand.name = data.name;
  brand.imageId = data.imageId;
  brand.images = data.images || [];
  return brand;
};

const brandReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.brandList = get(action, 'payload.data.content');
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
        cloneDraft.brand = responseToBrand(get(action, 'payload.data'));
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
      case DELETE_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case CLEAN_DATA_EDIT: {
        const cloneDraft = draft;
        cloneDraft.brand = initialState.brand;
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        cloneDraft.brand = { ...cloneDraft.brand, ...get(action, 'payload') };
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

export default brandReducer;
