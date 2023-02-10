import { removeToken } from 'utils/auth';
import get from 'lodash/get';
import { addToast } from './Toaster';

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
};

const handleError = error => {
  const toast = { variant: 'error' };
  if (error.response) {
    switch (error.response.status) {
      case HTTP_STATUS.UNAUTHORIZED:
        removeToken();
        toast.messageId = 'userOrPasswordIncorrect';
        break;
      case HTTP_STATUS.NOT_FOUND:
        toast.messageId = 'error';
        break;
      case HTTP_STATUS.BAD_REQUEST: {
        toast.messageId = 'error';
        const message = get(error, 'response.data.message');
        if (message) {
          toast.message = message;
        }
        break;
      }
      default:
        toast.messageId = 'internalServerError';
        break;
    }
  } else {
    toast.messageId = 'networkError';
  }
  addToast(toast);
};

export { handleError };
