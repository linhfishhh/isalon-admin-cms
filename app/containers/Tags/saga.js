import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';
import { set } from 'lodash';
import { tagsService } from 'services';
import {
  GET_LIST_REQUEST,
  ADD_REQUEST,
  EDIT_REQUEST,
  DELETE_REQUEST,
} from './constants';
import {
  getListSuccess,
  getListFail,
  addSuccess,
  addFail,
  editSuccess,
  editFail,
  deleteSuccess,
  deleteFail,
} from './actions';

export function* getTagsList({ payload }) {
  const { page, limit, type } = payload;
  try {
    const response = yield call(
      [tagsService, 'getTagsList'],
      type,
      page,
      limit,
    );
    set(response, 'type', type);
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* addTags({ payload }) {
  const { data } = payload;
  try {
    const response = yield call([tagsService, 'addTags'], data);
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* editTags({ payload }) {
  const { data } = payload;
  try {
    const response = yield call([tagsService, 'editTags'], data);
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export function* deleteTags({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([tagsService, 'deleteTags'], id);
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export default function* tagsSaga() {
  yield takeEvery(GET_LIST_REQUEST, getTagsList);
  yield takeLatest(ADD_REQUEST, addTags);
  yield takeLatest(EDIT_REQUEST, editTags);
  yield takeLatest(DELETE_REQUEST, deleteTags);
}
