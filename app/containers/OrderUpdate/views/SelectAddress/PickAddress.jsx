import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import isEmpty from 'lodash/isEmpty';
import CloseIcon from '@material-ui/icons/Close';

import Address from './Address';
import AddAddress from './AddAddress';

const useStyles = makeStyles(theme => ({
  add_address_button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderStyle: 'dashed',
    padding: theme.spacing(4),
  },
  title: {},
  subTitle: {
    color: theme.palette.grey[500],
  },
  plus_sign: {
    fontSize: 50,
    fontWeight: 'normal',
    padding: 0,
    marginRight: theme.spacing(5),
    marginTop: -10,
  },
  content: {
    padding: theme.spacing(2, 6, 6, 6),
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const SelectAddress = props => {
  const {
    profileId,
    addresses,
    onSelect,
    open,
    onClose,
    getMyAddresses,
    // openAddAddress,
    // onOpenAddAddress,
    // onCloseAddAddress,
  } = props;
  const classes = useStyles();

  const [openAddAddress, setOpenAddAddress] = React.useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddAddress(true);
  };

  const handleCloseAddDialog = useCallback(newAddress => {
    if (!isEmpty(newAddress)) {
      getMyAddresses(profileId);
      if (isEmpty(addresses)) {
        onSelect(newAddress);
      }
    }
    // onCloseAddAddress();
    setOpenAddAddress(false);
  }, []);

  const handleSelectAddress = useCallback(address => {
    onSelect(address);
    onClose();
  }, []);

  return (
    <>
      <Dialog fullWidth className={classes.root} open={open} onClose={onClose}>
        <DialogTitle disableTypography>
          <Grid container>
            <Grid item xs>
              <Typography className={classes.title} variant="h5">
                Chọn địa chỉ
              </Typography>
              <Typography className={classes.subTitle}>
                Vui lòng chọn địa chỉ để tiếp tục
              </Typography>
            </Grid>
            <Grid item>
              <IconButton className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent className={classes.content}>
          {addresses.map((address, index) => (
            <Grid item xs key={address.addressId || index}>
              <Address data={address} onSelect={handleSelectAddress} />
            </Grid>
          ))}
          <Button
            className={classes.add_address_button}
            variant="outlined"
            color="primary"
            component="span"
            onClick={handleOpenAddDialog}
          >
            <span className={classes.plus_sign}>+</span>
            <Typography>Thêm địa chỉ</Typography>
          </Button>
        </DialogContent>
      </Dialog>
      <AddAddress
        open={openAddAddress}
        onClose={handleCloseAddDialog}
        profileId={profileId}
      />
    </>
  );
};

SelectAddress.propTypes = {
  profileId: PropTypes.number,
  addresses: PropTypes.array,
  onSelect: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  getMyAddresses: PropTypes.func,
  // openAddAddress: PropTypes.bool,
  // onOpenAddAddress: PropTypes.func,
  // onCloseAddAddress: PropTypes.func,
};
export default memo(SelectAddress);
