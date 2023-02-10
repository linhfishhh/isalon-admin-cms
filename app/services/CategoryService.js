import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class CategoryService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getCategoryList(page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/categories', {
      page,
      limit,
    });
  }

  getCategory(id) {
    return this.apiService.get(`/categories/${id}`);
  }

  addCategory(data) {
    return this.apiService.post('/categories', data);
  }

  editCategory(data) {
    return this.apiService.put('/categories', data);
  }

  deleteCategory(id) {
    return this.apiService.delete(`/categories/${id}`);
  }

  getProductInCategory(categoryId, page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get(`/categories/${categoryId}/products`, {
      page,
      limit,
    });
  }

  getProductNotInCategory(categoryId, page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get(
      `/categories/${categoryId}/products/products-not-in`,
      {
        page,
        limit,
      },
    );
  }
}
