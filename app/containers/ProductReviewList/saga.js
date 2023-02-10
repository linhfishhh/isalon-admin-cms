import { takeLatest, call, put } from 'redux-saga/effects';
import { get } from 'lodash';
import { productReviewService, imageService, productService } from 'services';
import { appendImageObject } from 'utils/images';
import {
  GET_LIST_REQUEST,
  GET_REQUEST,
  ADD_REQUEST,
  EDIT_REQUEST,
  APPROVE_REQUEST,
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
  approveSuccess,
  approveFail,
  deleteSuccess,
  deleteFail,
  getProductSuccess,
  getProductFail,
} from './actions';

export function* getProductReviewList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call(
      [productReviewService, 'getProductReviewList'],
      page,
      limit,
    );
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* approveProductReview({ payload }) {
  try {
    const { data } = payload;
    const response = yield call(
      [productReviewService, 'approveProductReview'],
      data,
    );
    yield put(approveSuccess(response));
  } catch (err) {
    yield put(approveFail(err));
  }
}

export function* addReplyProductReview({ payload }) {
  const { data } = payload;
  try {
    const response = yield call(
      [productReviewService, 'replyProductReview'],
      data,
    );
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

export function* getProductReview({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([productReviewService, 'getProductReview'], id);
    const { imageCollectionId, productId } = response.data;
    response.data.images = yield call(getImage, imageCollectionId);
    yield put(getSuccess(response));
    if (productId) {
      yield call(getProduct, productId);
    }
  } catch (err) {
    yield put(getFail(err));
  }
}

export function* editReplyProductReview({ payload }) {
  try {
    const { data } = payload;
    const response = yield call(
      [productReviewService, 'editReplyProductReview'],
      data,
    );
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export function* deleteProductReview({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(
      [productReviewService, 'deleteProductReview'],
      id,
    );
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export function* getProduct(productId) {
  try {
    const response = yield call([productService, 'getProduct'], productId);
    appendImageObject(response, 'mainImageId', 'data');
    yield put(getProductSuccess(response));
  } catch (err) {
    yield put(getProductFail(err));
  }
}

export default function* productReviewSaga() {
  yield takeLatest(GET_LIST_REQUEST, getProductReviewList);
  yield takeLatest(APPROVE_REQUEST, approveProductReview);
  yield takeLatest(GET_REQUEST, getProductReview);
  yield takeLatest(ADD_REQUEST, addReplyProductReview);
  yield takeLatest(EDIT_REQUEST, editReplyProductReview);
  yield takeLatest(DELETE_REQUEST, deleteProductReview);
}
