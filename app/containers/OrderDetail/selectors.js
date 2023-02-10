import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectOrderDetailDomain = state => state[CONTEXT] || initialState;

const makeSelectOrderDetail = () =>
  createSelector(
    selectOrderDetailDomain,
    substate => substate.orderDetail,
  );

const makeSelectDataOrderUpdate = () =>
  createSelector(
    selectOrderDetailDomain,
    substate => substate.dataUpdate,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectOrderDetailDomain,
    substate => substate.refreshData,
  );

const makeSelectStatusHistory = () =>
  createSelector(
    selectOrderDetailDomain,
    substate => substate.statusHistory,
  );

export {
  makeSelectOrderDetail,
  makeSelectDataOrderUpdate,
  makeSelectRefreshData,
  makeSelectStatusHistory,
};
