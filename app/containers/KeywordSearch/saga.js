import { takeLatest, call, put } from 'redux-saga/effects';
import { keywordSearchService } from 'services';
import {
  GET_LIST_REQUEST,
  GET_TOP_KEYWORD_SEARCH_REQUEST,
  ADD_REQUEST,
  UPDATE_ORDER_REQUEST,
  DELETE_REQUEST,
} from './constants';
import {
  getListSuccess,
  getListFail,
  getTopKeywordSearchSuccess,
  getTopKeywordSearchFail,
  addSuccess,
  addFail,
  updateOrderSuccess,
  updateOrderFail,
  deleteSuccess,
  deleteFail,
} from './actions';

export function* getKeywordSearchList() {
  try {
    const response = yield call([keywordSearchService, 'getKeywordSearchList']);
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* getTopKeywordSearch({ payload }) {
  try {
    const { limit } = payload;
    const response = yield call(
      [keywordSearchService, 'getTopKeywordSearch'],
      limit,
    );
    yield put(getTopKeywordSearchSuccess(response));
  } catch (err) {
    yield put(getTopKeywordSearchFail(err));
  }
}

export function* addKeywordSearch({ payload }) {
  try {
    const response = yield call(
      [keywordSearchService, 'addKeywordSearch'],
      payload,
    );
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* updateOrder({ payload }) {
  try {
    const { data } = payload;
    const response = yield call([keywordSearchService, 'updateOrder'], data);
    yield put(updateOrderSuccess(response));
  } catch (err) {
    yield put(updateOrderFail(err));
  }
}

export function* deleteKeywordSearch({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(
      [keywordSearchService, 'deleteKeywordSearch'],
      id,
    );
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export default function* keywordSearchSaga() {
  yield takeLatest(GET_LIST_REQUEST, getKeywordSearchList);
  yield takeLatest(GET_TOP_KEYWORD_SEARCH_REQUEST, getTopKeywordSearch);
  yield takeLatest(ADD_REQUEST, addKeywordSearch);
  yield takeLatest(UPDATE_ORDER_REQUEST, updateOrder);
  yield takeLatest(DELETE_REQUEST, deleteKeywordSearch);
}
