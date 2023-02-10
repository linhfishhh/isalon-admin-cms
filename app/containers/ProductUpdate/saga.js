import { takeLatest, call, put, select } from 'redux-saga/effects';
import { get, set, unset, clone } from 'lodash';
import { appendImageObject } from 'utils/images';
import {
  productService,
  categoryService,
  brandService,
  imageService,
} from 'services';
import {
  GET_CATEGORY_LIST_REQUEST,
  GET_BRAND_LIST_REQUEST,
  ADD_REQUEST,
  GET_REQUEST,
  EDIT_REQUEST,
} from './constants';
import {
  getCategoryListSuccess,
  getCategoryListFail,
  getBrandListSuccess,
  getBrandListFail,
  addSuccess,
  addFail,
  getSuccess,
  getFail,
  editSuccess,
  editFail,
} from './actions';
import { makeSelectProduct } from './selectors';

export function* getCategoryList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call(
      [categoryService, 'getCategoryList'],
      page,
      limit,
    );
    yield put(getCategoryListSuccess(response));
  } catch (err) {
    yield put(getCategoryListFail(err));
  }
}

export function* getBrandList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call([brandService, 'getBrandList'], page, limit);

    yield put(getBrandListSuccess(response));
  } catch (err) {
    yield put(getBrandListFail(err));
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

export function* addProduct() {
  try {
    const data = yield select(makeSelectProduct());
    const collectionImage = yield call(createCollectionImages, data.images);
    if (collectionImage.id) {
      data.imageCollectionId = collectionImage.id;
      data.mainImageId = collectionImage.imageId;
    }
    const dataRequest = clone(data);
    unset(dataRequest, 'images');
    unset(dataRequest, 'brand');
    if (data.brand) {
      set(dataRequest, 'brandId', data.brand.brandId);
    }
    const response = yield call([productService, 'addProduct'], dataRequest);
    const { imageCollectionId } = response.data;
    response.data.images = yield call(getImage, imageCollectionId);
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
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

export function* getProduct({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([productService, 'getProduct'], id);
    const { imageCollectionId } = response.data;
    response.data.images = yield call(getImage, imageCollectionId);
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* editProduct() {
  try {
    const data = yield select(makeSelectProduct());
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
    unset(dataRequest, 'relatedProducts');
    unset(dataRequest, 'brand');
    unset(dataRequest, 'defaultProductVariant');
    unset(dataRequest, 'variantValues');
    if (data.brand) {
      set(dataRequest, 'brandId', data.brand.brandId);
    }
    const response = yield call([productService, 'editProduct'], dataRequest);
    const { imageCollectionId } = response.data;
    response.data.images = yield call(getImage, imageCollectionId);
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export default function* productUpdateSaga() {
  yield takeLatest(GET_CATEGORY_LIST_REQUEST, getCategoryList);
  yield takeLatest(GET_BRAND_LIST_REQUEST, getBrandList);
  yield takeLatest(ADD_REQUEST, addProduct);
  yield takeLatest(GET_REQUEST, getProduct);
  yield takeLatest(EDIT_REQUEST, editProduct);
}
