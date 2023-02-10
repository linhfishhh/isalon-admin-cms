import { getUUID } from 'utils/auth';
import APIService from './APIService';
export default class AuthService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  login(payload) {
    const uuid = `${getUUID()}`;
    return this.apiService.post('/uaa/user/login', { ...payload, uuid });
  }

  logout() {
    return this.apiService.post('/uaa/user/logout');
  }
}
