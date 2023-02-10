import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class TagsService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getTagsList(type, page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/product-tags', { type, page, limit });
  }

  addTags(data) {
    return this.apiService.post('/product-tags', data);
  }

  editTags(data) {
    return this.apiService.put('/product-tags', data);
  }

  deleteTags(id) {
    return this.apiService.delete(`/product-tags/${id}`);
  }
}
