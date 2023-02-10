/**
 *
 * Toast
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Button from 'components/Button';
import { withSnackbar } from 'notistack';

import messages from './messages';

class Toast extends Component {
  show = toast => {
    const { intl, enqueueSnackbar, closeSnackbar } = this.props;
    const { action, message, options, variant, messageId } = toast;
    const finalMessage = () => {
      if (message) {
        return message;
      }
      if (action) {
        return `${intl.formatMessage(messages[action])} ${intl.formatMessage(
          messages[variant],
        )}`;
      }
      return intl.formatMessage(messages[messageId]);
    };

    const fullOption = {
      ...options,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      action: key => (
        <Button
          icon="close"
          type="iconButton"
          fontSize="small"
          color="inherit"
          onClick={() => closeSnackbar(key)}
        />
      ),
    };
    enqueueSnackbar(finalMessage(), fullOption);
  };

  render() {
    return <></>;
  }
}

Toast.propTypes = {
  intl: intlShape,
  enqueueSnackbar: PropTypes.func,
  closeSnackbar: PropTypes.func,
};

export default withSnackbar(injectIntl(Toast, { withRef: true }));
