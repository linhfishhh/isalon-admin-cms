import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class ProductService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getProductList(search, page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/products', {
      search,
      page,
      limit,
    });
  }

  getProduct(id) {
    return this.apiService.get(`/products/${id}`);
  }

  addProduct(data) {
    return this.apiService.post('/products', data);
  }

  editProduct(data) {
    return this.apiService.put('/products', data);
  }

  deleteProduct(id) {
    return this.apiService.delete(`/products/${id}`);
  }
}
