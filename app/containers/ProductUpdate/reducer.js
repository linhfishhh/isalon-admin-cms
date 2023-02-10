/*
 *
 * ProductUpdate reducer
 *
 */
import produce from 'immer';
import { get, unset, forEach, keysIn } from 'lodash';
import {
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_FAIL,
  GET_BRAND_LIST_SUCCESS,
  GET_BRAND_LIST_FAIL,
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
  product: {
    name: '',
    sku: '',
    description: '',
    categories: [],
    isAvailable: false,
    quantity: '',
    price: {},
    productVariants: [],
    images: [],
    productTags: [],
  },
  categoryList: [],
  brandList: [],
  error: {},
  shouldUpdate: false,
};

const productUpdateReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_CATEGORY_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.categoryList = get(action, 'payload.data.content');
        break;
      }
      case GET_CATEGORY_LIST_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case GET_BRAND_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.brandList = get(action, 'payload.data.content');
        break;
      }
      case GET_BRAND_LIST_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case GET_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.shouldUpdate = true;
        cloneDraft.product = get(action, 'payload.data');
        break;
      }
      case GET_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        const removeField = get(action, 'payload.removeField');
        const dataField = get(action, 'payload.dataField');
        if (removeField.length) {
          forEach(removeField, field => unset(cloneDraft.product, field));
        }
        if (dataField) {
          cloneDraft.product = {
            ...cloneDraft.product,
            ...dataField,
          };
        }
        break;
      }
      case ADD_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.shouldUpdate = true;
        cloneDraft.product = get(action, 'payload.data');
        break;
      }
      case ADD_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case EDIT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.shouldUpdate = true;
        cloneDraft.product = get(action, 'payload.data');
        break;
      }
      case EDIT_FAIL: {
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

export default productUpdateReducer;
