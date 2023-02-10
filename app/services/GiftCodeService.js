import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class GiftCodeService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getGiftCodeList(giftPackageId, page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/gift-codes', {
      giftPackageId,
      page,
      limit,
    });
  }

  getGiftCode(id) {
    return this.apiService.get(`/gift-codes/${id}`);
  }

  addGiftCode(data) {
    return this.apiService.post('/gift-codes', data);
  }

  editGiftCode(data) {
    return this.apiService.put('/gift-codes', data);
  }

  deleteGiftCode(id) {
    return this.apiService.delete(`/gift-codes/${id}`);
  }

  generateGiftCode(prefix) {
    return this.apiService.get('/gift-codes/generate-code', { prefix });
  }
}
