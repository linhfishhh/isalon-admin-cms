import { getProfileRequest } from '../actions';
import { GET_PROFILE_REQUEST } from '../constants';

describe('CustomerDetail actions', () => {
  describe('Default Action', () => {
    it('has a type of GET_PROFILE_REQUEST', () => {
      const expected = {
        type: GET_PROFILE_REQUEST,
      };
      expect(getProfileRequest()).toEqual(expected);
    });
  });
});
