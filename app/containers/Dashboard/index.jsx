/**
 *
 * Dashboard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { profileSelector } from 'containers/SignIn/selectors';
import Header from 'components/Header';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Dashboard(props) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const { intl, profile } = props;

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>

      <Header
        title={`${intl.formatMessage(
          messages.welcomeBack,
        )}, ${profile.fullName || 'Admin'}`}
      />
    </div>
  );
}

Dashboard.propTypes = {
  intl: intlShape,
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
  profile: profileSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(Dashboard));
