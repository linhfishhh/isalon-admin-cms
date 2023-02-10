import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class ProductRelatedService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getProductNoRelatedList(productId, page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get(`/products/${productId}/find-not-related`, {
      page,
      limit,
    });
  }

  addProductRelated(data) {
    return this.apiService.post('/products/add-related', data);
  }

  deleteProductRelated(productId, id) {
    return this.apiService.delete(
      `/products/${productId}/remove-related/${id}`,
    );
  }
}
