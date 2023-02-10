/**
 *
 * SignIn
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { get, isEmpty } from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Avatar,
  Button,
  TextField,
  Checkbox,
  Typography,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import validation from 'utils/validation';
import history from 'utils/history';
import { isAuthenticated } from 'utils/auth';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { TENANT_ID } from 'utils/constants';

import { loginStatusSelector } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES } from './constants';
import { loginRequest } from './actions';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    minHeight: '100%',
    margin: '0px auto',
    display: 'flex',
    alignItems: 'center',
    boxPack: 'center',
    justifyContent: 'center',
    boxAlign: 'center',
  },
  paper: {
    padding: theme.spacing(8),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
    margin: '8px auto',
    padding: theme.spacing(7),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const loginParams = {
  tenantId: TENANT_ID,
  profileType: 'ADMIN',
  grantType: 'password',
};

export function SignIn(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);

  const [showPassword, setShowPassword] = useState(false);
  const [validate, setValidate] = useState({});
  const [inputs, setInputs] = useState({ username: '', password: '' });

  const { dispatch, login, intl, loginStatus } = props;

  useEffect(() => {
    handleSignInSuccess();
  }, []);

  useEffect(() => {
    handleSignInSuccess();
  }, [loginStatus]);

  const handleSignInSuccess = () => {
    if (isAuthenticated() && loginStatus) {
      const from = get(history, 'location.state.from');
      if (from) {
        dispatch(push(from));
      } else {
        dispatch(push('/admin/dashboard'));
      }
    }
  };

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const classes = useStyles();

  const validateField = () => {
    const option = [
      {
        type: 'empty',
        model: inputs,
        keys: ['username', 'password'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  const handleLogin = event => {
    event.preventDefault();
    const noValidate = validateField();
    if (noValidate) {
      login({
        ...loginParams,
        ...inputs,
      });
    }
  };

  const handleOnChange = name => event => {
    setInputs({ ...inputs, [name]: event.target.value.trim() });
  };

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of SignIn" />
      </Helmet>

      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6" align="center">
            {intl.formatMessage(messages.title)}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={inputs.username}
              id="username"
              label={intl.formatMessage(messages.username)}
              autoFocus
              onChange={handleOnChange('username')}
              error={validate.username && validate.username.error}
              helperText={
                validate.username &&
                intl.formatMessage(messages[validate.username.helperText])
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={inputs.password}
              label={intl.formatMessage(messages.password)}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={handleOnChange('password')}
              error={validate.password && validate.password.error}
              helperText={
                validate.password &&
                intl.formatMessage(messages[validate.password.helperText])
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={intl.formatMessage(messages.remember)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              {intl.formatMessage(messages.signin)}
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
}

SignIn.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  login: PropTypes.func,
  loginStatus: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loginStatus: loginStatusSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: payload => dispatch(loginRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(SignIn));
