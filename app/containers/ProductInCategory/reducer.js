/*
 *
 * ProductInCategory reducer
 *
 */
import produce from 'immer';
import { get, unset, forEach, keysIn } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
  GET_LIST_PRODUCT_SUCCESS,
  GET_LIST_PRODUCT_FAIL,
  GET_LIST_CATEGORY_SUCCESS,
  GET_LIST_CATEGORY_FAIL,
  ADD_SUCCESS,
  ADD_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  GET_CATEGORY_INFO_SUCCESS,
} from './constants';

export const initialState = {
  categoryInfo: {},
  productInCategoryList: [],
  paging: {},
  productList: [],
  productPaging: {},
  categoryList: [],
  refreshData: false,
  error: {},
};

const productInCategoryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.productInCategoryList = get(action, 'payload.data.content');
        cloneDraft.paging = get(action, 'payload.data');
        unset(cloneDraft.paging, 'content');
        cloneDraft.refreshData = false;
        break;
      }
      case GET_LIST_PRODUCT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.productList = get(action, 'payload.data.content');
        cloneDraft.productPaging = get(action, 'payload.data');
        unset(cloneDraft.productPaging, 'content');
        break;
      }

      case GET_LIST_CATEGORY_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.categoryList = get(action, 'payload.data.content');
        break;
      }

      case GET_LIST_CATEGORY_FAIL:
      case GET_LIST_PRODUCT_FAIL:
      case GET_LIST_FAIL:
      case ADD_FAIL:
      case DELETE_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        cloneDraft.refreshData = false;
        break;
      }
      case ADD_SUCCESS:
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
      case GET_CATEGORY_INFO_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.categoryInfo = get(action, 'payload.data', {});
        break;
      }
      default:
        break;
    }
  });

export default productInCategoryReducer;
