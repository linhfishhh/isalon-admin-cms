import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class BrandService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getBrandList(page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/brands', { page, limit });
  }

  getBrand(id) {
    return this.apiService.get(`/brands/${id}`);
  }

  addBrand(data) {
    return this.apiService.post('/brands', data);
  }

  editBrand(data) {
    return this.apiService.put('/brands', data);
  }

  deleteBrand(id) {
    return this.apiService.delete(`/brands/${id}`);
  }
}
