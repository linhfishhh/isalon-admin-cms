import { storageCryptData } from './storage';
import storageKeys from './storageKeys';

export const getAffiliateToken = () =>
  storageCryptData.getItem(storageKeys.AFFILIATE_TOKEN, false);

export const setAffiliateToken = token =>
  storageCryptData.setItem(storageKeys.AFFILIATE_TOKEN, token, false);

export const removeAffiliateToken = () =>
  storageCryptData.removeItem(storageKeys.AFFILIATE_TOKEN);
