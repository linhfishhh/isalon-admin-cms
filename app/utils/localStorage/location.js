import { storageCryptJsonData } from './storage';
import storageKeys from './storageKeys';

/**
 * storage location object include:position isCustom, province, district, ward
 */

export const getCurrentPosition = () =>
  storageCryptJsonData.getItem(storageKeys.LOCATION, false) || {};

export const setCurrentPosition = data => {
  const currentLocation = getCurrentPosition();
  const newData = { ...currentLocation, ...data };
  storageCryptJsonData.setItem(storageKeys.LOCATION, newData, false);
};

export const removeCurrentLocation = () =>
  storageCryptJsonData.removeItem(storageKeys.LOCATION);

export const getAddress = () => {
  const { address } = getCurrentPosition();
  return address;
};

export const getPosition = () => {
  const { position } = getCurrentPosition();
  return position;
};

export const getProvince = () => {
  const { province } = getCurrentPosition();
  return province;
};

export const isCustomPosition = () => {
  const { isCustom } = getCurrentPosition();
  return isCustom || false;
};

export const autoFetchLocation = () => {
  const province = getProvince();
  setCurrentPosition({
    isCustom: false,
    district: undefined,
    ward: undefined,
    address: province.name,
  });
};
