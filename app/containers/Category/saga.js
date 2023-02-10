import { takeLatest, call, put, select } from 'redux-saga/effects';
import { get, clone, unset } from 'lodash';
import { categoryService, imageService } from 'services';
import { appendImageObject, getImageObject } from 'utils/images';
import {
  GET_LIST_REQUEST,
  GET_LIST_PARENT_REQUEST,
  GET_REQUEST,
  ADD_REQUEST,
  EDIT_REQUEST,
  DELETE_REQUEST,
} from './constants';
import {
  getListSuccess,
  getListFail,
  getListParentSuccess,
  getListParentFail,
  getSuccess,
  getFail,
  addSuccess,
  addFail,
  editSuccess,
  editFail,
  deleteSuccess,
  deleteFail,
} from './actions';
import { makeSelectCategory } from './selectors';

export function* getCategoryList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call(
      [categoryService, 'getCategoryList'],
      page,
      limit,
    );
    appendImageObject(response, 'imageId', 'data.content');
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

function* uploadImage(images) {
  const newImage = images.filter(image => image.new);
  if (newImage.length) {
    const imageResponse = yield call(
      [imageService, 'uploadImage'],
      'categories',
      newImage[0],
    );
    const imageId = get(imageResponse, 'data.imageId');
    return imageId;
  }
  return 0;
}

export function* getCategoryParentList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call(
      [categoryService, 'getCategoryList'],
      page,
      limit,
    );
    yield put(getListParentSuccess(response));
  } catch (err) {
    yield put(getListParentFail(err));
  }
}

export function* getCategory({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([categoryService, 'getCategory'], id);
    const { imageId } = response.data;
    if (imageId) {
      response.data.images = [getImageObject(imageId)];
    }
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* addCategory() {
  try {
    const data = yield select(makeSelectCategory());
    if (data.images.length) {
      const imageId = yield call(uploadImage, data.images);
      if (imageId) {
        data.imageId = imageId;
      }
    }
    const dataRequest = clone(data);
    unset(dataRequest, 'images');
    const response = yield call([categoryService, 'addCategory'], dataRequest);
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* editCategory() {
  try {
    const data = yield select(makeSelectCategory());
    if (data.images.length) {
      const imageId = yield call(uploadImage, data.images);
      if (imageId) {
        data.imageId = imageId;
      }
    } else {
      unset(data, 'imageId');
    }
    const dataRequest = clone(data);
    unset(dataRequest, 'images');
    const response = yield call([categoryService, 'editCategory'], dataRequest);
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export function* deleteCategory({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([categoryService, 'deleteCategory'], id);
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export default function* categorySaga() {
  yield takeLatest(GET_LIST_REQUEST, getCategoryList);
  yield takeLatest(GET_LIST_PARENT_REQUEST, getCategoryParentList);
  yield takeLatest(GET_REQUEST, getCategory);
  yield takeLatest(ADD_REQUEST, addCategory);
  yield takeLatest(EDIT_REQUEST, editCategory);
  yield takeLatest(DELETE_REQUEST, deleteCategory);
}
