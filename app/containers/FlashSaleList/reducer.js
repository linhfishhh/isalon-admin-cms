/*
 *
 * FlashSaleList reducer
 *
 */
import produce from 'immer';
import { get, unset } from 'lodash';
import {
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
} from './constants';

export const initialState = {
  comboList: [],
  paging: {},
  refreshData: false,
  error: {},
};

const flashSaleListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.comboList = get(action, 'payload.data.content');
        cloneDraft.paging = get(action, 'payload.data');
        unset(cloneDraft.paging, 'content');
        cloneDraft.refreshData = false;
        break;
      }
      case GET_LIST_FAIL: {
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
      case DELETE_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      default:
        break;
    }
  });

export default flashSaleListReducer;
