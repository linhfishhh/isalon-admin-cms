import { getUUID, setUUID } from '../auth/uuid';
import { getOptions, setOptions } from './options';

let uuid;
let options;

export const getDataKeep = () => {
  uuid = getUUID();
  options = getOptions();
};

export const setDataKeep = () => {
  setUUID(uuid);
  setOptions(options);
};
