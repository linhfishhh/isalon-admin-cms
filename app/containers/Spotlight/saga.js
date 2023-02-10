import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';
import { spotlightService, categoryService } from 'services';
import { set } from 'lodash';
import {
  GET_LIST_REQUEST,
  GET_CATEGORY_LIST_REQUEST,
  GET_ITEM_LIST_REQUEST,
  DELETE_REQUEST,
  CHANGE_ORDER_REQUEST,
} from './constants';
import {
  getListSuccess,
  getListFail,
  getCategoryListSuccess,
  getCategoryListFail,
  getItemListSuccess,
  getItemListFail,
  deleteSuccess,
  deleteFail,
  changeOrderSuccess,
  changeOrderFail,
} from './actions';

export function* getSpotlightList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call(
      [spotlightService, 'getSpotlightList'],
      page,
      limit,
    );
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* getCategoryList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call(
      [categoryService, 'getCategoryList'],
      page,
      limit,
    );
    yield put(getCategoryListSuccess(response));
  } catch (err) {
    yield put(getCategoryListFail(err));
  }
}

export function* getSpotlightItemList({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([spotlightService, 'getSpotlightItemList'], id);
    set(response, 'spotlightId', id);
    yield put(getItemListSuccess(response));
  } catch (err) {
    yield put(getItemListFail(err));
  }
}

export function* deleteSpotlightItem({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([spotlightService, 'removeSpotlightItem'], id);
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export function* changeOrderSpotlightItem({ payload }) {
  const { data } = payload;
  try {
    const response = yield call(
      [spotlightService, 'changeOrderSpotlightItem'],
      data,
    );
    yield put(changeOrderSuccess(response));
  } catch (err) {
    yield put(changeOrderFail(err));
  }
}

export default function* productSaga() {
  yield takeLatest(GET_LIST_REQUEST, getSpotlightList);
  yield takeLatest(GET_CATEGORY_LIST_REQUEST, getCategoryList);
  yield takeEvery(GET_ITEM_LIST_REQUEST, getSpotlightItemList);
  yield takeLatest(DELETE_REQUEST, deleteSpotlightItem);
  yield takeLatest(CHANGE_ORDER_REQUEST, changeOrderSpotlightItem);
}
