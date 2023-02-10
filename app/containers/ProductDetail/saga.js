import { takeLatest, call, put } from 'redux-saga/effects';
import { get } from 'lodash';
import { appendImageObject } from 'utils/images';
import { productService, imageService } from 'services';
import { GET_REQUEST, DELETE_REQUEST } from './constants';
import { getSuccess, getFail, deleteSuccess, deleteFail } from './actions';

export function* getImage(collectionId) {
  try {
    const imageResponse = yield call(
      [imageService, 'getImageCollection'],
      collectionId,
    );
    const imageData = get(imageResponse, 'data.images');
    appendImageObject(imageData, 'imageId');
    return imageData;
  } catch (err) {
    return [];
  }
}

export function* getProduct({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([productService, 'getProduct'], id);
    const { imageCollectionId } = response.data;
    if (imageCollectionId) {
      response.data.images = yield call(getImage, imageCollectionId);
    }
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* deleteProduct({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([productService, 'deleteProduct'], id);
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export default function* productDetailSaga() {
  yield takeLatest(GET_REQUEST, getProduct);
  yield takeLatest(DELETE_REQUEST, deleteProduct);
}
