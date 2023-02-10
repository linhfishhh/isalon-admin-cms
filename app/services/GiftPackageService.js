import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class GiftPackageService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getGiftPackageList(page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/gift-packages', {
      page,
      limit,
    });
  }

  getGiftPackage(id) {
    return this.apiService.get(`/gift-packages/${id}`);
  }

  addGiftPackage(data) {
    return this.apiService.post('/gift-packages', data);
  }

  editGiftPackage(data) {
    return this.apiService.put('/gift-packages', data);
  }

  deleteGiftPackage(id) {
    return this.apiService.delete(`/gift-packages/${id}`);
  }
}
