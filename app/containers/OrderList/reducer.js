/*
 *
 * OrderList reducer
 *
 */
import produce from 'immer';
import { get, unset } from 'lodash';
import { GET_LIST_SUCCESS, GET_LIST_FAIL } from './constants';

export const initialState = {
  orderList: [],
  paging: {},
  refreshData: false,
  error: {},
};

const orderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.orderList = get(action, 'payload.data.content');
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
      default:
        break;
    }
  });

export default orderReducer;
