import { takeLatest, call, put, select } from 'redux-saga/effects';
import { get, unset, clone } from 'lodash';
import { imageService, flashSaleService } from 'services';
import { getImageObject } from 'utils/images';
import { ADD_REQUEST, GET_REQUEST, EDIT_REQUEST } from './constants';
import {
  addSuccess,
  addFail,
  getSuccess,
  getFail,
  editSuccess,
  editFail,
} from './actions';
import { makeSelectFlashSale } from './selectors';

export function* addFlashSale() {
  try {
    const data = yield select(makeSelectFlashSale());
    if (data.images.length) {
      const imageId = yield call(uploadImage, data.images);
      if (imageId) {
        data.imageId = imageId;
      }
    }
    const dataRequest = clone(data);
    unset(dataRequest, 'images');
    const response = yield call(
      [flashSaleService, 'addFlashSale'],
      dataRequest,
    );
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* getFlashSale({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([flashSaleService, 'getFlashSale'], id);
    const { imageId } = response.data;
    if (imageId) {
      response.data.images = [getImageObject(imageId)];
    }
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* editFlashSale() {
  try {
    const data = yield select(makeSelectFlashSale());
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
    const response = yield call(
      [flashSaleService, 'editFlashSale'],
      dataRequest,
    );
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
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

export default function* flashSaleUpdateSaga() {
  yield takeLatest(ADD_REQUEST, addFlashSale);
  yield takeLatest(GET_REQUEST, getFlashSale);
  yield takeLatest(EDIT_REQUEST, editFlashSale);
}
