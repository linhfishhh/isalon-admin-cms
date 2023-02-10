import { showLoading, hideLoading } from 'containers/LoadingInPage/actions';
import { isArray, isEmpty, findIndex, startsWith, endsWith } from 'lodash';

// 3 suffix for a side effect flow (REQUEST -> SUCCESS | FAIL)
import {
  ACTION_TYPE_REQUEST_SUFFIX as REQUEST_SUFFIX,
  ACTION_TYPE_SUCCESS_SUFFIX as SUCCESS_SUFFIX,
  ACTION_TYPE_FAIL_SUFFIX as FAIL_SUFFIX,
} from '../reduxHelper';

// Check the type of an action is valid for loading process
function isAcceptedType(type, checkingType) {
  if (!startsWith(checkingType, type)) return false;
  if (
    `${type}_${REQUEST_SUFFIX}` === checkingType ||
    `${type}_${SUCCESS_SUFFIX}` === checkingType ||
    `${type}_${FAIL_SUFFIX}` === checkingType
  )
    return true;

  return false;
}

/**
 *
 * @param {array} actionTypes array of action type that using loading process
 */
const loadingMiddleware = actionTypes => store => next => action => {
  if (
    isEmpty(actionTypes) ||
    !isArray(actionTypes) ||
    findIndex(actionTypes, type => isAcceptedType(type, action.type)) === -1
  )
    return next(action);

  const showLoadingCondition = endsWith(action.type, REQUEST_SUFFIX);
  const hideLoadingCondition =
    endsWith(action.type, SUCCESS_SUFFIX) || endsWith(action.type, FAIL_SUFFIX);

  if (showLoadingCondition) store.dispatch(showLoading());
  if (hideLoadingCondition) store.dispatch(hideLoading());

  return next(action);
};

export default loadingMiddleware;
