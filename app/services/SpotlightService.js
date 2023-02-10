import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class SpotlightService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getSpotlightList(page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/spotlights', {
      page,
      limit,
    });
  }

  getSpotlight(id) {
    return this.apiService.get(`/spotlights/${id}`);
  }

  addSpotlight(data) {
    return this.apiService.post('/spotlights', data);
  }

  editSpotlight(data) {
    return this.apiService.put('/spotlights', data);
  }

  deleteSpotlight(id) {
    return this.apiService.delete(`/spotlights/${id}`);
  }

  getSpotlightItemList(id) {
    return this.apiService.get(`/spotlights/${id}/items`);
  }

  getSpotlightItem(id) {
    return this.apiService.get(`/spotlights/items/${id}`);
  }

  addSpotlightItem(data) {
    return this.apiService.post('/spotlights/items', data);
  }

  editSpotlightItem(data) {
    return this.apiService.put('/spotlights/items', data);
  }

  removeSpotlightItem(id) {
    return this.apiService.delete(`/spotlights/items/${id}`);
  }

  changeOrderSpotlightItem(data) {
    return this.apiService.put('spotlights/items/change-order', data);
  }
}
