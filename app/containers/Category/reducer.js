/*
 *
 * Category reducer
 *
 */
import produce from 'immer';
import { get, unset, forEach, keysIn } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  GET_LIST_SUCCESS,
  GET_LIST_FAIL,
  GET_LIST_PARENT_SUCCESS,
  GET_LIST_PARENT_FAIL,
  GET_SUCCESS,
  GET_FAIL,
  ADD_SUCCESS,
  ADD_FAIL,
  EDIT_SUCCESS,
  EDIT_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  CLEAN_DATA_EDIT,
  UPDATE_DATA_FIELD,
} from './constants';

export const initialState = {
  category: { name: '', images: [] },
  categoryList: [],
  parentList: [],
  paging: {},
  refreshData: false,
  error: {},
};

const responseToCategory = data => {
  const category = {};
  category.categoryId = data.categoryId;
  category.name = data.name;
  category.imageId = data.imageId;
  category.images = data.images || [];
  category.parentId = data.parentId;
  return category;
};

const categoryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.categoryList = get(action, 'payload.data.content');
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

      case GET_LIST_PARENT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.parentList = get(action, 'payload.data.content');
        break;
      }

      case GET_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.category = responseToCategory(get(action, 'payload.data'));
        break;
      }

      case ADD_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refreshData = true;
        cloneDraft.parentList.push(get(action, 'payload.data'));
        break;
      }

      case EDIT_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refreshData = true;
        const itemEdit = get(action, 'payload.data');
        const indexEdit = cloneDraft.parentList.findIndex(
          category => category.categoryId === itemEdit.categoryId,
        );
        cloneDraft.parentList[indexEdit] = itemEdit;
        break;
      }

      case DELETE_SUCCESS: {
        const cloneDraft = draft;
        cloneDraft.refreshData = true;
        const categoryId = get(action, 'payload.categoryId');
        const indexDelete = cloneDraft.parentList.findIndex(
          category => category.categoryId === categoryId,
        );
        cloneDraft.parentList.slice(indexDelete, 1);
        break;
      }

      case GET_LIST_PARENT_FAIL:
      case GET_FAIL:
      case ADD_FAIL:
      case EDIT_FAIL:
      case DELETE_FAIL: {
        const cloneDraft = draft;
        cloneDraft.error = get(action, 'payload');
        break;
      }
      case CLEAN_DATA_EDIT: {
        const cloneDraft = draft;
        cloneDraft.category = initialState.category;
        break;
      }
      case UPDATE_DATA_FIELD: {
        const cloneDraft = draft;
        const removeField = get(action, 'payload.removeField');
        if (removeField) {
          unset(cloneDraft.category, removeField);
        } else {
          cloneDraft.category = {
            ...cloneDraft.category,
            ...get(action, 'payload'),
          };
        }
        break;
      }
      case LOCATION_CHANGE: {
        const cloneDraft = draft;
        forEach(keysIn(cloneDraft), key => {
          cloneDraft[key] = initialState[key];
        });
        break;
      }
      default:
        break;
    }
  });

export default categoryReducer;
