import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class ProductReviewService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getProductReviewList(page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/product-reviews', {
      page,
      limit,
    });
  }

  getProductReview(id) {
    return this.apiService.get(`/product-reviews/${id}`);
  }

  replyProductReview(data) {
    return this.apiService.post('/product-reviews/reply', data);
  }

  editReplyProductReview(data) {
    return this.apiService.put('/product-reviews/reply', data);
  }

  approveProductReview(data) {
    return this.apiService.put('/product-reviews', data);
  }

  deleteProductReview(id) {
    return this.apiService.delete(`/product-reviews/${id}`);
  }
}
