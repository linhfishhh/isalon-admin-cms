import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

/**
 * Direct selector to the setting state domain
 */

const selectSettingDomain = state => state[CONTEXT] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Setting
 */

const makeSelectSetting = () =>
  createSelector(
    selectSettingDomain,
    substate => substate.settings,
  );

const makeSelectShopSetting = () =>
  createSelector(
    selectSettingDomain,
    substate => substate.shopSettings,
  );

export { makeSelectSetting, makeSelectShopSetting };
