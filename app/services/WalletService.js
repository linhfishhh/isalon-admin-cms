import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';
export default class WalletService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getSalonWallet(salonId) {
    return this.apiService.get(`/salon-wallets/salon/${salonId}`);
  }

  updateSalonWallet(params) {
    return this.apiService.post(`/salon-wallets/update`, params);
  }

  getSalonWalletTransactions(salonId, page = 0, size = NUMBER_PAGE_SIZE) {
    return this.apiService.get(`/salon-wallets/${salonId}/transactions`, {
      page,
      size,
      sort: 'createdDate,desc',
    });
  }

  getUserWallet(profileId) {
    return this.apiService.get(`/user-wallets/profile/${profileId}`);
  }

  updateUserWallet(params) {
    return this.apiService.post(`/user-wallets/update`, params);
  }

  getUserWalletTransactions(profileId, page = 0, size = NUMBER_PAGE_SIZE) {
    return this.apiService.get(`/user-wallets/${profileId}/transactions`, {
      page,
      size,
      sort: 'createdDate,desc',
    });
  }
}
