import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class ProfileService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getProfile() {
    return this.apiService.get('/profile/profile', { fetchType: 'all' });
  }

  getProfileById(profileId) {
    return this.apiService.get('/profile/profile', { profileId });
  }

  getAllProfile(page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/profile/profiles/all', {
      profileType: 'CONSUMER',
      page,
      limit,
    });
  }

  searchProfile(keyword, page = 0, limit = NUMBER_PAGE_SIZE) {
    const searchParams = {
      email: keyword,
      phone: keyword,
      fullName: keyword,
      operation: 'or',
      offset: page * limit,
      limit,
      tenantId: 'isalon',
    };
    return this.apiService.post(
      '/profile/profile/search/pagination',
      searchParams,
    );
  }

  getProvinceList() {
    return this.apiService.get('/profile/address/get-all-provinces');
  }

  getDistrictList(provinceId) {
    return this.apiService.get('/profile/address/get-all-districts', {
      provinceId,
    });
  }

  getWardList(districtId) {
    return this.apiService.get('/profile/address/get-all-communes', {
      districtId,
    });
  }

  getUserAddresses(profileId) {
    return this.apiService.get('/profile/address/all', {
      profileId,
    });
  }

  getAddressOne(addressId) {
    return this.apiService.get('/profile/address/one', {
      addressId,
    });
  }

  addUserAddress(address) {
    return this.apiService.post('/profile/address', address);
  }
}
