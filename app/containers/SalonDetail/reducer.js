/*
 *
 * CustomerDetail reducer
 *
 */

import produce from 'immer';
import { get, unset } from 'lodash';
import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  CLEAR_DATA,
  GET_WALLET_SUCCESS,
  UPDATE_WALLET_SUCCESS,
  GET_WALLET_TRANSACTIONS_SUCCESS,
} from './constants';

export const initialState = {
  profile: {},
  paging: {},
  error: {},
  wallet: {},
  transactions: [],
};

const customerDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_PROFILE_SUCCESS: {
        cloneDraft.profile = get(action, 'payload', {});
        break;
      }
      case GET_PROFILE_FAIL: {
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case CLEAR_DATA: {
        cloneDraft.profile = {};
        cloneDraft.paging = {};
        cloneDraft.error = {};
        cloneDraft.wallet = {};
        break;
      }
      case GET_WALLET_SUCCESS:
      case UPDATE_WALLET_SUCCESS: {
        cloneDraft.wallet = get(action, 'payload.data', {});
        break;
      }
      case GET_WALLET_TRANSACTIONS_SUCCESS: {
        cloneDraft.transactions = get(action, 'payload.data.content', []);
        cloneDraft.paging = get(action, 'payload.data', {});
        unset(cloneDraft.paging, 'content');
        break;
      }
      default:
        break;
    }
  });

export default customerDetailReducer;
