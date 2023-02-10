import { v1 } from 'uuid';
const UUID = 'uuid';

export const uuidExists = () => !!getUUID();

export const setUUID = uuid => localStorage.setItem(UUID, uuid);
export const getUUID = () => localStorage.getItem(UUID);
export const removeUUID = () => localStorage.removeItem(UUID);

export const createUUID = () => {
  if (!uuidExists()) {
    const uuidv1 = v1();
    setUUID(uuidv1);
  }
};
