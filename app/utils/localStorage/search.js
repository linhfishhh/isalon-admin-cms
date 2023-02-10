import { storageCryptJsonData } from './storage';
import storageKeys from './storageKeys';

export const getSearchHistory = () =>
  storageCryptJsonData.getItem(storageKeys.SEARCH_HISTORY, false) || [];

export const setSearchHistory = (keyword, searchType) => {
  const history = getSearchHistory();
  const keywords = history.map(item => item.keyword);
  const indexOf = keywords.indexOf(keyword);
  if (indexOf >= 0) {
    history.splice(indexOf, 1);
  }
  history.unshift({ keyword, searchType, date: new Date().getTime() });
  storageCryptJsonData.setItem(storageKeys.SEARCH_HISTORY, history, false);
};

export const removeSearchHistory = index => {
  if (index) {
    const history = getSearchHistory();
    history.splice(index, 1);
    storageCryptJsonData.setItem(storageKeys.SEARCH_HISTORY, history, false);
  } else {
    storageCryptJsonData.removeItem(storageKeys.SEARCH_HISTORY);
  }
};

export const getSearchConfigs = () =>
  storageCryptJsonData.getItem(storageKeys.SEARCH_CONFIGS, false) || {};

export const setSearchConfigs = configs =>
  storageCryptJsonData.setItem(storageKeys.SEARCH_CONFIGS, configs, false);

export const removeSearchConfigs = () =>
  storageCryptJsonData.removeItem(storageKeys.SEARCH_CONFIGS);
