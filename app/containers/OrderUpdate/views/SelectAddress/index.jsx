import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from 'components/Button';
import PickAdress from './PickAddress';
import Address from './Address';

const useStyles = makeStyles(theme => ({
  userInfoContainer: {
    display: 'flext',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flext-start',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color: '#222222',
    width: 100,
  },
  detail: {
    color: '#222222',
    fontWeight: 'bold',
  },
  selectAddrButton: {
    marginTop: 20,
    width: 180,
  },
}));

function SelectAddress(props) {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const {
    selectedAddress,
    addresses = [],
    onSelectAddress,
    profileId,
    getUserAddresses,
  } = props;
  const [open, setOpen] = React.useState(false);
  const handleSelectAddress = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDidSelectAdd = address => {
    if (onSelectAddress) {
      onSelectAddress(address);
    }
  };

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Địa chỉ giao hàng</Typography>}
      />
      <CardContent>
        <Address data={selectedAddress} />
        <Button
          icon="add"
          name="Chọn địa chỉ"
          onClick={handleSelectAddress}
          className={classes.selectAddrButton}
        />
      </CardContent>
      <PickAdress
        open={open}
        onClose={handleClose}
        onSelect={handleDidSelectAdd}
        addresses={addresses}
        profileId={profileId}
        getMyAddresses={getUserAddresses}
      />
    </Card>
  );
}

SelectAddress.propTypes = {
  profileId: PropTypes.number,
  addresses: PropTypes.array,
  selectedAddress: PropTypes.object,
  onSelectAddress: PropTypes.func,
  getUserAddresses: PropTypes.func,
};

export default memo(SelectAddress);
