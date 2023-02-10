import { takeLatest, call, put } from 'redux-saga/effects';
import { get, unset } from 'lodash';
import { appendImageObject } from 'utils/images';
import { variantService, productVariantService, imageService } from 'services';
import {
  GET_VARIANT_LIST_REQUEST,
  GET_PRODUCT_VARIANT_REQUEST,
} from './constants';
import {
  getVariantListSuccess,
  getVariantListFail,
  getProductVariantListSuccess,
  getProductVariantListFail,
} from './actions';

export function* getVariantList() {
  try {
    const response = yield call([variantService, 'getVariantList']);
    yield put(getVariantListSuccess(response));
  } catch (err) {
    yield put(getVariantListFail(err));
  }
}

export function* getImage(collectionId) {
  try {
    if (collectionId) {
      const imageResponse = yield call(
        [imageService, 'getImageCollection'],
        collectionId,
      );
      const imageData = get(imageResponse, 'data.images');
      appendImageObject(imageData, 'imageId');
      return imageData;
    }
    return [];
  } catch (err) {
    return [];
  }
}

export function* getProductVariant({ payload }) {
  const { id, copyMode } = payload;
  try {
    const response = yield call(
      [productVariantService, 'getProductVariant'],
      id,
    );
    if (copyMode) {
      unset(response, 'data.imageCollectionId');
      unset(response, 'data.mainImageId');
    }
    const { imageCollectionId } = response.data;
    response.data.images = yield call(getImage, imageCollectionId);
    yield put(getProductVariantListSuccess(response));
  } catch (err) {
    yield put(getProductVariantListFail(err));
  }
}

export default function* productVariantSaga() {
  yield takeLatest(GET_VARIANT_LIST_REQUEST, getVariantList);
  yield takeLatest(GET_PRODUCT_VARIANT_REQUEST, getProductVariant);
}
