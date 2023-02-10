import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class OrderService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getOrderList(page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/orders', {
      page,
      limit,
    });
  }

  getOrder(id) {
    return this.apiService.get(`/orders/${id}`);
  }

  changeStatusOrder(data) {
    return this.apiService.put('/orders', data);
  }

  getOrderStatusHistory(id) {
    return this.apiService.get(`/orders/${id}/history`);
  }

  exportOrderList(filter) {
    const config = {
      responseType: 'arraybuffer',
    };
    return this.apiService.get('/orders/export', filter, config);
  }

  calculateOrder(params) {
    return this.apiService.post('/orders/calculate', params);
  }

  addOrder(payload) {
    return this.apiService.post('/orders', payload);
  }

  editOrder(payload) {
    return this.apiService.put('/orders', payload);
  }
}
