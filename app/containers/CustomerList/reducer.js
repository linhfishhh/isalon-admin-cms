/*
 *
 * CustomerList reducer
 *
 */
import produce from 'immer';
import { get, unset, compact } from 'lodash';
import {
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
  GET_ORDERED_LIST_SUCCESS,
  GET_ORDERED_LIST_FAIL,
  SEARCH_SUCCESS,
} from './constants';

export const initialState = {
  customerList: [],
  paging: {},
  customerOrderedList: [],
  orderedPaging: {},
  error: {},
};

const customerReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        cloneDraft.customerList = get(action, 'payload.data.content');
        cloneDraft.paging = get(action, 'payload.data');
        unset(cloneDraft.paging, 'content');
        break;
      }
      case GET_ORDERED_LIST_SUCCESS: {
        cloneDraft.customerOrderedList = compact(
          get(action, 'payload.data.content', []),
        );
        cloneDraft.orderedPaging = get(action, 'payload.data');
        unset(cloneDraft.orderedPaging, 'content');
        break;
      }
      case GET_ORDERED_LIST_FAIL:
      case GET_LIST_FAIL: {
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case SEARCH_SUCCESS: {
        cloneDraft.customerList = compact(get(action, 'payload.content', []));
        cloneDraft.paging = get(action, 'payload.paging');
        break;
      }
      default:
        break;
    }
  });

export default customerReducer;
