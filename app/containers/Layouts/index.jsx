/**
 *
 * Layouts
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import AlertDialog from 'components/AlertDialog';
import Toast from 'components/Toast';

import Loading from 'containers/LoadingInPage';
import { profileSelector } from 'containers/SignIn/selectors';

import { setCurrentTheme } from 'containers/App/actions';
import { logoutRequest } from './actions';

import reducer from './reducer';
import saga from './saga';
import {
  drawerWidth,
  Root,
  Drawer,
  AppContent,
  MainContent,
  NavBar,
  MainSinglePage,
} from './styles';
import { CONTEXT } from './constants';
import messages from './messages';

export function Layouts(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const [openSidebar, setOpenSidebar] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const { intl, children, minimal, logout, profile, onChangeTheme } = props;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });
  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const onCancelLogout = () => {
    setLogoutConfirm(false);
  };

  const onConfirmLogout = () => {
    setLogoutConfirm(false);
    logout();
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;
  return (
    <>
      <Helmet>
        <title>Admin</title>
        <meta name="description" content="Description of Layouts" />
      </Helmet>
      <Loading isLoading={false} />
      <Root id="root-content">
        {minimal ? (
          <AppContent id="main-content">
            <MainSinglePage>{children}</MainSinglePage>
            <Footer />
          </AppContent>
        ) : (
          <>
            <Drawer>
              <Sidebar
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
                PaperProps={{ style: { width: drawerWidth } }}
                profile={profile}
              />
            </Drawer>
            <AppContent id="main-content">
              <NavBar
                onSidebarOpen={handleSidebarOpen}
                signOutAction={() => setLogoutConfirm(true)}
                changeThemeAction={onChangeTheme}
              />
              <MainContent>{children}</MainContent>
              <Footer />
            </AppContent>
          </>
        )}
      </Root>
      <AlertDialog
        open={logoutConfirm}
        description={intl.formatMessage(messages.logoutConfirm)}
        onCancel={onCancelLogout}
        onConfirm={onConfirmLogout}
      />
      <Toast
        ref={ref => {
          window.toast = ref;
        }}
      />
    </>
  );
}

Layouts.defaultProps = {
  minimal: false,
};

Layouts.propTypes = {
  intl: intlShape,
  children: PropTypes.node,
  minimal: PropTypes.bool,
  logout: PropTypes.func,
  profile: PropTypes.object,
  onChangeTheme: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: profileSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    logout: () => dispatch(logoutRequest()),
    onChangeTheme: payload => dispatch(setCurrentTheme(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(Layouts));
