/*
 *
 * GiftPackageUpdate reducer
 *
 */
import produce from 'immer';
import { get, unset, forEach, keysIn } from 'lodash';
import {
  ADD_SUCCESS,
  ADD_FAIL,
  GET_SUCCESS,
  GET_FAIL,
  EDIT_SUCCESS,
  EDIT_FAIL,
  UPDATE_DATA_FIELD,
  CLEAN_DATA,
} from './constants';

export const initialState = {
  giftPackage: {
    startAt: null,
    expiredAt: null,
    images: [],
  },
  shouldUpdate: false,
  error: {},
};

const giftPackageUpdateReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.shouldUpdate = true;
        cloneDraft.giftPackage = {
          ...initialState.giftPackage,
          ...get(action, 'payload.data'),
        };
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        const removeField = get(action, 'payload.removeField');
        const dataField = get(action, 'payload.dataField');
        if (removeField.length) {
          forEach(removeField, field => unset(cloneDraft.giftPackage, field));
        }
        if (dataField) {
          cloneDraft.giftPackage = {
            ...cloneDraft.giftPackage,
            ...dataField,
          };
        }
        break;
      }
      case ADD_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.shouldUpdate = true;
        cloneDraft.giftPackage = {
          ...initialState.giftPackage,
          ...get(action, 'payload.data'),
        };
        break;
      }

      case EDIT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.giftPackage = {
          ...state.giftPackage,
          ...get(action, 'payload.data'),
        };
        break;
      }
      case ADD_FAIL:
      case EDIT_FAIL:
      case GET_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case CLEAN_DATA: {
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

export default giftPackageUpdateReducer;
