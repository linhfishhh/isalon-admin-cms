/*
 *
 * Spotlight reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import {
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_FAIL,
  GET_ITEM_LIST_SUCCESS,
  GET_ITEM_LIST_FAIL,
  CHANGE_ORDER_REQUEST,
  CHANGE_ORDER_FAIL,
  DELETE_SUCCESS,
} from './constants';

export const initialState = {
  spotlightList: [],
  spotlightItemList: {},
  categoryList: [],
  refreshData: false,
  error: {},
};

const spotlightReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.spotlightList = get(action, 'payload.data.content');
        break;
      }
      case GET_CATEGORY_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.categoryList = get(action, 'payload.data.content');
        break;
      }
      case GET_ITEM_LIST_SUCCESS: {
        const cloneDraft = draft;
        const spotlightId = get(action, 'payload.spotlightId');
        cloneDraft.spotlightItemList = {
          ...cloneDraft.spotlightItemList,
          ...{ [spotlightId]: get(action, 'payload.data') },
        };
        cloneDraft.refreshData = false;
        break;
      }
      case CHANGE_ORDER_REQUEST: {
        const cloneDraft = draft;
        const spotlightId = get(action, 'payload.spotlightId');
        cloneDraft.spotlightItemList = {
          ...cloneDraft.spotlightItemList,
          ...{ [spotlightId]: get(action, 'payload.listNewOrder') },
        };
        break;
      }
      case CHANGE_ORDER_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        cloneDraft.refreshData = true;
        break;
      }
      case DELETE_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refreshData = true;
        break;
      }
      case GET_CATEGORY_LIST_FAIL:
      case GET_LIST_FAIL:
      case GET_ITEM_LIST_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        cloneDraft.refreshData = false;
        break;
      }
      default:
        break;
    }
  });

export default spotlightReducer;
