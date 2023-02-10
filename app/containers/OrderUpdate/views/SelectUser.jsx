import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from 'components/Button';
import SelectCustomer from 'containers/SelectCustomer';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get';

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
  selectUserButton: {
    marginTop: 20,
    width: 180,
  },
}));

function SelectUser(props) {
  // eslint-disable-next-line no-unused-vars
  const { user, onSelectUser } = props;
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const handleSelectUser = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDidSelectUser = customerId => {
    if (onSelectUser) {
      onSelectUser(customerId);
    }
  };

  return (
    <Card>
      <CardHeader title={<Typography variant="h6">Khách hàng</Typography>} />
      <CardContent>
        <div className={classes.userInfoContainer}>
          <div className={classes.row}>
            <Typography className={classes.title}>Họ tên: </Typography>
            <Typography className={classes.detail}>
              {get(user, 'fullName', '')}
            </Typography>
          </div>
          <div className={classes.row}>
            <Typography className={classes.title}>SĐT: </Typography>
            <Typography className={classes.detail}>
              {get(user, 'phone', '')}
            </Typography>
          </div>
          <div className={classes.row}>
            <Typography className={classes.title}>Email: </Typography>
            <Typography className={classes.detail}>
              {get(user, 'email', '')}
            </Typography>
          </div>
        </div>
        <Button
          icon="add"
          name="Chọn khách hàng"
          onClick={handleSelectUser}
          className={classes.selectUserButton}
        />
      </CardContent>
      <SelectCustomer
        open={open}
        onClose={handleClose}
        onAgree={handleDidSelectUser}
      />
    </Card>
  );
}

SelectUser.propTypes = {
  user: PropTypes.object,
  onSelectUser: PropTypes.func,
};

export default memo(SelectUser);
