const OPTIONS = 'options';

export const setOptions = option => {
  const fullOptions = updateOptions(option);
  localStorage.setItem(OPTIONS, JSON.stringify(fullOptions));
};
export const getOptions = () => {
  const retrievedObj = localStorage.getItem(OPTIONS);
  return JSON.parse(retrievedObj);
};
export const removeUUID = () => localStorage.removeItem(OPTIONS);

const updateOptions = option => {
  const options = getOptions();
  const fullOptions = {
    ...options,
    ...option,
  };
  return fullOptions;
};
