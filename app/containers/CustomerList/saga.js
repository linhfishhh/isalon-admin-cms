import { takeLatest, call, put } from 'redux-saga/effects';
import { profileService, customerService } from 'services';
import get from 'lodash/get';
import {
  GET_LIST_REQUEST,
  GET_ORDERED_LIST_REQUEST,
  SEARCH_REQUEST,
} from './constants';
import {
  getListSuccess,
  getListFail,
  getOrderedListSuccess,
  getOrderedListFail,
  searchSuccess,
  searchFail,
} from './actions';

export function* getCustomerList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call([profileService, 'getAllProfile'], page, limit);
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* getCustomerOrderedList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call(
      [customerService, 'getCustomerOrderedList'],
      page,
      limit,
    );
    yield put(getOrderedListSuccess(response));
  } catch (err) {
    yield put(getOrderedListFail(err));
  }
}

export function* searchProfile({ payload }) {
  const { keyword, page, limit } = payload;
  try {
    const response = yield call(
      [profileService, 'searchProfile'],
      keyword,
      page,
      limit,
    );
    const data = get(response, 'data', {});
    const { total = 0, profiles = [] } = data;
    const paging = {
      size: limit,
      number: page,
      isLastPage: Math.ceil(total / limit) === page + 1,
      totalElements: total,
    };
    yield put(
      searchSuccess({
        content: profiles,
        paging,
      }),
    );
  } catch (err) {
    yield put(searchFail(err));
  }
}

export default function* customerListSaga() {
  yield takeLatest(GET_LIST_REQUEST, getCustomerList);
  yield takeLatest(GET_ORDERED_LIST_REQUEST, getCustomerOrderedList);
  yield takeLatest(SEARCH_REQUEST, searchProfile);
}
