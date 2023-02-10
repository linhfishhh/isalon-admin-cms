/*
 *
 * OrderUpdate reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import unset from 'lodash/unset';
import forEach from 'lodash/forEach';
import keysIn from 'lodash/keysIn';

import {
  GET_ORDER_SUCCESS,
  CLEAN_DATA,
  UPDATE_ORDER_DATA,
  CALCULATE_ORDER_SUCCESS,
} from './constants';

export const initialState = {
  order: {},
};

const orderUpdateReducer = (state = initialState, action) =>
  produce(state, draft => {
    const draftClone = draft;
    switch (action.type) {
      case GET_ORDER_SUCCESS: {
        draftClone.order = get(action, 'payload.data', {});
        draftClone.order.addressId = draftClone.order.profileAddressId;
        break;
      }
      case UPDATE_ORDER_DATA: {
        const removeField = get(action, 'payload.removeField', []);
        const dataUpdate = get(action, 'payload.dataUpdate');
        if (removeField.length) {
          forEach(removeField, field => unset(draftClone.order, field));
        }
        if (dataUpdate) {
          draftClone.order = {
            ...draftClone.order,
            ...dataUpdate,
          };
        }
        break;
      }
      case CALCULATE_ORDER_SUCCESS: {
        const subTotal = get(action, 'payload.data.subtotal', 0);
        const total = get(action, 'payload.data.total', 0);
        draftClone.order.subTotal = subTotal;
        draftClone.order.total = total;
        break;
      }
      case CLEAN_DATA: {
        forEach(keysIn(draftClone), key => {
          draftClone[key] = initialState[key];
        });
        break;
      }
      default:
        break;
    }
  });

export default orderUpdateReducer;
