import { takeLatest, call, put } from 'redux-saga/effects';
import { profileService, customerService, walletService } from 'services';
import {
  GET_ORDER_LIST_REQUEST,
  GET_PROFILE_REQUEST,
  GET_WALLET_REQUEST,
  UPDATE_WALLET_REQUEST,
  GET_WALLET_TRANSACTIONS_REQUEST,
  GET_USER_ADDRESS_REQUEST,
  GET_ADDRESS_DETAIL_REQUEST,
} from './constants';
import {
  getOrderListSuccess,
  getOrderListFail,
  getProfileSuccess,
  getProfileFail,
  getUserWalletSuccess,
  getUserWalletFail,
  updateUserWalletSuccess,
  updateUserWalletFail,
  getWalletTransactionsSuccess,
  getWalletTransactionsFail,
  getUserAddressSuccess,
  getUserAddressFail,
  getAddressDetailSuccess,
  getAddressDetailFail,
} from './actions';

export function* getProfile({ payload }) {
  const { profileId } = payload;
  try {
    const response = yield call([profileService, 'getProfileById'], profileId);
    yield put(getProfileSuccess(response));
  } catch (err) {
    yield put(getProfileFail(err));
  }
}

export function* getOrderList({ payload }) {
  const { profileId, page, limit } = payload;
  try {
    const response = yield call(
      [customerService, 'getOrderOfCustomer'],
      profileId,
      page,
      limit,
    );
    yield put(getOrderListSuccess(response));
  } catch (err) {
    yield put(getOrderListFail(err));
  }
}

export function* getUserWallet({ payload }) {
  try {
    const { profileId } = payload;
    const response = yield call([walletService, 'getUserWallet'], profileId);
    yield put(getUserWalletSuccess(response));
  } catch (err) {
    yield put(getUserWalletFail(err));
  }
}

export function* updateUserWallet({ payload }) {
  try {
    const response = yield call([walletService, 'updateUserWallet'], payload);
    yield put(updateUserWalletSuccess(response));
  } catch (err) {
    yield put(updateUserWalletFail(err));
  }
}

export function* getUserWalletTransactions({ payload }) {
  try {
    const { profileId, pageNumber, pageSize } = payload;
    const response = yield call(
      [walletService, 'getUserWalletTransactions'],
      profileId,
      pageNumber,
      pageSize,
    );
    yield put(getWalletTransactionsSuccess(response));
  } catch (err) {
    yield put(getWalletTransactionsFail(err));
  }
}

export function* getUserAddresses({ payload }) {
  try {
    const { profileId } = payload;
    const response = yield call(
      [profileService, 'getUserAddresses'],
      profileId,
    );
    yield put(getUserAddressSuccess(response));
  } catch (err) {
    yield put(getUserAddressFail(err));
  }
}

export function* getAddressDetail({ payload }) {
  try {
    const { addressId } = payload;
    const response = yield call([profileService, 'getAddressOne'], addressId);
    yield put(getAddressDetailSuccess(response));
  } catch (err) {
    yield put(getAddressDetailFail(err));
  }
}

export default function* customerListSaga() {
  yield takeLatest(GET_PROFILE_REQUEST, getProfile);
  yield takeLatest(GET_ORDER_LIST_REQUEST, getOrderList);
  yield takeLatest(GET_WALLET_REQUEST, getUserWallet);
  yield takeLatest(UPDATE_WALLET_REQUEST, updateUserWallet);
  yield takeLatest(GET_WALLET_TRANSACTIONS_REQUEST, getUserWalletTransactions);
  yield takeLatest(GET_USER_ADDRESS_REQUEST, getUserAddresses);
  yield takeLatest(GET_ADDRESS_DETAIL_REQUEST, getAddressDetail);
}
