import { takeLatest, call, put } from 'redux-saga/effects';
import { productService } from 'services';
import { appendImageObject } from 'utils/images';
import { GET_LIST_REQUEST, DELETE_REQUEST } from './constants';
import {
  getListSuccess,
  getListFail,
  deleteSuccess,
  deleteFail,
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
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* deleteProduct({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([productService, 'deleteProduct'], id);
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export default function* productSaga() {
  yield takeLatest(GET_LIST_REQUEST, getProductList);
  yield takeLatest(DELETE_REQUEST, deleteProduct);
}
