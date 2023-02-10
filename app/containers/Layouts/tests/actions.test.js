import { logoutRequest } from '../actions';
import { LOGOUT } from '../constants';

describe('Layouts actions', () => {
  describe('Default Action', () => {
    it('has a type of LOGOUT', () => {
      const expected = {
        type: LOGOUT,
      };
      expect(logoutRequest()).toEqual(expected);
    });
  });
});
