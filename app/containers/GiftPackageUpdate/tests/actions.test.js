import { addRequest } from '../actions';
import { ADD_REQUEST } from '../constants';

describe('GiftPackageUpdate actions', () => {
  describe('Default Action', () => {
    it('has a type of ADD_REQUEST', () => {
      const expected = {
        type: ADD_REQUEST,
      };
      expect(addRequest()).toEqual(expected);
    });
  });
});
