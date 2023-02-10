import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
import { normalizePhoneNumber } from 'utils/helper';

const useStyles = makeStyles(theme => ({
  root: {
    border: `dashed 1px ${theme.palette.primary.main}`,
    borderRadius: 4,
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    cursor: 'pointer',
  },
  title_text: {
    color: '#222222',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  normal_text: {
    color: '#222222',
  },
  detail_text: {
    color: '#808285',
  },
}));

function Address(props) {
  const classes = useStyles();
  const { data = {}, onSelect } = props;

  const handleSelectAddr = () => {
    if (onSelect) {
      onSelect(data);
    }
  };

  return (
    <Grid
      container
      direction="column"
      className={classes.root}
      alignItems="flex-start"
      onClick={handleSelectAddr}
    >
      <Grid item xs>
        <Typography className={classes.title_text}>
          {get(data, 'name', '')}
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography className={classes.detail_text}>
          Địa chỉ:{' '}
          <Typography component="span" className={classes.normal_text}>
            {get(data, 'addressDetail', '')}
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography className={classes.detail_text}>
          SĐT:{' '}
          <Typography component="span" className={classes.normal_text}>
            {normalizePhoneNumber(get(data, 'phone', ''))}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
}

Address.propTypes = {
  data: PropTypes.object,
  onSelect: PropTypes.func,
};

export default memo(Address);
