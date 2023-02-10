import { getListProductRequest } from '../actions';
import { GET_LIST_PRODUCT_REQUEST } from '../constants';

describe('FlashSaleProduct actions', () => {
  describe('Default Action', () => {
    it('has a type of GET_LIST_PRODUCT_REQUEST', () => {
      const expected = {
        type: GET_LIST_PRODUCT_REQUEST,
      };
      expect(getListProductRequest()).toEqual(expected);
    });
  });
});
