import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class ComboService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getComboList(page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/product-combos', { page, limit });
  }

  getCombo(id) {
    return this.apiService.get(`/product-combos/${id}`);
  }

  addCombo(data) {
    return this.apiService.post('/product-combos', data);
  }

  editCombo(data) {
    return this.apiService.put('/product-combos', data);
  }

  deleteCombo(id) {
    return this.apiService.delete(`/product-combos/${id}`);
  }

  getProductComboList(id, page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get(`/product-combos/${id}/products`, {
      page,
      limit,
    });
  }

  addProductCombo(data) {
    return this.apiService.post('/product-combos/add-product', data);
  }

  removeProductCombo(data) {
    return this.apiService.post('/product-combos/remove-product', data);
  }
}
