import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Hidden, Toolbar } from '@material-ui/core';
import Button from 'components/Button';
import Options from 'components/Options';
import SearchIcon from '@material-ui/icons/Search';
import { SearchIconWrapper, Input, Search, AppBar } from './styles';

const Navbar = props => {
  const {
    onSidebarOpen,
    signOutAction,
    changeThemeAction,
    title,
    ...rest
  } = props;
  return (
    <>
      <AppBar position="sticky" elevation={0} {...rest}>
        <Toolbar>
          <Grid container alignItems="center">
            <Hidden lgUp>
              <Grid item>
                <Button
                  type="iconButton"
                  icon="menu"
                  color="inherit"
                  onClick={onSidebarOpen}
                />
              </Grid>
            </Hidden>
            <Grid item>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Input placeholder="Search…" />
              </Search>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Options onChangeTheme={changeThemeAction} />
              <Button
                type="iconButton"
                icon="signOut"
                color="inherit"
                onClick={signOutAction}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  signOutAction: PropTypes.func,
  changeThemeAction: PropTypes.func,
};

export default Navbar;
