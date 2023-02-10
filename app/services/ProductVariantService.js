import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class ProductVariantService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getProductVariantList(productId, page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/product-variants', {
      productId,
      page,
      limit,
    });
  }

  getAllProductVariantList(productId) {
    return this.apiService.get('/product-variants/all', {
      productId,
    });
  }

  getProductVariant(id) {
    return this.apiService.get(`/product-variants/${id}`);
  }

  addProductVariant(data) {
    return this.apiService.post('/product-variants', data);
  }

  editProductVariant(data) {
    return this.apiService.put('/product-variants', data);
  }

  deleteProductVariant(id) {
    return this.apiService.delete(`/product-variants/${id}`);
  }
}
