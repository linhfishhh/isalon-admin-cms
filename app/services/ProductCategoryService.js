import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class ProductCategoryService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getProductInCategory(categoryId, page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get(`/categories/${categoryId}/products`, {
      page,
      limit,
    });
  }

  getProductNotInCategory(categoryId, page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get(`/categories/${categoryId}/products-not-in`, {
      page,
      limit,
    });
  }

  addProductToCategory(data, categoryId) {
    return this.apiService.post(`/categories/${categoryId}/add-products`, data);
  }

  deleteProductFromCategory(data, categoryId) {
    return this.apiService.post(
      `/categories/${categoryId}/remove-products`,
      data,
    );
  }

  updateCategoryOrder(orders) {
    return this.apiService.post('/categories/change-order', orders);
  }
}
