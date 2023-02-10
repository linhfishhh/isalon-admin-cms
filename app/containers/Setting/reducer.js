/*
 *
 * Setting reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { GET_CFG_SUCCESS, GET_SHOP_CFG_SUCCESS } from './constants';

export const initialState = {
  settings: [],
  shopSettings: [],
};

/* eslint-disable default-case, no-param-reassign */
const settingReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_CFG_SUCCESS: {
        cloneDraft.settings = get(action, 'payload.data', []);
        break;
      }
      case GET_SHOP_CFG_SUCCESS: {
        cloneDraft.shopSettings = get(action, 'payload.data', []);
        break;
      }
    }
  });

export default settingReducer;
