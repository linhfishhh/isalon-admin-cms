import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import TransitionUp from 'components/Transition/Up';
import UpsertAddress from 'containers/UpsertAddress';

const useStyles = makeStyles(theme => ({
  wrapper: {
    overflow: 'auto',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function AddAddress(props) {
  const { open, onClose, profileId } = props;
  const classes = useStyles();

  const handleCloseDialog = useCallback(() => {
    onClose();
  }, []);

  return (
    <Dialog
      open={open}
      TransitionComponent={TransitionUp}
      PaperProps={{ className: classes.wrapper, id: 'paper-content' }}
    >
      <IconButton className={classes.closeButton} onClick={handleCloseDialog}>
        <CloseIcon />
      </IconButton>
      <UpsertAddress onClose={onClose} isDialog profileId={profileId} />
    </Dialog>
  );
}

AddAddress.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  profileId: PropTypes.number,
};

export default memo(AddAddress);
