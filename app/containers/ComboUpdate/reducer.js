/*
 *
 * ComboUpdate reducer
 *
 */
import produce from 'immer';
import { get, unset, forEach, keysIn } from 'lodash';
import {
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
  GET_PRODUCT_COMBO_LIST_SUCCESS,
  GET_PRODUCT_COMBO_LIST_FAIL,
  ADD_SUCCESS,
  ADD_FAIL,
  GET_SUCCESS,
  GET_FAIL,
  EDIT_SUCCESS,
  EDIT_FAIL,
  UPDATE_DATA_FIELD,
  CLEAN_DATA,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAIL,
} from './constants';

export const initialState = {
  combo: {
    name: '',
    comboNumber: '',
    comboPercent: '',
    description: '',
    productIds: [],
  },
  productComboList: [],
  productComboPaging: {},
  productList: [],
  paging: {},
  error: {},
  shouldUpdate: false,
  refreshData: false,
};

const comboUpdateReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PRODUCT_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.productList = get(action, 'payload.data.content');
        cloneDraft.paging = get(action, 'payload.data');
        unset(cloneDraft.paging, 'content');
        break;
      }
      case GET_PRODUCT_COMBO_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.shouldUpdate = false;
        cloneDraft.refreshData = false;
        cloneDraft.productComboList = get(action, 'payload.data.content');
        cloneDraft.productComboPaging = get(action, 'payload.data');
        unset(cloneDraft.productComboPaging, 'content');
        break;
      }
      case GET_PRODUCT_COMBO_LIST_FAIL:
      case GET_PRODUCT_LIST_FAIL:
      case ADD_FAIL:
      case EDIT_FAIL:
      case GET_FAIL:
      case ADD_PRODUCT_FAIL:
      case REMOVE_PRODUCT_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case GET_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.shouldUpdate = true;
        cloneDraft.combo = {
          ...initialState.combo,
          ...get(action, 'payload.data'),
        };
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        cloneDraft.combo = {
          ...cloneDraft.combo,
          ...get(action, 'payload'),
        };
        break;
      }
      case ADD_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.shouldUpdate = true;
        cloneDraft.combo = {
          ...initialState.combo,
          ...get(action, 'payload.data'),
        };
        break;
      }

      case EDIT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.shouldUpdate = true;
        cloneDraft.combo = {
          ...state.combo,
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
      case REMOVE_PRODUCT_SUCCESS:
      case ADD_PRODUCT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refreshData = true;
        break;
      }
      default:
        break;
    }
  });

export default comboUpdateReducer;
