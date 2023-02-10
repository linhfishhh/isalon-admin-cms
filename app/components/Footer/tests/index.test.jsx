/**
 * Testing the NotFoundPage
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@material-ui/styles';
import Theme from 'components/Themes';
import Footer from '../index';

describe('<Footer />', () => {
  it('should render the Footer', () => {
    const footer = renderer
      .create(
        <ThemeProvider theme={Theme}>
          <Footer />
        </ThemeProvider>,
      )
      .toJSON();
    expect(footer).toMatchSnapshot();
  });
});
