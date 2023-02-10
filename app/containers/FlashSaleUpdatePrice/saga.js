import { takeLatest, call, put, select } from 'redux-saga/effects';
import { productVariantService, flashSaleService } from 'services';
import { appendImageObject } from 'utils/images';
import {
  GET_LIST_PRODUCT_VARIANT_REQUEST,
  GET_REQUEST,
  ADD_REQUEST,
  EDIT_REQUEST,
} from './constants';
import {
  getListProductVariantSuccess,
  getListProductVariantFail,
  getSuccess,
  getFail,
  addSuccess,
  addFail,
  editSuccess,
  editFail,
} from './actions';
import { makeSelectFlashSalePrice } from './selectors';

export function* getProductVariantList({ payload }) {
  const { productId } = payload;
  try {
    const response = yield call(
      [productVariantService, 'getAllProductVariantList'],
      productId,
    );
    appendImageObject(response, 'mainImageId', 'data');
    yield put(getListProductVariantSuccess(response));
  } catch (err) {
    yield put(getListProductVariantFail(err));
  }
}

export function* addProductFlashSale() {
  try {
    const data = yield select(makeSelectFlashSalePrice());
    const response = yield call(
      [flashSaleService, 'addProductFlashSale'],
      data,
    );
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* getProductFlashSale({ payload }) {
  const { flashSaleProductId } = payload;
  try {
    const response = yield call(
      [flashSaleService, 'getProductFlashSale'],
      flashSaleProductId,
    );
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* editProductFlashSale() {
  try {
    const data = yield select(makeSelectFlashSalePrice());
    const flashSaleProductVariants = data.productVariants.map(item => ({
      flashSaleProductVariantPrice: item.price.retailPrice,
      flashSaleProductVariantId: item.flashSaleProductVariantId,
    }));
    const params = {
      flashSaleProductId: data.flashSaleProductId,
      flashSaleProductPrice: data.price.retailPrice,
      flashSaleProductVariants,
    };
    const response = yield call(
      [flashSaleService, 'editProductFlashSale'],
      params,
    );
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export default function* flashSaleUpdatePriceSaga() {
  yield takeLatest(GET_LIST_PRODUCT_VARIANT_REQUEST, getProductVariantList);
  yield takeLatest(GET_REQUEST, getProductFlashSale);
  yield takeLatest(ADD_REQUEST, addProductFlashSale);
  yield takeLatest(EDIT_REQUEST, editProductFlashSale);
}
