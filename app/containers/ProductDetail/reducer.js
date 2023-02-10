/*
 *
 * ProductDetail reducer
 *
 */
import produce from 'immer';
import { get, forEach, keysIn } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  GET_SUCCESS,
  GET_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
} from './constants';

export const initialState = {
  product: {},
  deleteSuccess: false,
  error: {},
};

const productDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.product = {
          ...initialState.product,
          ...get(action, 'payload.data'),
        };
        break;
      }
      case DELETE_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.deleteSuccess = true;
        break;
      }
      case DELETE_FAIL:
      case GET_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
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

export default productDetailReducer;
