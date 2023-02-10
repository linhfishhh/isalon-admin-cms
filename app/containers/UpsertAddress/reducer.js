/*
 *
 * EditProfile reducer
 *
 */
import produce from 'immer';
import { ADD_MY_ADDRESS_SUCCESS } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const upsertAddressReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case ADD_MY_ADDRESS_SUCCESS: {
        break;
      }
    }
  });

export default upsertAddressReducer;
