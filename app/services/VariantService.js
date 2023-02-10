import APIService from './APIService';
export default class VariantService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getVariantList() {
    return this.apiService.get('/variants');
  }

  getVariant(id) {
    return this.apiService.get(`/variants/${id}`);
  }

  addVariant(data) {
    return this.apiService.post('/variants', data);
  }

  editVariant(data) {
    return this.apiService.put('/variants', data);
  }

  deleteVariant(id) {
    return this.apiService.delete(`/variants/${id}`);
  }
}
