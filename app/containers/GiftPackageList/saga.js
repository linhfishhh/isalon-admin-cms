import { takeLatest, call, put } from 'redux-saga/effects';
import { giftPackageService } from 'services';
import { appendImageObject } from 'utils/images';
import { GET_LIST_REQUEST, DELETE_REQUEST } from './constants';
import {
  getListSuccess,
  getListFail,
  deleteSuccess,
  deleteFail,
} from './actions';

export function* getGiftPackageList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call(
      [giftPackageService, 'getGiftPackageList'],
      page,
      limit,
    );
    appendImageObject(response, 'imageId', 'data.content');
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* deleteGiftPackage({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([giftPackageService, 'deleteGiftPackage'], id);
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export default function* giftPackageSaga() {
  yield takeLatest(GET_LIST_REQUEST, getGiftPackageList);
  yield takeLatest(DELETE_REQUEST, deleteGiftPackage);
}
