/* eslint-disable no-unused-vars, import/no-mutable-exports */
import { compose } from 'redux';
import { map, findIndex, filter } from 'lodash';

// Just a bait middlware
const baitMiddleware = store => next => action => next(action);
export let allDynamicMiddlewares = [baitMiddleware];

/**
 * Based on https://github.com/pofigizm/redux-dynamic-middlewares
 */
const dynamicMiddlewares = ({ getState, dispatch }) => next => action => {
  const middlewareAPI = {
    getState,
    dispatch: act => dispatch(act),
  };

  const chain = map(allDynamicMiddlewares, middleware =>
    middleware(middlewareAPI),
  );

  return compose(...chain)(next)(action);
};

export const addMiddleware = (...middlewares) => {
  allDynamicMiddlewares = [...allDynamicMiddlewares, ...middlewares];
};

export const removeMiddleware = middleware => {
  const index = findIndex(allDynamicMiddlewares, d => d === middleware);

  if (index === -1) return;

  allDynamicMiddlewares = filter(
    allDynamicMiddlewares,
    (_, mdwIndex) => mdwIndex !== index,
  );
};

export const resetMiddlewares = () => {
  allDynamicMiddlewares = [baitMiddleware];
};

export default dynamicMiddlewares;
