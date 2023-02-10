import { isArray, isEmpty, findIndex, startsWith, endsWith } from 'lodash';

import { addToast } from 'utils/Toaster';

// 2 suffix for a side effect flow (SUCCESS | FAIL)
import {
  ACTION_TYPE_SUCCESS_SUFFIX as SUCCESS_SUFFIX,
  ACTION_TYPE_FAIL_SUFFIX as FAIL_SUFFIX,
} from '../reduxHelper';

// Check the type of an action is valid for show toast
function isAcceptedType(type, checkingType) {
  if (!startsWith(checkingType, type)) return false;
  if (
    `${type}_${SUCCESS_SUFFIX}` === checkingType ||
    `${type}_${FAIL_SUFFIX}` === checkingType
  )
    return true;

  return false;
}

/**
 *
 * @param {array} actionTypes array of action type that using show toast
 */
// eslint-disable-next-line no-unused-vars
const toastMiddleware = actionTypes => store => next => action => {
  if (
    isEmpty(actionTypes) ||
    !isArray(actionTypes) ||
    findIndex(actionTypes, type => isAcceptedType(type, action.type)) === -1
  )
    return next(action);

  const showToastCondition =
    endsWith(action.type, SUCCESS_SUFFIX) || endsWith(action.type, FAIL_SUFFIX);

  if (showToastCondition) {
    const variant = endsWith(action.type, SUCCESS_SUFFIX) ? 'success' : 'fail';
    const payload = { type: action.type, variant };
    addToast(payload);
  }

  return next(action);
};

export default toastMiddleware;
