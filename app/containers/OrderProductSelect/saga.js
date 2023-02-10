import { takeLatest, call, put } from 'redux-saga/effects';
import { productService, productVariantService } from 'services';
import { appendImageObject } from 'utils/images';
import {
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_VARIANT_LIST_REQUEST,
} from './constants';
import {
  getProductListSuccess,
  getProductListFail,
  getProductVariantListSuccess,
  getProductVariantListFail,
} from './actions';

export function* getProductList({ payload }) {
  const { page, limit, search } = payload;
  try {
    const response = yield call(
      [productService, 'getProductList'],
      search,
      page,
      limit,
    );
    appendImageObject(response, 'mainImageId', 'data.content');
    yield put(getProductListSuccess(response));
  } catch (err) {
    yield put(getProductListFail(err));
  }
}

export function* getProductVariantList({ payload }) {
  const { productId } = payload;
  try {
    const response = yield call(
      [productVariantService, 'getAllProductVariantList'],
      productId,
    );
    appendImageObject(response, 'mainImageId', 'data');
    yield put(getProductVariantListSuccess(response));
  } catch (err) {
    yield put(getProductVariantListFail(err));
  }
}

export default function* productSaga() {
  yield takeLatest(GET_PRODUCT_LIST_REQUEST, getProductList);
  yield takeLatest(GET_PRODUCT_VARIANT_LIST_REQUEST, getProductVariantList);
}
