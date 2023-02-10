import { takeLatest, call, put, select } from 'redux-saga/effects';
import { set } from 'lodash';
import { giftCodeService } from 'services';
import {
  GET_LIST_REQUEST,
  GET_REQUEST,
  ADD_REQUEST,
  EDIT_REQUEST,
  DELETE_REQUEST,
  GENERATE_REQUEST,
} from './constants';
import {
  getListSuccess,
  getListFail,
  getSuccess,
  getFail,
  addSuccess,
  addFail,
  editSuccess,
  editFail,
  deleteSuccess,
  deleteFail,
  generateSuccess,
  generateFail,
} from './actions';
import { makeSelectGiftCode } from './selectors';

export function* getGiftCodeList({ payload }) {
  const { giftPackageId, page, limit } = payload;
  try {
    const response = yield call(
      [giftCodeService, 'getGiftCodeList'],
      giftPackageId,
      page,
      limit,
    );
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* getGiftCode({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([giftCodeService, 'getGiftCode'], id);
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* addGiftCode({ payload }) {
  const { giftPackageId } = payload;
  try {
    const data = yield select(makeSelectGiftCode());
    set(data, 'giftPackageId', giftPackageId);
    const response = yield call([giftCodeService, 'addGiftCode'], data);
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* editGiftCode() {
  try {
    const data = yield select(makeSelectGiftCode());
    const response = yield call([giftCodeService, 'editGiftCode'], data);
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export function* deleteGiftCode({ payload }) {
  try {
    const { id } = payload;
    const response = yield call([giftCodeService, 'deleteGiftCode'], id);
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export function* generateGiftCode({ payload }) {
  try {
    const { prefix } = payload;
    const response = yield call([giftCodeService, 'generateGiftCode'], prefix);
    yield put(generateSuccess(response));
  } catch (err) {
    yield put(generateFail(err));
  }
}

export default function* giftCodeSaga() {
  yield takeLatest(GET_LIST_REQUEST, getGiftCodeList);
  yield takeLatest(GET_REQUEST, getGiftCode);
  yield takeLatest(ADD_REQUEST, addGiftCode);
  yield takeLatest(EDIT_REQUEST, editGiftCode);
  yield takeLatest(DELETE_REQUEST, deleteGiftCode);
  yield takeLatest(GENERATE_REQUEST, generateGiftCode);
}
