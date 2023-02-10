import { makeSelectCurrentTheme } from '../selectors';

describe('makeSelectCurrentTheme', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      global: globalState,
    };
    expect(makeSelectCurrentTheme(mockedState)).toEqual(globalState);
  });
});
