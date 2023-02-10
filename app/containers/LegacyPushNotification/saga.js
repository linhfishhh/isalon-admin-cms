import { takeLatest, call, put } from 'redux-saga/effects';
import { legacyNotificationService } from 'services';
import { PUSHNOTIFICATION_REQUEST } from './constants';
import { pushNotificationSuccess, pushNotificationFail } from './actions';

export function* pushNotification({ payload }) {
  try {
    const res = yield call(
      [legacyNotificationService, 'pushNotification'],
      payload,
    );
    yield put(pushNotificationSuccess(res));
  } catch (err) {
    yield put(pushNotificationFail(err));
  }
}

export default function* saga() {
  yield takeLatest(PUSHNOTIFICATION_REQUEST, pushNotification);
}
