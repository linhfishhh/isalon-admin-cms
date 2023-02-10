/*
 *
 * Tags reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import {
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
  ADD_SUCCESS,
  ADD_FAIL,
  EDIT_SUCCESS,
  EDIT_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
} from './constants';

export const initialState = {
  refresh: false,
  error: {},
};

const tagsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        const cloneDraft = draft;
        const type = get(action, 'payload.type');
        const tagsList = get(action, 'payload.data.content');
        cloneDraft[type] = tagsList;
        cloneDraft.refresh = false;
        break;
      }
      case ADD_SUCCESS:
      case EDIT_SUCCESS:
      case DELETE_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refresh = true;
        break;
      }

      case GET_LIST_FAIL:
      case ADD_FAIL:
      case EDIT_FAIL:
      case DELETE_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        cloneDraft.refresh = false;
        break;
      }
      default:
        break;
    }
  });

export default tagsReducer;
