/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { SnackbarProvider } from 'notistack';

import Themes from 'themes';
import Routes from 'routers';

import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectCurrentTheme } from './selectors';
import reducer from './reducer';
import { CONTEXT } from './constants';

function App(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  const { currentTheme } = props;
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={Themes[currentTheme]}>
        <CssBaseline />
        <Helmet titleTemplate="%s - iSalon" defaultTitle="iSalon">
          <meta name="description" content="iSalon" />
        </Helmet>
        <ThemeProvider theme={Themes[currentTheme]}>
          <SnackbarProvider>
            <Routes />
          </SnackbarProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
App.propTypes = {
  currentTheme: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  currentTheme: makeSelectCurrentTheme(),
});

export default connect(mapStateToProps)(App);
