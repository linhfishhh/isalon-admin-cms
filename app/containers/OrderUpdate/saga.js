import { takeLatest, call, put, select } from 'redux-saga/effects';
// import { get, set, unset, clone } from 'lodash';
import forEach from 'lodash/forEach';
import { appendImageObject } from 'utils/images';
import { orderService } from 'services';
import {
  ADD_ORDER_REQUEST,
  GET_ORDER_REQUEST,
  EDIT_ORDER_REQUEST,
  CALCULATE_ORDER_REQUEST,
} from './constants';
import {
  addOrderSuccess,
  addOrderFail,
  getOrderSuccess,
  getOrderFail,
  editOrderSuccess,
  editOrderFail,
  calculateOrderSuccess,
  calculateOrderFail,
} from './actions';
import { makeSelectOrder } from './selectors';

// {
//   "addressId": 0,
//   "discount": 0,
//   "items": [
//     {
//       "productId": 0,
//       "productVariantId": 0,
//       "quantity": 0
//     }
//   ],
//   "note": "string",
//   "orderId": 0,
//   "paymentType": "CASH",
//   "profileId": 0,
//   "shippingFee": 0,
//   "shippingType": "STANDARD",
//   "status": "NONE",
//   "total": 0
// }

export function* addOrder() {
  try {
    const data = yield select(makeSelectOrder());
    // construct payload
    const payload = {
      profileId: data.profileId,
      addressId: data.addressId,
      paymentType: 'CASH',
      shippingFee: 0,
      shippingType: 'STANDARD',
      total: data.total,
      note: 'Admin add order',
      status: 'UNCONFIRMED',
      items: [],
    };
    forEach(data.items, item => {
      payload.items.push({
        productId: item.productId,
        productVariantId: item.productVariantId,
        quantity: item.quantity,
      });
    });

    const response = yield call([orderService, 'addOrder'], payload);
    yield put(addOrderSuccess(response));
  } catch (err) {
    yield put(addOrderFail(err));
  }
}

export function* getOrder({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([orderService, 'getOrder'], id);
    appendImageObject(response, 'product.mainImageId', 'data.items', 'product');
    appendImageObject(
      response,
      'productVariant.mainImageId',
      'data.items',
      'productVariant',
    );
    yield put(getOrderSuccess(response));
  } catch (err) {
    yield put(getOrderFail(err));
  }
}

export function* editOrder() {
  try {
    const data = yield select(makeSelectOrder());
    // construct payload
    const payload = {
      profileId: data.profileId,
      addressId: data.addressId,
      orderId: data.orderId,
      paymentType: data.paymentType || 'CASH',
      shippingFee: data.shippingFee,
      shippingType: data.shippingType || 'STANDARD',
      total: data.total,
      note: 'Admin edit order',
      status: data.status || 'UNCONFIRMED',
      items: [],
    };
    forEach(data.items, item => {
      payload.items.push({
        productId: item.productId,
        productVariantId: item.productVariantId,
        quantity: item.quantity,
      });
    });
    const response = yield call([orderService, 'editOrder'], payload);
    yield put(editOrderSuccess(response));
  } catch (err) {
    yield put(editOrderFail(err));
  }
}

export function* calculateOrder({ payload }) {
  try {
    const { items, ...rest } = payload;
    const orderDetail = items.map(item => {
      const newItem = {
        productId: item.productId,
        quantity: item.quantity,
      };
      if (item.productVariant) {
        newItem.productVariantId = item.productVariant.productVariantId;
      }
      return newItem;
    });
    const params = { items: orderDetail, ...rest };
    const response = yield call([orderService, 'calculateOrder'], params);
    yield put(calculateOrderSuccess(response));
  } catch (err) {
    yield put(calculateOrderFail(err));
  }
}

export default function* orderUpdateSaga() {
  yield takeLatest(GET_ORDER_REQUEST, getOrder);
  yield takeLatest(ADD_ORDER_REQUEST, addOrder);
  yield takeLatest(EDIT_ORDER_REQUEST, editOrder);
  yield takeLatest(CALCULATE_ORDER_REQUEST, calculateOrder);
}
