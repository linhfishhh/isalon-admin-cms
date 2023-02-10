import { storageCryptJsonData } from './storage';
import storageKeys from './storageKeys';

const defaultSetting = { rating: false };

export const getSettings = () => {
  const setting = storageCryptJsonData.getItem(storageKeys.SETTINGS);
  if (setting) {
    return setting;
  }
  storageCryptJsonData.setItem(storageKeys.SETTINGS, defaultSetting);
  return defaultSetting;
};

export const setSettings = newSetting => {
  const setting = getSettings();
  const fullSetting = { ...setting, ...newSetting };
  storageCryptJsonData.setItem(storageKeys.SETTINGS, fullSetting);
};

export const removeSettings = () =>
  storageCryptJsonData.removeItem(storageKeys.SETTINGS);
