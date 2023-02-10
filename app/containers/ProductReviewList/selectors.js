import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectProductReviewListDomain = state => state[CONTEXT] || initialState;

const makeSelectProductReviewList = () =>
  createSelector(
    selectProductReviewListDomain,
    substate => substate.productReviewList,
  );

const makeSelectProductReview = () =>
  createSelector(
    selectProductReviewListDomain,
    subState => subState.productReview,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectProductReviewListDomain,
    subState => subState.refreshData,
  );

const makeSelectPaging = () =>
  createSelector(
    selectProductReviewListDomain,
    subState => subState.paging,
  );

const makeSelectProduct = () =>
  createSelector(
    selectProductReviewListDomain,
    subState => subState.product,
  );

export {
  makeSelectProductReviewList,
  makeSelectProductReview,
  makeSelectRefreshData,
  makeSelectPaging,
  makeSelectProduct,
};
