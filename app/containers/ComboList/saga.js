import { takeLatest, call, put } from 'redux-saga/effects';
import { comboService } from 'services';
import { GET_LIST_REQUEST, DELETE_REQUEST } from './constants';
import {
  getListSuccess,
  getListFail,
  deleteSuccess,
  deleteFail,
} from './actions';

export function* getComboList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call([comboService, 'getComboList'], page, limit);
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* deleteCombo({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([comboService, 'deleteCombo'], id);
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export default function* comboSaga() {
  yield takeLatest(GET_LIST_REQUEST, getComboList);
  yield takeLatest(DELETE_REQUEST, deleteCombo);
}
