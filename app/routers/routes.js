import Dashboard from 'containers/Dashboard/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SignIn from 'containers/SignIn/Loadable';
import ProductUpdate from 'containers/ProductUpdate/Loadable';
import ProductDetail from 'containers/ProductDetail/Loadable';
import ProductList from 'containers/ProductList/Loadable';
import Brand from 'containers/Brand/Loadable';
import CustomerList from 'containers/CustomerList/Loadable';
import CustomerDetail from 'containers/CustomerDetail/Loadable';
import SalonList from 'containers/SalonList/Loadable';
import SalonDetail from 'containers/SalonDetail/Loadable';
import OrderList from 'containers/OrderList/Loadable';
import OrderUpdate from 'containers/OrderUpdate/Loadable';
import OrderDetail from 'containers/OrderDetail/Loadable';
import GiftPackageList from 'containers/GiftPackageList/Loadable';
import GiftPackageUpdate from 'containers/GiftPackageUpdate/Loadable';
import Category from 'containers/Category/Loadable';
import Setting from 'containers/Setting/Loadable';
import ComboList from 'containers/ComboList/Loadable';
import ComboUpdate from 'containers/ComboUpdate/Loadable';
import Spotlight from 'containers/Spotlight/Loadable';
import KeywordSearch from 'containers/KeywordSearch/Loadable';
import ProductInCategory from 'containers/ProductInCategory/Loadable';
import FlashSaleList from 'containers/FlashSaleList/Loadable';
import FlashSaleUpdate from 'containers/FlashSaleUpdate/Loadable';
import ProductReviewList from 'containers/ProductReviewList/Loadable';
import ProductFAQList from 'containers/ProductFAQList/Loadable';
import PushNotification from 'containers/PushNotification/Loadable';

import {
  MonitorDashboard as DashboardIcon,
  AccountGroup as AccountIcon,
  SettingsOutline as settingIcon,
  Cart as SaleIcon,
  Book as CatalogIcon,
  SquareEditOutline as ContentIcon,
  StarHalf as RateIcon,
  AccountQuestion as FAQIcon,
  Tools as ToolboxIcon,
  Store as SalonIcon,
} from 'mdi-material-ui';

import { path } from './path';

const dashboardsRoutes = {
  id: 'dashboard', // is id in Sidebar/messages.js
  path: path.dashboard,
  icon: DashboardIcon,
  component: Dashboard,
  private: true,
};

const catalogRoutes = {
  id: 'catalog',
  icon: CatalogIcon,
  open: false,
  childKey: [
    'product',
    'product-create',
    'brand',
    'category',
    'combo',
    'flash-sale',
  ],
  children: [
    {
      id: 'category',
      path: path.category,
      component: Category,
      private: true,
    },
    {
      path: path.productInCategory,
      component: ProductInCategory,
      deep: true,
      private: true,
    },
    {
      id: 'brand',
      path: path.brand,
      component: Brand,
      private: true,
    },
    {
      id: 'productCreate',
      path: path.productCreate,
      component: ProductUpdate,
      private: true,
    },
    {
      id: 'productList',
      path: path.product,
      component: ProductList,
      private: true,
    },
    {
      path: path.productEdit,
      component: ProductUpdate,
      deep: true,
      private: true,
    },
    {
      path: path.productDetail,
      component: ProductDetail,
      deep: true,
      private: true,
    },
    {
      id: 'comboList',
      path: path.combo,
      component: ComboList,
      private: true,
    },
    {
      path: path.comboCreate,
      component: ComboUpdate,
      deep: true,
      private: true,
    },
    {
      path: path.comboEdit,
      component: ComboUpdate,
      deep: true,
      private: true,
    },

    {
      id: 'flashSaleList',
      path: path.flashSale,
      component: FlashSaleList,
      private: true,
    },
    {
      path: path.flashSaleCreate,
      component: FlashSaleUpdate,
      deep: true,
      private: true,
    },
    {
      path: path.flashSaleEdit,
      component: FlashSaleUpdate,
      deep: true,
      private: true,
    },
  ],
};

const contentRoutes = {
  id: 'content',
  icon: ContentIcon,
  childKey: ['spotlight', 'keyword-search'],
  children: [
    {
      id: 'spotlightSetting',
      path: path.spotlight,
      component: Spotlight,
      private: true,
    },
    {
      id: 'keywordSearch',
      path: path.keywordSearch,
      component: KeywordSearch,
      private: true,
    },
  ],
};

const salesRoutes = {
  id: 'sales',
  icon: SaleIcon,
  childKey: ['order', 'gift-package', 'gift-code'],
  children: [
    {
      id: 'order',
      path: path.order,
      component: OrderList,
      private: true,
    },
    {
      path: path.orderDetail,
      component: OrderDetail,
      private: true,
      deep: true,
    },
    {
      path: path.orderCreate,
      component: OrderUpdate,
      private: true,
      deep: true,
    },
    {
      path: path.orderEdit,
      component: OrderUpdate,
      private: true,
      deep: true,
    },
    {
      id: 'giftPackage',
      path: path.giftPackage,
      component: GiftPackageList,
      private: true,
    },
    {
      path: path.giftPackageCreate,
      component: GiftPackageUpdate,
      private: true,
      deep: true,
    },
    {
      path: path.giftPackageEdit,
      component: GiftPackageUpdate,
      private: true,
      deep: true,
    },
  ],
};

const rateRoutes = {
  id: 'productReview',
  path: path.productReview,
  icon: RateIcon,
  component: ProductReviewList,
  private: true,
};

const faqRoutes = {
  id: 'productFAQ',
  path: path.productFAQ,
  icon: FAQIcon,
  component: ProductFAQList,
  private: true,
};

const customerRoutes = {
  id: 'customer',
  path: path.customer,
  icon: AccountIcon,
  component: CustomerList,
  private: true,
  children: [
    {
      path: path.customerDetail,
      component: CustomerDetail,
      private: true,
      deep: true,
    },
  ],
};

const salonRoutes = {
  id: 'salon',
  path: path.salon,
  icon: SalonIcon,
  component: SalonList,
  private: true,
  children: [
    {
      path: path.salonDetail,
      component: SalonDetail,
      private: true,
      deep: true,
    },
  ],
};

const settingRoutes = {
  id: 'setting',
  path: path.setting,
  icon: settingIcon,
  component: Setting,
  private: true,
};

const authRoutes = {
  deep: true,
  children: [
    {
      path: path.signIn,
      component: SignIn,
      private: false,
    },
    {
      path: path.notFound,
      component: null,
      private: false,
    },
    {
      path: path.resetPassword,
      component: NotFoundPage,
      private: false,
    },
  ],
};

const toolRoutes = {
  id: 'toolbox',
  icon: ToolboxIcon,
  childKey: ['pushNotification'],
  children: [
    {
      id: 'pushNotification',
      path: path.pushNotification,
      component: PushNotification,
      private: true,
    },
  ],
};

export const dashboard = [
  dashboardsRoutes,
  contentRoutes,
  catalogRoutes,
  salesRoutes,
  customerRoutes,
  salonRoutes,
  rateRoutes,
  faqRoutes,
  toolRoutes,
  settingRoutes,
];

export const auth = [authRoutes];
