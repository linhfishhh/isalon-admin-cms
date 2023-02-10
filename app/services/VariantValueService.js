import APIService from './APIService';
export default class VariantValueService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  addVariantValue(data) {
    return this.apiService.post('/variants/value', data);
  }

  editVariantValue(data) {
    return this.apiService.put('/variants/value', data);
  }

  deleteVariantValue(id) {
    return this.apiService.delete(`/variants/value/${id}`);
  }
}
