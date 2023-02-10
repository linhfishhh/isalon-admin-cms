import { takeLatest, call, put } from 'redux-saga/effects';
import { notificationService } from 'services';
import {
  GET_NOTIFICATION_LIST_REQUEST,
  DELETE_NOTIFICATION_REQUEST,
  PUSH_SYSTEM_NOTIFICATION_REQUEST,
} from './constants';
import {
  getNotificationListSuccess,
  getNotificationListFail,
  deleteNotificationSuccess,
  deleteNotificationFail,
  pushSystemNotificationSuccess,
  pushSystemNotificationFail,
} from './actions';

export function* getNotificationList({ payload }) {
  try {
    const { page, limit } = payload;
    const response = yield call(
      [notificationService, 'getNotificationList'],
      page,
      limit,
    );
    yield put(getNotificationListSuccess(response));
  } catch (err) {
    yield put(getNotificationListFail(err));
  }
}

export function* deleteNotification({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(
      [notificationService, 'deleteNotification'],
      id,
    );
    yield put(deleteNotificationSuccess(response));
  } catch (err) {
    yield put(deleteNotificationFail(err));
  }
}

export function* pushNotification({ payload }) {
  try {
    const response = yield call(
      [notificationService, 'pushNotification'],
      payload,
    );
    yield put(pushSystemNotificationSuccess(response));
  } catch (err) {
    yield put(pushSystemNotificationFail(err));
  }
}

export default function* productVariantSaga() {
  yield takeLatest(GET_NOTIFICATION_LIST_REQUEST, getNotificationList);
  yield takeLatest(DELETE_NOTIFICATION_REQUEST, deleteNotification);
  yield takeLatest(PUSH_SYSTEM_NOTIFICATION_REQUEST, pushNotification);
}
