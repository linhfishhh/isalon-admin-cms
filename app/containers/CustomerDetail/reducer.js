/*
 *
 * CustomerDetail reducer
 *
 */

import produce from 'immer';
import { get, unset } from 'lodash';
import {
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAIL,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  CLEAN_DATA,
  GET_WALLET_SUCCESS,
  UPDATE_WALLET_SUCCESS,
  GET_WALLET_TRANSACTIONS_SUCCESS,
  GET_USER_ADDRESS_SUCCESS,
  GET_ADDRESS_DETAIL_SUCCESS,
  CLEAR_ADDRESS_DETAIL,
} from './constants';

export const initialState = {
  profile: {},
  orderList: [],
  orderPaging: {},
  error: {},
  wallet: {},
  transactions: [],
  transactionsPaging: {},
  addresses: [],
  addressDetail: {},
};

const customerDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_ORDER_LIST_SUCCESS: {
        cloneDraft.orderList = get(action, 'payload.data.content');
        cloneDraft.orderPaging = get(action, 'payload.data');
        unset(cloneDraft.orderPaging, 'content');
        break;
      }
      case GET_PROFILE_SUCCESS: {
        cloneDraft.profile = get(action, 'payload.data');
        break;
      }
      case GET_ORDER_LIST_FAIL:
      case GET_PROFILE_FAIL: {
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case CLEAN_DATA: {
        cloneDraft.profile = {};
        cloneDraft.orderList = [];
        cloneDraft.orderPaging = {};
        cloneDraft.error = {};
        cloneDraft.wallet = {};
        cloneDraft.transactions = [];
        cloneDraft.transactionsPaging = {};
        cloneDraft.addresses = [];
        break;
      }
      case GET_WALLET_SUCCESS:
      case UPDATE_WALLET_SUCCESS: {
        cloneDraft.wallet = get(action, 'payload.data', {});
        break;
      }
      case GET_WALLET_TRANSACTIONS_SUCCESS: {
        cloneDraft.transactions = get(action, 'payload.data.content', []);
        cloneDraft.transactionsPaging = get(action, 'payload.data', {});
        unset(cloneDraft.transactionsPaging, 'content');
        break;
      }
      case GET_USER_ADDRESS_SUCCESS: {
        cloneDraft.addresses = get(action, 'payload.data', []);
        break;
      }
      case GET_ADDRESS_DETAIL_SUCCESS: {
        cloneDraft.addressDetail = get(action, 'payload.data', {});
        break;
      }
      case CLEAR_ADDRESS_DETAIL: {
        cloneDraft.addressDetail = {};
        break;
      }
      default:
        break;
    }
  });

export default customerDetailReducer;
