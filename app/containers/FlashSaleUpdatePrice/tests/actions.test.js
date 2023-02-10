import { getRequest } from '../actions';
import { GET_REQUEST } from '../constants';

describe('FlashSaleUpdatePrice actions', () => {
  describe('Default Action', () => {
    it('has a type of GET_REQUEST', () => {
      const expected = {
        type: GET_REQUEST,
      };
      expect(getRequest()).toEqual(expected);
    });
  });
});
