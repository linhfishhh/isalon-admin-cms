import { takeLatest, call, put } from 'redux-saga/effects';
import { productFAQService, productService } from 'services';
import { appendImageObject } from 'utils/images';

import {
  GET_LIST_REQUEST,
  GET_REQUEST,
  EDIT_REQUEST,
  DELETE_REQUEST,
} from './constants';
import {
  getListSuccess,
  getListFail,
  getSuccess,
  getFail,
  editSuccess,
  editFail,
  deleteSuccess,
  deleteFail,
  getProductSuccess,
  getProductFail,
} from './actions';

export function* getProductFAQList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call(
      [productFAQService, 'getProductFAQList'],
      page,
      limit,
    );
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* getProductFAQ({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([productFAQService, 'getProductFAQ'], id);
    const { productId } = response.data;
    yield put(getSuccess(response));
    if (productId) {
      yield call(getProduct, productId);
    }
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* answerProductFAQ({ payload }) {
  const { data } = payload;
  try {
    const response = yield call([productFAQService, 'answerProductFAQ'], data);
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export function* deleteProductFAQ({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([productFAQService, 'deleteProductFAQ'], id);
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export function* getProduct(productId) {
  try {
    const response = yield call([productService, 'getProduct'], productId);
    appendImageObject(response, 'mainImageId', 'data');
    yield put(getProductSuccess(response));
  } catch (err) {
    yield put(getProductFail(err));
  }
}

export default function* productFAQSaga() {
  yield takeLatest(GET_LIST_REQUEST, getProductFAQList);
  yield takeLatest(GET_REQUEST, getProductFAQ);
  yield takeLatest(EDIT_REQUEST, answerProductFAQ);
  yield takeLatest(DELETE_REQUEST, deleteProductFAQ);
}
