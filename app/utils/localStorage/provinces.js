import { storageCryptJsonData } from './storage';
import storageKeys from './storageKeys';

export const getProvinces = () =>
  storageCryptJsonData.getItem(storageKeys.PROVINCES, false) || [];

export const setProvinces = provinces =>
  storageCryptJsonData.setItem(storageKeys.PROVINCES, provinces, false);

export const removeProvinces = () =>
  storageCryptJsonData.removeItem(storageKeys.PROVINCES);
