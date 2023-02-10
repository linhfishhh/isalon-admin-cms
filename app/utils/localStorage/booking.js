import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import { storageCryptJsonData, storageCryptData } from './storage';
import { isAuthenticated } from '../auth';
import storageKeys from './storageKeys';

const keyName = id => `salon_${id}`;

export const getSalonBookingLS = salonId => {
  const key = keyName(salonId);
  const salonBooking = storageCryptJsonData.getItem(key);
  if (salonBooking && isAuthenticated()) {
    return salonBooking;
  }
  return {};
};

export const getServicesBookingLS = salonId => {
  const key = keyName(salonId);
  const salonBooking = storageCryptJsonData.getItem(key);
  if (salonBooking && isAuthenticated()) {
    const { services } = salonBooking;
    return services || [];
  }
  return [];
};

export const addServiceBookingLS = (salonId, service) => {
  const salonBooking = getSalonBookingLS(salonId);
  const key = keyName(salonId);
  if (!isEmpty(salonBooking)) {
    const { services } = salonBooking;
    set(salonBooking, 'services', services.concat(service));
  } else {
    set(salonBooking, 'services', [service]);
  }
  storageCryptJsonData.setItem(key, salonBooking);
};

export const removeServiceBookingLS = (salonId, serviceId) => {
  const salonBooking = getSalonBookingLS(salonId);
  const key = keyName(salonId);
  if (!isEmpty(salonBooking)) {
    const { services } = salonBooking;
    const newServices = services.filter(item => item.id !== serviceId);
    set(salonBooking, 'services', newServices);
    storageCryptJsonData.setItem(key, salonBooking);
  }
};

export const removeSalonBookingLS = salonId => {
  const key = keyName(salonId);
  storageCryptJsonData.removeItem(key);
};

export const changeQuantityServiceLS = (salonId, serviceId, quantity) => {
  const salonBooking = getSalonBookingLS(salonId);
  const key = keyName(salonId);
  if (!isEmpty(salonBooking)) {
    const { services } = salonBooking;
    const newsService = services.map(item => {
      if (item.id === serviceId) {
        return { ...item, qty: quantity };
      }
      return item;
    });
    set(salonBooking, 'services', newsService);
    storageCryptJsonData.setItem(key, salonBooking);
  }
};

export const createServiceBookingLS = (service, option) => {
  const result = {
    id: service.id,
    name: service.name,
    time: service.time,
    price: service.priceNumber,
    qty: 1,
    oldPrice: service.oldPriceNumber,
    sale_percent: service.sale_percent,
  };
  if (option) {
    result.option = option;
  }
  return result;
};

export const addBookingInfoLS = (salonId, data) => {
  const salonBooking = getSalonBookingLS(salonId);
  const key = keyName(salonId);
  const newBooking = { ...salonBooking, ...data };
  storageCryptJsonData.setItem(key, newBooking);
};

export const getCurrentSalonBookingLS = () =>
  storageCryptData.getItem(storageKeys.SALON_BOOKING);

export const setCurrentSalonBookingLS = salonId => {
  const currentSalon = getCurrentSalonBookingLS();
  if (currentSalon) {
    removeSalonBookingLS(currentSalon);
  }
  storageCryptData.setItem(storageKeys.SALON_BOOKING, salonId);
};

export const removeCurrentSalonBookingLS = (forceRemove = false) => {
  const salonId = getCurrentSalonBookingLS();
  const currentBooking = getSalonBookingLS(salonId);
  const { step } = currentBooking;
  if (forceRemove || step === 2) {
    removeSalonBookingLS(salonId);
    storageCryptData.removeItem(storageKeys.SALON_BOOKING);
  }
};
