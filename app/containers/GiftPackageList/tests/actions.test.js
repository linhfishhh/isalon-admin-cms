import { getListRequest } from '../actions';
import { GET_LIST_REQUEST } from '../constants';

describe('GiftPackage actions', () => {
  describe('Default Action', () => {
    it('has a type of GET_LIST_REQUEST', () => {
      const expected = {
        type: GET_LIST_REQUEST,
      };
      expect(getListRequest()).toEqual(expected);
    });
  });
});
