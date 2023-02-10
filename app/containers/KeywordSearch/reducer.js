/*
 *
 * KeywordSearch reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import {
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
  GET_TOP_KEYWORD_SEARCH_SUCCESS,
  GET_TOP_KEYWORD_SEARCH_FAIL,
  ADD_SUCCESS,
  ADD_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  UPDATE_DATA_FIELD,
  CLEAN_DATA,
} from './constants';

export const initialState = {
  keywordSearch: { hotKeyword: '' },
  keywordSearchList: [],
  topKeywordSearchList: [],
  refreshData: false,
  error: {},
};

const keywordSearchReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.keywordSearchList = get(action, 'payload.data');
        cloneDraft.refreshData = false;
        break;
      }

      case GET_TOP_KEYWORD_SEARCH_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.topKeywordSearchList = get(action, 'payload.data').map(
          (item, index) => ({ id: index, name: item }),
        );
        break;
      }

      case ADD_SUCCESS:
      case UPDATE_ORDER_SUCCESS:
      case DELETE_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refreshData = true;
        break;
      }
      case GET_LIST_FAIL:
      case GET_TOP_KEYWORD_SEARCH_FAIL:
      case ADD_FAIL:
      case UPDATE_ORDER_FAIL:
      case DELETE_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        cloneDraft.refreshData = false;
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        cloneDraft.keywordSearch = {
          ...cloneDraft.keywordSearch,
          ...get(action, 'payload'),
        };
        break;
      }
      case UPDATE_ORDER_REQUEST: {
        const cloneDraft = draft;
        cloneDraft.keywordSearchList = get(action, 'payload.data');
        break;
      }
      case CLEAN_DATA: {
        const cloneDraft = draft;
        cloneDraft.keywordSearch = initialState.keywordSearch;
        break;
      }
      default:
        break;
    }
  });

export default keywordSearchReducer;
