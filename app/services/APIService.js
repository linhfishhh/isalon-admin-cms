import axios from 'axios';
import get from 'lodash/get';
import unset from 'lodash/unset';
import { getToken, isAuthenticated, getExpires } from 'utils/auth';
import { TENANT_ID } from 'utils/constants';
import { handleError } from 'utils/handleError';

export default class APIService {
  constructor(cfg, options = {}) {
    const service = axios.create(cfg);
    service.interceptors.request.use(this.handleRefreshToken);
    service.interceptors.response.use(
      this.handleRequestSuccess,
      this.handleRequestError,
    );
    this.service = service;
    this.options = options;
  }

  handleRefreshToken = async config => {
    try {
      const expires = getExpires();
      if (expires && new Date() > Number(expires) - 5 * 60 * 1000) {
        // const response = await axios
        //   .create(DEFAULT_CONFIG)
        //   .post(
        //     '/users/refresh',
        //     {},
        //     { headers: { Authorization: `Bearer ${getRefreshToken()}` } },
        //   );
        // if (!get(response, 'data.error', null)) {
        //   const newToken = get(response, 'data.access_token', '');
        //   const newExpires = get(response, 'data.expires', '');
        //   setToken(newToken);
        //   setExpires(convertExpires(newExpires));
        //   config.headers.Authorization = `Bearer ${newToken}`;
        // }
      }
      return config;
    } catch (err) {
      return config;
    }
  };

  redirectTo = (document, path) => {
    // eslint-disable-next-line no-param-reassign
    document.location = path;
  };

  handleRequestSuccess = response => {
    if (get(response, 'data.error')) {
      return Promise.reject(response.data.error);
    }
    return response;
  };

  handleRequestError = error => {
    handleError(error);
    return Promise.reject(error);
  };

  get(url, params = {}, config = {}) {
    const { headers = {}, ...restConfig } = config;
    return this.executeRequest(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'tenant-id': TENANT_ID,
        ...headers,
      },
      ...restConfig,
      params,
    });
  }

  post(url, data = {}, config = {}) {
    const { headers = {}, ...restConfig } = config;
    return this.executeRequest(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'tenant-id': TENANT_ID,
        ...headers,
      },
      ...restConfig,
      data,
    });
  }

  upload(url, data = {}, config = {}) {
    const { headers = {}, ...restConfig } = config;
    return this.executeRequest(url, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'tenant-id': TENANT_ID,
        ...headers,
      },
      ...restConfig,
      data,
    });
  }

  put(url, data = {}, config = {}) {
    const { headers = {}, ...restConfig } = config;

    return this.executeRequest(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'tenant-id': TENANT_ID,
        ...headers,
      },
      ...restConfig,
      data,
    });
  }

  patch(url, data = {}, config = {}) {
    const { headers = {}, ...restConfig } = config;

    return this.executeRequest(url, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'tenant-id': TENANT_ID,
        ...headers,
      },
      ...restConfig,
      data,
    });
  }

  delete(url, params = {}, config = {}) {
    const { headers = {}, ...restConfig } = config;

    return this.executeRequest(url, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'tenant-id': TENANT_ID,
        ...headers,
      },
      ...restConfig,
      params,
    });
  }

  async executeRequest(url, config) {
    const { isLegacy = false, isOutside = false } = this.options;
    const authConfig = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const finalHeaderConfig = isAuthenticated()
      ? { ...config.headers, ...authConfig.headers }
      : config.headers;

    if (isOutside) {
      unset(finalHeaderConfig, 'tenant-id');
      unset(finalHeaderConfig, 'Authorization');
    }
    if (isLegacy) {
      unset(finalHeaderConfig, 'tenant-id');
    }

    const finalConfig = {
      url,
      ...config,
      headers: { ...finalHeaderConfig },
    };
    try {
      const res = await this.service.request(finalConfig);
      return get(res, 'data');
    } catch (errRes) {
      const err = await Promise.reject(errRes);
      return err;
    }
  }
}
