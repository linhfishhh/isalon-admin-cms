import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the userLocation state domain
 */

const selectUserLocationDomain = state => state[CONTEXT] || initialState;

const makeSelectLocation = () =>
  createSelector(
    selectUserLocationDomain,
    substate => substate.location,
  );

const makeSelectAddress = () =>
  createSelector(
    selectUserLocationDomain,
    substate => substate.address,
  );

const makeSelectProvinces = () =>
  createSelector(
    selectUserLocationDomain,
    substate => substate.provinces,
  );

const makeSelectDistricts = () =>
  createSelector(
    selectUserLocationDomain,
    substate => substate.districts,
  );

const makeSelectWards = () =>
  createSelector(
    selectUserLocationDomain,
    substate => substate.wards,
  );

export {
  makeSelectLocation,
  makeSelectAddress,
  makeSelectProvinces,
  makeSelectDistricts,
  makeSelectWards,
};
