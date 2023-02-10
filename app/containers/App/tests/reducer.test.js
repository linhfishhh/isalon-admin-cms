import produce from 'immer';

import appReducer from '../reducer';
import { getCurrentTheme, setCurrentTheme } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      currentTheme: 0,
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the getCurrentTheme action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.currentTheme = 1;
    });

    expect(appReducer(state, getCurrentTheme())).toEqual(expectedResult);
  });

  it('should handle the setCurrentTheme action correctly', () => {
    const payload = { indexTheme: 2 };

    const expectedResult = produce(state, draft => {
      draft.currentTheme = 2;
    });

    expect(appReducer(state, setCurrentTheme({ payload }))).toEqual(
      expectedResult,
    );
  });
});
