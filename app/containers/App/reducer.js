/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { get } from 'lodash';
import { getOptions, setOptions } from 'utils/localStorage';
import { SET_CURRENT_THEME } from './constants';

export const initialState = {
  currentTheme: get(getOptions(), 'currentTheme') || 0,
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CURRENT_THEME: {
        const cloneDraft = draft;
        const currentTheme = get(action, 'payload.indexTheme');
        setOptions({ currentTheme });
        cloneDraft.currentTheme = currentTheme;
        break;
      }
      default:
        break;
    }
  });

export default appReducer;
