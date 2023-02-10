/*
 * App Actions
 */

import { createSingleAction } from 'utils/reduxHelper';
import { GET_CURRENT_THEME, SET_CURRENT_THEME } from './constants';

export const getCurrentTheme = createSingleAction(GET_CURRENT_THEME);
export const setCurrentTheme = createSingleAction(SET_CURRENT_THEME);
