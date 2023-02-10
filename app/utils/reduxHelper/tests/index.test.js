import {
  createActionType,
  createSingleAction,
  createSideEffectAction,
} from '..';

describe('Check util functions for redux:', () => {
  const actionType = [
    'TEST_REQUEST',
    'TEST_REQUEST_SUCCESS',
    'TEST_REQUEST_FAIL',
  ];

  const singleAction = type => ({ type });
  const sideEffectActions = [
    () => ({ type: 'TEST_REQUEST' }),
    () => ({ type: 'TEST_REQUEST_SUCCESS' }),
    () => ({ type: 'TEST_REQUEST_FAIL' }),
  ];

  it('should return an array with 3 suffix', () => {
    expect(createActionType('TEST')).toEqual(actionType);
  });

  it('should return function that return an action object when invoke', () => {
    expect(createSingleAction('TEST')()).toEqual(singleAction('TEST'));
  });

  it('should return an array with 3 function that each return a action object when invoke', () => {
    expect(createSideEffectAction('TEST')[0]()).toEqual(sideEffectActions[0]());
    expect(createSideEffectAction('TEST')[1]()).toEqual(sideEffectActions[1]());
    expect(createSideEffectAction('TEST')[2]()).toEqual(sideEffectActions[2]());
  });
});
