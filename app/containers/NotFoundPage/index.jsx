/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button as MuiButton, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const Button = styled(MuiButton)(spacing);

const Wrapper = styled.div`
  padding: ${props => props.theme.spacing(6)}px;
  text-align: center;
  background: transparent;

  ${props => props.theme.breakpoints.up('md')} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;
const useStyles = makeStyles(() => ({
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
}));

function NotFound(props) {
  const { intl } = props;
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage(messages.header)}</title>
        <meta name="description" content="Description of SignIn" />
      </Helmet>
      <div className={classes.root}>
        <Wrapper>
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            404
          </Typography>
          <Typography component="h2" variant="h5" align="center" gutterBottom>
            {intl.formatMessage(messages.header)}
          </Typography>
          <Typography
            component="h2"
            variant="body1"
            align="center"
            gutterBottom
          >
            {intl.formatMessage(messages.pageRemove)}
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            color="secondary"
            mt={2}
          >
            {intl.formatMessage(messages.returnToWebsite)}
          </Button>
        </Wrapper>
      </div>
    </>
  );
}

NotFound.propTypes = {
  intl: intlShape,
};

export default injectIntl(NotFound);
