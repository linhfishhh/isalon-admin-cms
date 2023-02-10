import { takeLatest, call, put, select } from 'redux-saga/effects';
import { productService, comboService } from 'services';
import { appendImageObject } from 'utils/images';
import {
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_COMBO_LIST_REQUEST,
  ADD_REQUEST,
  GET_REQUEST,
  EDIT_REQUEST,
  ADD_PRODUCT_REQUEST,
  REMOVE_PRODUCT_REQUEST,
} from './constants';
import {
  getProductListSuccess,
  getProductListFail,
  getProductComboListSuccess,
  getProductComboListFail,
  addSuccess,
  addFail,
  getSuccess,
  getFail,
  editSuccess,
  editFail,
  addProductSuccess,
  addProductFail,
  removeProductSuccess,
  removeProductFail,
} from './actions';
import { makeSelectCombo } from './selectors';

export function* getProductList({ payload }) {
  const { page, limit, search } = payload;
  try {
    const response = yield call(
      [productService, 'getProductList'],
      search,
      page,
      limit,
    );
    appendImageObject(response, 'mainImageId', 'data.content');
    yield put(getProductListSuccess(response));
  } catch (err) {
    yield put(getProductListFail(err));
  }
}

export function* addCombo() {
  try {
    const data = yield select(makeSelectCombo());
    const response = yield call([comboService, 'addCombo'], data);
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* getCombo({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([comboService, 'getCombo'], id);
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* editCombo() {
  try {
    const data = yield select(makeSelectCombo());
    const response = yield call([comboService, 'editCombo'], data);
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export function* addProductCombo({ payload }) {
  try {
    const response = yield call([comboService, 'addProductCombo'], payload);
    yield put(addProductSuccess(response));
  } catch (err) {
    yield put(addProductFail(err));
  }
}

export function* removeProductCombo({ payload }) {
  try {
    const response = yield call([comboService, 'removeProductCombo'], payload);
    yield put(removeProductSuccess(response));
  } catch (err) {
    yield put(removeProductFail(err));
  }
}

export function* getProductComboList({ payload }) {
  const { page, limit, id } = payload;
  try {
    const response = yield call(
      [comboService, 'getProductComboList'],
      id,
      page,
      limit,
    );
    appendImageObject(response, 'mainImageId', 'data.content');
    yield put(getProductComboListSuccess(response));
  } catch (err) {
    yield put(getProductComboListFail(err));
  }
}

export default function* comboUpdateSaga() {
  yield takeLatest(GET_PRODUCT_LIST_REQUEST, getProductList);
  yield takeLatest(GET_PRODUCT_COMBO_LIST_REQUEST, getProductComboList);
  yield takeLatest(ADD_REQUEST, addCombo);
  yield takeLatest(GET_REQUEST, getCombo);
  yield takeLatest(EDIT_REQUEST, editCombo);
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductCombo);
  yield takeLatest(REMOVE_PRODUCT_REQUEST, removeProductCombo);
}
