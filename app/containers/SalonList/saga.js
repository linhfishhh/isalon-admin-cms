import { takeLatest, call, put } from 'redux-saga/effects';
import { salonService } from 'services';
import { GET_LIST_REQUEST, SEARCH_REQUEST } from './constants';
import {
  getListSuccess,
  getListFail,
  searchSuccess,
  searchFail,
} from './actions';

export function* getSalonList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call([salonService, 'getAllSalons'], page, limit);
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* searchSalon({ payload }) {
  const { keyword, page, limit } = payload;
  try {
    const response = yield call(
      [salonService, 'searchSalon'],
      keyword,
      page,
      limit,
    );
    yield put(searchSuccess(response));
  } catch (err) {
    yield put(searchFail(err));
  }
}

export default function* salonListSaga() {
  yield takeLatest(GET_LIST_REQUEST, getSalonList);
  yield takeLatest(SEARCH_REQUEST, searchSalon);
}
