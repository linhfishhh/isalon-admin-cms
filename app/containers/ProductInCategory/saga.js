import { takeLatest, call, put } from 'redux-saga/effects';
import { categoryService, productCategoryService } from 'services';
import { appendImageObject } from 'utils/images';
import {
  GET_LIST_REQUEST,
  GET_LIST_CATEGORY_REQUEST,
  GET_LIST_PRODUCT_REQUEST,
  ADD_REQUEST,
  DELETE_REQUEST,
  UPDATE_SUB_CATEGORY_ORDER_REQUEST,
  GET_CATEGORY_INFO_REQUEST,
} from './constants';
import {
  getListSuccess,
  getListFail,
  getListProductSuccess,
  getListProductFail,
  getListCategorySuccess,
  getListCategoryFail,
  addSuccess,
  addFail,
  deleteSuccess,
  deleteFail,
  updateSubCategoryOrderSuccess,
  updateSubCategoryOrderFail,
  getCategoryInfoSuccess,
  getCategoryInfoFail,
} from './actions';

export function* getProductInCategoryList({ payload }) {
  const { page, limit, categoryId } = payload;
  try {
    const response = yield call(
      [productCategoryService, 'getProductInCategory'],
      categoryId,
      page,
      limit,
    );
    appendImageObject(response, 'mainImageId', 'data.content');
    yield put(getListSuccess(response));
  } catch (err) {
    yield put(getListFail(err));
  }
}

export function* getProductList({ payload }) {
  const { page, limit, categoryId } = payload;
  try {
    const response = yield call(
      [productCategoryService, 'getProductNotInCategory'],
      categoryId,
      page,
      limit,
    );
    appendImageObject(response, 'mainImageId', 'data.content');
    yield put(getListProductSuccess(response));
  } catch (err) {
    yield put(getListProductFail(err));
  }
}

export function* getCategoryList({ payload }) {
  const { page, limit } = payload;
  try {
    const response = yield call(
      [categoryService, 'getCategoryList'],
      page,
      limit,
    );
    yield put(getListCategorySuccess(response));
  } catch (err) {
    yield put(getListCategoryFail(err));
  }
}

export function* addProduct({ payload }) {
  const { data, categoryId } = payload;
  try {
    const response = yield call(
      [productCategoryService, 'addProductToCategory'],
      data,
      categoryId,
    );
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* deleteProduct({ payload }) {
  const { data, categoryId } = payload;
  try {
    const response = yield call(
      [productCategoryService, 'deleteProductFromCategory'],
      data,
      categoryId,
    );
    yield put(deleteSuccess(response));
  } catch (err) {
    yield put(deleteFail(err));
  }
}

export function* updateSubCategoryOrder({ payload }) {
  try {
    const response = yield call(
      [productCategoryService, 'updateCategoryOrder'],
      payload,
    );
    yield put(updateSubCategoryOrderSuccess(response));
  } catch (err) {
    yield put(updateSubCategoryOrderFail(err));
  }
}

export function* getCategory({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([categoryService, 'getCategory'], id);
    yield put(getCategoryInfoSuccess(response));
  } catch (err) {
    yield put(getCategoryInfoFail(err));
  }
}

export default function* productInCategorySaga() {
  yield takeLatest(GET_LIST_REQUEST, getProductInCategoryList);
  yield takeLatest(GET_LIST_PRODUCT_REQUEST, getProductList);
  yield takeLatest(GET_LIST_CATEGORY_REQUEST, getCategoryList);
  yield takeLatest(ADD_REQUEST, addProduct);
  yield takeLatest(DELETE_REQUEST, deleteProduct);
  yield takeLatest(UPDATE_SUB_CATEGORY_ORDER_REQUEST, updateSubCategoryOrder);
  yield takeLatest(GET_CATEGORY_INFO_REQUEST, getCategory);
}
