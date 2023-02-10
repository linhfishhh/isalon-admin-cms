/*
 *
 * FlashSaleUpdatePrice reducer
 *
 */
import produce from 'immer';
import { get, forEach, keysIn } from 'lodash';
import {
  GET_LIST_PRODUCT_VARIANT_SUCCESS,
  GET_LIST_PRODUCT_VARIANT_FAIL,
  GET_SUCCESS,
  GET_FAIL,
  ADD_SUCCESS,
  ADD_FAIL,
  EDIT_SUCCESS,
  EDIT_FAIL,
  UPDATE_DATA_FIELD,
  CLEAN_DATA,
} from './constants';

export const initialState = {
  productVariant: [],
  flashSalePrice: {},
  updated: false,
  error: {},
};

const flashSaleUpdatePriceReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_PRODUCT_VARIANT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.productVariant = get(action, 'payload.data');
        break;
      }
      case GET_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.flashSalePrice = get(action, 'payload.data');
        break;
      }
      case GET_LIST_PRODUCT_VARIANT_FAIL:
      case GET_FAIL:
      case ADD_FAIL:
      case EDIT_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case ADD_SUCCESS:
      case EDIT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.updated = true;
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        cloneDraft.flashSalePrice = {
          ...cloneDraft.flashSalePrice,
          ...get(action, 'payload'),
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

export default flashSaleUpdatePriceReducer;
