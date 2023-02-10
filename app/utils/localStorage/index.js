import { getDataKeep, setDataKeep } from './keepData';
export * from './options';
export * from './storage';
export { default as storageKeys } from './storageKeys';

export const setLocalStorageItem = (key, obj) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

export const getLocalStorageItem = key => {
  const retrievedObj = localStorage.getItem(key);
  return JSON.parse(retrievedObj);
};

export const removeLocalStorageItem = key => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  getDataKeep();
  localStorage.clear();
  setDataKeep();
};
