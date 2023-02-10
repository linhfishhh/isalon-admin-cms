import { takeLatest, call, put } from 'redux-saga/effects';
import { removeAllCookies } from 'utils/auth';
import { clearLocalStorage } from 'utils/localStorage';
import { authService } from 'services';
import { push } from 'connected-react-router';
import { LOGOUT_REQUEST } from './constants';
import { logoutSuccess, logoutFail } from './actions';

export function* logout() {
  try {
    yield call([authService, 'logout']);
    yield call(clearLocalStorage);
    yield call(removeAllCookies);
    yield put(logoutSuccess());
    yield put(push('/admin'));
  } catch (error) {
    yield put(logoutFail());
    yield put(push('/admin'));
  }
}

export default function* layoutsSaga() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}
