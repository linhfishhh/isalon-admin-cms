/*
 *
 * SalonList reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { GET_LIST_SUCCESS, SEARCH_SUCCESS } from './constants';

export const initialState = {
  salonList: [],
  paging: {},
  error: {},
};

const salonReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        cloneDraft.salonList = get(action, 'payload.data');
        const paging = get(action, 'payload.paging');
        cloneDraft.paging = {
          size: get(paging, 'size', 0),
          number: get(paging, 'number', 1) - 1,
          isLastPage: get(paging, 'isLastPage', true),
          totalElements: get(paging, 'totalElements', 0),
        };
        break;
      }
      case SEARCH_SUCCESS: {
        cloneDraft.salonList = get(action, 'payload.data');
        const paging = get(action, 'payload.paging');
        cloneDraft.paging = {
          size: get(paging, 'size', 0),
          number: get(paging, 'number', 1) - 1,
          isLastPage: get(paging, 'isLastPage', true),
          totalElements: get(paging, 'totalElements', 0),
        };
        break;
      }
      default:
        break;
    }
  });

export default salonReducer;
