/*
 *
 * FlashSaleProductList reducer
 *
 */
import produce from 'immer';
import { get, unset } from 'lodash';
import {
  GET_LIST_PRODUCT_SUCCESS,
  GET_LIST_PRODUCT_FAIL,
  GET_LIST_PRODUCT_NOT_IN_SUCCESS,
  GET_LIST_PRODUCT_NOT_IN_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
} from './constants';

export const initialState = {
  productList: [],
  paging: {},
  productListNotIn: [],
  pagingNotIn: {},
  refreshData: false,
  error: {},
};

const flashSaleProductReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_PRODUCT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.productList = get(action, 'payload.data.content');
        cloneDraft.paging = get(action, 'payload.data');
        unset(cloneDraft.paging, 'content');
        cloneDraft.refreshData = false;
        break;
      }
      case GET_LIST_PRODUCT_NOT_IN_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.productListNotIn = get(action, 'payload.data.content');
        cloneDraft.pagingNotIn = get(action, 'payload.data');
        unset(cloneDraft.pagingNotIn, 'content');
        break;
      }
      case GET_LIST_PRODUCT_FAIL:
      case GET_LIST_PRODUCT_NOT_IN_FAIL:
      case DELETE_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        cloneDraft.refreshData = false;
        break;
      }
      case DELETE_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refreshData = true;
        break;
      }
      default:
        break;
    }
  });

export default flashSaleProductReducer;
