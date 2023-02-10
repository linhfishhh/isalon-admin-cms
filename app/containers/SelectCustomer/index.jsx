/**
 *
 * ProductList
 *
 */

import React, { memo, useMemo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import CustomerList from 'containers/CustomerList';

import Button from 'components/Button';
import TableAdvance from 'components/TableAdvance';
import TransitionUp from 'components/Transition/Up';
import NumberFormatInput from 'components/NumberFormatInput';
import ProductPrice from 'components/ProductPrice';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    // padding: theme.spacing(1, 3),
  },
  content: {
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'stretch',
  },
  customerList: {
    flex: 1,
  },
}));

export function SelectCustomer(props) {
  const { open, onClose, onAgree } = props;
  const classes = useStyles();

  const handleCancelAction = useCallback(() => {
    onClose();
  }, []);

  const handleSelectAction = useCallback(customerId => {
    if (onAgree) {
      onAgree(customerId);
    }
    onClose();
  }, []);

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      TransitionComponent={TransitionUp}
    >
      <DialogTitle disableTypography className={classes.title}>
        <Grid container alignItems="center">
          <Grid item xs>
            Chọn khách hàng
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <div className={classes.customerList}>
          <CustomerList onSelectCustomer={handleSelectAction} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          icon="close"
          options={{ showIcon: false }}
          onClick={handleCancelAction}
          color="default"
        />
      </DialogActions>
    </Dialog>
  );
}

SelectCustomer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAgree: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

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
)(SelectCustomer);
