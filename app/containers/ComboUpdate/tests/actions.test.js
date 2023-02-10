import { getProductListRequest } from '../actions';
import { GET_PRODUCT_LIST } from '../constants';

describe('ComboUpdate actions', () => {
  describe('Default Action', () => {
    it('has a type of GET_PRODUCT_LIST', () => {
      const expected = {
        type: GET_PRODUCT_LIST,
      };
      expect(getProductListRequest()).toEqual(expected);
    });
  });
});
