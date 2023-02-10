import React, { useRef, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'sticky',
    top: 0, // theme.spacing(2),
    zIndex: 1300,
    minHeight: 48,
  },
}));

function Header(props) {
  const { title, children, variant, className } = props;
  const classes = useStyles();
  const headerRef = useRef(null);

  return (
    <>
      <Grid
        ref={headerRef}
        container
        spacing={3}
        alignItems="center"
        className={`${classes.wrapper} ${className}`}
      >
        <Grid item>
          <Typography variant={variant} display="inline">
            {title}
          </Typography>
        </Grid>
        <Grid item xs />
        <Grid item>{children}</Grid>
      </Grid>
      <Divider my={4} />
    </>
  );
}

Header.defaultProps = {
  variant: 'h4',
};

Header.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  variant: PropTypes.string,
  className: PropTypes.string,
};

export default memo(Header);
