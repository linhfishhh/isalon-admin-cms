import { takeLatest, call, put } from 'redux-saga/effects';
import { variantService, variantValueService } from 'services';
import {
  ADD_REQUEST,
  EDIT_REQUEST,
  DELETE_REQUEST,
  ADD_VALUE_REQUEST,
  EDIT_VALUE_REQUEST,
  DELETE_VALUE_REQUEST,
} from './constants';
import {
  addSuccess,
  addFail,
  editSuccess,
  editFail,
  deleteSuccess,
  deleteFail,
  addValueSuccess,
  addValueFail,
  editValueSuccess,
  editValueFail,
  deleteValueSuccess,
  deleteValueFail,
} from './actions';

export function* addVariant({ payload }) {
  const { data } = payload;
  try {
    const response = yield call([variantService, 'addVariant'], data);
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* editVariant({ payload }) {
  const { data } = payload;
  try {
    const response = yield call([variantService, 'editVariant'], data);
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export function* deleteVariant({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([variantService, 'deleteVariant'], id);
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export function* addVariantValue({ payload }) {
  const { data } = payload;
  try {
    const response = yield call([variantValueService, 'addVariantValue'], data);
    yield put(addValueSuccess(response));
  } catch (err) {
    yield put(addValueFail(err));
  }
}

export function* editVariantValue({ payload }) {
  const { data } = payload;
  try {
    const response = yield call(
      [variantValueService, 'editVariantValue'],
      data,
    );
    yield put(editValueSuccess(response));
  } catch (err) {
    yield put(editValueFail(err));
  }
}

export function* deleteVariantValue({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(
      [variantValueService, 'deleteVariantValue'],
      id,
    );
    yield put(deleteValueSuccess(response));
  } catch (err) {
    yield put(deleteValueFail(err));
  }
}

export default function* variantSaga() {
  yield takeLatest(ADD_REQUEST, addVariant);
  yield takeLatest(EDIT_REQUEST, editVariant);
  yield takeLatest(DELETE_REQUEST, deleteVariant);
  yield takeLatest(ADD_VALUE_REQUEST, addVariantValue);
  yield takeLatest(EDIT_VALUE_REQUEST, editVariantValue);
  yield takeLatest(DELETE_VALUE_REQUEST, deleteVariantValue);
}
