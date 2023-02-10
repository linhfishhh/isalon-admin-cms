import { getBrandListRequest } from '../actions';
import { GET_BRAND_LIST } from '../constants';

describe('ProductUpdate actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_BRAND_LIST,
      };
      expect(getBrandListRequest()).toEqual(expected);
    });
  });
});
