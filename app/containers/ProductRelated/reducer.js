/*
 *
 * ProductRelated reducer
 *
 */
import produce from 'immer';
import { get, unset, forEach, keysIn } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
  ADD_SUCCESS,
  ADD_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  SET_PRODUCT_RELATED,
} from './constants';

export const initialState = {
  productRelated: [],
  productNoRelated: [],
  paging: {},
  refreshData: false,
  error: {},
};

const productRelatedReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.productNoRelated = get(action, 'payload.data.content');
        cloneDraft.paging = get(action, 'payload.data');
        unset(cloneDraft.paging, 'content');
        cloneDraft.refreshData = false;
        break;
      }
      case ADD_FAIL:
      case DELETE_FAIL:
      case GET_LIST_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        cloneDraft.refreshData = false;
        break;
      }
      case SET_PRODUCT_RELATED: {
        const cloneDraft = draft;
        cloneDraft.productRelated = get(action, 'payload');
        break;
      }
      case ADD_SUCCESS: {
        const cloneDraft = draft;
        const relatedProduct = get(action, 'payload.productSelect');
        cloneDraft.productRelated = cloneDraft.productRelated.concat(
          relatedProduct,
        );
        cloneDraft.refreshData = true;
        break;
      }
      case DELETE_SUCCESS: {
        const cloneDraft = draft;
        const relatedProductId = get(action, 'payload.relatedProductId');
        cloneDraft.productRelated = cloneDraft.productRelated.filter(
          item => item.productId !== relatedProductId,
        );
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

export default productRelatedReducer;
