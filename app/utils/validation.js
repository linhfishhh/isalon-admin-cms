import isEmpty from 'validator/lib/isEmpty';

const emptyValidate = (object, keys, messages = []) => {
  const result = {};
  keys.forEach((key, index) => {
    if (!object[key] || isEmpty(`${object[key]}`.trim())) {
      result[key] = {
        error: true,
        helperText: `${key}IsRequired`,
        helperMessageText: messages[index],
      };
    }
  });
  return result;
};

const validation = payload => {
  let result;
  payload.forEach(validate => {
    const { type, model, keys, messages } = validate;
    if (type === 'empty') {
      result = emptyValidate(model, keys, messages);
    }
  });

  return result;
};

export default validation;
