import { GET_CURRENT_THEME, SET_CURRENT_THEME } from '../constants';

import { getCurrentTheme, setCurrentTheme } from '../actions';

describe('App Actions', () => {
  describe('getCurrentTheme', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: GET_CURRENT_THEME,
      };

      expect(getCurrentTheme()).toEqual(expectedResult);
    });
  });

  describe('setCurrentTheme', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: SET_CURRENT_THEME,
      };

      expect(setCurrentTheme()).toEqual(expectedResult);
    });
  });
});
