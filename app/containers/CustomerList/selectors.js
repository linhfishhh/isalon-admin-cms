import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectCustomerDomain = state => state[CONTEXT] || initialState;

const makeSelectCustomerList = () =>
  createSelector(
    selectCustomerDomain,
    substate => substate.customerList,
  );

const makeSelectPaging = () =>
  createSelector(
    selectCustomerDomain,
    subState => subState.paging,
  );

const makeSelectCustomerOrderedList = () =>
  createSelector(
    selectCustomerDomain,
    substate => substate.customerOrderedList,
  );

const makeSelectOrderedPaging = () =>
  createSelector(
    selectCustomerDomain,
    subState => subState.orderedPaging,
  );

export {
  makeSelectCustomerList,
  makeSelectPaging,
  makeSelectCustomerOrderedList,
  makeSelectOrderedPaging,
};
