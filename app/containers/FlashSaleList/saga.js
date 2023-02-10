import { takeLatest, call, put } from 'redux-saga/effects';
import { flashSaleService } from 'services';
import { appendImageObject } from 'utils/images';
import { GET_LIST_REQUEST, DELETE_REQUEST } from './constants';
import {
  getListSuccess,
  getListFail,
  deleteSuccess,
  deleteFail,
} from './actions';

export function* getFlashSaleList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call(
      [flashSaleService, 'getFlashSaleList'],
      page,
      limit,
    );
    appendImageObject(response, 'imageId', 'data.content');
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* deleteFlashSale({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([flashSaleService, 'deleteFlashSale'], id);
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export default function* flashSaleSaga() {
  yield takeLatest(GET_LIST_REQUEST, getFlashSaleList);
  yield takeLatest(DELETE_REQUEST, deleteFlashSale);
}
