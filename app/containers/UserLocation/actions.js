/*
 *
 * UserLocation actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import {
  GET_ALL_UNITS,
  GET_PROVINCE_LIST,
  GET_DISTRICT_LIST,
  GET_WARD_LIST,
} from './constants';

export const [
  getAllUnitsRequest,
  getAllUnitsSuccess,
  getAllUnitsFail,
] = createSideEffectAction(GET_ALL_UNITS);

export const [
  getProvinceListRequest,
  getProvinceListSuccess,
  getProvinceListFail,
] = createSideEffectAction(GET_PROVINCE_LIST);

export const [
  getDistrictListRequest,
  getDistrictListSuccess,
  getDistrictListFail,
] = createSideEffectAction(GET_DISTRICT_LIST);

export const [
  getWardListRequest,
  getWardListSuccess,
  getWardListFail,
] = createSideEffectAction(GET_WARD_LIST);
