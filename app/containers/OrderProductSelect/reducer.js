/*
 *
 * ProductList reducer
 *
 */
import produce from 'immer';
import { get, unset } from 'lodash';
import {
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
  GET_PRODUCT_VARIANT_LIST_SUCCESS,
  CLEAN_DATA,
} from './constants';

export const initialState = {
  productList: [],
  paging: {},
  error: {},
  productVariantList: [],
};

const productListReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_PRODUCT_LIST_SUCCESS: {
        cloneDraft.productList = get(action, 'payload.data.content');
        cloneDraft.paging = get(action, 'payload.data');
        unset(cloneDraft.paging, 'content');
        break;
      }
      case GET_PRODUCT_LIST_FAIL: {
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case GET_PRODUCT_VARIANT_LIST_SUCCESS: {
        cloneDraft.productVariantList = get(action, 'payload.data');
        break;
      }
      case CLEAN_DATA: {
        cloneDraft.productVariantList = [];
        break;
      }
      default:
        break;
    }
  });

export default productListReducer;
