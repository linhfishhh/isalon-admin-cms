import { NUMBER_PAGE_SIZE } from 'utils/constants';
export default class SalonService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getAllSalons(page = 1, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.post('/search/all', {
      page,
      per_page: limit,
    });
  }

  searchSalon(keyword, page = 1, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.post('/search/v2/by-keyword', {
      keyword,
      page,
      per_page: limit,
      search_type: 'salon',
    });
  }

  getSalonDetail(id, data) {
    return this.apiService.post(`/salon/${id}/detail`, data);
  }
}
