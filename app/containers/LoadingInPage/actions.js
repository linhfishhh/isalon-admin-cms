import { createSingleAction } from 'utils/reduxHelper';

import { SHOW_LOADING, HIDE_LOADING } from './constants';

export const showLoading = createSingleAction(SHOW_LOADING);
export const hideLoading = createSingleAction(HIDE_LOADING);
