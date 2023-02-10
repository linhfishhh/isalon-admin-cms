import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectKeywordSearchDomain = state => state[CONTEXT] || initialState;

const makeSelectKeywordSearch = () =>
  createSelector(
    selectKeywordSearchDomain,
    subState => subState.keywordSearch,
  );

const makeSelecttopKeywordSearchList = () =>
  createSelector(
    selectKeywordSearchDomain,
    subState => subState.topKeywordSearchList,
  );

const makeSelectKeywordSearchList = () =>
  createSelector(
    selectKeywordSearchDomain,
    subState => subState.keywordSearchList,
  );

const makeSelectRefreshData = () =>
  createSelector(
    selectKeywordSearchDomain,
    subState => subState.refreshData,
  );

export {
  makeSelectKeywordSearch,
  makeSelecttopKeywordSearchList,
  makeSelectKeywordSearchList,
  makeSelectRefreshData,
};
