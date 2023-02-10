import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class OrderService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getNotificationList(page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/user-notifications/system', {
      page,
      limit,
    });
  }

  deleteNotification(id) {
    return this.apiService.delete(`/user-notifications/system/${id}`);
  }

  pushNotification(payload) {
    return this.apiService.post('/notification/push-by-onesignal', payload);
  }
}
