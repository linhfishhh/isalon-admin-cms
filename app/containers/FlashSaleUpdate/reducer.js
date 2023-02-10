/*
 *
 * FlashSaleUpdate reducer
 *
 */
import produce from 'immer';
import { get, forEach, keysIn } from 'lodash';
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
  flashSale: {
    name: '',
    images: [],
    startAt: Date.now(),
    expiredAt: Date.now(),
  },
  error: {},
  shouldUpdate: false,
};

const flashSaleUpdateReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_FAIL:
      case EDIT_FAIL:
      case GET_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case GET_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.shouldUpdate = true;
        cloneDraft.flashSale = {
          ...initialState.flashSale,
          ...get(action, 'payload.data'),
        };
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        cloneDraft.flashSale = {
          ...cloneDraft.flashSale,
          ...get(action, 'payload'),
        };
        break;
      }
      case ADD_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.shouldUpdate = true;
        cloneDraft.flashSale = {
          ...initialState.flashSale,
          ...get(action, 'payload.data'),
        };
        break;
      }

      case EDIT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.shouldUpdate = true;
        cloneDraft.flashSale = {
          ...state.flashSale,
          ...get(action, 'payload.data'),
        };
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

export default flashSaleUpdateReducer;
