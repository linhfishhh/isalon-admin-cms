import APIService from './APIService';
import AuthService from './AuthService';
import ProfileService from './ProfileService';
import BrandService from './BrandService';
import ImageService from './ImageService';
import VariantService from './VariantService';
import CategoryService from './CategoryService';
import ProductService from './ProductService';
import ProductVariantService from './ProductVariantService';
import VariantValueService from './VariantValueService';
import ComboService from './ComboService';
import TagsService from './TagsService';
import SpotlightService from './SpotlightService';
import ProductCategoryService from './ProductCategoryService';
import OrderService from './OrderService';
import GiftPackageService from './GiftPackageService';
import GiftCodeService from './GiftCodeService';
import FlashSaleService from './FlashSaleService';
import KeywordSearchService from './KeywordSearchService';
import ProductReviewService from './ProductReviewService';
import ProductFAQService from './ProductFAQService';
import ProductRelatedService from './ProductRelatedService';
import CustomerService from './CustomerService';
import NotificationService from './NotificationService';
import SalonService from './SalonService';
import SettingService from './SettingService';
import WalletService from './WalletService';
import LegacyNotificationService from './LegacyNotificationService';

const DEFAULT_CONFIG = {
  baseURL: process.env.UAA_END_POINT,
};

const SHOP_SERVICE_CONFIG = {
  baseURL: process.env.SHOP_SERVICE_END_POINT,
};

const STORAGE_CONFIG = {
  baseURL: process.env.STORAGE_END_POINT,
};

const COMMUNICATION_CONFIG = {
  baseURL: process.env.COMMUNICATION_END_POINT,
};

const WALLET_CONFIG = {
  baseURL: process.env.WALLET_END_POINT,
};

const uaaService = new APIService(DEFAULT_CONFIG);
const shopService = new APIService(SHOP_SERVICE_CONFIG);
const storageService = new APIService(STORAGE_CONFIG);
const communicationService = new APIService(COMMUNICATION_CONFIG);
const walletApiService = new APIService(WALLET_CONFIG);

const legacyApiService = new APIService(
  {
    baseURL: `${process.env.LEGACY_API_END_POINT}`,
  },
  { isLegacy: true },
);

const authService = new AuthService(uaaService);
const profileService = new ProfileService(uaaService);

const brandService = new BrandService(shopService);
const categoryService = new CategoryService(shopService);
const productService = new ProductService(shopService);
const productVariantService = new ProductVariantService(shopService);
const variantService = new VariantService(shopService);
const variantValueService = new VariantValueService(shopService);
const comboService = new ComboService(shopService);
const tagsService = new TagsService(shopService);
const spotlightService = new SpotlightService(shopService);
const productCategoryService = new ProductCategoryService(shopService);
const orderService = new OrderService(shopService);
const giftPackageService = new GiftPackageService(shopService);
const giftCodeService = new GiftCodeService(shopService);
const flashSaleService = new FlashSaleService(shopService);
const keywordSearchService = new KeywordSearchService(shopService);
const productReviewService = new ProductReviewService(shopService);
const productFAQService = new ProductFAQService(shopService);
const productRelatedService = new ProductRelatedService(shopService);
const customerService = new CustomerService(shopService);

const imageService = new ImageService(storageService);
const notificationService = new NotificationService(communicationService);
const legacyNotificationService = new LegacyNotificationService(
  walletApiService,
);

const salonService = new SalonService(legacyApiService);
const settingService = new SettingService(walletApiService);
const walletService = new WalletService(walletApiService);
const shopSettingService = new SettingService(shopService);

export {
  authService,
  profileService,
  brandService,
  imageService,
  categoryService,
  productService,
  productVariantService,
  variantService,
  variantValueService,
  comboService,
  tagsService,
  spotlightService,
  productCategoryService,
  orderService,
  giftPackageService,
  giftCodeService,
  flashSaleService,
  keywordSearchService,
  productReviewService,
  productFAQService,
  productRelatedService,
  customerService,
  notificationService,
  salonService,
  settingService,
  walletService,
  shopSettingService,
  legacyNotificationService,
};
