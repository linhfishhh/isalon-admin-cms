import { takeLatest, call, put } from 'redux-saga/effects';
import { flashSaleService } from 'services';
import { appendImageObject } from 'utils/images';
import {
  GET_LIST_PRODUCT_REQUEST,
  GET_LIST_PRODUCT_NOT_IN_REQUEST,
  DELETE_REQUEST,
} from './constants';
import {
  getListProductSuccess,
  getListProductFail,
  getListProductNotInSuccess,
  getListProductNotInFail,
  deleteSuccess,
  deleteFail,
} from './actions';

export function* getProductList({ payload }) {
  const { page, limit, flashSaleId } = payload;
  try {
    const response = yield call(
      [flashSaleService, 'getProductFlashSaleList'],
      flashSaleId,
      page,
      limit,
    );
    appendImageObject(
      response,
      'product.mainImageId',
      'data.content',
      'product',
    );
    yield put(getListProductSuccess(response));
  } catch (err) {
    yield put(getListProductFail(err));
  }
}

export function* getProductNotInList({ payload }) {
  const { page, limit, flashSaleId } = payload;
  try {
    const response = yield call(
      [flashSaleService, 'getProductNotInFlashSaleList'],
      flashSaleId,
      page,
      limit,
    );
    appendImageObject(response, 'mainImageId', 'data.content');
    yield put(getListProductNotInSuccess(response));
  } catch (err) {
    yield put(getListProductNotInFail(err));
  }
}

export function* deleteProductFlashSale({ payload }) {
  const { flashSaleProductId } = payload;
  try {
    const response = yield call(
      [flashSaleService, 'removeProductFlashSale'],
      flashSaleProductId,
    );
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export default function* flashSaleProductSaga() {
  yield takeLatest(GET_LIST_PRODUCT_REQUEST, getProductList);
  yield takeLatest(GET_LIST_PRODUCT_NOT_IN_REQUEST, getProductNotInList);
  yield takeLatest(DELETE_REQUEST, deleteProductFlashSale);
}
