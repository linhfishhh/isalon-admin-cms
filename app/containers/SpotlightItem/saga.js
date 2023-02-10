import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { get, unset, cloneDeep, set, forEach } from 'lodash';
import { spotlightService, imageService } from 'services';
import { getImageObject } from 'utils/images';
import { GET_REQUEST, ADD_REQUEST, EDIT_REQUEST } from './constants';
import {
  getSuccess,
  getFail,
  addSuccess,
  addFail,
  editSuccess,
  editFail,
} from './actions';
import { makeSelectSpotlightItem } from './selectors';

export function* getSpotlightItem({ payload }) {
  const { id } = payload;
  try {
    const response = yield call([spotlightService, 'getSpotlightItem'], id);
    const { banners } = response.data;
    if (banners.length) {
      forEach(banners, item => {
        set(item, 'images', [getImageObject(item.imageId)]);
      });
    }
    yield put(getSuccess(response));
  } catch (err) {
    yield put(getFail(err));
  }
}

function* prepareDataUpdate(data) {
  const cloneData = cloneDeep(data);
  if (['flashsale', 'bestSelling'].indexOf(cloneData.type) > -1) {
    unset(cloneData, 'category');
    set(cloneData, 'banners', []);
  } else if (cloneData.type === 'banner') {
    unset(cloneData, 'category');
    set(cloneData, 'startAt', '');
    set(cloneData, 'expiredAt', '');
    yield call(updateImageForBanner, cloneData);
  } else {
    set(cloneData, 'banners', []);
    set(cloneData, 'startAt', '');
    set(cloneData, 'expiredAt', '');
  }
  return cloneData;
}

function* updateImageForBanner(data) {
  const newImages = data.banners
    .map((item, index) => set(item, 'index', index))
    .filter(
      item =>
        (!item.imageId && item.images.length) ||
        (item.images.length && item.images[0].new),
    );
  const responseUpload = yield all(
    newImages.map(item =>
      call([imageService, 'uploadImage'], 'banner', item.images[0]),
    ),
  );
  forEach(newImages, (item, index) => {
    set(
      data.banners[item.index],
      'imageId',
      get(responseUpload[index], 'data.imageId'),
    );
  });
  forEach(data.banners, item => {
    unset(item, 'images');
    unset(item, 'index');
  });
}

export function* addSpotlightItem({ payload }) {
  const { spotlightId } = payload;
  try {
    const data = yield select(makeSelectSpotlightItem());
    const dataRequest = yield call(prepareDataUpdate, data);
    dataRequest.spotlightId = spotlightId;
    const response = yield call(
      [spotlightService, 'addSpotlightItem'],
      dataRequest,
    );
    yield put(addSuccess(response));
  } catch (err) {
    yield put(addFail(err));
  }
}

export function* editSpotlightItem() {
  try {
    const data = yield select(makeSelectSpotlightItem());
    const dataRequest = yield call(prepareDataUpdate, data);
    const response = yield call(
      [spotlightService, 'editSpotlightItem'],
      dataRequest,
    );
    yield put(editSuccess(response));
  } catch (err) {
    yield put(editFail(err));
  }
}

export default function* productSaga() {
  yield takeLatest(GET_REQUEST, getSpotlightItem);
  yield takeLatest(ADD_REQUEST, addSpotlightItem);
  yield takeLatest(EDIT_REQUEST, editSpotlightItem);
}
