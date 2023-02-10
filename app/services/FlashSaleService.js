import { NUMBER_PAGE_SIZE } from 'utils/constants';
import APIService from './APIService';

export default class FlashSaleService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getFlashSaleList(page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get('/flash-sales', { page, limit });
  }

  getFlashSale(flashSalesId) {
    return this.apiService.get(`/flash-sales/${flashSalesId}`);
  }

  addFlashSale(data) {
    return this.apiService.post('/flash-sales', data);
  }

  editFlashSale(data) {
    return this.apiService.put('/flash-sales', data);
  }

  deleteFlashSale(flashSalesId) {
    return this.apiService.delete(`/flash-sales/${flashSalesId}`);
  }

  getProductFlashSaleList(flashSalesId, page = 0, limit = NUMBER_PAGE_SIZE) {
    return this.apiService.get(`/flash-sales/${flashSalesId}/products`, {
      page,
      limit,
    });
  }

  getProductNotInFlashSaleList(
    flashSalesId,
    page = 0,
    limit = NUMBER_PAGE_SIZE,
  ) {
    return this.apiService.get(`/flash-sales/${flashSalesId}/products-not-in`, {
      page,
      limit,
    });
  }

  getProductFlashSale(flashSaleProductId) {
    return this.apiService.get(`/flash-sales/products/${flashSaleProductId}`);
  }

  addProductFlashSale(data) {
    return this.apiService.post('/flash-sales/add-product', data);
  }

  editProductFlashSale(data) {
    return this.apiService.put('/flash-sales/update-product', data);
  }

  removeProductFlashSale(flashSaleProductId) {
    return this.apiService.delete(
      `/flash-sales/remove-product/${flashSaleProductId}`,
    );
  }
}
