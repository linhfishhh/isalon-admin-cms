import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class KeywordSearchService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getTopKeywordSearch(limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/search/all-hot-searches-history', { limit });
  }

  getKeywordSearchList() {
    return this.apiService.get('/search/all-hot-search');
  }

  addKeywordSearch(data) {
    return this.apiService.post('/search/hot-search', data);
  }

  updateOrder(data) {
    return this.apiService.put('/search/hot-search', data);
  }

  deleteKeywordSearch(id) {
    return this.apiService.delete(`/search/hot-search?hotSearchId=${id}`);
  }
}
