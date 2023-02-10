import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectProductDetailDomain = state => state[CONTEXT] || initialState;

const makeSelectProductDetail = () =>
  createSelector(
    selectProductDetailDomain,
    substate => substate.product,
  );

const makeSelectDeleteSuccess = () =>
  createSelector(
    selectProductDetailDomain,
    substate => substate.deleteSuccess,
  );

export { makeSelectProductDetail, makeSelectDeleteSuccess };
