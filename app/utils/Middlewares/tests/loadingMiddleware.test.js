import loadingMiddleware from '../loadingMiddleware';

describe('Check loading middleware', () => {
  let actionTypes;
  let dispatch;
  let store;
  let next;
  let action;

  beforeEach(() => {
    dispatch = jest.fn(callAction => callAction);

    actionTypes = ['test'];
    store = { dispatch };
    next = jest.fn();
    action = { type: 'test' };
  });

  it("Don't process loading when actionTypes is null", () => {
    actionTypes = null;

    loadingMiddleware(actionTypes)({})(next)(action);

    expect(next.mock.calls.length).toBe(1);
  });

  it("Don't process loading when actionTypes is empty", () => {
    actionTypes = [];

    loadingMiddleware(actionTypes)({})(next)(action);

    expect(next.mock.calls.length).toBe(1);
  });

  it("Don't process loading when the current action is not in actionTypes", () => {
    action = { type: 'test1' };

    loadingMiddleware(actionTypes)({})(next)(action);

    expect(next.mock.calls.length).toBe(1);
  });

  it("Don't process loading when the current action is not in actionTypes and in case different", () => {
    action = { type: 'nottest1' };

    loadingMiddleware(actionTypes)({})(next)(action);

    expect(next.mock.calls.length).toBe(1);
  });

  it('Process loading when the current action is suffix with REQUEST', () => {
    action = { type: 'test_REQUEST' };

    loadingMiddleware(actionTypes)(store)(next)(action);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(next.mock.calls.length).toBe(1);
  });

  it('Process loading when the current action is suffix with SUCCESS', () => {
    action = { type: 'test_REQUEST_SUCCESS' };

    loadingMiddleware(actionTypes)(store)(next)(action);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(next.mock.calls.length).toBe(1);
  });

  it('Process loading when the current action is suffix with FAIL', () => {
    action = { type: 'test_REQUEST_FAIL' };

    loadingMiddleware(actionTypes)(store)(next)(action);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(next.mock.calls.length).toBe(1);
  });
});
