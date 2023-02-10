import Cookies from 'js-cookie';

export const setCookie = (key, value) => {
  if (process.browser) {
    Cookies.set(key, value, {
      expires: 1,
      path: '/',
    });
  }
};

export const removeCookie = key => {
  if (process.browser) {
    Cookies.remove(key, {
      expires: 1,
    });
  }
};

export const removeAllCookies = () => {
  if (process.browser) {
    Object.keys(Cookies.get()).forEach(key => {
      removeCookie(key);
    });
  }
};

export const getCookie = key => Cookies.get(key);
