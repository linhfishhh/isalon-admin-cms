import { encryptData, decryptData } from '../crypto';
// import storageKeys from './storageKeys';

const setLocalStorage = (key, obj) => localStorage.setItem(key, obj);

const getLocalStorage = key => localStorage.getItem(key);

const removeLocalStorage = key => localStorage.removeItem(key);

// const keepDataKeys = [
//   storageKeys.UUID,
//   storageKeys.APP_INTRO,
//   storageKeys.LOCATION,
//   storageKeys.PROVINCES,
//   storageKeys.SEARCH_CONFIGS,
//   storageKeys.SETTINGS,
//   storageKeys.CURRENT_VERSION,
// ];

// const clearLocalStorage = () => {
//   if (localStorage) {
//     Object.keys(localStorage).forEach(key => {
//       if (!keepDataKeys.includes(key)) {
//         removeLocalStorage(key);
//       }
//     });
//   }
// };

const storageCryptData = {
  setItem: (key, value, encrypt = true) => {
    try {
      setLocalStorage(key, encrypt ? encryptData(value) : value);
    } catch (err) {
      setLocalStorage(key, value);
    }
  },
  getItem: (key, decrypt = true) => {
    const data = getLocalStorage(key);
    try {
      return decrypt ? decryptData(data) : data;
    } catch (err) {
      return undefined;
    }
  },
  removeItem: key => removeLocalStorage(key),
};

const storageCryptJsonData = {
  setItem: (key, value, encrypt = true) => {
    try {
      const data = JSON.stringify(value);
      setLocalStorage(key, encrypt ? encryptData(data) : data);
    } catch (err) {
      setLocalStorage(key, value);
    }
  },
  getItem: (key, decrypt = true) => {
    const data = getLocalStorage(key);
    try {
      return decrypt ? JSON.parse(decryptData(data)) : JSON.parse(data);
    } catch (err) {
      return undefined;
    }
  },
  removeItem: key => removeLocalStorage(key),
};

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  // clearLocalStorage,
  storageCryptData,
  storageCryptJsonData,
};
