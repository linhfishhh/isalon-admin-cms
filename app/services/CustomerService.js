import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class CustomerService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getCustomerOrderedList(page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/profiles/ordered', {
      page,
      limit,
    });
  }

  getOrderOfCustomer(profileId, page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/orders', { profileId, page, limit });
  }
}
