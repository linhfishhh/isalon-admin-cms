import { getVariantListRequest } from '../actions';
import { GET_VARIANT_LIST } from '../constants';

describe('ProductVariant actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_VARIANT_LIST,
      };
      expect(getVariantListRequest()).toEqual(expected);
    });
  });
});
