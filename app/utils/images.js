import { get, set, isEmpty, isArray } from 'lodash';

const storageEndpoint = process.env.STORAGE_END_POINT;

const getImageUrl = (imageId, size = '256') => {
  if (imageId) {
    return `${storageEndpoint}/images/${imageId}/get?size=${size}`;
  }
  return '';
};

const getImageObject = (imageId, index = 1) => ({
  imageId,
  imageSource: getImageUrl(imageId),
  imageIndex: index,
});

const appendUrlImage = (object, keyId, appendPath, index = 0) => {
  set(
    object,
    isEmpty(appendPath) ? 'imageSource' : `${appendPath}.imageSource`,
    getImageUrl(get(object, keyId)),
  );
  set(
    object,
    isEmpty(appendPath) ? 'imageIndex' : `${appendPath}.imageIndex`,
    index + 1,
  );
  return object;
};

const arrayImage = (array, keyId, appendPath) => {
  array.forEach((element, index) => {
    appendUrlImage(element, keyId, appendPath, index);
  });
  return array;
};

const appendImageObject = (
  dataSource,
  keyId,
  pathData = '',
  appendPath = '',
) => {
  if (isEmpty(pathData)) {
    if (isArray(dataSource)) {
      arrayImage(dataSource, keyId, appendPath);
    } else {
      appendUrlImage(dataSource, keyId, appendPath);
    }
  } else {
    const data = get(dataSource, pathData);
    if (isArray(data)) {
      const newData = arrayImage(data, keyId, appendPath);
      set(dataSource, pathData, newData);
    } else {
      const newData = appendUrlImage(data, keyId, appendPath);
      set(dataSource, pathData, newData);
    }
  }
  return dataSource;
};

export { getImageUrl, getImageObject, appendImageObject };
