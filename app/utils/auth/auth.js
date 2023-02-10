import CryptoJS from 'crypto-js';
import { setCookie, getCookie, removeCookie } from './session';
import {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
} from '../localStorage';

const { CRYPTO_AES_KEY } = process.env;
const encryptData = str => CryptoJS.AES.encrypt(str, CRYPTO_AES_KEY).toString();
const decryptData = str =>
  CryptoJS.AES.decrypt(str, CRYPTO_AES_KEY).toString(CryptoJS.enc.Utf8);

const storage = {
  setItem: (key, value) => {
    try {
      const data = JSON.stringify(value);
      setLocalStorageItem(key, encryptData(data));
    } catch (err) {
      setLocalStorageItem(key, value);
    }
  },
  getItem: key => {
    const data = getLocalStorageItem(key);
    try {
      return JSON.parse(decryptData(data));
    } catch (err) {
      return data;
    }
  },
  removeItem: key => removeLocalStorageItem(key),
};

const cookies = {
  setItem: (key, value) => {
    try {
      setCookie(key, encryptData(value));
    } catch (err) {
      setCookie(key, value);
    }
  },
  getItem: key => {
    const data = getCookie(key);
    try {
      return decryptData(data);
    } catch (err) {
      return data;
    }
  },
  removeItem: key => removeCookie(key),
};

const CURRENT_USER = 'loggedInUser';
const OAUTH_TOKEN = 'token';
const OAUTH_REFRESH_TOKEN = 'refresh_token';
const TOKEN_EXPIRE_TIME = 'expires';

export const setToken = token => cookies.setItem(OAUTH_TOKEN, token);
export const getToken = () => cookies.getItem(OAUTH_TOKEN);
export const removeToken = () => cookies.removeItem(OAUTH_TOKEN);

export const isAuthenticated = () => !!getToken();

export const setRefreshToken = refreshToken =>
  cookies.setItem(OAUTH_REFRESH_TOKEN, refreshToken);
export const getRefreshToken = () => cookies.getItem(OAUTH_REFRESH_TOKEN);
export const removeRefreshToken = () => cookies.removeItem(OAUTH_REFRESH_TOKEN);

export const saveLoggedInUser = user => storage.setItem(CURRENT_USER, user);
export const getLoggedInUser = () => storage.getItem(CURRENT_USER);
export const removeLoggedInUser = () => storage.removeItem(CURRENT_USER);

export const getExpires = () => cookies.getItem(TOKEN_EXPIRE_TIME);
export const setExpires = expires =>
  cookies.setItem(TOKEN_EXPIRE_TIME, expires);

export const convertExpires = expires =>
  (new Date().getTime() + Number(expires) * 1000).toString();
