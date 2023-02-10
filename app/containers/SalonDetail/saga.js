import { takeLatest, call, put } from 'redux-saga/effects';
import { salonService, walletService } from 'services';
import {
  GET_PROFILE_REQUEST,
  GET_WALLET_REQUEST,
  UPDATE_WALLET_REQUEST,
  GET_WALLET_TRANSACTIONS_REQUEST,
} from './constants';
import {
  getProfileSuccess,
  getProfileFail,
  getSalonWalletSuccess,
  getSalonWalletFail,
  updateSalonWalletSuccess,
  updateSalonWalletFail,
  getWalletTransactionsSuccess,
  getWalletTransactionsFail,
} from './actions';

export function* getSalonDetail({ payload }) {
  try {
    const { salonId } = payload;
    const response = yield call([salonService, 'getSalonDetail'], salonId);
    yield put(getProfileSuccess(response));
  } catch (err) {
    yield put(getProfileFail(err));
  }
}

export function* getSalonWallet({ payload }) {
  try {
    const { salonId } = payload;
    const response = yield call([walletService, 'getSalonWallet'], salonId);
    yield put(getSalonWalletSuccess(response));
  } catch (err) {
    yield put(getSalonWalletFail(err));
  }
}

export function* updateSalonWallet({ payload }) {
  try {
    const response = yield call([walletService, 'updateSalonWallet'], payload);
    yield put(updateSalonWalletSuccess(response));
  } catch (err) {
    yield put(updateSalonWalletFail(err));
  }
}

export function* getSalonWalletTransactions({ payload }) {
  try {
    const { salonId, pageNumber, pageSize } = payload;
    const response = yield call(
      [walletService, 'getSalonWalletTransactions'],
      salonId,
      pageNumber,
      pageSize,
    );
    yield put(getWalletTransactionsSuccess(response));
  } catch (err) {
    yield put(getWalletTransactionsFail(err));
  }
}

export default function* customerListSaga() {
  yield takeLatest(GET_PROFILE_REQUEST, getSalonDetail);
  yield takeLatest(GET_WALLET_REQUEST, getSalonWallet);
  yield takeLatest(UPDATE_WALLET_REQUEST, updateSalonWallet);
  yield takeLatest(GET_WALLET_TRANSACTIONS_REQUEST, getSalonWalletTransactions);
}
