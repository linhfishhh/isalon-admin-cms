import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { getProductPrice } from 'utils/helper';
import { currencyFormat } from 'utils/stringFormat';

const useStyles = makeStyles(theme => ({
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  price: {
    fontFamily: theme.typography.fontMedium,
    display: 'inline',
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.palette.primary.main,
    margin: 0,
  },
  originPrice: {
    textDecoration: 'line-through',
    fontSize: 14,
  },
}));

function ProductPrice(props) {
  const classes = useStyles();
  const { product, variant } = props;
  const { price, originPrice } = getProductPrice(product, variant);
  return (
    <div className={classes.priceContainer}>
      <Typography className={classes.price}>{currencyFormat(price)}</Typography>
      <Typography className={classes.originPrice}>
        {currencyFormat(originPrice)}
      </Typography>
    </div>
  );
}

ProductPrice.propTypes = {
  product: PropTypes.object,
  variant: PropTypes.object,
};

export default memo(ProductPrice);
