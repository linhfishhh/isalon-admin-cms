import { loginRequest } from '../actions';
import { LOGIN_REQUEST } from '../constants';

describe('SignIn actions', () => {
  describe('Login Request Action', () => {
    it('has a type of LOGIN_REQUEST', () => {
      const expected = {
        type: LOGIN_REQUEST,
      };
      expect(loginRequest()).toEqual(expected);
    });
  });
});
