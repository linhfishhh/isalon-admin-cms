/**
 * Enums
 */
import {
  blue,
  green,
  grey,
  red,
  orange,
  indigo,
  teal,
  cyan,
  purple,
  deepPurple,
  lightGreen,
  blueGrey,
} from '@material-ui/core/colors';

export const orderStatus = {
  name: 'Trạng thái đơn hàng',
  type: [
    {
      id: 'UNCONFIRMED',
      name: 'Chưa xác nhận',
      color: grey[500],
    },
    {
      id: 'CONFIRMED',
      name: 'Đã xác nhận',
      color: orange[500],
    },
    {
      id: 'SHIPPING',
      name: 'Đang giao hàng',
      color: deepPurple[500],
    },
    {
      id: 'SHIP_FAILED',
      name: 'Giao hàng thất bại',
      color: blueGrey[500],
    },
    {
      id: 'SHIP_SUCCESS',
      name: 'Giao hàng thành công',
      color: lightGreen[500],
    },
    {
      id: 'RETURN',
      name: 'Trả lại hàng',
      color: red[700],
    },
    {
      id: 'USER_CANCEL',
      name: 'Huỷ bởi người dùng',
      color: red[500],
    },
    {
      id: 'MANAGER_CANCEL',
      name: 'Huỷ bởi quản trị',
      color: red[900],
    },
    {
      id: 'DONE',
      name: 'Hoàn thành',
      color: green[700],
    },
  ],
  typeFromString(str) {
    return this.type.find(item => item.id === str);
  },
};

export const paymentType = {
  type: [
    {
      id: 'CASH',
      name: 'Tiền mặt',
      color: blue[500],
    },
    {
      id: 'INTERNATIONAL_CARD',
      name: 'Thẻ thanh toán quốc tế',
      color: green[500],
    },
    {
      id: 'LOCAL_CARD',
      name: 'Thẻ thanh toán nội địa',
      color: purple[500],
    },
    {
      id: 'VNPAY',
      name: 'VNPAY',
      color: indigo[500],
    },
  ],
  typeFromString(str) {
    return this.type.find(item => item.id === str);
  },
};

export const shippingType = {
  type: [
    {
      id: 'STANDARD',
      name: 'Giao hàng chuẩn',
      color: teal[500],
    },
    {
      id: 'FAST',
      name: 'Giao hàng nhanh',
      color: cyan[500],
    },
  ],
  typeFromString(str) {
    return this.type.find(item => item.id === str);
  },
};

// SERVICE_PAY, ISALON_SETTLEMENT, UPDATE_COIN
export const salonTransactionTypes = {
  type: [
    {
      id: 'SERVICE_PAY',
      name: 'Người dùng đặt lịch',
      color: blue[500],
    },
    {
      id: 'ISALON_SETTLEMENT',
      name: 'Quyết toán với salon',
      color: green[500],
    },
    {
      id: 'UPDATE_COIN',
      name: 'Hệ thống thay đổi',
      color: purple[500],
    },
  ],
  typeFromString(str) {
    return this.type.find(item => item.id === str);
  },
};

// INVITER_REWARD, INVITEE_REWARD, PRODUCT_PAY, SERVICE_PAY, PRODUCT_RETURN, SERVICE_RETURN, UPDATE_COIN
export const userTransactionTypes = {
  type: [
    {
      id: 'INVITER_REWARD',
      name: 'Tặng người mời',
      color: orange[500],
    },
    {
      id: 'INVITEE_REWARD',
      name: 'Tặng người được mời',
      color: deepPurple[500],
    },
    {
      id: 'PRODUCT_PAY',
      name: 'Thanh toán sản phẩm',
      color: blueGrey[500],
    },
    {
      id: 'SERVICE_PAY',
      name: 'Thanh toán dịch vụ',
      color: lightGreen[500],
    },
    {
      id: 'PRODUCT_RETURN',
      name: 'Trả lại sản phẩm',
      color: red[700],
    },
    {
      id: 'SERVICE_RETURN',
      name: 'Trả lại dịch vụ',
      color: red[500],
    },
    {
      id: 'UPDATE_COIN',
      name: 'Hệ thống thay đổi',
      color: red[900],
    },
  ],
  typeFromString(str) {
    return this.type.find(item => item.id === str);
  },
};

export const unitSearch = {
  types: [
    { value: 'all', label: 'Toàn quốc' },
    { value: 'province', label: 'Quận/huyện' },
  ],
  valueWithIndex(index) {
    return this.types[index].value;
  },
  typeOfValue(value) {
    return this.types.find(item => item.value === value);
  },
  isProvince(value) {
    return this.types[1].value === value;
  },
  isAll(value) {
    return this.types[0].value === value;
  },
};
