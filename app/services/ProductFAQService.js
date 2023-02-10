import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class ProductFAQService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getProductFAQList(page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/questions', {
      page,
      limit,
    });
  }

  getProductFAQ(id) {
    return this.apiService.get(`/questions/${id}`);
  }

  answerProductFAQ(data) {
    return this.apiService.put('/questions', data);
  }

  deleteProductFAQ(id) {
    return this.apiService.delete(`/product-reviews/${id}`);
  }
}
