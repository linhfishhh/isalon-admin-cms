import { takeLatest, call, put } from 'redux-saga/effects';
import { productVariantService, imageService } from 'services';
import { appendImageObject } from 'utils/images';
import { get, unset, clone, set } from 'lodash';
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

export function* getProductVariantList({ payload }) {
  const { productId, page, limit } = payload;
  try {
    const response = yield call(
      [productVariantService, 'getProductVariantList'],
      productId,
      page,
      limit,
    );
    appendImageObject(response, 'mainImageId', 'data.content');
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
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

function* createCollectionImages(images) {
  try {
    if (images.length) {
      const imageResponse = yield call(
        [imageService, 'createCollectionImage'],
        'products',
        images,
      );
      const id = get(imageResponse, 'data.collectionId');
      const imageList = get(imageResponse, 'data.images');
      const imageDefault = imageList.find(item => !item.imageOrder);
      const { imageId } = imageDefault;
      return { id, imageId };
    }
    return { id: 0, imageId: 0 };
  } catch {
    return { id: 0, imageId: 0 };
  }
}

function* updateCollectionImages(images, collectionId) {
  try {
    if (images.length || collectionId) {
      const imageResponse = yield call(
        [imageService, 'updateCollectionImage'],
        collectionId,
        'products',
        images,
      );
      const firstImage = images[0];
      if (firstImage.imageId) {
        return {
          id: collectionId,
          imageId: firstImage.imageId,
        };
      }
      const id = get(imageResponse, 'data.collectionId');
      const imageList = get(imageResponse, 'data.images');
      const imageDefault = imageList.find(item => !item.imageOrder);
      const { imageId } = imageDefault;
      return { id, imageId };
    }
    return { id: collectionId, imageId: 0 };
  } catch {
    if (images.length) {
      const firstImage = images.find(image => image.imageId);
      if (firstImage) {
        return {
          id: collectionId,
          imageId: firstImage.imageId,
        };
      }
    }
    return { id: collectionId, imageId: 0 };
  }
}

export function* addProductVariant({ payload }) {
  const { data } = payload;
  try {
    const collectionImage = yield call(createCollectionImages, data.images);
    if (collectionImage.id) {
      data.imageCollectionId = collectionImage.id;
      data.mainImageId = collectionImage.imageId;
    }
    const dataRequest = clone(data);
    unset(dataRequest, 'images');
    unset(dataRequest, 'productVariantId');
    unset(dataRequest, 'price.priceId');
    const response = yield call(
      [productVariantService, 'addProductVariant'],
      dataRequest,
    );
    const { imageCollectionId } = response.data;
    response.data.images = yield call(getImage, imageCollectionId);
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* editProductVariant({ payload }) {
  const { data } = payload;
  try {
    const collectionImage = data.imageCollectionId
      ? yield call(updateCollectionImages, data.images, data.imageCollectionId)
      : yield call(createCollectionImages, data.images);
    if (collectionImage.id) {
      set(data, 'imageCollectionId', collectionImage.id);
      if (collectionImage.imageId) {
        set(data, 'mainImageId', collectionImage.imageId);
      } else {
        unset(data, 'mainImageId');
      }
    }
    const dataRequest = clone(data);
    unset(dataRequest, 'images');
    const response = yield call(
      [productVariantService, 'editProductVariant'],
      dataRequest,
    );
    const { imageCollectionId } = response.data;
    response.data.images = yield call(getImage, imageCollectionId);
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export function* deleteProductVariant({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(
      [productVariantService, 'deleteProductVariant'],
      id,
    );
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export default function* productVariantSaga() {
  yield takeLatest(GET_LIST_REQUEST, getProductVariantList);
  yield takeLatest(ADD_REQUEST, addProductVariant);
  yield takeLatest(EDIT_REQUEST, editProductVariant);
  yield takeLatest(DELETE_REQUEST, deleteProductVariant);
}
