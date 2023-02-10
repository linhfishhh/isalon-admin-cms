import languageProviderReducer from '../reducer';
import { CHANGE_LOCALE } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {})).toEqual({
      locale: 'vi',
    });
  });

  it('changes the locale', () => {
    expect(
      languageProviderReducer(undefined, {
        type: CHANGE_LOCALE,
        locale: 'vi',
      }),
    ).toEqual({
      locale: 'vi',
    });
  });
});
