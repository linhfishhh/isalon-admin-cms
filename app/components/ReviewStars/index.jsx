/**
 *
 * ReviewStars
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'uuid/v1';
import { makeStyles } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 18,
    height: 18,
    width: 18,
  },
  starFilledIcon: {
    color: amber[400],
  },
  starBorderIcon: {
    color: theme.palette.icon,
  },
}));

const ReviewStars = props => {
  const { value, starCount, className, ...rest } = props;

  const classes = useStyles();
  const starNodes = [];

  for (let i = 1; i <= starCount; i += 1) {
    const key = uuid();

    const starNode =
      i <= value ? (
        <StarIcon
          className={clsx(classes.starIcon, classes.starFilledIcon)}
          key={key}
        />
      ) : (
        <StarBorderIcon
          className={clsx(classes.starIcon, classes.starBorderIcon)}
          key={key}
        />
      );

    starNodes.push(starNode);
  }

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {starNodes}
    </div>
  );
};

ReviewStars.propTypes = {
  className: PropTypes.string,
  starCount: PropTypes.number,
  value: PropTypes.number,
};

ReviewStars.defaultProps = {
  value: 0,
  starCount: 5,
};

export default memo(ReviewStars);
