import { generatePath } from 'react-router';

const path = {
  dashboard: '/admin/dashboard',
  category: '/admin/category',
  productInCategory: '/admin/category/:categoryId/products',
  brand: '/admin/brand',
  productCreate: '/admin/product-create',
  product: '/admin/product',
  productEdit: '/admin/product/edit/:productId',
  productDetail: '/admin/product/detail/:productId',
  combo: '/admin/combo',
  comboCreate: '/admin/combo/create',
  comboEdit: '/admin/combo/edit/:comboId',
  flashSale: '/admin/flash-sale',
  flashSaleCreate: '/admin/flash-sale/create',
  flashSaleEdit: '/admin/flash-sale/edit/:flashSaleId',
  spotlight: '/admin/spotlight',
  keywordSearch: '/admin/keyword-search',
  order: '/admin/order',
  orderCreate: '/admin/order/create',
  orderEdit: '/admin/order/edit/:orderId',
  orderDetail: '/admin/order/detail/:orderId',
  giftPackage: '/admin/gift-package',
  giftPackageCreate: '/admin/gift-package/create',
  giftPackageEdit: '/admin/gift-package/edit/:giftPackageId',
  productReview: '/admin/product-review',
  productFAQ: '/admin/product-faq',
  customer: '/admin/customer',
  customerDetail: '/admin/customer/detail/:profileId',
  salon: '/admin/salon',
  salonDetail: '/admin/salon/detail/:salonId',
  setting: '/admin/setting',
  signIn: '/admin/auth/sign-in',
  notFound: '/admin/auth/not-found',
  resetPassword: '/admin/auth/reset-password',
  pushNotification: '/admin/tools/push-notification',
};

const createPath = (pattern, params) => generatePath(pattern, params);

export { path, createPath };
