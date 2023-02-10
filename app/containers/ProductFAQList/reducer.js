/*
 *
 * ProductReviewList reducer
 *
 */
import produce from 'immer';
import { get, unset } from 'lodash';
import {
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
  GET_SUCCESS,
  GET_FAIL,
  EDIT_SUCCESS,
  EDIT_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  CLEAN_DATA,
  UPDATE_DATA_FIELD,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
} from './constants';

export const initialState = {
  productFAQList: [],
  productFAQ: {},
  product: {},
  paging: {},
  refreshData: false,
  error: {},
};

const productFAQListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.productFAQList = get(action, 'payload.data.content');
        cloneDraft.paging = get(action, 'payload.data');
        unset(cloneDraft.paging, 'content');
        cloneDraft.refreshData = false;
        break;
      }
      case GET_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.productFAQ = get(action, 'payload.data');
        break;
      }
      case EDIT_SUCCESS:
      case DELETE_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refreshData = true;
        break;
      }
      case GET_PRODUCT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.product = get(action, 'payload.data');
        break;
      }

      case GET_LIST_FAIL:
      case GET_FAIL:
      case EDIT_FAIL:
      case DELETE_FAIL:
      case GET_PRODUCT_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        cloneDraft.refreshData = false;
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        const dataField = get(action, 'payload');
        cloneDraft.productFAQ = {
          ...cloneDraft.productFAQ,
          ...dataField,
        };
        break;
      }
      case CLEAN_DATA: {
        const cloneDraft = draft;
        cloneDraft.productFAQ = initialState.productFAQ;
        cloneDraft.product = initialState.product;
        break;
      }
      default:
        break;
    }
  });

export default productFAQListReducer;
