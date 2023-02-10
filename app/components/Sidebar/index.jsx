import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar } from '@material-ui/core';
import { AccountCircle as AvatarIcon } from '@material-ui/icons';

import { dashboard as categories } from 'routers/routes';
import { Drawer, Brand, Dot, SidebarFooter, SidebarFooterText } from './styles';
import SidebarNav from './SidebarNav';

const useStyles = makeStyles(theme => ({
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = props => {
  const { open, variant, onClose, className, profile, ...rest } = props;

  const classes = useStyles();

  return (
    <Drawer onClose={onClose} open={open} variant={variant} {...rest}>
      <Brand>iSalon </Brand>
      <SidebarNav className={classes.nav} categories={categories} />
      <SidebarFooter>
        <Grid container spacing={2}>
          <Grid item>
            {profile.avatar ? (
              <Avatar alt="avatar" src={profile.avatar} />
            ) : (
              <Avatar alt="avatar">
                <AvatarIcon />
              </Avatar>
            )}
          </Grid>
          <Grid item>
            <SidebarFooterText variant="body2">
              {profile.fullName || 'Admin'}
            </SidebarFooterText>
            <SidebarFooterText variant="body2">
              <Dot />
              Online
            </SidebarFooterText>
          </Grid>
        </Grid>
      </SidebarFooter>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  profile: PropTypes.object,
};

export default memo(Sidebar);
