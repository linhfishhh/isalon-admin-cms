import { takeLatest, call, put } from 'redux-saga/effects';
import { productRelatedService } from 'services';
import { appendImageObject } from 'utils/images';
import { GET_LIST_REQUEST, ADD_REQUEST, DELETE_REQUEST } from './constants';
import {
  getListSuccess,
  getListFail,
  addSuccess,
  addFail,
  deleteSuccess,
  deleteFail,
} from './actions';

export function* getProductNoRelated({ payload }) {
  const { productId, page, limit } = payload;
  try {
    const response = yield call(
      [productRelatedService, 'getProductNoRelatedList'],
      productId,
      page,
      limit,
    );
    appendImageObject(response, 'mainImageId', 'data.content');
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* addProductRelated({ payload }) {
  const { data, productSelect } = payload;
  try {
    const response = yield call(
      [productRelatedService, 'addProductRelated'],
      data,
    );
    yield put(addSuccess({ ...response, productSelect }));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* deleteProductRelated({ payload }) {
  const { productId, id } = payload;
  try {
    const response = yield call(
      [productRelatedService, 'deleteProductRelated'],
      productId,
      id,
    );
    yield put(deleteSuccess({ ...response, relatedProductId: id }));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export default function* productVariantSaga() {
  yield takeLatest(GET_LIST_REQUEST, getProductNoRelated);
  yield takeLatest(ADD_REQUEST, addProductRelated);
  yield takeLatest(DELETE_REQUEST, deleteProductRelated);
}
