/*
 *
 * OrderDetail reducer
 *
 */
import produce from 'immer';
import { get, unset } from 'lodash';
import {
  GET_SUCCESS,
  GET_FAIL,
  UPDATE_DATA_FIELD,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAIL,
  GET_STATUS_HISTORY_SUCCESS,
  GET_STATUS_HISTORY_FAIL,
} from './constants';

export const initialState = {
  orderDetail: {},
  dataUpdate: {},
  refreshData: false,
  statusHistory: [],
  error: {},
};

const orderDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SUCCESS: {
        const cloneDraft = draft;
        const order = get(action, 'payload.data');
        cloneDraft.orderDetail = order;
        cloneDraft.dataUpdate = {
          orderId: order.orderId,
          status: order.status,
          note: order.note,
        };
        cloneDraft.refreshData = false;
        break;
      }
      case GET_STATUS_HISTORY_FAIL:
      case GET_FAIL:
      case UPDATE_STATUS_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        const removeField = get(action, 'payload.removeField');
        if (removeField) {
          unset(cloneDraft.dataUpdate, removeField);
        } else {
          cloneDraft.dataUpdate = {
            ...cloneDraft.dataUpdate,
            ...get(action, 'payload'),
          };
        }
        break;
      }
      case UPDATE_STATUS_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refreshData = true;
        break;
      }
      case GET_STATUS_HISTORY_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.statusHistory = get(action, 'payload.data');
        break;
      }
      default:
        break;
    }
  });

export default orderDetailReducer;
