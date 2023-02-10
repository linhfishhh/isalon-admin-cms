import { takeLatest, call, put, select } from 'redux-saga/effects';
import { brandService, imageService } from 'services';
import { appendImageObject, getImageObject } from 'utils/images';
import { get, clone, unset } from 'lodash';
import {
  GET_LIST_REQUEST,
  GET_REQUEST,
  ADD_REQUEST,
  EDIT_REQUEST,
  DELETE_REQUEST,
} from './constants';
import {
  getListSuccess,
  getListFail,
  getSuccess,
  getFail,
  addSuccess,
  addFail,
  editSuccess,
  editFail,
  deleteSuccess,
  deleteFail,
} from './actions';
import { makeSelectBrand } from './selectors';

export function* getBrandList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call([brandService, 'getBrandList'], page, limit);
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
      'brands',
      newImage[0],
    );
    const imageId = get(imageResponse, 'data.imageId');
    return imageId;
  }
  return 0;
}

export function* getBrand({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([brandService, 'getBrand'], id);
    const { imageId } = response.data;
    if (imageId) {
      response.data.images = [getImageObject(imageId)];
    }
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* addBrand() {
  try {
    const data = yield select(makeSelectBrand());
    if (data.images.length) {
      const imageId = yield call(uploadImage, data.images);
      if (imageId) {
        data.imageId = imageId;
      }
    }
    const dataRequest = clone(data);
    unset(dataRequest, 'images');
    const response = yield call([brandService, 'addBrand'], dataRequest);
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* editBrand() {
  try {
    const data = yield select(makeSelectBrand());
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
    const response = yield call([brandService, 'editBrand'], data);
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export function* deleteBrand({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([brandService, 'deleteBrand'], id);
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export default function* brandSaga() {
  yield takeLatest(GET_LIST_REQUEST, getBrandList);
  yield takeLatest(GET_REQUEST, getBrand);
  yield takeLatest(ADD_REQUEST, addBrand);
  yield takeLatest(EDIT_REQUEST, editBrand);
  yield takeLatest(DELETE_REQUEST, deleteBrand);
}
