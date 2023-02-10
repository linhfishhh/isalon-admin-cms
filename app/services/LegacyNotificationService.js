import APIService from './APIService';

export default class LegacyNotificationService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  pushNotification(payload) {
    return this.apiService.post('/legacy/notification/salon', payload);
  }
}
