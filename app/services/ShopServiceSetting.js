import APIService from './APIService';
export default class SettingService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getCfg() {
    return this.apiService.get('/settings');
  }

  updateCfg(cfg) {
    return this.apiService.post('/settings', cfg);
  }
}
