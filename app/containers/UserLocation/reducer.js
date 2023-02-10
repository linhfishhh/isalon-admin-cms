/*
 *
 * UserLocation reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { setProvinces } from 'utils/localStorage/provinces';
import {
  GET_ALL_UNITS_SUCCESS,
  GET_DISTRICT_LIST_SUCCESS,
  GET_WARD_LIST_SUCCESS,
  GET_PROVINCE_LIST_SUCCESS,
} from './constants';

export const initialState = {
  provinces: [],
  districts: [],
  wards: [],
};

const userLocationReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_ALL_UNITS_SUCCESS: {
        cloneDraft.districts = get(action, 'payload.districts', []);
        cloneDraft.wards = get(action, 'payload.wards', []);
        break;
      }
      case GET_PROVINCE_LIST_SUCCESS: {
        const provinces = get(action, 'payload', []);
        cloneDraft.provinces = provinces;
        setProvinces(provinces);
        break;
      }
      case GET_DISTRICT_LIST_SUCCESS: {
        cloneDraft.districts = get(action, 'payload', []);
        cloneDraft.wards = [];
        break;
      }
      case GET_WARD_LIST_SUCCESS: {
        cloneDraft.wards = get(action, 'payload', []);
        break;
      }
      default:
        break;
    }
  });

export default userLocationReducer;
