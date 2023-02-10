import { takeLatest, call, put } from 'redux-saga/effects';
import { orderService } from 'services';
import { downloadFile } from 'utils/files';
import { GET_LIST_REQUEST, EXPORT_REQUEST } from './constants';
import {
  getListSuccess,
  getListFail,
  exportSuccess,
  exportFail,
} from './actions';

export function* getOrderList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call([orderService, 'getOrderList'], page, limit);
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* exportData({ payload }) {
  const { filter } = payload;
  try {
    const response = yield call([orderService, 'exportOrderList'], filter);
    yield put(downloadFile(response, 'Danh sach don hang.xls'));
    yield put(exportSuccess({}));
  } catch (err) {
    yield put(exportFail(err));
  }
}

export default function* orderListSaga() {
  yield takeLatest(GET_LIST_REQUEST, getOrderList);
  yield takeLatest(EXPORT_REQUEST, exportData);
}
