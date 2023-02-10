/* eslint-disable no-param-reassign */
import produce from 'immer';
import { handleActions } from 'redux-actions';

import { SHOW_LOADING, HIDE_LOADING } from './constants';

export const initialState = {
  isLoading: false,
};

export default handleActions(
  {
    [SHOW_LOADING]: state =>
      produce(state, draft => {
        draft.isLoading = true;
      }),
    [HIDE_LOADING]: state =>
      produce(state, draft => {
        draft.isLoading = false;
      }),
  },
  initialState,
);
