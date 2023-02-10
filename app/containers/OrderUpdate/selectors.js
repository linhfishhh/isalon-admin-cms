import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';
/**
 * Direct selector to the orderUpdate state domain
 */

const selectOrderUpdateDomain = state => state[CONTEXT] || initialState;

const makeSelectOrder = () =>
  createSelector(
    selectOrderUpdateDomain,
    substate => substate.order,
  );

export { makeSelectOrder };
