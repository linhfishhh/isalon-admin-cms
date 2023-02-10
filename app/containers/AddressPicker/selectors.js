import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addressPicker state domain
 */

const selectAddressPickerDomain = state => state.addressPicker || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddressPicker
 */

const makeSelectAddressPicker = () =>
  createSelector(
    selectAddressPickerDomain,
    substate => substate,
  );

export default makeSelectAddressPicker;
export { selectAddressPickerDomain };
