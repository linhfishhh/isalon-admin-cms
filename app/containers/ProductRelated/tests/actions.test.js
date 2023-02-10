import { getListRequest } from '../actions';
import { GET_LIST_REQUEST } from '../constants';

describe('ProductVariantList actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_LIST_REQUEST,
      };
      expect(getListRequest()).toEqual(expected);
    });
  });
});
