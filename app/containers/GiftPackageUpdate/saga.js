import { takeLatest, call, put, select } from 'redux-saga/effects';
import { giftPackageService, imageService } from 'services';
import { getImageObject } from 'utils/images';
import { unset, get, clone } from 'lodash';
import { GET_REQUEST, ADD_REQUEST, EDIT_REQUEST } from './constants';
import {
  getSuccess,
  getFail,
  addSuccess,
  addFail,
  editSuccess,
  editFail,
} from './actions';
import { makeSelectGiftPackage } from './selectors';

function* uploadImage(images) {
  const newImage = images.filter(image => image.new);
  if (newImage.length) {
    const imageResponse = yield call(
      [imageService, 'uploadImage'],
      'giftPackages',
      newImage[0],
    );
    const imageId = get(imageResponse, 'data.imageId');
    return imageId;
  }
  return 0;
}

export function* getGiftPackage({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([giftPackageService, 'getGiftPackage'], id);
    const { imageId } = response.data;
    if (imageId) {
      response.data.images = [getImageObject(imageId)];
    }
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* addGiftPackage() {
  try {
    const data = yield select(makeSelectGiftPackage());
    if (data.images.length) {
      const imageId = yield call(uploadImage, data.images);
      if (imageId) {
        data.imageId = imageId;
      }
    }
    const dataRequest = clone(data);
    unset(dataRequest, 'images');
    const response = yield call(
      [giftPackageService, 'addGiftPackage'],
      dataRequest,
    );
    const { imageId } = response.data;
    if (imageId) {
      response.data.images = [getImageObject(imageId)];
    }
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* editGiftPackage() {
  try {
    const data = yield select(makeSelectGiftPackage());
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
    const response = yield call([giftPackageService, 'editGiftPackage'], data);
    const { imageId } = response.data;
    if (imageId) {
      response.data.images = [getImageObject(imageId)];
    }
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export default function* giftPackageSaga() {
  yield takeLatest(GET_REQUEST, getGiftPackage);
  yield takeLatest(ADD_REQUEST, addGiftPackage);
  yield takeLatest(EDIT_REQUEST, editGiftPackage);
}
