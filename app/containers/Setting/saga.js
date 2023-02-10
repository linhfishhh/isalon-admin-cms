import { takeLatest, call, put } from 'redux-saga/effects';
import { settingService, shopSettingService } from 'services';
import {
  GET_CFG_REQUEST,
  UPDATE_CFG_REQUEST,
  GET_SHOP_CFG_REQUEST,
  UPDATE_SHOP_CFG_REQUEST,
} from './constants';
import {
  getCfgSuccess,
  getCfgFail,
  updateCfgSuccess,
  updateCfgFail,
  getShopCfgSuccess,
  getShopCfgFail,
  updateShopCfgSuccess,
  updateShopCfgFail,
} from './actions';

export function* getCfg() {
  try {
    const response = yield call([settingService, 'getCfg']);
    yield put(getCfgSuccess(response));
  } catch (err) {
    yield put(getCfgFail(err));
  }
}

export function* updateCfg({ payload }) {
  try {
    const response = yield call([settingService, 'updateCfg'], payload);
    yield put(updateCfgSuccess(response));
  } catch (err) {
    yield put(updateCfgFail(err));
  }
}

export function* getShopCfg() {
  try {
    const response = yield call([shopSettingService, 'getCfg']);
    yield put(getShopCfgSuccess(response));
  } catch (err) {
    yield put(getShopCfgFail(err));
  }
}

export function* updateShopCfg({ payload }) {
  try {
    const response = yield call([shopSettingService, 'updateCfg'], payload);
    yield put(updateShopCfgSuccess(response));
  } catch (err) {
    yield put(updateShopCfgFail(err));
  }
}

export default function* settingSaga() {
  yield takeLatest(GET_CFG_REQUEST, getCfg);
  yield takeLatest(UPDATE_CFG_REQUEST, updateCfg);
  yield takeLatest(GET_SHOP_CFG_REQUEST, getShopCfg);
  yield takeLatest(UPDATE_SHOP_CFG_REQUEST, updateShopCfg);
}
