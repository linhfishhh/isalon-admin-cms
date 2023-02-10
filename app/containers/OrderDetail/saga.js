import { takeLatest, call, put, select } from 'redux-saga/effects';
import { orderService } from 'services';
import { appendImageObject } from 'utils/images';
import {
  GET_REQUEST,
  UPDATE_STATUS_REQUEST,
  GET_STATUS_HISTORY_REQUEST,
} from './constants';
import {
  getSuccess,
  getFail,
  updateStatusSuccess,
  updateStatusFail,
  getStatusHistorySuccess,
  getStatusHistoryFail,
} from './actions';
import { makeSelectDataOrderUpdate } from './selectors';

export function* getOrderDetail({ payload }) {
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
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* updateStatusOrder() {
  try {
    const data = yield select(makeSelectDataOrderUpdate());
    const response = yield call([orderService, 'changeStatusOrder'], data);
    yield put(updateStatusSuccess(response));
  } catch (err) {
    yield put(updateStatusFail(err));
  }
}

export function* getOrderStatusHistory({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([orderService, 'getOrderStatusHistory'], id);
    yield put(getStatusHistorySuccess(response));
  } catch (err) {
    yield put(getStatusHistoryFail(err));
  }
}

export default function* orderListSaga() {
  yield takeLatest(GET_REQUEST, getOrderDetail);
  yield takeLatest(UPDATE_STATUS_REQUEST, updateStatusOrder);
  yield takeLatest(GET_STATUS_HISTORY_REQUEST, getOrderStatusHistory);
}
